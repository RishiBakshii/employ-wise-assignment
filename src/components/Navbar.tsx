import { useCallback } from "react";

export const Navbar = () => {

  const handleLogoutClick = useCallback(() => {
    localStorage.removeItem("token");
    window.location.reload();
  }, []);

  return (
    <nav className="bg-indigo-500 p-4 text-white flex justify-between items-center h-16">
      <h1 className="text-2xl font-bold">Demo App</h1>

      <button onClick={handleLogoutClick} className="text-lg cursor-pointer">
        Logout
      </button>
    </nav>
  );
};
