// This is the entry point for webpack, import main javascript functions,scss and img 
import { postUserInput } from './js/app'
import { handleSubmit, handleDelete } from './js/submitForm'

// import all scss styles
import './style/style.scss'


// import all images
//import headlineImg from './views/img/page-background.png'


//Event listener
//onsubmit="return Client.handleSubmit(event)" onclick="return Client.handleSubmit(event)
document.getElementById('save-trip').addEventListener('click', handleSubmit);
document.getElementById('delete-trip').addEventListener('click', handleDelete);

export { postUserInput, handleSubmit, handleDelete }