import {useState} from 'react'
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function EditProduct() {
    const {id} = useParams();
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [categoryId, setcategoryId] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");

    const submitUpdateProduct = (id)=> async(e)=>{
        e.preventDefault();
        try {
          const response = await fetch(`http://localhost:3001/updateProduct/${id}`, {
            method: "PUT",
            body: JSON.stringify({
              name,
              image,
              categoryId,
              price,
              description,
              quantity,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });
          const data = await response.json();
          console.log(data, "data");
     
        } catch (err) {
          console.log(err);
        }
        setName('');
        setImage('');
        setPrice('');
        setDescription('');
        setQuantity('');
      }
  return (
    <div>
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '41ch' },
        marginTop:'20px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)} />
      <TextField id="outlined-basic" label="Image" variant="outlined" value={image} onChange={(e)=>setImage(e.target.value)}/>
      <TextField id="outlined-basic" label="Category" variant="outlined" value={categoryId} onChange={(e)=>setcategoryId(e.target.value)}/>
      <TextField id="outlined-basic" label="Price" variant="outlined" value={price} onChange={(e)=>setPrice(e.target.value)}/>
      <TextField id="outlined-basic" label="Description" variant="outlined" value={description} onChange={(e)=>setDescription(e.target.value)}/>
      <TextField id="outlined-basic" label="Quantity" variant="outlined" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
      <Button variant="outlined" onClick={submitUpdateProduct(id)}>Update</Button>
    </Box>
    </div>
  )
}

export default EditProduct