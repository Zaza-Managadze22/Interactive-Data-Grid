import { Avatar, Chip, Popover } from "@mui/material";
import { useState } from "react";
import { User } from "../types";
import "./styles/UsersTooltip.css";

interface IProps {
  users: User[];
}

const UsersTooltip = ({ users }: IProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Chip
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        size="small"
        label={`+${users.length}`}
      />
      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: "none" }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div className="users-tooltip-list-container">
          {users.map((user) => (
            <div key={user.id} className="list-item">
              <Avatar
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
              />
              <label>
                {user.firstName} {user.lastName}
              </label>
            </div>
          ))}
        </div>
      </Popover>
    </div>
  );
};

export default UsersTooltip;
