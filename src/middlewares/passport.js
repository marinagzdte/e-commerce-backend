import passport from 'passport';
import passportLocal from 'passport-local';
import bCrypt from 'bcrypt';
import logger from '../utils/logger.js';
import { cartsDao as cartsApi, usersDao as usersApi } from '../daos/index.js'
/*-----------------------------------------------*/
/*                 passport                      */
/*-----------------------------------------------*/

const isValidPassword = (user, password) => {
    return bCrypt.compareSync(password, user.password);
}

const hash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use('login', new passportLocal.Strategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        try {
            const user = await usersApi.getByCondition({ email: email });
            if (!isValidPassword(user, password)) {
                logger.logWarn('Contraseña inválida.');
                return done(null, false);
            }

            logger.logInfo(`Usuario ${user.email} autenticado.`)
            return done(null, user);
        }
        catch (error) {
            logger.logWarn(`Usuario ${email} no encontrado.`);
            logger.logError(error)
            return done(null, false);
        }
    }

));

passport.use('register', new passportLocal.Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
},
    async (req, username, password, done) => {
        try {
            const user = await usersApi.getByCondition({ email: username });
            if (user) {
                logger.logWarn(`El usuario ${username} ya existe.`);
                return done(null, false);
            }
            const newUser = {
                email: username,
                password: hash(password),
                name: req.body.name,
                age: req.body.age,
                address: req.body.adress,
                phoneNumber: req.body.phoneNumber,
                avatar: req.file.filename,
                cart: await cartsApi.save()
            }

            await usersApi.save(newUser);
            logger.logInfo(`Nuevo usuario registrado: ${newUser.email}`);
            return done(null, newUser);

        } catch (error) {
            logger.logError(`error en registro: ${error}`)
            return done(error);
        }
    }
))

export default passport;