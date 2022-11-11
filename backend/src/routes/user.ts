import { Router } from 'express';
import {
    createUser,
    deleteUser,
    updateUser,
    getUser,
    getListUser,
    login
} from '../controllers/user'
import { checkJwt } from '../middlewares/checkJwt';
const router = Router()

//Servicios del usuario - solo login no aplica JWT

router.get('', [checkJwt],getListUser);
router.get('/:id',[checkJwt],getUser);
router.post('',[checkJwt],createUser);
router.delete('/:id',[checkJwt],deleteUser);
router.put('/:id',[checkJwt],updateUser);
router.post('/login',login);



export default router 