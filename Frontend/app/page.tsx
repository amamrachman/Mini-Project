import React from "react";
import TodoApp from "../components/TodoApp";

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 border-b">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                  Daftar Tugasku
                </h1>
                <p className="text-gray-500 text-sm mt-1 hidden sm:block">
                  Kelola tugas harian Anda dengan mudah
                </p>
              </div>

              <div className="flex flex-col items-center sm:items-end gap-2">
                <p className="text-gray-600 text-sm text-center sm:text-right">
                  Login untuk melihat laporan todo
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="/register"
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition"
                  >
                    Daftar
                  </a>
                  <a
                    href="/login"
                    className="inline-block px-5 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 font-medium shadow-sm hover:shadow"
                  >
                    Login
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <TodoApp />
          </div>

          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
            <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
              <p>
                Total tugas: <span className="font-medium">0</span>
              </p>
              <p className="mt-1 sm:mt-0">
                <span className="hidden sm:inline">•</span>
                <span className="mx-2">Sinkronisasi otomatis saat login</span>
                <span className="hidden sm:inline">•</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
