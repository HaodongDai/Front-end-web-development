import { postUserInput } from './app'

function handleSubmit(event) {
    event.preventDefault();
    const data = {location: document.getElementById('location').value, 
     dateOfLeaving: document.getElementById('date').value}
    console.log(document.getElementById('date').value);
    postUserInput('/postRoute', data)
}

export { handleSubmit }
