import { UserListItemSkeleton } from "./UserListItemSkeleton";

export const UserSkeletonList = () => {
  return (
    <div className="flex flex-col gap-4 p-4 h-full overflow-y-auto">
      <UserListItemSkeleton />
      <UserListItemSkeleton />
      <UserListItemSkeleton />
      <UserListItemSkeleton />
      <UserListItemSkeleton />
    </div>
  );
};
