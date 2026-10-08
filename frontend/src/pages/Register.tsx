import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isVisible, setIsVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            await api.post("/auth/register", {
                firstName,
                lastName,
                email,
                password,
            });

            setSuccess("Account created successfully!");

            // Give the user a moment to see the success message
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error: any) {
            console.error("Registration failed:", error);

            if (error.response?.data) {
                setError(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : "Unable to create account."
                );
            } else {
                setError("Unable to connect to the server.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-blue-700">
                        Create Account
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Create your collector account to get started.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* Success */}
                {success && (
                    <div className="mb-6 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* First Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-2 inline-block text-sm font-medium text-slate-900"
                        >
                            First Name
                        </label>

                        <input
                            id="fname"
                            name="fname"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Jane"
                            required
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label
                            htmlFor="lname"
                            className="mb-2 inline-block text-sm font-medium text-slate-900"
                        >
                            Last Name
                        </label>

                        <input
                            id="lname"
                            name="lname"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Doe"
                            required
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 inline-block text-sm font-medium text-slate-900"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="collector@example.com"
                            required
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 inline-block text-sm font-medium text-slate-900"
                        >
                            Password
                        </label>

                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={isVisible ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="........."
                                required
                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 pr-12 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                            />

                            <button
                                type="button"
                                onClick={() => setIsVisible((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                            >
                                {isVisible ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 inline-block text-sm font-medium text-slate-900"
                        >
                            Confirm Password
                        </label>

                        <div className="relative">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={isConfirmVisible ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="........"
                                required
                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 pr-12 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setIsConfirmVisible((prev) => !prev)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                            >
                                {isConfirmVisible ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md border border-blue-700 bg-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </form>

                {/* Login */}
                <div className="mt-6 text-center text-sm text-slate-900">
                    Already have an account?

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="ml-1 font-medium text-blue-700 hover:underline"
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Register;

