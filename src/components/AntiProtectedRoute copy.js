import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../utils/useLocalStorage";

export const AntiProtectedRoute = (props) => {
    const [token,] = useLocalStorage('token',null)
    if (token) {
        return <Navigate to="/" />
    }
    return props.children
}