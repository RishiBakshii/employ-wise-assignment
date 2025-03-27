import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios/config";
import { selectUserDetailsForForm, setIsDeleteFormOpen, setUserDetailsForForm } from "../../lib/redux/slices/uiSlice";
import { removeUserById } from "../../lib/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../lib/redux/store/hooks";
import { SpinLoader } from "../ui/SpinLoader";

export const DeleteUserDialog = () => {
  
  const [loading,setLoading] = useState<boolean>(false);

  const userDetails = useAppSelector(selectUserDetailsForForm);
  const dispatch = useAppDispatch();
  
  const handleCancelClick = useCallback(()=>{
    dispatch(setIsDeleteFormOpen(false));
    dispatch(setUserDetailsForForm(null));
  },[dispatch])

  const handleYesClick = useCallback(async()=>{
    try {
      setLoading(true);
      if(userDetails){
        const response =  await axiosInstance.delete(`/users/${userDetails.id}`);
        console.log(response);
        if(response.status===204){
          dispatch(removeUserById({id:userDetails.id}));
          handleCancelClick();
          toast.success(`User ${userDetails.first_name} has been deleted successfully`);
        }
        else{
          toast.error("Something went wrong while deleting the user");
        }
      }
    } catch (error) {
      console.log('some error occured while deleting the user',error);
    }
    finally{
      setLoading(false);
    }

  },[dispatch, handleCancelClick, userDetails])


  return (
    userDetails && 
    <div className="text-white flex flex-col gap-6">
      <h4>Are you sure that you want to delete <strong>{userDetails.first_name}</strong> from users ?</h4>
      <div className="flex gap-2">
        <button onClick={handleYesClick} className="bg-indigo-500 rounded-lg px-7 py-2">{loading?<SpinLoader/>:"Yes"}</button>
        <button onClick={handleCancelClick} className="bg-indigo-500 rounded-lg px-7 py-2 flex ">Cancel
        </button>
      </div>
    </div>
  )
}
