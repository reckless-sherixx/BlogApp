import { SignupInput } from "@sherixx/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";
import axios from "axios";


export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setpostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",
    })
    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            const name = postInputs.name;
            localStorage.setItem("token", jwt);
            localStorage.setItem("name",String(name));
            navigate("/blogs")
        }catch(e){
           alert("Error while signing up")
        }
        
    }
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-bold">
                            Create an account
                        </div>
                        <div className="text-slate-500">
                            { type === "signin" ? "Dont have an account" : "Already have an account ?" }
                            <Link to={type === "signin" ?"/signup":"/signin"} className="pl-2 underline">{type==="signin" ? "Sign up" : "Sign in"}</Link>
                        </div>
                    </div>
                    <div className="pt-4">
                        {type==="signup" ? <LabelledInput label="Name" placeholder="Vidyansh Singh" onChange={(e) => {
                            setpostInputs({ ...postInputs, name: e.target.value })
                        }} /> : null}
                        <LabelledInput label="Username" placeholder="vidyansh@gmail.com" onChange={(e) => {
                            setpostInputs({ ...postInputs, email: e.target.value })
                        }} />
                        <LabelledInput label="Password" type={"password"} placeholder="12345" onChange={(e) => {
                            setpostInputs({ ...postInputs, password: e.target.value })
                        }} />
                    </div>
                    <div className="pt-8">
                <button onClick={sendRequest} type="button" className= "w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm font-bold text-black pt-2">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}


