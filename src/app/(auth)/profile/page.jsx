"use client";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import { useUser } from "../../../app/api/useUser";
import { Input } from "../../../components/Input";

export default function ProfilePage() {
    const { user, loading, error, fetchUser, userRole, balance } = useUserStore();

  // const { user, isLoading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No user found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf0] flex flex-col">
      {/* Header */}
      <div className="bg-foreground px-4 pt-4 pb-2">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center bg-[#fffaf0] text-foreground font-bold rounded-xl px-4 text-lg mb-4"
          >
            <span className="mr-2">&#8592;</span> Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-2 py-6">
        <h1 className="text-3xl font-bold text-foreground mb-8 text-center">
          Profile
        </h1>
        <form className="w-full max-w-xl flex flex-col gap-4">
          {/* Username */}
          <div>
            <label className="block text-foreground font-bold mb-1 text-lg">
              Username
            </label>
            <Input
              type="text"
              defaultValue={user.username}
              className="bg-[#fffaf0] border-2 border-foreground text-lg rounded-xl px-4 py-3 w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-foreground font-bold mb-1 text-lg">
              Email
            </label>
            <Input
              type="email"
              defaultValue={user.email}
              className="bg-[#fffaf0] border-2 border-foreground text-lg rounded-xl px-4 py-3 w-full"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-foreground font-bold mb-1 text-lg">
              Password
            </label>
            <Input
              type="password"
              defaultValue=""
              placeholder="Enter new password"
              className="bg-[#fffaf0] border-2 border-foreground text-lg rounded-xl px-4 py-3 w-full"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-foreground font-bold mb-1 text-lg">
              Confirm Password
            </label>
            <Input
              type="password"
              defaultValue=""
              placeholder="Confirm new password"
              className="bg-[#fffaf0] border-2 border-foreground text-lg rounded-xl px-4 py-3 w-full"
            />
          </div>

          <button
            type="submit"
            className="mt-6 bg-foreground text-white font-bold text-xl rounded-xl py-4 w-full hover:opacity-90"
          >
            Save Changes
          </button>
        </form>
      </main>

      <footer className="bg-foreground text-white px-6 py-8 flex flex-col gap-2 items-start">
        <h2 className="text-2xl font-bold mb-2">Communal Shop</h2>
        <div className="flex items-center gap-4 mb-2">
          <a href="#" aria-label="Facebook">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="16" fill="#fff" />
              <circle cx="16" cy="16" r="14" fill="#1877F3" />
              <path
                d="M21.333 16H17.333V26.667H13.333V16H10.667V12.667H13.333V10.667C13.333 8.453 14.786 6.667 17.333 6.667H21.333V10.667H18.667C18.299 10.667 18 10.966 18 11.333V12.667H21.333V16Z"
                fill="white"
              />
            </svg>
          </a>
          <a href="#" aria-label="Instagram">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="16" fill="#fff" />
              <circle cx="16" cy="16" r="14" fill="url(#ig-gradient)" />
              <defs>
                <radialGradient
                  id="ig-gradient"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="translate(16 16) scale(14)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#feda75" />
                  <stop offset="0.5" stopColor="#fa7e1e" />
                  <stop offset="1" stopColor="#d62976" />
                </radialGradient>
              </defs>
              <circle cx="16" cy="16" r="6" fill="#fff" />
              <circle cx="16" cy="16" r="4" fill="#d62976" />
              <circle cx="22.5" cy="9.5" r="1.5" fill="#fff" />
            </svg>
          </a>
          <a href="#" aria-label="X">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="16" fill="#fff" />
              <circle cx="16" cy="16" r="14" fill="#000" />
              <path
                d="M20.5 11.5L11.5 20.5M11.5 11.5L20.5 20.5"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </div>
        <div className="mb-2">
          <span className="font-semibold">Email :</span>
          <span className="ml-2">customer@communlshop.com</span>
        </div>
        <div className="w-full flex justify-end">
          <Link
            href="/faq"
            className="underline text-white text-lg font-semibold"
          >
            FAQ
          </Link>
        </div>
      </footer>
    </div>
  );
}
