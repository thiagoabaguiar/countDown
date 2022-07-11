// Definição da data do evento
function getDateEvent(date) {

    let dateEventMs = new Date(date).getTime() // capturar do form

    return dateEventMs
}

let dateEventMs = getDateEvent("Nov 10, 2022 10:59:59")



// Contador regressivo
let x = setInterval(function () {

    let dateNowMs = new Date().getTime()
    let diffTimeMs = dateEventMs - dateNowMs

    let days = Math.floor(diffTimeMs / (1000 * 60 * 60 * 24))
    let hours = Math.floor((diffTimeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutes = Math.floor((diffTimeMs % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((diffTimeMs % (1000 * 60)) / 1000)

    document.getElementById("countdown").innerHTML = days + " : " + hours + " : " + minutes + " : " + seconds + " "

    if (diffTimeMs < 0) {

        clearInterval(x);

        document.getElementById("countdown").innerHTML = "0 : 0 : 0 : 0"

    }

}, 1000)



// Modal de Inscrição
const Modal = {

    open() {
        document.querySelector(".modal_overlay").classList.add("active")
    },

    close() {
        document.querySelector(".modal_overlay").classList.remove("active")
        Form.clearFields()
    }

}



// Banco de Dados Local Storage
const Storage = {

    get() {
        return JSON.parse(localStorage.getItem("countdown:subscribers")) || []
    },

    set(subscriptionsDB) {
        localStorage.setItem("countdown:subscribers", JSON.stringify(subscriptionsDB))
    }

}



// Interface com BD
const subscriptions = {

    dataSource: Storage.get(),

    add(subscriber) {
        subscriptions.dataSource.push(subscriber)
    },

    save(subscriptionsDB) {
        Storage.set(subscriptionsDB)
    }

}



// Submit do Form
const Form = {

    name: document.querySelector('input#name'),
    email: document.querySelector('input#email'),

    getValues() {

        return {
            name: Form.name.value,
            email: Form.email.value
        }

    },

    validateFields() {

        const { name, email } = Form.getValues()

        if (name.trim() === "" || email.trim() === "") {
            throw new Error("Por favor, preencha todos os campos!")
        }

    },

    saveSubscriber(subscriber) {

        subscriptions.add(subscriber)
        window.alert('Inscrição efetuada com sucesso!')
    },

    clearFields() {

        Form.name.value = ""
        Form.email.value = ""

    },

    setStorage(subscriptionsDB) {

        subscriptions.save(subscriptionsDB)

    },

    submit(event) {

        event.preventDefault()

        try {

            Form.validateFields()
            Form.saveSubscriber(Form.getValues())
            Form.setStorage(subscriptions.dataSource)
            Form.clearFields()
            Modal.close()

        } catch (error) {

            alert(error.message)

        }

    }

}