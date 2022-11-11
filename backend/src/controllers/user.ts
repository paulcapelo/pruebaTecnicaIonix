import { getOneUser, saveUser, getListaUsers, updateOneUser, deleteUsuario, loginService } from "../services/User"
export const createUser = async (req, res) => {
    const data = await saveUser(req.body)
    res.json(data);
}
export const deleteUser = async (req, res) => {
    const id = req.params.id
    const data = await deleteUsuario(id)
    res.json(data);
}
export const updateUser = async (req, res) => {
    const id = req.params.id
    const data = await updateOneUser({ id, ...req.body })
    res.json(data);
}
export const getUser = async (req, res) => {
    const id = req.params.id
    const data = await getOneUser(id)
    res.json(data);
}
export const getListUser = async (req, res) => {
    const data = await getListaUsers()
    res.json(data);
}
export const login = async (req, res) => {
    const data = await loginService(req.body)
    res.json(data);
}