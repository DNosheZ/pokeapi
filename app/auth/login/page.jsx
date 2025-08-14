"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import {useRouter} from 'next/navigation'
import {useState} from 'react'
import Header from '@/components/Header';
import Footer from '@/components/Footer';


export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const router = useRouter()
    const [error, setError] = useState(null)
    
    const onSubmit = handleSubmit(async (data) => {
        console.log(data);

        const res = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
        });

        console.log(res)
        if (res.error) {
        setError(res.error)
        } else {
        router.push('/dashboard')
        router.refresh()
        }
    });
  return (
    <>
    <Header />
    <div className="shadow-input mx-auto w-full max-w-md rounded-lg bg-[var(--purple-4)] p-4 md:rounded-2xl md:p-8 h-[calc(100vh-7rem)] flex justify-center items-center m-8">
        <form action=""  onSubmit={onSubmit}>
            {error && (
            <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">{error}</p>
            )}
        <h1 className=" font-bold text-4xl mb-4 text-[var(--green-3)]">Log In</h1>
            <div>
                <label htmlFor="username"
                className=" mb-2 block text-[var(--green-3)]">Username:</label>
                <input type="text" 
                {...register("username", 
                                { required: {
                                    value: true,
                                    message: "Username is required"
                                    } 
                                }
                            ) 
                }
                className="p-3 rounded block mb-2 bg-[var(--purple-4)] border border-[var(--green-3)] w-full"
                />

                {
                    errors.username && (
                    <span className="text-[var(--grey-2)] text-sm">{errors.username.message}</span>
        )
                }
            </div>
            <div>
                <label htmlFor="password"
                className="mb-2 block text-[var(--green-3)]">Password:</label>
                <input type="password" 
                {...register("password", 
                            { required: {
                                        value: true,
                                        message: "Password is required"
                                        } 
                            }
                            )
                } 
                className="p-3 rounded block mb-2 bg-[var(--purple-4)] border border-[var(--green-3)] w-full"/>
                {errors.password && <span className="text-[var(--grey-2)] text-sm">{errors.password.message}</span>}
            </div>
            <button className="w-full rounded-lg text-white bg-[var(--green-3)] p-3 mt-2"
                type="submit">Login</button>
        </form>
    </div>
    
    <Footer />
    </>
  )
}
