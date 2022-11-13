import { sendMail } from "./nodeMailerUtils.js"

const newMail = () => {
    return {
        from: 'e-commerce',
        to: process.env.ADMIN_EMAIL,
        subject: null,
        html: null
    }
}

const sendNewUserEmail = async (user) => {
    const options = newMail();
    options.subject = 'Nuevo usuario registrado'
    options.html = `<h1 style="color: blue;">Datos del usuario:</h1>
                    <ul>
                        <li>Nombre: ${user.name}</li>
                        <li>Dirección: ${user.address}</li>
                        <li>Edad: ${user.age}</li>
                        <li>Número de teléfono: ${user.phoneNumber}</li>
                        <li>Dirección de correo electrónico: ${user.email}</li>
                    </ul>`
    await sendMail(options)
}

const sendNewOrderEmail = async (order) => {
    const options = newMail();
    options.subject = 'Nuevo usuario registrado'
    // options.html = `<h1 style="color: blue;">Datos del usuario:</h1>
    //                 <ul>
    //                     <li>Nombre: ${user.name}</li>
    //                     <li>Dirección: ${user.address}</li>
    //                     <li>Edad: ${user.age}</li>
    //                     <li>Número de teléfono: ${user.phoneNumber}</li>
    //                     <li>Dirección de correo electrónico: ${user.email}</li>
    //                 </ul>`
    await sendMail(options)
}

export { sendNewUserEmail, sendNewOrderEmail }