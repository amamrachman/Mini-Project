"use client";

import { useAuthProvider } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const { is_login, logout } = useAuthProvider();

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Daftar Tugasku
        </h1>
        {!is_login && (
          <p className="text-gray-500 text-sm mt-1 hidden sm:block">
            Kelola tugas harian Anda dengan mudah
          </p>
        )}
      </div>

      <div className="flex flex-col items-center sm:items-end gap-2">
        {is_login ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors duration-200"
          >
            Logout
          </button>
        ) : (
          <>
            <p className="text-gray-600 text-sm text-center sm:text-right">
              Login untuk melihat laporan todo
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/auth/register"
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition"
              >
                Daftar
              </Link>
              <Link
                href="/auth/login"
                className="inline-block px-5 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 font-medium shadow-sm hover:shadow"
              >
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
