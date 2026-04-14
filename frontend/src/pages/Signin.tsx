import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { toast } from "react-toastify";

const Signin = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function signin() {
    setIsLoading(true);

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      toast.warning("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });
      
      const token = response.data.token;
      localStorage.setItem('token' , token);

      toast.success("User signed in successfully");
      navigate("/dashboard");
    } catch {
      toast.error("Signin failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-80 flex flex-col gap-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200 items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black">Login</h1>
          <p className="text-gray-font text-sm">Welcome back to your brain</p>
        </div>

        <div className="flex flex-col gap-4">
          <Input  ref={usernameRef} placeholder="Email" />
          <Input ref={passwordRef} placeholder="Password" type="password" />
        </div>

        <div className="flex w-full justify-center ">
          <Button
            variant="primary"
            title="Sign In"
            size="md"
            loading={isLoading}
            onClick={() => {signin()}}
          />
        </div>

        <div className="text-xs text-center text-gray-font">
          New here?{" "}
          <span
            className="text-purple-dark cursor-pointer font-medium"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Create account
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signin;
