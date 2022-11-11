/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 */

 import { Request, Response, NextFunction } from 'express';
 import * as jwt from 'jsonwebtoken';

 export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
   //obtengo JWT del header
   let token = req.headers.authorization ?? '';
   if (!token.includes('Bearer ')) {
       res.status(402).send({
           message: 'Token missing, need a JWT auth'
        });
        return;
    }
    
    let jwtPayload;
    token = token.split(' ').pop();
 
   //validoToken
   try {
     jwtPayload = <any>jwt.verify(token, 'config.jwtSecret');
     res.locals.jwtPayload = jwtPayload;
   } catch (error) {
     //if token no es validoo respondo 401 (unauthorized)
     res.status(401).send({ token: false, mensaje:'Token is not valid,' });
     return;
   }
   next();
 };
 
 export const generarToken=async (userId)=>{
    const expiresIn = '365D'
    const token = await jwt.sign({ userId }, 'config.jwtSecret', {
        expiresIn,
      });
      return token;
 }