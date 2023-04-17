import { useState } from "react";
import { useNavigate } from "react-router-dom";


function useLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user,setUser] = useState({});
    const navigate = useNavigate();

    async function handleSubmitLogin(e){
        e.preventDefault();
          try {
            const response = await fetch("http://localhost:3001/login", {
              method: "POST",
              body: JSON.stringify({
                email,
                password
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            });
            const data = await response.json();
            setUser(data);
            console.log(data, "data");
            if(data.jwt && data.role === 1){
                console.log(data,'d');
                navigate('/admin');
              }else{
                navigate('/home')
              }
          } catch (err) {
            console.log(err);
          }
          setEmail('');
          setPassword('');
        }
        return {
            email,
            setEmail,
            password,
            setPassword,
            handleSubmitLogin,
            user
        }
}

export default useLogin