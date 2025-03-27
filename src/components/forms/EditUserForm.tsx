import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios/config";
import { selectUserDetailsForForm, setIsEditFormOpen, setUserDetailsForForm } from "../../lib/redux/slices/uiSlice";
import { updateUserById } from "../../lib/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../lib/redux/store/hooks";
import {
  editProfileSchema,
  editProfileSchemaType,
} from "../../lib/zod/schemas/user.schema";
import { UpdateUserResponse, User } from "../../types/user.types";
import { SpinLoader } from "../ui/SpinLoader";

export const EditUserForm = () => {
  const userDetails = useAppSelector(selectUserDetailsForForm);
  const dispatch = useAppDispatch();
  const [loading,setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<editProfileSchemaType>({
    resolver: zodResolver(editProfileSchema),
  });

  const onSubmit = useCallback(
    async ({ email, firstName, lastName }: editProfileSchemaType) => {

      try {
        setLoading(true);
        if(userDetails){
          const payload:Partial<editProfileSchemaType> = {};
          let hasDataChanged:boolean = false;
          if(email!==userDetails.email){
            payload.email = email;
            hasDataChanged=true;
          }
          if(firstName!==userDetails.first_name){
            payload.firstName = firstName;
            hasDataChanged=true;
          }
          if(lastName!==userDetails.last_name){
            payload.lastName = lastName;
            hasDataChanged=true;
          }
  
          if(!hasDataChanged){
            toast.error("No feilds are changed");
            return;
          }
          const response =  await axiosInstance.put(`/users/${userDetails?.id}`,payload);
          if(response.status===200){
            toast.success("User data has been updated successfully")
            const data = response.data as UpdateUserResponse;
            const updatedUser:User = {
              email:data.email || userDetails.email,
              first_name:data.firstName || userDetails.first_name,
              last_name:data.lastName || userDetails.last_name,
              id:userDetails.id,
              avatar:userDetails.avatar
            }
            dispatch(updateUserById(updatedUser));
            console.log(response);
          }
          else{
            toast.error("Something went wrong while updating the user data")
          }
          dispatch(setUserDetailsForForm(null));
          dispatch(setIsEditFormOpen(false));
        }
      } catch (error) {
        console.log('Some error occured while updating the user data',error);
        toast.error("Some error occured while updating the user data")
      }
      finally{
        setLoading(false);
      }
    },
    [dispatch, userDetails]
  );


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <input
          type="text"
          className="px-4 py-4 text-black rounded-lg w-full outline-none"
          {...register("firstName",{value:userDetails?.first_name})}
          placeholder="First Name"
        />
        {errors.firstName && (
          <p className="text-red-500">{errors.firstName.message}</p>
        )}
      </div>
      <div>
        <input
          type="text"
          className="px-4 py-4 text-black rounded-lg w-full outline-none"
          {...register("lastName",{value:userDetails?.last_name})}
          placeholder="Last Name"
        />
        {errors.lastName && (
          <p className="text-red-500">{errors.lastName.message}</p>
        )}
      </div>
      <div>
        <input
          type="text"
          className="px-4 py-4 text-black rounded-lg w-full outline-none"
          {...register("email",{value:userDetails?.email})}
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <button className="bg-indigo-500 text-white px-8 py-2 rounded-lg flex items-center justify-center">
        {loading?<SpinLoader/>:"Update Profile"}
      </button>
    </form>
  );
};
