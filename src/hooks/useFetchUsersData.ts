import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../lib/axios/config";
import { setUsers } from "../lib/redux/slices/userSlice";
import { FetchUserResponse } from "../types/user.types";

export const useFetchUsersData = () => {
    
    const [page,setPage] = useState<number>(1);
    const [loading,setLoading] = useState<boolean>(false);
    const [totalPages,setTotalPages] = useState<number>(1);
    const dispatch = useDispatch();

    const fetch = useCallback(async()=>{
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/users?page=${page}`);
                if(response.status===200){
                    const data = response.data as FetchUserResponse;
                    console.log(data);
                    const users = data.data;
                    dispatch(setUsers(users));
                    setTotalPages(data.total_pages);
                }
            } catch (error:unknown) {
                console.log("Some error occured while fetching users data",error);
                toast.error("Some error occured in fetching users data")
            }
            finally{
                setLoading(false);
            }
    },[dispatch, page]);

    useEffect(()=>{
        fetch();
    },[fetch])

    return {
        loading,
        setPage,
        page,
        totalPages
    }
}
