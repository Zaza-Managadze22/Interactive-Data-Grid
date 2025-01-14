import { Alert } from "@mui/material";
import {
  GridColDef,
  GridValidRowModel,
  DataGrid as MuiDataGrid,
} from "@mui/x-data-grid";
import { useMemo, memo, useCallback } from "react";
import useTableData from "../../hooks/useTableRows";
import { FetchData, HandleRowUpdate } from "../../types";
import "../styles/DataGrid.css";

interface IProps<T extends GridValidRowModel> {
  columns: GridColDef[];
  fetchData: FetchData<T>;
  handleRowUpdate?: HandleRowUpdate<T>;
}

const DataGridComponent = <T extends GridValidRowModel>({
  columns,
  fetchData,
  handleRowUpdate,
}: IProps<T>): JSX.Element => {
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

  const pageSizeOptions = useMemo(() => [10, 20, 30], []);

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

const typedMemo: <T>(component: T) => T = memo;

const DataGrid = typedMemo<typeof DataGridComponent>(DataGridComponent);

export default DataGrid;
