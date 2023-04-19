import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user'));
    fetch("http://localhost:3001/users", {
      headers: {
        "Authorization": token.jwt
      }
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.status === 401 || res.status === 403){
          navigate('/');
        }
        setUsers(res);
      });
  }, []);
  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{ width: "70%", margin: "50px auto" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">UserName</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{user.userName}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Users;
