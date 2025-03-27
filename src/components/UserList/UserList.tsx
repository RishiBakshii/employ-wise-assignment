import { User } from "../../types/user.types";
import { UserListItem } from "./UserListItem";

type PropTypes = {
    users:User[];
    filteredUsers:User[];
}

export const UserList = ({users,filteredUsers}:PropTypes) => {

  const data = filteredUsers.length>0?filteredUsers:users;

  return (
    <div className="flex flex-col gap-4 p-4 h-full overflow-y-auto">
        {
            data.map(user=>(
                <UserListItem key={user.id} user={user}/>
            ))
        }
    </div>
  )
}
