import { useEffect, useState } from "react";
import { selectUsers, setFilteredUsers } from "../../lib/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../lib/redux/store/hooks";

export const SearchBar = () => {

  const [searchVal, setSearchVal] = useState<string>("");
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  
  useEffect(()=>{
    if(searchVal.trim().length){
      const filteredUsers = users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchVal.toLowerCase())
      );
      if(filteredUsers.length === 0 && searchVal.trim().length > 0 ){
        return;
      }
      console.log(filteredUsers);
      dispatch(setFilteredUsers(filteredUsers));
    }
    else{
      dispatch(setFilteredUsers([]));
    }
  },[dispatch, searchVal, users]);

  useEffect(()=>{
    setSearchVal("");
    dispatch(setFilteredUsers([]));
  },[dispatch, users])

  return (
    <div className="w-full px-2">
      <input
        onChange={(e)=>setSearchVal(e.target.value)}
        type="text"
        placeholder="Search user.."
        className="px-2 py-3 rounded-lg w-full outline-none"
      />
    </div>
  );
};
