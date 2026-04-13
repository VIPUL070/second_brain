import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          <Input placeholder="Email" onChange={() => {setUsername(username)}}/>
          <Input placeholder="Password" onChange={() => {setPassword(password)}}/>
        </div>

        <div className="flex w-full justify-center ">
          <Button variant="primary" title="Sign up" size="md" />
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
