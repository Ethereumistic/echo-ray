"use client";
import { useEffect, useState } from "react";
import { account, ID } from "@/app/appwrite";
import { AppwriteUser } from "@/app/types/appwrite";
import { Label } from "@/app/components/auth/label";
import { Input } from "@/app/components/auth/input";
import { cn } from "@/lib/utils";

const LoginPage = () => {
  const [loggedInUser, setLoggedInUser] = useState<AppwriteUser | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const login = async (email: string, password: string) => {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      setLoggedInUser(await account.get() as AppwriteUser);
      setError("");
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "An error occurred during login. Please try again.");
    }
  };


  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get(); // Fetch the current user
        setLoggedInUser(user as AppwriteUser); // Set the logged-in user
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser(); // Call the function to fetch user on component mount
  }, []); // Empty dependency array to run only on mount

  if (loggedInUser) {
    return (
    <div className="fixed top-20 left-0  ">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome, {loggedInUser.name}!
        </h2>
        <button
          className="mt-4 bg-gradient-to-br relative group/btn from-black dark:from-zinc-400 dark:to-zinc-500 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          onClick={logout}
        >
          Logout &rarr;
          <BottomGradient />
        </button>
      </div>
      </div>
    );
  }

  return (
    <div className="mt-32  ">
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to EchoRay
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login or create your account
      </p>

      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}

      <form className="my-8">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
        </LabelInputContainer>


        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => login(email, password)}
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            Login &rarr;
            <BottomGradient />
          </button>
   
        </div>
      </form>
    </div>
    </div>
  );
};

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

export default LoginPage;