import { FC, useState } from "react";
import useSWR from "swr";
import { Card, Form, Input, Spin, Button, notification } from "antd";
import { fetcher } from "../services";
import { url } from '../services'
import { UserType } from "../models";
import UploadInput from "./UploadInput";
import { useAuth } from "../context/useContext";
interface Props {
    user: UserType,
    ready: () => void;
}
const FormUser: FC<Props> = ({ user, ready }) => {
    const { user: usuario } = useAuth()
    const [loading, setloading] = useState(false)
    const [file, setfile] = useState<string | null | ArrayBuffer>()

    const selectfile = (e: any) => {

        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function () {
            let base64 = reader.result;
            setfile(base64)
        }
    }

    const onFinish = async (values: any) => {
        setloading(true)
        let URL = `${url}/user`
        if (user?.id) {
            values = { ...values, id: user?.id, profile_img: file };
            URL = `${url}/user/${user?.id}`
        } else {
            values = { ...values, profile_img: file };
        }

        const editarFetcher = await fetch(URL, {
            method: user?.id ? "PUT" : 'POST',
            headers: new Headers({
                'Authorization': `Bearer ${usuario?.token}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ ...values, profile_img: file }),
        }).then((res) => res.json());

        if (editarFetcher?.transaccion) {
            notification.open({
                message: "Datos Guardados",
                description: "",
            });
            ready();
        }
        else {
            notification.open({
                message: "No se pudo Guardar los datos",
                description: "",
            });
        }
        setloading(false)
    };

    const onFinishFailed = (errorInfo: any) => {

    };
    if (loading) return (<div className="centerCtn"><Spin /></div>)
    return (
        <div>
            <Card
                title={user?.id ? "Editar usuario" : "Crear usuario"}
                style={{ width: 500 }}
            >
                <div >
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Imagen de perfil"
                            name="profile_img"
                            // initialValue={user?.profile_img}
                            rules={[{ required: true, message: "Ingrese fotografia!" }]}
                        >
                            <Input type="file" onChange={selectfile} />
                        </Form.Item>
                        <Form.Item
                            label="Nombre"
                            name="firstname"
                            initialValue={user?.firstname}
                            rules={[{ required: true, message: "Ingrese su nombre!" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Apellido"
                            name="lastname"
                            initialValue={user?.lastname}
                            rules={[{ required: true, message: "Ingrese su apellido!" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            initialValue={user?.email}
                            rules={[{ required: true, message: "Ingrese su email!" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="User Name"
                            name="username"
                            initialValue={user?.username}
                            rules={[{ required: true, message: "Ingrese su username!" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            initialValue={user?.password}
                            rules={[{ required: true, message: "Ingrese su contrasena!" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
        </div>
    );
};

export default FormUser;
