import { ChangeEvent, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { SignupInput } from "@tusharshah/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {

  const navigate=useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  async function sendRequest(){
    try{
      const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"? "signup":"signin"}`,postInputs);
      const jwt=response.data;
      localStorage.setItem("token",jwt);
      navigate("/blogs");
    }catch(e){
      alert("Error while signing up!!")
//       //alert the user that the request has been failed
    }
  } 

  return (
    <>
      <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
          <div>
            {/* {JSON.stringify(postInputs)} */}
            <div className="text-center px-10">
              <div className="text-3xl font-extrabold">Create an account</div>
              <div className="text-slkate-400">
                {type === "signin"
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <Link
                  className="pl-2 underline"
                  to={type === "signin" ? "/signup" : "/signin"}
                >
                  {type === "signin" ? "Sign up" : "Log in"}
                </Link>
              </div>
            </div>
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="Name"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            ) : null}

            <LabelledInput
              label="Username"
              placeholder="sample@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  username: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="password"
              type={"password"}
              placeholder="123456"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />

                <button onClick={sendRequest} type="button" className="mt-8 text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                {type === "signup" ? "Sign up" : "Log in"}
                </button>
          </div>
        </div>
      </div>
    </>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <div>
        <label className="block mt-4 mb-2 text-sm font-semibold text-black">
          {label}
        </label>
        <input
          onChange={onChange}
          type={type || "text"}
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}
