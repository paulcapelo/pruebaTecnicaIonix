import { notification } from "antd";
import { useState } from "react";
import useSWR from "swr";
import { useAuth } from "../context/useContext";
import { fetcher, url } from "../services";

export const useListUser = () => {

    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)
    const { user } = useAuth()


    const getData = async () => {

        setloading(true)
        const fetcherParams = {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${user?.token}`,
            })
        };

        const {data,transaccion,mensaje} = await fetch(`${url}/user`, fetcherParams).then(resp => resp.json())
        setdata(data)
        setloading(false)

        if(!transaccion){
            notification.open({
                message: mensaje || "No se pudieron recuperar los datos",
                description: "",
            });
        }

    }

    return {
        loading,
        data,
        getData

    };
}
