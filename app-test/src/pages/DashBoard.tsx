import { useState, useEffect, Suspense, SetStateAction } from "react";
import { Space, Table, Button, notification, Spin, Image } from "antd";

import { EditFilled, DeleteFilled, UserAddOutlined } from "@ant-design/icons";
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import useSWR, { useSWRConfig } from "swr";
import { fetcher, urlImages } from "../services";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/useContext";
import { url } from "../services";
import { useListUser } from "../hooks/useListUsers";
import Editar from "./Editar";
import { UserType } from "../models";




const DashBoard = () => {
    const { user: usuario } = useAuth();
    let navigate = useNavigate();
    const [load, setload] = useState(false)
    const { loading, data = [], getData } = useListUser()
    const [dataSource, setdataSource] = useState<any>([]);
    const [filteredInfo, setFilteredInfo] = useState<any>({});
    const [sortedInfo, setSortedInfo] = useState<any>({});

    const handleChange = (pagination: any, filters: SetStateAction<{}>, sorter: SetStateAction<{}>) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };
    const clearFilters = () => {
        setFilteredInfo({});
    };
    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };

    useEffect(() => {
        if (!data) return;
        setdataSource(data.map((item: any) => ({ key: item?.id, ...item })));
    }, [data]);
    useEffect(() => {
        getData();
    }, []);

    const eliminar = async (id: string) => {
        setload(true)
        const resp = await fetch(`${url}/user/${id}`, {
            method: "DELETE",
            headers: new Headers({
                'Authorization': `Bearer ${usuario?.token}`,
            })
        }).then((res) => res.json());

        if (resp) {
            notification.open({
                message: "Registro Eliminado",
                description: "",
            });
            await getData();
        }
        setload(false)
        // window.location.reload();

        // mutate("/user");
        // }
    };

    const columns = [
        {
            title: "Image", dataIndex: "profile_img", key: "profile_img", render: (_: any, record: any) => (
                <Space size="middle">
                    <Image
                        width={80}
                        src={`${urlImages}${record?.profile_img}`}
                    />

                </Space>
            ),
        },
        {
            title: "Nombre", dataIndex: "firstname", key: "firstname",
            filteredValue: filteredInfo?.firstname || null,
            onFilter: (value: any, record: { firstname: string }) => record.firstname.includes(value),
            sorter: (a: { firstname: string }, b: { firstname: string }) => a.firstname.length - b.firstname.length,
            sortOrder: sortedInfo?.columnKey === 'firstname' ? sortedInfo?.order : null,
            ellipsis: true,
        },
        {
            title: "Apellido", dataIndex: "lastname", key: "lastname",
            filteredValue: filteredInfo?.lastname || null,
            onFilter: (value: any, record: { lastname: string }) => record.lastname.includes(value),
            sorter: (a: { lastname: string }, b: { lastname: string }) => a.lastname.length - b.lastname.length,
            sortOrder: sortedInfo?.columnKey === 'lastname' ? sortedInfo?.order : null,
            ellipsis: true,
        },
        {
            title: "Email", dataIndex: "email", key: "email",
            filteredValue: filteredInfo?.email || null,
            onFilter: (value: any, record: { email: string }) => record.email.includes(value),
            sorter: (a: { email: string }, b: { email: string }) => a.email.length - b.email.length,
            sortOrder: sortedInfo?.columnKey === 'email' ? sortedInfo?.order : null,
            ellipsis: true,
        },
        {
            title: "Username", dataIndex: "username", key: "username",
            filteredValue: filteredInfo?.username || null,
            onFilter: (value: any, record: { username: string }) => record.username.includes(value),
            sorter: (a: { username: string }, b: { username: string }) => a.username.length - b.username.length,
            sortOrder: sortedInfo?.columnKey === 'username' ? sortedInfo?.order : null,
            ellipsis: true,
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: UserType) => (
                <Space size="middle">
                    <Editar user={record} ready={() => getData()} />
                    <Button
                        shape="circle"
                        icon={<DeleteFilled />}
                        onClick={() => eliminar(record?.id)}
                    />
                </Space>
            ),
        },
    ];
    if (loading) return <div className="centerCtn"><Spin /></div>;
    return (


        <div className="centerCtn">
            <div>
                <p>DashBoard</p>
                <div className="">
                    <Button
                        icon={<UserAddOutlined />}
                        onClick={() => navigate(`../ingresar`)}

                    >
                        Agregar Usuario
                    </Button>
                    <Table dataSource={dataSource} columns={columns} onChange={handleChange} />;
                </div>
            </div>
        </div>

    );
};

export default DashBoard;
