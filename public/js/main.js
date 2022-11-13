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
const getDetails = (prod) => {
    return {
        count: Number(prod.querySelector('div.count').innerHTML),
        price: Number(prod.querySelector('div.amount').innerHTML.slice(1))
    }
}

const setCount = (prod, count) => {
    prod.querySelector('div.count').innerHTML = count
}

const getSubtotal = () => {
    const checkoutDiv = document.querySelector('div.total-amount')
    return Number(checkoutDiv.innerHTML.slice(1))
}

const setSubtotal = (newTotal) => {
    const checkoutDiv = document.querySelector('div.total-amount')
    checkoutDiv.innerHTML = `$${newTotal}`
}

const addToCart = (prod) => {
    const details = getDetails(prod)
    const subtotal = getSubtotal()

    setCount(prod, details.count + 1)
    setSubtotal(subtotal + details.price)
}

const removeFromCart = (prod) => {
    const details = getDetails(prod)
    if (details.count === 0) return false
    const subtotal = getSubtotal()

    setCount(prod, details.count - 1)
    setSubtotal(subtotal - details.price)
}

const emptyCart = () => {
    document.querySelectorAll('div.count').forEach(c => c.innerHTML = 0)
    setSubtotal(0)
}