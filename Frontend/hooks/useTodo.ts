"use client";

import React, { useEffect, useState } from "react";
import { Todo } from "../types/Todo";
import { useLocalStorage } from "./useLocalStorage";
import { useAuthProvider } from "@/context/AuthContext";
import { createTodoApi, deleteTodoApi, getTodosApi, updateTodoApi } from "@/lib/api";

const useTodo = () => {
  const { is_login } = useAuthProvider();
  const [serverTodos, setServerTodos] = useState<Todo[]>([]);
  const [guestTodos, setGuestTodos] = useLocalStorage<Todo[]>("guestTodos", []);

  const [inputJudul, setInputJudul] = useState("");
  const [editTodoId, setEditTodoId] = useState<string | null>(null);

  useEffect(() => {
    if (is_login) {
      getTodosApi()
      .then(setServerTodos)
      .catch((error) => console.log("Gagal Mendapatkan Todo: ", error))
    }
  }, [is_login]);

  const todos = is_login ? serverTodos : guestTodos;

  const handleChangeInputJudul = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputJudul(e.target.value);
  };

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputJudul.trim()) return;

    if (is_login) {
      try {
        const newTodo = await createTodoApi(inputJudul);
        setServerTodos((prev) => [...prev, newTodo]);
      } catch (error) {
        alert("Gagal Menyimpan Todo");
        console.log(error);
      }
    } else {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        judul: inputJudul,
        complete: false,
        create_at: new Date(),
      };
      setGuestTodos((prev) => [...prev, newTodo]);
    }

    setInputJudul("");
  };

  const handleSaveEdit = async (id: string, newJudul: string) => {
    if (is_login) {
      try {
        console.log("Mengirim update ke server...");
      const updated = await updateTodoApi(id, { judul: newJudul });
      console.log("Update sukses:", updated);
      setServerTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
      } catch (error) {
        console.error("Update GAGAL:", error);
      alert("Gagal mengupdate todo");
      }
    }else{
    setGuestTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, judul: newJudul } : t,
      ),
    );
    }
    setEditTodoId(null);
  };

  const handleDeleteTodo = async (id: string) => {
    if (is_login) {
      try {
        await deleteTodoApi(id);
        setServerTodos((prev) => prev.filter((t) => t.id !== id));
      } catch (error) {
        alert("Gagal Menghapus Todo");
        console.log(error);
      }
    }else{
      setGuestTodos((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleChangeStatusTodo = async (id: string) => {
    const current = todos.find((t) => t.id === id);
    if (!current) {
      return;
    }

    const newStatus = !current.complete;

    if (is_login) {
      try {
        const update = await updateTodoApi(id, {complete: newStatus});
        setServerTodos((prev) => prev.map((t) => (t.id === id ? update : t)));
      } catch (error) {
        alert("Gagal Merubah Status Todo");
        console.log(error);
      }
    }else{
      setGuestTodos((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, complete: newStatus } : t,
        ),
      );
    }
  };

  const handleEditTodo = (id: string) => {
    setEditTodoId(id);
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
