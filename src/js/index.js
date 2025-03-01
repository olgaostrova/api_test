// //импорт стилей
import '../index.css'

function renderPosts(data) {
  data.forEach(post => {
      renderPost(post)
  });
}

function renderPost(data) {
    const container = document.querySelector('.posts')

    const postCard = document.createElement('div')
    postCard.classList.add('postCard')

    const postTitle = document.createElement('h2')
    postTitle.innerText = data.title

    const postText = document.createElement('p')
    postText.innerHTML = data.text

    //const postImage = document.createElement('img')
    //postImage.src = data.cover.q70.url

    //postCard.appendChild(postImage)
    postCard.appendChild(postTitle)
    postCard.appendChild(postText)

    container.appendChild(postCard)
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/api/v1/posts.json')
    .then((response) => {
      response.json().then((data) => { 
        console.log('POST', data[0])
        renderPosts(data)
      })
    })
    .catch((error) => {
      console.log('ERROR', error)
    })
})

// //подключение реакта
// import React from 'react'
// import * as ReactDOMClient from 'react-dom/client'
// import App from './App'

// const app = ReactDOMClient.createRoot(document.getElementById('app'))
// app.render(<App />)
