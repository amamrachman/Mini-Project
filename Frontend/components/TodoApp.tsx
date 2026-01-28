"use client";

import useTodo from "../hooks/useTodo";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

const TodoApp = () => {
  const {
    editTodoId,
    handleAddTodo,
    handleChangeInputJudul,
    handleChangeStatusTodo,
    handleDeleteTodo,
    handleEditTodo,
    handleSaveEdit,
    inputJudul,
    todos
  } = useTodo();
  return (
    <div>
      <TodoForm
        onAdd={handleAddTodo}
        handleInputJudul={handleChangeInputJudul}
        inputJudul={inputJudul}
      />
      <TodoList
        editTodoId={editTodoId}
        toggleStatus={handleChangeStatusTodo}
        onDelete={handleDeleteTodo}
        handleEditTodo={handleEditTodo}
        onSaveEdit={handleSaveEdit}
        todos={todos}
      />
    </div>
  );
};

export default TodoApp;
