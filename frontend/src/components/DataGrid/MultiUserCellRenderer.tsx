import { Avatar } from "@mui/material";
import { User } from "../../types";
import UsersTooltip from "./UsersTooltip";
import "../styles/MultiUserCellRenderer.css";

interface IProps {
  users: User[];
}

const MultiUserCellRenderer = ({ users }: IProps) => {
  const [firstUser, ...restOfUsers] = users;
  return (
    <div className="multi-user-cell">
      <Avatar
        src={firstUser.image}
        alt={`${firstUser.firstName} ${firstUser.lastName}`}
      />
      <label>
        {firstUser.firstName} {firstUser.lastName}
      </label>
      {restOfUsers.length > 0 && <UsersTooltip users={restOfUsers} />}
    </div>
  );
};

export default MultiUserCellRenderer;
