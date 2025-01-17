import { Alert } from "@mui/material";
import {
  GridColDef,
  GridValidRowModel,
  DataGrid as MuiDataGrid,
} from "@mui/x-data-grid";
import { useMemo, memo, useCallback } from "react";
import useTableData from "../../hooks/useTableData";
import { FetchData, HandleRowUpdate } from "../../types";
import "../styles/DataGrid.css";

// Define the props interface with generic type T
interface IProps<T extends GridValidRowModel> {
  columns: GridColDef[];
  fetchData: FetchData<T>;
  handleRowUpdate?: HandleRowUpdate<T>;
}

// Main DataGrid component
const DataGridComponent = <T extends GridValidRowModel>({
  columns,
  fetchData,
  handleRowUpdate,
}: IProps<T>): JSX.Element => {
  // Use custom hook to fetch table data
  const {
    data,
    rowCount,
    setRowCount,
    loading,
    errorMessage,
    setError,
    paginationModel,
    setPaginationModel,
  } = useTableData(fetchData);

  // Define page size options
  const pageSizeOptions = useMemo(() => [10, 20, 30], []);

  // Handle row update process
  const processRowUpdate = useCallback(
    async (updatedRow: T, originalRow: T) => {
      if (handleRowUpdate) {
        try {
          const updatedData = await handleRowUpdate(updatedRow);
          return updatedData;
        } catch (error) {
          setError(`Could not load users: ${(error as Error).message}`);
          return originalRow; // Revert to the original row if update fails
        }
      }
      return originalRow;
    },
    [handleRowUpdate, setError]
  );

  return (
    <div className="grid-container">
      <MuiDataGrid
        loading={loading}
        rows={data}
        rowCount={rowCount}
        columns={columns}
        pageSizeOptions={pageSizeOptions}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        onRowCountChange={setRowCount}
        processRowUpdate={processRowUpdate}
      />
      {!!errorMessage && (
        <Alert severity="error">Could not load users: {errorMessage}</Alert>
      )}
    </div>
  );
};

// Memoize the DataGrid component to prevent unnecessary re-renders
const typedMemo: <T>(component: T) => T = memo;

const DataGrid = typedMemo<typeof DataGridComponent>(DataGridComponent);

export default DataGrid;
