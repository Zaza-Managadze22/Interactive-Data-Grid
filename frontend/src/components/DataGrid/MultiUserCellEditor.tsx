import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { GridRenderEditCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import { User } from "../../types";
import UserAutocomplete from "./UserAutocomplete";

interface IProps {
  params: GridRenderEditCellParams;
}

const MultiUserCellEditor = ({ params }: IProps): JSX.Element => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>(params.value);
  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => setIsOpen(false);

  const onDone = async () => {
    await params.api.setEditCellValue({
      id: params.id,
      field: params.field,
      value: selectedUsers,
    });

    params.api.stopCellEditMode({ id: params.id, field: params.field });

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Search Users</DialogTitle>
      <DialogContent>
        <UserAutocomplete
          selectedUsers={selectedUsers}
          onChange={setSelectedUsers}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onDone} color="primary">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MultiUserCellEditor;
