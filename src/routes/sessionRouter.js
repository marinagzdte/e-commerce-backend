import passport from '../middlewares/passport.js';
import { Router } from 'express';
import logger from '../utils/logger.js';
import { upload, uploadFile } from '../utils/uploadUtils.js';
import { get, getLogin, getLogout, getLoginError, getRegister, getRegisterError, postLogin, postRegister, postOrder } from '../controllers/sessionController.js'

const sessionRouter = new Router();

sessionRouter.get('/login', logger.logReqInfo, getLogin)

sessionRouter.post('/login', passport.authenticate('login', { failureRedirect: '/login/error' }), postLogin);

sessionRouter.get('/logout', logger.logReqInfo, getLogout)

sessionRouter.get('/login/error', logger.logReqInfo, getLoginError)

sessionRouter.get('/register', logger.logReqInfo, getRegister)

sessionRouter.post(
    '/register',
    upload.single('avatar'),
    uploadFile,
    passport.authenticate('register', { failureRedirect: '/register/error' }),
    postRegister);

sessionRouter.get('/register/error', logger.logReqInfo, getRegisterError)

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated())
        next();
    else
        res.redirect('/login');
}

sessionRouter.get('/', checkAuth, get);

sessionRouter.post('/order', postOrder)

export default sessionRouter;