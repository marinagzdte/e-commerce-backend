document.onkeyup = (e) => {
    if (e.target.tagName === 'INPUT') {
        const canSubmit = [...document.forms['login-form'].querySelectorAll('input[type="text"]')]
            .every(i => {
                return i.value
            })
        document.forms['login-form'].querySelector('button[type="submit"]').disabled = !canSubmit
    }
}
