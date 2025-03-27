import { Outlet } from "react-router";

export const NonAuthLayout = () => {
  return (
    <div className="bg-black text-white w-screen h-screen flex">
      <div className="bg-indigo-600 flex-1 max-xl:hidden flex justify-center items-center flex-col gap-4">
        <h1 className="text-4xl font-bold">Welcome to Demo App</h1>
        <h4 className="text-3xl font-bold">Login Please</h4>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};
