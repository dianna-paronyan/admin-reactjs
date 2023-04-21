import { decodeToken } from "react-jwt";

function useAuth() {
    const user = JSON.parse(localStorage.getItem("user"));
    const decodedToken = decodeToken(user?.jwt);

  return {user, decodedToken}
}

export default useAuth;