import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import api from "./api";
import "./App.css";
import DataGrid from "./components/DataGrid";
import ImageLinkCell from "./components/Cells/ImageCell";
import ListCell from "./components/Cells/ListCell";
import MultiUserCellEditor from "./components/Cells/MultiUserCellEditor";
import MultiUserCellRenderer from "./components/Cells/MultiUserCellRenderer";
import TagCell from "./components/Cells/TagsCell";
import { FetchData, HandleRowUpdate, RecipeWithUser } from "./types";

const Demo = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200, editable: true },
    {
      field: "tag",
      headerName: "Tag",
      width: 130,
      renderCell: (params) => <TagCell tag={params.row.tag} />,
      editable: true,
    },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => <ImageLinkCell src={params.value} />,
    },
    {
      field: "ingredients",
      headerName: "Ingredients",
      width: 130,
      renderCell: (params) => <ListCell listItems={params.value} />,
    },
    {
      field: "instructions",
      headerName: "Instructions",
      width: 130,
      renderCell: (params) => <ListCell listItems={params.value} />,
    },
    {
      field: "cookTimeMinutes",
      headerName: "Cooking Time (minutes)",
      width: 180,
      editable: true,
    },
    {
      field: "users",
      headerName: "Users",
      width: 250,
      renderCell: (params) => <MultiUserCellRenderer users={params.value} />,
      renderEditCell: (params) => <MultiUserCellEditor params={params} />,
      editable: true,
    },
  ];

  const fetchData: FetchData<RecipeWithUser> = async ({
    page,
    pageSize,
  }: GridPaginationModel) => {
    const res = await api.get(`/api/recipes?page=${page}&pageSize=${pageSize}`);
    return res.data;
  };

  const handleRowUpdate: HandleRowUpdate<RecipeWithUser> = async (
    updatedRow
  ) => {
    const response = await api.put(`/api/recipes/${updatedRow.id}`, updatedRow);
    return response.data;
  };

  return (
    <DataGrid
      columns={columns}
      fetchData={fetchData}
      handleRowUpdate={handleRowUpdate}
    />
  );
};

export default Demo;
