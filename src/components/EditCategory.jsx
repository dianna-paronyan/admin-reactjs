import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";

function EditCategory() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const { id } = useParams();

  const editedCategory = useMemo(()=> categories.find((el) => el.id.toString() === id.toString()),[categories,id]);
  console.log(editedCategory,'edit');

  useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCategories(res);
      });
  }, []);

  const updateCategory = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch(
        `http://localhost:3001/updateCategory/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name,
            id,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: user.jwt,
          },
        }
      );
      if (response.status === 401 || response.status === 403) {
        console.log(response.status);
        navigate("/login");
      }
      const data = await response.json();
    } catch (err) {
      console.log(err);
    }
  };

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
        Edit Category
      </Typography>
      {
        editedCategory ? 
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          // value={name}
          defaultValue={editedCategory?.name}
          onChange={(e) => setName(e.target.value)}
        /> : <></>
      }
      <Button variant="outlined" onClick={() => updateCategory(id)}>
        Update
      </Button>
    </Box>
  );
}

export default EditCategory;
