import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from './middlewares/passport.js';
import { engine } from 'express-handlebars';
import compression from 'compression';
import { cartRouter, productRouter, sessionRouter } from "./routes/index.js";

const app = express();

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000,
        httpOnly: false,
        secure: false
    },
    rolling: true
}));

app.use(passport.initialize())
app.use(passport.session())

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: "./public/views/layouts",
    partialsDir: "./public/views/partials"
}));
app.set('view engine', 'hbs');
app.set('views', "./public/views");

app.use(compression())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/imgs", express.static(`public/imgs`));

app.use('/api/productos', productRouter)
app.use('/api/carrito', cartRouter)
app.use('', sessionRouter);

app.all('*', (req, res) => {
    res.status(405).json({ error: -2, descripcion: `ruta ${req.url} metodo ${req.method} no implementado` })
});

export default app;