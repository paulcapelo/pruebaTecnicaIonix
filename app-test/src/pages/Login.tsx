import { Button, Alert, Form, Input, Layout, Spin } from "antd";
import { useUser } from "../hooks";
import { Navigate } from "react-router-dom";


const { Content } = Layout;
const Login = () => {
    const { user, mutate, error, loading } = useUser();
    const onFinish = (values: any) => {
        mutate(values);
    };
    if (user?.id) {
        return <Navigate to="/user" replace />;
    }
    const onFinishFailed = (errorInfo: any) => {

    };

    if (loading) return (<div className="centerCtn"><Spin /></div>)

    return (
        <Layout>
            {error && <Alert message={error} type="error" />}
            <Content className="centerCtn">
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
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: "Please input your username!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Iniciar
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
};

export default Login;
