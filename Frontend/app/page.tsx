import Header from "@/components/Header";
import TodoApp from "../components/TodoApp";

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 border-b">
            <Header />
          </div>

          <div className="p-6 md:p-8">
            <TodoApp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
