export type Todo = {
    id: string;
    judul: string;
    complete: boolean;
    create_at: Date;
}

export type ApiTodo = {
    id: number;
    judul: string;
    is_completed: boolean;
    created_at: string;
}