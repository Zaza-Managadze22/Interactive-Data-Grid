import { GridColDef } from "@mui/x-data-grid";
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { useEffect, useRef } from "react";

const useDataGridApiRef = (columns: GridColDef[]) => {
  const apiRef = useRef<GridApiCommunity | null>(null);
  useEffect(() => {
    columns.concat({
      field: "__HIDDEN__",
      width: 0,
      renderCell: (params) => {
        apiRef.current = params.api;
        return null;
      },
    });
  }, [columns]);

  return apiRef;
};

export default useDataGridApiRef;
