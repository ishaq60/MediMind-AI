"use client";

import { Eye, EyeOff, Heart, Lock, Mail } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { data: session, status } = useSession();

  // When session is ready (user logged in), send user data to your backend
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const formdata = {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        createTime:session.expires
      };

      const sendUserData = async () => {
        try {
          const resp = await fetch("http://localhost:3000/signup/new-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata),
          });

          if (!resp.ok) throw new Error("Failed to save user");

          const result = await resp.json();
          console.log("Server response:", result);
        } catch (error) {
          console.error("Error during signup:", error);
          toast.error("Signup failed!");
        }
      };

      sendUserData();
      // Redirect after sending user data
      router.push(callbackUrl);
    }
  }, [status, session, router, callbackUrl]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      // Successful login will trigger useEffect to send data & redirect
    } else {
      setError(res?.error || "Invalid email or password");
      toast.error(res?.error || "Invalid email or password");
    }
  };

  if (status === "loading") return <p>Loading...</p>;

  // Show login form if no active session
  if (status === "authenticated") return <p>Logging you in...</p>;


  return (
    <div className="max-w-7xl mx-auto min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your AI Medical Assistant account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <p className="text-red-600 text-center font-medium">{error}</p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <button className="text-sm text-blue-600 hover:text-blue-500" type="button">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105 font-medium"
          >
            Sign In
          </button>
        </form>

        {/* Social Login UI */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
    <button
  onClick={() => signIn("google", { callbackUrl })}
  className="flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
>
  <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
  <span>Continue with Google</span>
</button>


          <button onClick={()=>signIn("github",{callbackUrl})} className="flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
            <img src="/github-icon.svg" alt="GitHub" className="w-5 h-5" />
            <span>Continue with GitHub</span>
          </button>
        </div>

        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link href={"/signup"}>
              <button className="text-blue-600 hover:text-blue-500 font-medium">
                Sign up here
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
