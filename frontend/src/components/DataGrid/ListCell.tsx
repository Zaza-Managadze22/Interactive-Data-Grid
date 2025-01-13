import { Button, Popover, Typography } from "@mui/material";
import { useState } from "react";

interface IProps {
  listItems: string[];
}

const ListCell = ({ listItems }: IProps) => {
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
      <Button
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        size="small"
      >
        See details
      </Button>
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
        <ol>
          {listItems.map((item) => (
            <li key={item}>
              <Typography sx={{ p: 1 }}>{item}</Typography>
            </li>
          ))}
        </ol>
      </Popover>
    </div>
  );
};

export default ListCell;
