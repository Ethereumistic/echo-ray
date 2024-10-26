"use client";
import React, { useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { account } from "@/app/appwrite";
import { AppwriteUser } from '@/app/types/appwrite';

export function LoginForm({ onLogin }: { onLogin: (user: AppwriteUser) => void }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        try {
            const session = await account.createSession(email, password);
            const user = await account.get();
            onLogin(user as AppwriteUser);
        } catch (error: any) {
            console.error("Login error:", error);
            setError(error.message || "An error occurred during login. Please try again.");
        }
    };

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Welcome back to EchoRay
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                Login to your EchoRay account
            </p>

            {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

            <form className="my-8" onSubmit={handleLogin}>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        placeholder="you@example.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        placeholder="••••••••"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </LabelInputContainer>

                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    Login &rarr;
                    <BottomGradient />
                </button>
            </form>
        </div>
    );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-green to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-green to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};