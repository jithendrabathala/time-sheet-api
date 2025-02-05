import { Router } from 'express';
import { login, logout, refreshToken, register } from '../controllers/auth.controller';
import { validateBody } from '../middlewares/validate';
import { SignInSchema, SignUpSchema } from '../validations';

const router: Router = Router();

router.post('/register', validateBody(SignUpSchema), register);
router.post('/login', validateBody(SignInSchema), login);

router.get('/logout', logout);

router.get('/refresh-token', refreshToken);

export default router;
