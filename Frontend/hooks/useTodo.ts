"use client";

import React, { useState } from "react";
import { Todo } from "../types/Todo";
import { useLocalStorage } from "./useLocalStorage";

const useTodo = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [inputJudul, setInputJudul] = useState("");
  const [editTodoId, setEditTodoId] = useState<string | null>(null);

  const handleChangeInputJudul = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputJudul(e.target.value);
  };

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      judul: inputJudul,
      complete: false,
      create_at: new Date(),
    };

    setTodos((prev) => [...prev, newTodo]);
    setInputJudul("");
  };

  const handleSaveEdit = (id: string, newJudul: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, judul: newJudul } : todo,
      ),
    );
    setEditTodoId(null);
    return;
  };

  const handleEditTodo = (id: string) => {
    setEditTodoId(id);
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleChangeStatusTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo,
      ),
    );
  };

  return {
    todos,
    inputJudul,
    editTodoId,
    handleAddTodo,
    handleEditTodo,
    handleDeleteTodo,
    handleChangeStatusTodo,
    handleChangeInputJudul,
    handleSaveEdit,
  };
};

export default useTodo;
