'use client';
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import AbstractNetwork from "../components/svglogo";

interface SignupFormData {
    name: string;
    email: string;
    password: string;
}

export default function Signup() {

    const [formData, setformData] = useState<SignupFormData>({
        name: "",
        email: "",
        password: ""
    });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await toast.promise(
                axios.post("http://localhost:8000/api/signup", formData, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }),

                {
                    pending: "Signing up...",
                    success: "Signup successful",

                }
            );
            console.log("hey1");

        } catch (error:any) {
            if (error.response && error.response.data.message === 'User with this email already exists.') {
                toast.error("User already exists.");
                router.push("/");
            } else {
                toast.error("Signup failed, Please try agannin");
            }
            console.log("hey2");
            console.log(error);

        }

    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <AbstractNetwork />
                    <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign up for your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="POST" onSubmit={handleSignup} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    autoComplete=""
                                    onChange={handleChange}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline  -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    onChange={handleChange}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline  -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                value="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <div className="flex flex-col items-center mt-10 space-y-4">
                        <button className="flex items-center space-x-2 rounded-md cursor-pointer p-2  focus:outline focus:-outline-offset-2 focus:outline-indigo-600 " >
                            <img className="h-8" src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google Icon" />
                            <p className="text-sm/6 font-medium">Login with Google</p>
                        </button>
                    </div>
                </div>
            </div>
        </>

    )




}