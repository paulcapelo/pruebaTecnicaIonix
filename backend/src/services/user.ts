import { User } from "../entities/User"
import { MysqlDataSource } from '../config/ormconfig'
import uploadFile from "./uploadFile"
import { generarToken } from "../middlewares/checkJwt"

export const getOneUser = async (id) => {
    const user = await MysqlDataSource.manager.findOneBy(User, {
        id,
    })
    if (user) {
        return { transaccion: true, data: user }
    }
    return { transaccion: false, mensaje: "usuario no encontrado" }
}
export const saveUser = async ({ firstname, lastname, email, username, password, profile_img }) => {

    let user = new User();
    user.username = username;
    user.password = password;
    user.lastname = lastname;
    user.firstname = firstname;
    user.email = email;

    //podemos validar parametros antes de guardar

    //Hash tpara la password
    user.hashPassword();

    console.log("useruser", user.id)

    const userRepository = MysqlDataSource.getRepository(User)
    try {
        const USER = await userRepository.save(user);
        if (profile_img) {
            console.log(USER.id)
            return updateOneUser({ id: USER.id, profile_img })
        }
    } catch (e) {
        return ({ transaccioon: false, mensaje: "error guardando usuario", error: e });
    }
    return { transaccion: true, mensaje: "usuario guardando" }
}
export const updateOneUser = async ({ id = '', firstname = '', lastname = '', email = '', username = '', profile_img = '' }) => {

    let result = { mensajeFoto: '' }
    let usuario;

    const userRepository = MysqlDataSource.getRepository(User)

    try {
        usuario = await userRepository.findOneOrFail({ where: { id } });
    } catch (error) {
        return { transaccion: false, mensaje: "User no encontrado" };
    }
    //Guarda imagen de perfil
    const esBase64 = profile_img.split('data:');
    let name_arhivo: string = '';
    if (esBase64.length === 2) {
        name_arhivo = await uploadFile(profile_img, id);
        console.log('name_arhivo', name_arhivo);
        if (name_arhivo === '') {
            result.mensajeFoto = "no se pudo cargar";
        }
    }

    // Se editan valores 
    usuario.firstname = firstname || usuario.firstname;
    usuario.lastname = lastname || usuario.lastname;
    usuario.email = email || usuario.email;
    usuario.username = username || usuario.username;
    usuario.profile_img = name_arhivo || usuario.profile_img;


    try {
        const USER = await userRepository.save(usuario);
    } catch (e) {
        return ({ mensaje: "error guardando usuario", error: e });
    }
    return { transaccion: true, mensaje: "usuario guardado", ...result }

}

export const getListaUsers = async () => {
    
    try {
        const users = await MysqlDataSource.manager.find(User);    
        return { transaccion: true, data: users }
    } catch (e) {
        return ({ mensaje: "error obteniendo usuarios", error: e });
    }
}
export const deleteUsuario = async (id) => {
    const userRepository = MysqlDataSource.getRepository(User)
    try {
        const USER = await userRepository.delete({ id });
        return { transaccion: true, mensaje: "User eliminado" };
    } catch (error) {
        return { transaccion: false, mensaje: "User no encontrado" };
    }
}

export const loginService = async ({ username, password }) => {


    const user = await MysqlDataSource.manager.findOneBy(User, { username })
    if (!user) {
        return { transaccion: false, mensaje: "User no encontrado" };
    }
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
        return { transaccion: false, mensaje: 'Credenciales incorrectas' };
    }
    const token = await generarToken(user.id)
    return { transaccion: true, token, data: user };

}