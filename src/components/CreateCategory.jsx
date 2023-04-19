import {useState} from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

function CreateCategory() {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    async function createCategory() {
        const token = JSON.parse(localStorage.getItem('user'));
        try {
          const response = await fetch("http://localhost:3001/createCategory", {
            method: "POST",
            body: JSON.stringify({
              name,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              "Authorization": token.jwt
            },
          });
          if(response.status === 401 || response.status === 403){
            console.log(response.status);
            navigate('/');
          }
          const data = await response.json();
          console.log(response.status, "data");
        } catch (err) {
          console.log(err);
        }
        setName("");
      }
  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={createCategory}>Submit</Button>
    </div>
  );
}

export default CreateCategory;
