if (document.readyState === 'complete') {
    document.onkeyup = (e) => {
        if (e.target.tagName === 'INPUT') {
            const canSubmit = [...document.forms.form.querySelectorAll('input[type="text"],input[type="url"],input[type="number"]')]
                .every(i => {
                    return i.value
                })
            document.forms.form.querySelector('button[type="submit"]').disabled = !canSubmit
        }
    }
}

const getSubtotal = () => {
    const checkoutDiv = document.querySelector('div.total-amount')
    return Number(checkoutDiv.innerHTML.slice(1))
}

const setSubtotal = (newTotal) => {
    const checkoutDiv = document.querySelector('div.total-amount')
    checkoutDiv.innerHTML = `$${newTotal}`
}

const getCount = (prod) => {
    const counter = document.querySelector(`#${prod.name.split(' ').join('')}-count`)
    return Number(counter.innerHTML)
}

const setCount = (prod, count) => {
    const counter = document.querySelector(`#${prod.name.split(' ').join('')}-count`)
    counter.innerHTML = count
}

const resetCounters = () => {
    document.querySelectorAll('div.count').forEach(c => c.innerHTML = 0)
    setSubtotal(0);
}

function modifyOrder(product, add) {
    const subtotal = getSubtotal()

    if (add) {
        newCount = getCount(product) + 1
        newSubtotal = subtotal + product.price
    }
    else {
        newCount = getCount(product) - 1
        newSubtotal = subtotal - product.price
    }

    setCount(product, newCount)
    setSubtotal(newSubtotal)
}

const getName = (prod) => prod.name.split(' ').join('')

const addToCart = (prod, cart) => {
    const product = JSON.parse(prod)
    const request = new XMLHttpRequest()
    request.open("POST", `/api/carrito/${cart}/productos`, true);
    request.addEventListener("load", modifyOrder(product, true));
    request.setRequestHeader('Content-Type', 'application/json')
    request.send(prod);
}

const removeFromCart = (prod, cart) => {
    const product = JSON.parse(prod)
    if (getCount(product) === 0) return false
    const request = new XMLHttpRequest()
    request.open("DELETE", `/api/carrito/${cart}/productos/${product._id}`, true);
    request.addEventListener("load", modifyOrder(product, false));
    request.setRequestHeader('Content-Type', 'application/json')
    request.send();
}

const emptyCart = (cart) => {
    const request = new XMLHttpRequest()
    request.open("DELETE", `/api/carrito/${cart}/productos`, true);
    request.addEventListener("load", resetCounters());
    request.send();
}

const getOrderDetails = () => {
    let order = { products: [], total: 0, user: null }

    const user = document.querySelector('form#user')
    const name = user.querySelector('#name').innerHTML.slice(11)
    const email = user.querySelector('#email').innerHTML
    const phoneNumber = user.querySelector('#phoneNumber').innerHTML
    order.user = {
        name: name,
        email: email,
        phoneNumber: phoneNumber
    }

    const prods = document.querySelector('form#order').querySelectorAll('.prod')
    for (let prod of prods) {
        const count = Number(prod.querySelector('.count').innerHTML)
        if (count === 0) continue

        const name = prod.querySelector('.name').innerHTML
        const price = Number(prod.querySelector('.price').innerHTML.slice(1))

        order.products.push({ name: name, amount: count, price: price })
        order.total += count * price
    }

    return order
}

const tryPostOrder = () => {
    const order = getOrderDetails();
    const request = new XMLHttpRequest()
    request.open("POST", "/order", true);
    request.setRequestHeader('Content-Type', 'application/json')
    request.send(JSON.stringify(order));
    emptyCart();
}