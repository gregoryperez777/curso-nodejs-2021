const url = (window.location.hostname.includes('localhost'))
        ? 'http://localhost:8080/api/auth'
        : 'https://noderestserver-curso-gregory.herokuapp.com/api/auth';

function handleCredentialResponse(response) {
    console.log('Google Token', response.credential);

    const body = { id_token: response.credential }

    fetch(`${url}/google`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
        .then(resp => resp.json())
        .then(({ token }) => {
            console.log('JSON Web Token', token);
            localStorage.setItem('token', token);
            window.location = 'chat.html'

        })
        .catch(console.warn);
}

const button = document.getElementById('google_signout');

button.onclick = () => {
    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect();

    google.accounts.id.revoke(localStorage.getItem('email'), done => {
        localStorage.clear();
        location.reload();
    });
}

const myForm = document.querySelector('form');

myForm.addEventListener('submit', ev => {
    ev.preventDefault();

    const formData = {};

    for (let element of myForm.elements) {
        if (element.name.length > 0) 
            formData[element.name] = element.value
    }

    const option = {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'content-type': 'application/json'
        }
    }

    fetch (`${url}/login`, option)
        .then(resp => resp.json())
        .then(({ msg, token }) => {
            if (msg) {
                console.error(msg)
            }

            localStorage.setItem('token', token);
            window.location = 'chat.html'
        })
        .catch(err => { console.log(err) })
});