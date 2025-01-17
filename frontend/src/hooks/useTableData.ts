import {
  GridPaginationModel,
  GridRowsProp,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { FetchData } from "../types";

const useTableData = <T extends GridValidRowModel>(fetchData: FetchData<T>) => {
  const [data, setData] = useState<GridRowsProp<T>>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    fetchData(paginationModel)
      .then((response) => {
        setData(response.data);
        setLoading(false);
        setRowCount(response.total);
      })
      .catch((error) => {
        setErrorMessage(`Failed not load the users: ${error.message}`);
        setLoading(false);
        setRowCount(0);
      });
  }, [fetchData, paginationModel.page, paginationModel.pageSize]);

  return {
    data,
    rowCount,
    setRowCount,
    loading,
    errorMessage,
    setError: setErrorMessage,
    paginationModel,
    setPaginationModel,
  };
};

export default useTableData;
