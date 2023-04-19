import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const [product, setProduct] = useState({
    name: "",
    image: "",
    categoryId: "",
    price: "",
    description: "",
    quantity: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  async function submitCreateProduct(e) {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch("http://localhost:3001/createProduct", {
        method: "POST",
        body: JSON.stringify({
          name: product.name,
          image: product.image,
          categoryId: product.categoryId,
          price: product.price,
          description: product.description,
          quantity: product.quantity,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: token.jwt,
        },
      });
      if(response.status === 401 || response.status === 403){
        console.log(response.status);
        navigate('/');
      }
      const data = await response.json();
      console.log(data, "data");
    } catch (err) {
      console.log(err);
    }
    setProduct({ name:'',image:'',categoryId:'',price:'',description:'',quantity:''})
  }

  useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCategories(res);
      });
  }, []);

  return (
    <div>
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
        onSubmit={submitCreateProduct}
      >
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={product.name}
          onChange={(e) => setProduct(prevState => ({ ...prevState, name: e.target.value }))}
        />
        <TextField
          id="outlined-basic"
          label="Image"
          variant="outlined"
          value={product.image}
          onChange={(e) => setProduct(prevState => ({ ...prevState, image: e.target.value }))}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={product.categoryId}
            label="Category"
            onChange={(e) => setProduct(prevState => ({ ...prevState, categoryId: e.target.value }))}
          >
            {categories.map((category) => (
              <MenuItem value={category.id} key={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          value={product.price}
          onChange={(e) => setProduct(prevState => ({ ...prevState, price: e.target.value }))}
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          value={product.description}
          onChange={(e) => setProduct(prevState => ({ ...prevState, description: e.target.value }))}
        />
        <TextField
          id="outlined-basic"
          label="Quantity"
          variant="outlined"
          value={product.quantity}
          onChange={(e) => setProduct(prevState => ({ ...prevState, quantity: e.target.value }))}
        />
        <Button variant="outlined" onClick={submitCreateProduct}>
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default CreateProduct;
