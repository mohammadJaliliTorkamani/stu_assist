import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../../utils/useLocalStorage";

export const ProtectedRoute = (props) => {
    const [token,] = useLocalStorage('token', null)
    if (!token) {
        return <Navigate to="/login" />
    }
    return props.children
}