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

/* return a HTML collection of all section elements in html */ 
const allSections = document.getElementsByTagName('section');

/* return the nav ul element */
const navigationMenu = document.getElementById('navbar__list');

/* set the first section as the default nearestSection */
let nearestSection = allSections[0];

/* get the back-to-top icon */
const topIcon = document.getElementById('back-to-top-icon');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/* return the section fully in viewport and nearest to the top */
function getTopSectionInViewport() {
    //if there is no section element in the html, then return null
    if (allSections.length === 0) {return null}
    
    let min = Infinity;
    //get the nearest element to the top of viewport
    for (let i = 0; i < allSections.length; i++) {
        let rect = allSections[i].getBoundingClientRect();
        let top = rect.top;
        let left = rect.left;
        let bottom = rect.bottom;
        let right = rect.right;
        if (top >= 0 && 
            left >= 0 && 
            bottom <= window.innerHeight && 
            right <= window.innerWidth) {
                if (top < min) {
                    min = top;
                    // nearestSection is a global variable
                    nearestSection = allSections[i];
                }
            }
    }
}

/* compare the nearest section to section with lower part of it within the viewport,
   and return the largest one as the active section */
function getTopSection() {
    getTopSectionInViewport();
    for (section of allSections) {
            let rect = section.getBoundingClientRect();
            if (rect.top < 0 && rect.bottom > 0 && rect.bottom > nearestSection.clientHeight) {
                nearestSection = section;
            }
    }
    return nearestSection;
}

/* remove the active class from all of the sections attributes */
function removeActiveClass() {
    /* no need to check whether this active-class exist in section attribute
       by using the classList.remove() method  */
    for (section of allSections) {
        section.classList.remove('active-class');
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/* highlight the current active section in navigation menu with yellow background */
function highlightActiveNavItem() {
    let navItems = document.getElementsByClassName('menu__item');
    let activeSection = document.querySelector('.active-class');
    //get active section in navigation menu
    let activeNavSection = document.getElementById('navItem-' + activeSection.id);
    for (navItem of navItems) {
        navItem.removeAttribute('style');
    }
    activeNavSection.style.background = 'yellow';
}

/* change class of back-to-top icon */
function backToTop() {
    // record current scroll distance at y-axis
    let scrollY = window.scrollY;
    // when at the top of page, this icon is hidden
    (scrollY > 0) ? topIcon.className = 'back-to-top-link show' : topIcon.className = 'back-to-top-link hide';
}
window.addEventListener('scroll', backToTop);

/* performing the scrolling to top functionality */
function scrollToTop() {
    //get the number of pixels that body is scrolled vertically
    const distance = document.documentElement.scrollTop;
    if (distance > 0) {
        window.scrollTo(0, 0);
    }
}
topIcon.addEventListener('click', scrollToTop);


/* hide fixed navigation menu while not scrolling for more than 5s
   and show navigation menu while scrolling */
const nav = document.querySelector('nav');
let timeout;
window.addEventListener('scroll', function() {
    nav.className = 'navbar__menu show';
    //clear all timeout, so the timer will starts just after the last scrolling
    clearTimeout(timeout);
    //when not scrolling for more than 5s, the navigation menu is hidden
    timeout = setTimeout(function() {
        nav.className = 'navbar__menu hide';
    }, 5000);
});


//build menu
for (let section of allSections) {
    let navItem = document.createElement('li');
    navItem.setAttribute('class', 'menu__item') // correspond to style.css
    navItem.textContent = section.dataset.nav;
    navItem.id = 'navItem-' + section.id;
    navigationMenu.appendChild(navItem);
} 

// Scroll to section on link click
navigationMenu.addEventListener('click', function(event) {
    let sectionId = event.target.innerText.replace(' ','').toLowerCase()
    document.getElementById(sectionId).scrollIntoView({behavior: 'smooth'});
})

// Set sections as active, listen to the scroll event
window.addEventListener('scroll', function() {
    highlightActiveNavItem();
    //remove active-class from all of the sections
    removeActiveClass();
    let activeSection = getTopSection();
    /*if the active-class already exists in activeSection, classList method will not
      add the class again */
    activeSection.classList.add('active-class');        
}) 

