import { LoginForm } from "../components/Login/LoginForm"

export const LoginPage = () => {
  return (
    <div className="bg-white p-4 self-center rounded-lg px-2">
      <h1 className="text-3xl text-black text-bold mb-10">Login</h1>
      <LoginForm/>
    </div>
  )
}
