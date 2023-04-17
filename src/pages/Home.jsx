import { Paper, Typography } from "@mui/material";
import useLogin from "../hooks/useLogin";

function Home() {
  const { user } = useLogin();
  console.log(user, "u");
  return (
    <Paper elevation={3} sx={{width:'50%', height:'80px',display:'flex',justifyContent:'center', alignItems:'center'}}>
    <Typography variant="h3" component="h2" sx={{textAlign:'center'}}>
      Welcome {user.userName}
    </Typography>
    </Paper>
  );
}

export default Home;
