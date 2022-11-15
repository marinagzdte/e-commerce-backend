import passport from '../middlewares/passport.js';
import { Router } from 'express';
import logger from '../utils/logger.js';
import { upload, uploadFile } from '../utils/uploadUtils.js';
import { sendNewOrderEmail, sendNewUserEmail } from '../utils/emailUtils.js';
import { productsDao } from '../daos/index.js';
import { sendMessage } from '../utils/twilioUtils.js';

const sessionRouter = new Router();

sessionRouter.get('/login', logger.logReqInfo, (req, res) => {
    res.render('login')
})

sessionRouter.post('/login', passport.authenticate('login', { failureRedirect: '/login/error' }), (req, res) => res.redirect('/'));

sessionRouter.get('/logout', logger.logReqInfo, (req, res) => {
    req.logout({ keepSessionInfo: false }, (err) => res.redirect('/'))
})

sessionRouter.get('/login/error', logger.logReqInfo, (req, res) => {
    res.render('autherror', { loginError: true })
})

sessionRouter.get('/register', logger.logReqInfo, (req, res) => {
    res.render('register');
})

sessionRouter.post(
    '/register',
    upload.single('avatar'),
    uploadFile,
    passport.authenticate('register', { failureRedirect: '/register/error' }),
    async (req, res) => {
        await sendNewUserEmail(req.user)
        res.redirect('/login')
    });

sessionRouter.get('/register/error', logger.logReqInfo, (req, res) => {
    res.render('autherror', { registerError: true })
})

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated())
        next();
    else
        res.redirect('/login');
}

sessionRouter.get('/', checkAuth, async (req, res) => {
    const prods = await productsDao.getAll()
    res.render('main', { name: req.user.name, email: req.user.email, age: req.user.age, phoneNumber: req.user.phoneNumber, address: req.user.address, avatar: req.user.avatar, products: prods });
});

sessionRouter.post('/order', async (req, res) => {
    const order = req.body
    logger.logInfo(`Se recibió un pedido del usuario ${order.user.name}`)

    sendMessage('Tu pedido fue recibido y está en proceso.', order.user.phoneNumber);
    await sendNewOrderEmail(order);
})

export default sessionRouter;