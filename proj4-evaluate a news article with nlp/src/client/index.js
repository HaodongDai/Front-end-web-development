/* entry point for webpack, place where dream starts */
// import all js function from 'js' folder
import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'

// import all sass file from 'styles' folder

import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/resets.scss'

// import all the images
import logo1 from './views/img/facebook logo.png'
import logo2 from './views/img/Github-Mark-64px.png'
import logo3 from './views/img/LI-In-Bug.png'
import logo4 from './views/img/Twitter_Logo_Blue.png'
import logoMain from './views/img/nlp-logo.jpg'
document.getElementById('logo1').src = logo1
document.getElementById('logo2').src = logo2
document.getElementById('logo3').src = logo3
document.getElementById('logo4').src = logo4
document.getElementById('logoMain').src = logoMain

export {
    checkForName,
    handleSubmit
}