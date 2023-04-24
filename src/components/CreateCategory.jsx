import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

function CreateCategory() {
  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  async function createCategory() {
    const token = JSON.parse(localStorage.getItem("user"));
    if (name.trim() === "") {
      setErr("Add Category Name");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/createCategory", {
        method: "POST",
        body: JSON.stringify({
          name,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: token.jwt,
        },
      });

      if (response.status === 401 || response.status === 403) {
        console.log(response.status);
        navigate("/");
      } else {
        setErr("");
        navigate("/categories");
      }
    } catch (err) {
      console.log(err);
    }
    setName("");
  }
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1, width: "41ch" },
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        component="h2"
        variant="h5"
        color="#333"
        sx={{ textAlign: "center", marginTop: "15px" }}
      >
        Create Category
      </Typography>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Typography
        component="p"
        color="red"
        sx={{ height: "10px", textAlign: "center", fontSize: "15px" }}
      >
        {err ? err : ""}
      </Typography>
      <Button variant="outlined" onClick={createCategory}>
        Submit
      </Button>
    </Box>
  );
}

export default CreateCategory;
