import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [isDel, setIsDel] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setProducts(res);
      });
  }, [isDel]);

  const deleteProduct = async (id) => {
    const token = JSON.parse(localStorage.getItem('user'));
    console.log(token.jwt,'t');
    try {
      const response = await fetch(
        `http://localhost:3001/deleteProduct/${id}`,
        {
          method: "DELETE",
          body: JSON.stringify({
            id,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": token.jwt
          },
        }
      );
      if(response.status === 401 || response.status === 403){
        console.log(response.status);
        navigate('/');
      }
      const data = await response.json();
      setIsDel(!isDel);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
            marginTop: "20px",
          }}
        >
          <Button variant="contained">
            <Link to="/createProduct">New Product</Link>
          </Button>
        </Stack>
        <TableContainer
          component={Paper}
          sx={{ width: "90%", margin: "50px auto" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">
                    <img src={product.image} width="80px" />
                  </TableCell>
                  <TableCell align="center">{product.price}</TableCell>
                  <TableCell align="center">{product.description}</TableCell>
                  <TableCell align="center">{product.Category.name}</TableCell>
                  <TableCell align="center">{product.quantity}</TableCell>
                  <TableCell align="center">
                    <Link to={`/updateProduct/${product.id}`}>
                      <EditIcon />
                    </Link>
                    <DeleteOutlineIcon onClick={()=>deleteProduct(product.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Products;

