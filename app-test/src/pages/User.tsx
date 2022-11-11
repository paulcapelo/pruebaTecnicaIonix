import { Card, Image } from "antd";
import { useAuth } from "../context/useContext";
import { urlImages } from "../services";
const User = () => {
    const { user } = useAuth();

    return (
        <div className="centerCtn">
            <Card title={"User Info:"} style={{}} className="centerCtn">
                <div>
                    <p>

                        <Image
                            width={200}
                            src={`${urlImages}${user?.profile_img}`}
                        />
                    </p>
                    <p>
                        <strong>UserName: </strong>
                        {user?.username}
                    </p>
                    <p>
                        {" "}
                        <strong>Nombre: </strong>
                        {user?.firstname}
                    </p>
                    <p>
                        {" "}
                        <strong>Apellido: </strong>
                        {user?.lastname}
                    </p>

                    <p>
                        {" "}
                        <strong>Email: </strong>
                        {user?.email}
                    </p>
                    <p>
                        <strong>id:</strong>
                        {user?.id}
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default User;
