import { useCallback } from "react";
import { Pagination } from "../components/pagination/Pagination";
import { UserSkeletonList } from "../components/ui/skeletons/UserSkeletonList";
import { SearchBar } from "../components/UserList/SearchBar";
import { UserList } from "../components/UserList/UserList";
import { useFetchUsersData } from "../hooks/useFetchUsersData";
import { selectFilteredUsers, selectUsers } from "../lib/redux/slices/userSlice";
import { useAppSelector } from "../lib/redux/store/hooks";

export const UserListPage = () => {
  const { loading, setPage, page, totalPages } = useFetchUsersData();
  const users = useAppSelector(selectUsers);
  const filteredUsers = useAppSelector(selectFilteredUsers);

  const handlePageChange = useCallback(
    (page: number) => {
      setPage(page);
    },
    [setPage]
  );

  return (
    <div className="flex w-full justify-center items-center">

      <div className="gap-4 flex flex-col mt-20 max-xl:mt-5 pb-4 pr-2 pl-2">
        <div className="ml-auto max-md:mr-auto max-sm:w-full">
          <SearchBar/>
        </div>
        <div className="bg-white w-[40rem] h-[40rem] rounded-lg max-lg:w-screen">
          {!loading && users ? (
            <UserList users={users} filteredUsers={filteredUsers}/>
          ) : (
            <UserSkeletonList />
          )}
        </div>
        <div className="mt-3 ml-auto px-2">
          <Pagination
            currentPage={page}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};
