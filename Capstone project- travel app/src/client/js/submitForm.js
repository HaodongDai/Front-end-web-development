import { postUserInput, deleteUserInput, updateUI } from './app'

async function handleSubmit(event) {
    event.preventDefault();
    const data = {location: document.getElementById('location').value, 
     dateOfLeaving: document.getElementById('date').value}
    postUserInput('/postRoute', data).then(data=>updateUI(data))
}

async function handleDelete(event) {
    event.preventDefault;
    deleteUserInput('/deleteRoute', {location: document.getElementById('location').value});
}

export { handleSubmit,
         handleDelete }
