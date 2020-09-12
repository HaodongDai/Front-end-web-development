import { postUserInput, updateUI } from './app'

async function handleSubmit(event) {
    event.preventDefault();
    const data = {location: document.getElementById('location').value, 
     dateOfLeaving: document.getElementById('date').value}
    await postUserInput('/postRoute', data).then(data=>updateUI(data))
}

export { handleSubmit }
