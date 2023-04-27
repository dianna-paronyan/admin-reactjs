import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";

function EditProduct() {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});
  const [updated, setUpdated] = useState('');
  const [err, setErr] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/product/${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "one");
        setProduct(res);
      });
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCategories(res);
      });
  }, []);

  const updateProduct = async (id) => {
    const token = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch(
        `http://localhost:3001/updateProduct/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: product.name,
            image: product.image,
            catehoryId: product.categoryId,
            price: product.price,
            description: product.description,
            quantity: product.quantity,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: token.jwt,
          },
        }
      );
      setUpdated('');
      setErr('');
      if (!response.ok) {
        setErr('Not Found');
      }else{
        setUpdated('Product Updated');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Typography
        component="h2"
        variant="h5"
        color="#333"
        sx={{ textAlign: "center", marginTop: "15px" }}
      >
        Edit Product
      </Typography>
      <Typography  component='p' color="blue" sx={{ height:'10px',textAlign:'center',fontSize:'15px'}}>{err ? err : updated}</Typography>
      {product.name !==undefined ? (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "41ch" },
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-helperText"
            label="Name"
            value={product.name}
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />

          <TextField
            id="image"
            label="Image"
            variant="outlined"
            value={product.image}
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                image: e.target.value,
              }))
            }
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Category
            </InputLabel>
            <Select
               labelId="categoryId"
               id="category"
               value={product.categoryId}
               label="Category"
              onChange={(e) =>
                setProduct((prevState) => ({
                  ...prevState,
                  categoryId: e.target.value,
                }))
              }
            >
              {categories.map((category) => (
                <MenuItem value={category.id} key={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="price"
            label="Price"
            variant="outlined"
            value={product.price}
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                price: e.target.value,
              }))
            }
          />
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            value={product.description}
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
          />
          <TextField
            id="quantity"
            label="Quantity"
            variant="outlined"
            value={product.quantity}
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                quantity: e.target.value,
              }))
            }
          />
          <Button variant="outlined" onClick={()=>updateProduct(id)}>
            Update
          </Button>
        </Box>
      ) : (
        <></>
      )}
    </div>
  );
}

export default EditProduct;
