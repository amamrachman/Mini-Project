export type Todo = {
  id: string;
  judul: string;
  complete: boolean;
  create_at: Date;
};

export type ApiTodo = {
  id: number;
  judul: string;
  is_completed: boolean;
  created_at: string;
};

export type ApiTodoReport = {
  daily: {
    date: string;
    total: number;
    completed: number;
  }[];

  weekly: {
    week: number;
    total: number;
    completed: number;
    label: string;
  }[];

  yearly: {
    year: number;
    total: number;
    completed: number;
  }[];
};
