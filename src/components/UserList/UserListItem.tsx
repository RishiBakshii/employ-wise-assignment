import { useCallback } from "react";
import { setIsDeleteFormOpen, setIsEditFormOpen, setUserDetailsForForm } from "../../lib/redux/slices/uiSlice";
import { useAppDispatch } from "../../lib/redux/store/hooks";
import { User } from "../../types/user.types";
import { DeleteIcon } from "../ui/icons/DeleteIcon";
import { EditIcon } from "../ui/icons/EditIcon";

type PropTypes = {
    user:User;
}

export const UserListItem = ({user}:PropTypes) => {
    
    const dispatch = useAppDispatch();

    const handleDeleteClick = useCallback(()=>{
        dispatch(setIsDeleteFormOpen(true));
        dispatch(setUserDetailsForForm(user));
    },[dispatch, user]);

    const handleEditClick = useCallback(()=>{
        dispatch(setIsEditFormOpen(true));
        dispatch(setUserDetailsForForm(user));
    },[dispatch, user]);


  return (
    <div className="bg-indigo-200 w-full rounded-md py-2 px-2 flex items-center gap-4 shadow-lg">
        <div>
            <span>{user.id}</span>
        </div>
        <div>
            <img src={user.avatar} alt="user-avatar" className="rounded-full object-cover max-lg:size-20 size-24"/>
        </div>
        <div className="flex flex-col">
            <span>{user.first_name}</span>
            <span>{user.last_name}</span>
        </div>
        <div className="ml-auto flex gap-2">
            <button onClick={handleEditClick}><EditIcon/></button>
            <button onClick={handleDeleteClick}><DeleteIcon/></button>
        </div>
    </div>
  )
}
