/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

/* return a nodelist of all sections in html, prefix required */ 
const sections = document.querySelectorAll('section');

/* return the navigation bar ul element, prefix required */
const navbar = document.querySelector('#navbar__list');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/* check the largest section that is actively viewed in the viewport */
function getActiveSection() {
    if (sections.length == 0) {
        return null;
    }
    
    let min = 10000;
    let ret = sections[0];
    let elementHeight = 0;

    // get the nearest element from the top of viewport 
    for (const section of sections) {
        let rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            if (rect.top < min) {
                min = rect.top;
                ret = section;
                elementHeight = section.clientHeight;
            }
        }
    }
    
    // if any section with part of it within the viewport, then choose the largest section as the active one
    for (const section of sections) {
        let rect = section.getBoundingClientRect();
        if (rect.top < 0 && rect.bottom > 0 && rect.bottom > elementHeight) {
            ret = section;
        }
    }
    
    return ret;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildnav() {
    for (let section of sections) {
        let navItem = document.createElement('li');
        navItem.className = 'menu__link'; //correspond to css file
        navItem.innerText = section.dataset.nav; // from data-nav attribute of element section in html
        navbar.appendChild(navItem);
    } 
}

// Add class 'active' to section when near top of viewport
function addActive() {
    // add an scroll event
    window.addEventListener('scroll', function() {
        //remove active-class from all of the sections
        for (let section of sections) {
            if (section.classList.contains('active-class')) {
                section.classList.remove('active-class');
            }
        }
        let activeSection = getActiveSection();
        activeSection.classList.add('active-class');        
    }) 
}

// Add functionality to scroll to section by listening to 'click' event
function scrollToSection() {
    //the navigation bar 'navbar' listen to the click event (event delegation)
    navbar.addEventListener('click', function(event) {
        let name = event.target.innerText.replace(' ', '').toLowerCase();
        let section = document.getElementById(name);
        section.scrollIntoView();
    })
}

//build menu
buildnav();

// Scroll to section on link click
scrollToSection();

// Set sections as active
addActive();

