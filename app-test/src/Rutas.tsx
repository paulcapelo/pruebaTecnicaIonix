import { FC, ReactNode } from "react";
import DashBoard from "./pages/DashBoard";
import { Routes, Route, Navigate } from "react-router-dom";
import User from "./pages/User";
import { LayuotApp } from "./layout";
import Login from "./pages/Login";
import IngresarUsuario from "./pages/IngresarUsuario";
import { useAuth } from "./context/useContext";
import { UserType } from "./models";
const Rutas = () => {
    const { user } = useAuth();

    return (
        <div>
            <LayuotApp>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute user={user}>
                                <DashBoard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/user"
                        element={
                            <ProtectedRoute user={user}>
                                <User />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/ingresar"
                        element={
                            <ProtectedRoute user={user}>
                                <IngresarUsuario />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/editar/:id"
                        element={
                            <ProtectedRoute user={user}>
                                {/* <Editar /> */}
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <ProtectedRoute user={user}>
                                <DashBoard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </LayuotApp>
        </div>
    );
};

export default Rutas;

interface Props {
    user: UserType,
    children: ReactNode
}

const ProtectedRoute: FC<Props> = ({ user, children }) => {
    if (!user?.id) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};