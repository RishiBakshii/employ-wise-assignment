export const UserListItemSkeleton = () => {
  return (
    <div className="bg-indigo-400 w-full rounded-md py-2 px-2 flex items-center gap-4 shadow-lg animate-pulse">
      <div>
        <div className="h-4 w-8 bg-gray-300 rounded"></div>
      </div>
      <div>
        <div className="rounded-full bg-gray-300 size-24"></div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
        <div className="h-4 w-20 bg-gray-300 rounded"></div>
      </div>
      <div className="ml-auto flex gap-2">
        <div className="h-8 w-8 bg-gray-300 rounded"></div>
        <div className="h-8 w-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};
