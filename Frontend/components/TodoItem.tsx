import React, { useState } from "react";
import { Todo } from "../types/Todo";

type TodoItemProps = {
  item: Todo;
  editTodoId: string | null;
  handleEditTodo: (id: string) => void;
  onDelete: (id: string) => void;
  onSaveEdit: (NewJudul: string) => void;
  toggleStatus: (id: string) => void;
};

const TodoItem = ({
  editTodoId,
  handleEditTodo,
  item,
  onDelete,
  onSaveEdit,
  toggleStatus,
}: TodoItemProps) => {
  const [tempJudul, setTempJudul] = useState(editTodoId === item.id ? item.judul : "");

  const handleTempJudul = () => {
    onSaveEdit(tempJudul);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 border-blue-500">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {editTodoId === item.id ? (
            <form onSubmit={handleTempJudul} className="flex space-x-2">
              <label className="flex-1">
                <span className="text-sm text-gray-600">
                  Edit Judul {item.judul}
                </span>
                <input
                  type="text"
                  value={tempJudul}
                  onChange={(e) => setTempJudul(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                />
              </label>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors duration-200"
              >
                Edit
              </button>
            </form>
          ) : (
            <h3
              className={`text-lg font-semibold ${item.complete ? "line-through text-gray-500" : "text-gray-800"}`}
            >
              {item.judul}
            </h3>
          )}
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onDelete(item.id)}
            className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors duration-200"
          >
            Delete
          </button>
          <button
            onClick={() => handleEditTodo(item.id)}
            className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600 transition-colors duration-200"
          >
            Edit
          </button>
          <button
            onClick={() => toggleStatus(item.id)}
            className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
              item.complete
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            {item.complete ? "✅ Selesai" : "⬜ Belum"}
          </button>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        Dibuat pada: {item.create_at.toLocaleString()}
      </div>
    </div>
  );
};

export default TodoItem;
