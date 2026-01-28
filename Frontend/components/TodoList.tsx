import React from "react";
import { Todo } from "../types/Todo";
import TodoItem from "./TodoItem";

type TodoListProps = {
  editTodoId: string | null;
  toggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  handleEditTodo: (id: string) => void;
  onSaveEdit: (id: string, newJudul: string) => void;
  todos: Todo[];
};

const TodoList = ({
  editTodoId,
  handleEditTodo,
  onDelete,
  onSaveEdit,
  todos,
  toggleStatus,
}: TodoListProps) => {
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          item={todo}
          editTodoId={editTodoId}
          handleEditTodo={handleEditTodo}
          onDelete={onDelete}
          onSaveEdit={(newJudul) => onSaveEdit(todo.id, newJudul)}
          toggleStatus={toggleStatus}
        />
      ))}
    </div>
  );
};

export default TodoList;
