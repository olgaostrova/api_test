import '../index.css'

import Cookies from 'js-cookie'

function switchToGuestView() {
  document.body.classList.remove('userView')
  document.body.classList.add('guestView')
}

function switchToUserView() {
  document.body.classList.remove('guestView')
  document.body.classList.add('userView')
}

function initSignInForm() {
    const form = document.getElementById('signInForm')
    const submit = form.querySelector('input[type=submit]')
    const url = form.action
    console.log(form, form.action, submit)

    submit.addEventListener('click', (e) => {
        console.log('click')
        e.preventDefault()

        const formContent = new FormData(form)
        console.log(formContent)

    fetch(url, {
        method: 'POST',
        body: formContent
    })
    .then((response) => {
        response.json().then((data) => {
            console.log('RESPONSE', data)
            form.reset()
            Cookies.set('jti', data.jti)
            switchToUserView()
        })
    })
    .catch((error) => {
        console.log('ERROR', error)
    })
    })
}

function initSignUpForm() {
  const form = document.getElementById('signUpForm')
  const submit = form.querySelector('input[type=submit]')
  const url = form.action
  console.log(form, form.action, submit)

  submit.addEventListener('click', (e) => {
      e.preventDefault()

      const formContent = new FormData(form)
      console.log(formContent)

  fetch(url, {
      method: 'POST',
      body: formContent
  })
  .then((response) => {
      response.json().then((data) => {
          Cookies.set('jti', data.jti)
          switchToUserView()
      })
  })
  .catch((error) => {
      console.log('ERROR', error)
  })
  })
}

function initSignOutLink() {
  const link = document.getElementById('signOutLink')
  const url = link.href

  link.addEventListener('click', (e) => {
      e.preventDefault()

      const requestBody = {
        jti: Cookies.get('jti')
      }
      
      fetch(url, {
          method: 'POST',
          body: JSON.stringify(requestBody)
      })
      .then((response) => {
          response.json().then((data) => {
              console.log('RESPONSE', data)
              Cookies.remove('jti')
              switchToGuestView()
          })
      })
      .catch((error) => {
          console.log('ERROR', error)
      })
  })
}

function initPostForm() {
  const form = document.getElementById('postForm')
  const submit = form.querySelector('input[type=submit]')
  const url = form.action

  submit.addEventListener('click', (e) => {
    e.preventDefault()

    const formContent = new FormData(form)

    fetch(url, {
      headers: {
        Authorization: Cookies.get('jti')
      },
      method: 'POST',
      body: formContent
    })
    .then((response) => {
      response.json().then((data) => {
        console.log('RESPONSE', data)
        form.reset()
      })
    })
    .catch((error) => {
      console.log('ERROR', error)
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const jti = Cookies.get('jti')
  console.log(jti)

  initSignInForm()
  initSignUpForm()
  initSignOutLink()
  initPostForm()

  if (jti) {
    switchToUserView()
  } else {
    switchToGuestView()
  }
})