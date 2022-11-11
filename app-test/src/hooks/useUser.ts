import { useContext, useState } from "react";
import { useAuth } from "../context/useContext";
// import useSWR from "swr";
import { UserInfo } from "../models";
import { url } from '../services'
export const useUser = () => {
    const { user, setUser } = useAuth();
    const [error, seterror] = useState('')
    const [loading, setloading] = useState(false);

    interface Props {
        username: string, password: string
    }

    const login = async ({ username, password }: Props) => {
        setloading(true);
        seterror('')
        const { data, token, transaccion, mensaje } = await fetch(`${url}/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        }).then((res) => res.json());
        if (transaccion) {
            setUser({ ...data, token });
            localStorage.setItem("data-user", JSON.stringify({ ...data, token }));
        } else {
            seterror(mensaje)
        }
        setloading(false);
    };

    const logout = () => {
        setUser(UserInfo);
        localStorage.setItem("data-user", JSON.stringify(UserInfo));
    };

    return {
        user,
        mutate: login,
        logout,
        error,
        loading
    };
};
