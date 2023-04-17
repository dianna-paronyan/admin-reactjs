import { Link } from "react-router-dom";
import "./Admin.css";
import { MenuItem, MenuList, Box } from "@mui/material";

function Admin() {
  return (
    <div>
      <Box
        sx={{
          width: 320,
          height: "91vh",
          maxWidth: "100%",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          borderRadius: "none",
        }}
      >
        <MenuList
          sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <MenuItem sx={{ marginTop: "15px" }}>Dashboard</MenuItem>
          <Link to="/createProduct">
            <MenuItem>Create Product</MenuItem>
          </Link>
          <Link to="/products">
            <MenuItem>Products</MenuItem>
          </Link>
          <Link to="/categories">
            <MenuItem>Categories</MenuItem>
          </Link>
          <Link to="/users">
            <MenuItem>Users</MenuItem>
          </Link>
        </MenuList>
      </Box>
    </div>
  );
}

export default Admin;
