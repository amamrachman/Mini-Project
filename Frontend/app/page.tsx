import React from "react";
import TodoApp from "../components/TodoApp";

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Daftar Tugasku
        </h1>
        <TodoApp />
      </div>
    </div>
  );
};

export default page;
