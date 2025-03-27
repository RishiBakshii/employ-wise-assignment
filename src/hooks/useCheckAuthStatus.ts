import { setIsAuthenticated } from "../lib/redux/slices/authSlice";
import { useAppDispatch } from "../lib/redux/store/hooks";

export const useCheckAuthStatus = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  if (token) {
    dispatch(setIsAuthenticated(true));
  }
};
