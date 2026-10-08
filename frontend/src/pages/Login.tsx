import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginPic from "../assets/login-pic.jpg";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const toggleVisibility = () => {
        setIsVisible((prev) => !prev);
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();


        setError("");
        setLoading(true);

        try {
            await login(email, password);

            // Login successful
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);

            setError("Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="md:min-h-screen flex items-center justify-center py-4 px-4 md:px-8">
            <div className="w-full max-w-5xl bg-white [box-shadow:0_2px_10px_-3px_rgba(14,14,14,0.3)] rounded-2xl overflow-hidden">
                <div className="grid items-center w-full gap-4 md:grid-cols-2">

                    {/* Login Image */}
                    <div className="md:aspect-[8/10] bg-gray-50 relative before:absolute before:inset-0 before:bg-black/40 overflow-hidden w-full h-full">

                        <img
                            src={LoginPic}
                            className="w-full h-full object-cover"
                            alt="Login"
                        />

                        <div className="absolute inset-0 flex items-end justify-center">
                            <div className="w-full bg-gradient-to-t from-black/50 via-black/50 to-transparent absolute bottom-0 p-6 max-md:hidden">

                                <h2 className="text-white text-3xl font-semibold">
                                    Less chasing. More collecting
                                </h2>

                                <p className="text-white text-base font-medium mt-4 leading-relaxed">
                                    Stay organized, manage your collection queue,
                                    and keep every follow-up on track - all in one place.
                                </p>

                            </div>
                        </div>
                    </div>

                    {/* Login Form */}
                    <div className="py-6 px-6 lg:px-8 max-md:-order-1">
                        <div className="max-w-md mx-auto w-full">

                            <h1 className="text-blue-700 text-5xl text-center font-bold mb-8">
                                Welcome Back!
                            </h1>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-6 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                                    {error}
                                </div>
                            )}

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 text-slate-900 font-medium text-sm inline-block"
                                    >
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                        id="email"
                                        name="email"
                                        placeholder="johnmark@kpmg.com"
                                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="mb-2 text-slate-900 font-medium text-sm inline-block"
                                    >
                                        Password
                                    </label>

                                    <div className="relative">

                                        <input
                                            type={
                                                isVisible
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            required
                                            id="password"
                                            name="password"
                                            placeholder="••••••••"
                                            className="px-3 py-2.5 pr-10 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                                        />
                                            <button
                                                type="button"
                                                id="togglePassword"
                                                onClick={toggleVisibility}
                                                aria-label={isVisible ? "Hide password" : "Show password"}
                                                aria-pressed={isVisible}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 flex cursor-pointer rounded p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                                            >
                                                {isVisible ? (
                                                    <EyeSlashIcon className="h-5 w-5 text-slate-400" />
                                                ) : (
                                                    <EyeIcon className="h-5 w-5 text-slate-400" />
                                                )}
                                            </button>
                                    </div>
                                </div>

                                {/* Remember Me / Forgot Password */}
                                <div className="flex items-start flex-wrap gap-2">

                                    <label className="flex items-center group has-[input:checked]:text-slate-900">

                                        <input
                                            id="remember"
                                            name="remember"
                                            type="checkbox"
                                            className="sr-only"
                                        />

                                        <span
                                            className="flex h-4 w-4 shrink-0 items-center justify-center rounded outline-1 outline-slate-300 bg-white group-has-[input:checked]:bg-blue-600 group-has-[input:checked]:outline-blue-600 group-focus-within:outline-2 group-focus-within:outline-blue-600"
                                            aria-hidden="true"
                                        >
                                            <svg
                                                className="size-3 text-white opacity-0 group-has-[input:checked]:opacity-100"
                                                viewBox="0 0 12 10"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M1 5l3 3 7-7" />
                                            </svg>
                                        </span>

                                        <span className="ml-3 text-sm text-slate-700">
                                            Remember me
                                        </span>

                                    </label>

                                    <button
                                        type="button"
                                        className="ml-auto text-sm font-medium text-blue-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                                    >
                                        Forgot password?
                                    </button>

                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer text-white border border-blue-700 bg-blue-700 hover:bg-blue-800 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Signing in..." : "Sign in"}
                                </button>

                            </form>

                            {/* Sign Up */}
                            <div className="mt-6 text-slate-900 text-sm text-center">

                                Don't have an account?

                                <button
                                    type="button"
                                    onClick={() => navigate("/register")}
                                    className="ml-1 font-medium text-blue-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                                >
                                    Sign up
                                </button>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default Login;


