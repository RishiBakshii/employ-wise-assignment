import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios/config";
import { setIsAuthenticated } from "../../lib/redux/slices/authSlice";
import { useAppDispatch } from "../../lib/redux/store/hooks";
import type { loginSchemaType } from "../../lib/zod/schemas/auth.schema";
import { loginSchema } from "../../lib/zod/schemas/auth.schema";
import type { LoginResponse } from "../../types/auth.types";
import { SpinLoader } from "../ui/SpinLoader";

export const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const onSubmit = useCallback(async ({ email, password }: loginSchemaType) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/login", {
        email: email.trim(),
        password: password.trim(),
      });
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("token", (response.data as LoginResponse).token);
        toast.success("Welcome back");
        toast.success("Logged in successfully");
        dispatch(setIsAuthenticated(true));
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if(error?.status==400){
        toast.error("Invalid email or password");
      }else{
        console.log("error occured while logging in", error);
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-72 px-2"
    >
      <div>
        <input
          placeholder="Email"
          {...register("email")}
          name="email"
          className="w-full border px-2 py-2 text-lg text-black"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div>
        <input
          placeholder="Password"
          {...register("password")}
          type="password"
          name="password"
          className="w-full border px-2 py-2 text-lg text-black"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className={`w-full ${loading?"bg-indigo-400":"bg-indigo-600"} text-white p-2 rounded flex justify-center`}
      >
        {loading?<SpinLoader/>:"Login"}
      </button>
    </form>
  );
};
