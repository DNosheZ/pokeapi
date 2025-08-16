"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { setToken, fakeJwt, getToken } from "@/utils/authClient";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; 


export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      setToken(fakeJwt(data.username), "local");
      router.push("/auth/catalog");
      router.refresh();
    }
  });

  return (
    < >
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="shadow-input mx-auto w-full max-w-md rounded-lg bg-[var(--purple-4)] p-4 md:rounded-2xl md:p-8 h-[calc(100vh-7rem)] flex justify-center items-center m-8">
        <form onSubmit={onSubmit}>
          {error && (
            <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">{error}</p>
          )}

          <h1 className="font-bold text-4xl mb-4 text-[var(--green-3)]">Log In</h1>
          <div>
            <label htmlFor="username" className="mb-2 block text-[var(--green-3)]">
              Username:
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              {...register("username", {
                required: { value: true, message: "Username is required" },
              })}
              className="p-3 rounded block mb-2 bg-[var(--purple-4)] border border-[var(--green-3)] w-full"
            />
            {errors.username && (
              <span className="text-[var(--grey-2)] text-sm">
                {String(errors.username.message)}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-[var(--green-3)]">
              Password:
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}     
                autoComplete="current-password"
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                })}
                className="p-3 pr-11 rounded block mb-2 bg-[var(--purple-4)] border border-[var(--green-3)] w-full"
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded
                           text-[var(--grey-1)] hover:opacity-80 focus:outline-none"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            {errors.password && (
              <span className="text-[var(--grey-2)] text-sm">
                {String(errors.password.message)}
              </span>
            )}
          </div>

          <button
            className="w-full rounded-lg text-white bg-[var(--green-3)] p-3 mt-2"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>

      <Footer />
    </div>
      
    </>
  );
}
