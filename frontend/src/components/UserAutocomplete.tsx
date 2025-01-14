import {
  Avatar,
  Checkbox,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import api from "../api";
import useDebounce from "../hooks/useDebounce";
import { User } from "../types";
import "./styles/UserAutocomplete.css";

interface UserAutocompleteProps {
  selectedUsers: User[];
  onChange: (users: User[]) => void;
}

const UserAutocomplete = memo(
  ({ selectedUsers, onChange }: UserAutocompleteProps): JSX.Element => {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const debouncedQuery = useDebounce(query, 250); // Debounce the query input with a delay of 250ms

    useEffect(() => {
      if (debouncedQuery) {
        setLoading(true);
        setError(null); // Reset error state
        api
          .get(`/api/users?q=${debouncedQuery}`)
          .then((response) => {
            setUsers(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Failed to fetch users:", error);
            setError("Failed to fetch users");
            setLoading(false);
          });
      } else {
        setUsers([]);
      }
    }, [debouncedQuery]);

    const handleToggle = (checked: boolean, user: User) => {
      if (checked) {
        onChange([...selectedUsers, user]);
      } else {
        onChange(selectedUsers.filter((u) => u.id !== user.id));
      }
    };

    return (
      <div>
        <TextField
          variant="standard"
          label="Search users by first or last name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
        />
        {loading ? (
          <CircularProgress size={24} />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <List className="user-autocomplete-list">
            {users.map((user) => (
              <ListItem key={user.id} component="li">
                <ListItemAvatar>
                  <Avatar src={user.image} alt={user.firstName} />
                </ListItemAvatar>
                <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                <Checkbox
                  edge="end"
                  checked={selectedUsers.some((u) => u.id === user.id)}
                  onChange={(_, checked) => handleToggle(checked, user)}
                />
              </ListItem>
            ))}
          </List>
        )}
      </div>
    );
  }
);

export default UserAutocomplete;
