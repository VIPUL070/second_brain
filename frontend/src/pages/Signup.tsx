import {  useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading ,setIsLoading]  = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function signup() {
    setIsLoading(true);

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      toast.warning("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
      });

      toast.success("User signed up successfully");
      navigate("/signin");
    } catch {
      toast.error("Signup failed. Please try again");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-80 flex flex-col gap-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200 items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black">Sign Up</h1>
          <p className="text-gray-font text-sm">
            Start your second brain today
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Input placeholder="Email" ref={usernameRef} />
          <Input placeholder="Password" type="password" ref={passwordRef} />
        </div>

        <div className="flex w-full justify-center ">
          <Button
            variant="primary"
            title="Sign up"
            size="md"
            loading={isLoading}
            onClick={() => {
              signup();
            }}
          />
        </div>

        <div className="text-xs text-center text-gray-font">
          Joined already?{" "}
          <span
            className="text-purple-dark cursor-pointer font-medium"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
