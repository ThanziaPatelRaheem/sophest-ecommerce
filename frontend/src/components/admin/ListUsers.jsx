import React, { useEffect } from "react";
import MetaData from "../Layout/MetaData";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link } from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import toast from "react-hot-toast";
import {
  useDeleteUserMutation,
  useGetAdminUsersQuery,
} from "../../redux/api/userApi.js";

const ListUsers = () => {
  const { data, isLoading, error } = useGetAdminUsersQuery();

  const [
    deleteUser,
    { error: deleteError, isLoading: isDeleteLoading, isSuccess },
  ] = useDeleteUserMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      toast.success("User Deleted");
    }
  }, [error, deleteError, isSuccess]);

  const deleteUserHandler = (id) => {
    deleteUser(id);
  };

  if (isLoading) return <Loader />;

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      flex: 1.5,
      minWidth: 210,
      sortable: true,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 130,
      sortable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.8,
      minWidth: 220,
      sortable: true,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.8,
      minWidth: 110,
      sortable: true,
      renderCell: (params) => {
        const role = params.value || "user";
        const isAdmin = role.toLowerCase() === "admin";

        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              height: "28px",
              padding: "0 12px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "capitalize",
              backgroundColor: isAdmin ? "#EAF1E9" : "#F3F0E8",
              color: isAdmin ? "#0F3B2E" : "#526459",
            }}
          >
            {role}
          </span>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.9,
      minWidth: 140,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <IconButton
            size="small"
            sx={{
              color: "#0F3B2E",
              border: "1px solid #8FAE98",
              borderRadius: "6px",
              "&:hover": {
                color: "#ffffff",
                backgroundColor: "#0F3B2E",
                borderColor: "#0F3B2E",
              },
            }}
            component={Link}
            to={`/admin/users/${params.row.id}`}
            aria-label="Edit user"
          >
            <EditOutlinedIcon fontSize="inherit" />
          </IconButton>

          <IconButton
            size="small"
            sx={{
              color: "#B65A52",
              border: "1px solid #D9A6A0",
              borderRadius: "6px",
              "&:hover": {
                color: "#ffffff",
                backgroundColor: "#B65A52",
                borderColor: "#B65A52",
              },
            }}
            onClick={() => deleteUserHandler(params.row.id)}
            disabled={isDeleteLoading}
            aria-label="Delete user"
          >
            <DeleteOutlineOutlinedIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const rows =
    data?.users?.map((user) => ({
      id: user?._id,
      name: user?.name,
      email: user?.email,
      role: user?.role,
    })) || [];

  return (
    <>
      <MetaData title={`All Users`} />
      <section className="my-orders-section admin-products-section main-grid">
        <div className="my-orders-wrapper">
          <h1 className="my-orders-title">{data?.users?.length} Users</h1>
          <div className="my-orders-grid">
            <DataGrid
              rows={rows}
              rowHeight={82}
              headerHeight={56}
              columns={columns.map((c) => ({ minWidth: 140, ...c }))}
              sx={{
                fontFamily:
                  '"Outfit", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',

                overflowX: "auto",

                // header style
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f3f4f6",
                  fontWeight: 600,
                },

                // cells and  header text color
                "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaderTitle": {
                  color: "#495057",
                  fontFamily: "",
                },

                // striped rows
                "& .MuiDataGrid-virtualScrollerRenderZone .MuiDataGrid-row:nth-of-type(2n)":
                  {
                    backgroundColor: "#f9fafb",
                  },

                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#e5e7eb !important",
                },
              }}
              getRowId={(row) => row.id}
              pageSizeOptions={[5, 10, 20, 100]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              disableRowSelectionOnClick
              autoHeight
              density="compact"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ListUsers;
