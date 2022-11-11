import React from "react";
import { FormUser } from "../components";
import {
    useLocation,
    useParams,
    useNavigate,
    Navigate,
} from "react-router-dom";
import { UserInfo } from "../models";
import { useAuth } from "../context/useContext";

const Ingresar = () => {
    const { user: usuario } = useAuth();
    const navigate = useNavigate();
    let params = useParams();
    let location = useLocation();

    const backDashboard = () => {
        navigate("/dashboard");
    };

    const { user } = location?.state || UserInfo;
    return (
        <div className="centerCtn">

            <p></p>
            <FormUser user={user} ready={backDashboard} />
        </div>
    );
};

export default Ingresar;