import React from "react";

type TodoFormProps = {
  onAdd: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputJudul: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputJudul: string;
};

const TodoForm = ({ handleInputJudul, inputJudul, onAdd }: TodoFormProps) => {
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={onAdd} className="flex flex-col space-y-4">
        <label className="flex flex-col">
          <span className="text-lg font-semibold text-gray-800 mb-2">
            Masukkan Judul Baru
          </span>
          <input
            value={inputJudul}
            onChange={handleInputJudul}
            type="text"
            className="px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ketik judul todo..."
          />
        </label>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
