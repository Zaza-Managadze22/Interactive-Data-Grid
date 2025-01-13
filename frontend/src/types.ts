import {
  GridPaginationModel,
  GridRowModel,
  GridRowsProp,
  GridValidRowModel,
} from "@mui/x-data-grid";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
}

export interface RecipeWithUser extends GridValidRowModel {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  cookTimeMinutes: number;
  image: string;
  tag: string;
  users: User[];
}

export interface FetchDataReturnType<T extends GridValidRowModel> {
  data: GridRowsProp<T>;
  total: number;
}

export interface FetchData<T extends GridValidRowModel> {
  (pagination: GridPaginationModel): Promise<FetchDataReturnType<T>>;
}

export interface HandleRowUpdate<T extends GridValidRowModel> {
  (updatedRow: GridRowModel<T>): Promise<GridRowModel<T>>;
}
