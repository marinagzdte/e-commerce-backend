import passport from '../middlewares/passport.js';
import { Router } from 'express';
import logger from '../utils/logger.js';

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

sessionRouter.post('/register', passport.authenticate('register', { failureRedirect: '/register/error' }), (req, res) => { res.redirect('/login') });

sessionRouter.get('/register/error', logger.logReqInfo, (req, res) => {
    res.render('autherror', { registerError: true })
})

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated())
        next();
    else
        res.redirect('/login');
}

/*-----------------------------------------------*/
/*                   routes                      */
/*-----------------------------------------------*/

sessionRouter.get('/', checkAuth, (req, res) => {
    res.render('main', { name: req.user.name, username: req.user.username });
});

export default sessionRouter;