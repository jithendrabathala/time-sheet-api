import { Router } from 'express';
import { login, logout, refreshToken, register } from '../controllers/auth.controller';
import { validateBody } from '../middlewares/validate';
import { SignInSchema, SignUpSchema } from '../validations';

const authRouter: Router = Router();

authRouter.post('/register', validateBody(SignUpSchema), register);
authRouter.post('/login', validateBody(SignInSchema), login);

authRouter.get('/logout', logout);

authRouter.get('/refresh-token', refreshToken);

export default authRouter;
