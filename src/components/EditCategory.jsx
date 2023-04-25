import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function EditCategory() {

  const [category, setCategory] = useState({});
  const [err, setErr] = useState('');
  const [updated, setUpdated] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/category/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setCategory(res);
      });
  }, [id]);

  const updateCategory = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch(
        `http://localhost:3001/updateCategory/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name:category.name,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: user.jwt,
          },
        }
      );
      setUpdated('');
      setErr('');
      if (!response.ok) {
        setErr('Not Found');
      }else{
        setUpdated('Category Updated');
      }
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
      <Typography  component='p' color="blue" sx={{ height:'10px',textAlign:'center',fontSize:'15px'}}>{err ? err : updated}</Typography>
      {
        category.name ? 
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={category.name}
          onChange={(e) => setCategory(prevState=> ({...prevState, name:e.target.value}))}
        /> : <></>
      }
      <Button variant="outlined" onClick={() => updateCategory(id)}>
        Update
      </Button>
    </Box>
  );
}

export default EditCategory;
