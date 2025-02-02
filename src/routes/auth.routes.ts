import { Router } from 'express';
import { login, logout, refreshToken, register } from '../controllers/auth.controller';

const authRouter: Router = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

authRouter.get('/logout', logout);

authRouter.get('/refresh-token', refreshToken);

export default authRouter;
