import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isDel, setIsDel] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCategories(res);
      });
  }, [isDel, isEdit]);

  const updateCategory = async (id) => {
    const token = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch(
        `http://localhost:3001/updateCategory/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: token.jwt,
          },
        }
      );
      if(response.status === 401 || response.status === 403){
        console.log(response.status);
        navigate('/');
      }
      const data = await response.json();
      setIsEdit(true);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCategory = async (id) => {
    const token = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch(
        `http://localhost:3001/deleteCategory/${id}`,
        {
          method: "DELETE",
          body: JSON.stringify({
            id,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: token.jwt,
          },
        }
      );
      const data = await response.json();
      console.log(data, "data");
      setIsDel(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ width: "50%", margin: "50px auto" }}
    >
      <Button variant="contained">
        <Link to="/createCategory">New Category</Link>{" "}
      </Button>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow
              key={category.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{category.id}</TableCell>
              <TableCell align="center">{category.name}</TableCell>
              <TableCell align="center">
                {/* <Link to={`/updateCategry/${category.id}`}> */}
                <EditIcon onClick={handleOpen} />
                {/* </Link> */}
                <DeleteOutlineIcon
                  onClick={() => deleteCategory(category.id)}
                />
              </TableCell>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Text in a modal
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Button onClick={() => updateCategory(category.id)}>
                    Update
                  </Button>
                </Box>
              </Modal>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Categories;
