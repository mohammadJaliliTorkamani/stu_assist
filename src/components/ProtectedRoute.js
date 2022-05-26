import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../utils/useLocalStorage";

export const ProtectedRoute = (props) => {
    const { user } = useLocalStorage('user', null)
    if (!user) {
        return <Navigate to="/login" />
    }
    return props.children
}