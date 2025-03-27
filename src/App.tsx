import { Navigate, Route, Routes } from "react-router";
import { useCheckAuthStatus } from "./hooks/useCheckAuthStatus";
import { NonAuthLayout } from "./layouts/NonAuthLayout";
import { RootLayout } from "./layouts/RootLayout";
import { selectIsAuthenticated } from "./lib/redux/slices/authSlice";
import { useAppSelector } from "./lib/redux/store/hooks";
import { LoginPage } from "./pages/LoginPage";
import { UserListPage } from "./pages/UserListPage";

export const App = () => {
  
  useCheckAuthStatus();
  const isAuthenticated =  useAppSelector(selectIsAuthenticated);

  return (
    <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<UserListPage />} />
            </Route>
            <Route
              path="*"
              element={<Navigate to={"/"} replace={true} />}
            />
          </>
        ) : (
          <>
            <Route path="/login" element={<NonAuthLayout />}>
              <Route index element={<LoginPage/>}/>
            </Route>
            <Route
              path="*"
              element={<Navigate to={"/login"} replace={true} />}
            />
          </>
        )}
    </Routes>
  );
};
