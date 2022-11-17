import logger from '../utils/logger.js';
import { sendNewOrderEmail, sendNewUserEmail } from '../utils/emailUtils.js';
import { cartsDao, productsDao } from '../daos/index.js';
import { sendMessage } from '../utils/twilioUtils.js';

const getLogin = (req, res) => {
    res.render('login')
}

const postLogin = (req, res) => {
    res.redirect('/')
}

const getLogout = (req, res) => {
    req.logout({ keepSessionInfo: false }, (err) => res.redirect('/'))
}

const getLoginError = (req, res) => {
    res.render('autherror', { loginError: true })
}

const getRegister = (req, res) => {
    res.render('register');
}

const postRegister = async (req, res) => {
    await sendNewUserEmail(req.user)
    res.redirect('/login')
}

const getRegisterError = (req, res) => {
    res.render('autherror', { registerError: true })
}

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated())
        next();
    else
        res.redirect('/login');
}

const get = async (req, res) => {
    const prods = await productsDao.getAll()
    res.render('main', { name: req.user.name, email: req.user.email, age: req.user.age, phoneNumber: req.user.phoneNumber, address: req.user.address, avatar: req.user.avatar, products: prods, cart: req.user.cart });
}

const postOrder = async (req, res) => {
    const order = req.body
    logger.logInfo(`Se recibió un pedido del usuario ${order.user.name}`)

    sendMessage('Tu pedido fue recibido y está en proceso.', order.user.phoneNumber);
    await sendNewOrderEmail(order);
}

export { get, getLogin, getLogout, getLoginError, getRegister, getRegisterError, postLogin, postRegister, postOrder }