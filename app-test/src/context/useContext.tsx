import { useState, useContext, createContext, FC, ReactNode, SetStateAction, Dispatch } from "react";
import { UserInfo, UserType } from "../models";

interface Props {
    children?: ReactNode,
    usuario: UserType
}
type UpdateType = Dispatch<SetStateAction<typeof UserInfo>>;
const defaultUpdate: UpdateType = () => UserInfo;

const UserContext = createContext({ user: UserInfo, setUser: defaultUpdate });

export const AuthProvider: FC<Props> = ({ children, usuario }) => {
    const [user, setUser] = useState<UserType>(usuario || UserInfo);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);
