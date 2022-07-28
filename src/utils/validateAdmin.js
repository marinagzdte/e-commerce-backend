
const validateAdmin = (req, res, next) => {
    if (req.headers.admin)
        next();
    else {
        res.status(401).json({ error: -1, descripcion: `ruta ${req.baseUrl} metodo ${req.method} no autorizado` });
    }
};

export default validateAdmin;