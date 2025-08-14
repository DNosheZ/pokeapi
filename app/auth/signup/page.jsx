'use client'
import {useForm} from 'react-hook-form';
import { useRouter } from "next/navigation";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
function SignUpPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        if (data.password !== data.confirmPassword) {
        return alert("Passwords do not match");
        }

        const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
            username: data.username,
            firstname: data.firstname,
            email: data.email,
            password: data.password,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        });

        if (res.ok) {
        router.push("/auth/login");
        }
    });

    console.log(errors);
    
    return (
        <>
        <Header/>
        <div className="shadow-input mx-auto w-full max-w-md rounded-lg bg-[var(--purple-4)] p-4 md:rounded-2xl md:p-8 h-[calc(100vh-7rem)] flex justify-center items-center m-8">
            <form onSubmit={onSubmit} >
            <h1 className=" font-bold text-4xl mb-4 text-[var(--green-3)]">Sign Up</h1>
                <div>
                    <label htmlFor="username"
                    className=" mb-2 block text-[var(--green-3)]">Username:</label>
                    <input
                    type="text"
                    {...register("username", {
                        required: {
                        value: true,
                        message: "Username is required",
                        },
                    })}
                    className="p-3 rounded block mb-2 bg-[var(--purple-4)] border border-[var(--green-3)] w-full"
                    placeholder="yourUser123"
                    />

                    {errors.username && (
                    <span className="text-red-500 text-xs">
                        {errors.username.message}
                    </span>
                    )}
                </div>
                <div>
                    <label htmlFor="username"
                    className=" mb-2 block text-[var(--green-3)]">First:</label>
                    <input
                    type="text"
                    {...register("firstname", {
                        required: {
                        value: true,
                        message: "First name is required",
                        },
                    })}
                    className="p-3 rounded block mb-2 bg-[var(--purple-4)] border border-[var(--green-3)] w-full"
                    placeholder="Ruben Blades"
                    />

                    {errors.firstname && (
                    <span className="text-red-500 text-xs">
                        {errors.firstname.message}
                    </span>
                    )}
                </div>
                <div>
                    <label htmlFor="email"
                    className="mb-2 block text-[var(--green-3)]">Email:</label>
                    <input
                    type="email"
                    {...register("email", {
                        required: {
                        value: true,
                        message: "Email is required",
                        },
                    })}
                    className="p-3 rounded block mb-2 bg-[var(--purple-4)] border border-[var(--green-3)] w-full"
                    placeholder="user@email.com"
                    />
                    {errors.email && (
                    <span className="text-red-500 text-xs">{errors.email.message}</span>
                    )}
                </div>
                <div>
                    <label htmlFor="password"
                    className="mb-2 block text-[var(--green-3)]">Password:</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: {
                            value: true,
                            message: "Password is required",
                            },
                        })}
                        className="p-3 rounded block mb-2 bg-[var(--purple-4)] border border-[var(--green-3)] w-full"
                        placeholder="********"
                        />
                        {errors.password && (
                        <span className="text-red-500 text-sm">
                            {errors.password.message}
                        </span>
                        )}
                </div>
                <div>
                    <label htmlFor="confirmPassword"
                    className="mb-2 block text-[var(--green-3)]">Confirm Password:</label>
                    <input
                        type="password"
                        {...register("confirmPassword", {
                            required: {
                            value: true,
                            message: "Confirm Password is required",
                            },
                        })}
                        className="p-3 rounded block mb-2 bg-[var(--purple-4)] border border-[var(--green-3)] w-full"
                        placeholder="********"
                        />
                        {errors.confirmPassword && (
                        <span className="text-red-500 text-sm">
                            {errors.confirmPassword.message}
                        </span>
                        )}
                </div>
                <button className="w-full rounded-lg text-white bg-[var(--green-3)] p-3 mt-2"
                 type="submit">Sign Up</button>
            </form>
        </div>
        <Footer/>
        </>
    );
}


export default SignUpPage;
