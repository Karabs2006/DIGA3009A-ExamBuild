const header = document.querySelector("header");
const footer = document.querySelector("footer");
const hero = document.querySelector(".hero-section");
gsap.registerPlugin(ScrollToPlugin)


const pages = [

    {   name: "Games",
        path: "../index.html",
        indexPath:"index.html",
        color: "#0BA3FF"
    },

    {
        name: "Movies/TV",
        path: "movies.html",
        indexPath: "./html/movies.html",
        color: "#FFEF00",
    },

    {
        name: "Music",
        path: "music.html",
        indexPath:"./html/music.html",
        color: "#E0115F"
    },

    {
        name: "kb's 2026",
        path: "recap.html",
        indexPath: "./html/recap.html",
        color: "#89f336"
    },
    
];

const socialImages = [

    {   image: "../images/twitter.jpg",
        url: "https://x.com/KayyDude"

    },

    {   image:"../images/instagram.png",
        url: "https://www.instagram.com/k4ybeee_/"
    },
    {   image:"../images/xbox.png",
        url:""
    },
    {   image:"../images/github.png",
        url:"https://github.com/Karabs2006"
    },
    

]

header.innerHTML=
`   
<div class="off-screen-menu">

</div>



    <nav >
        <div class="ham-menu">
            <svg viewBox="0 0 30 30">
        <path class="ham-line" d="M3 7 L27 7"/>
        <path class="ham-line" d="M3 15 L27 15"/>
        <path class="ham-line" d="M3 23 L27 23"/>
    </svg>
            
        </div>
       
    </nav>
    <img src="../images/logo.png" id="logo-img">

    <div class="search-area">
        <form>
        <input type="text" class="searchbar" name="searchbar" placeholder="Search..." >
        </form>
        
        <div class="results-head">
            <h1 class="results-text">Results:</h1>
            <button type="button">Clear</button>
        </div>
        <div class="results">
        
        </div>

         <div class="loading-bar">

                <svg>
                    <circle class ="loading-circle" cx="50" cy="50" r="40" />
                </svg>

                <svg>
                    <circle class ="loading-circle" cx="50" cy="50" r="40"  />
                </svg>

                <svg>
                    <circle class ="loading-circle" cx="50" cy="50" r="40"  />
                </svg>

        </div>
    </div>
`
const burgerMenu = document.querySelector(".off-screen-menu")

pages.forEach((page, index) => {
    header.innerHTML += `

        <div class="nav-area" id="page-${index}">
        
            <li class="nav-list">

            <span class="page-btn">
                <a href="${window.location.pathname === '/index.html' ? page.indexPath : page.path}">${page.name}</a>
            </span>
            </li>

            <svg width="50" height="10">
            <path
                class="nav-line"
                d="M0 5 L50 5"
                stroke-dasharray="50"
                stroke-dashoffset="0"
            />
            </svg>
        </div>
    `;


    burgerMenu.innerHTML += 
    `<div class="ham-pages" id="page-${index}">
        
            <li class="nav-list">

            <span class="page-btn">
                <a href="${page.path}">${page.name}</a>
            </span>
            </li>

            <svg width="50" height="10">
            <path
                class="nav-line"
                d="M0 5 L50 5"
                stroke-dasharray="50"
                stroke-dashoffset="0"
            />
            </svg>
        </div>`

});

header.innerHTML +=
`
    <a href="../html/user.html">
    <img src="../images/profile.png" id="profile-img">
    </a>
`

const hamMenu = document.querySelector(".ham-menu");

hamMenu.addEventListener("click",()=>{
    console.log("ham pressed")
    gsap.to(burgerMenu, {
        x: 0
    })
})

//On mouse hover, animate SVG underline for each page link and color it according to it's color property in its respective object
pages.forEach((page, index)=>{

    const currentFile = window.location.pathname.split("/").pop() || "index.html";


    // Extract the filename from page.indexPath (e.g., "./html/movies.html" -> "movies.html")
    const pageFile = page.indexPath.split("/").pop();
    const isCurrentPage = currentFile === pageFile;


    const nav = document.querySelector(`#page-${index}`);
    const line = nav.querySelector(".nav-line");

    let tl = gsap.timeline({ paused: true });
    
    if (isCurrentPage) {
        // Keep the active page's line visible and colored
        gsap.set(line, { drawSVG: "5% 95%", stroke: page.color });
    } 
    
    else {
        tl.fromTo(line,
                { 
                    drawSVG: "0% 0%" 
                },

                {   drawSVG: "5% 95%", 
                    duration: 0.3,
                    stroke: page.color
                }
            );

            nav.addEventListener("mouseenter", ()=>{

                tl.restart();
            })

            nav.addEventListener("mouseleave", ()=>{

                tl.reverse();
            })

    }


    
})


const imgTl = gsap.timeline({paused: true});
if(hero){
    const styles = getComputedStyle(hero); //Access styling properties of the .hero-section

    //On mouse hover, give the hero section image a zoom in effect, and zoom out when the user hovers away
    imgTl.fromTo(hero, 
        {
        backgroundSize: "105%"},
        {
            backgroundSize: "110%",
            duration: 0.5,
            ease: "power2.out"
    })

    hero.addEventListener(("mouseenter"), ()=>{
        imgTl.restart()

    })

    hero.addEventListener(("mouseleave"), ()=>{
        imgTl.reverse()

    })
}

footer.innerHTML =
`
<div class="quote-paragraph">
    <p>
        You forget 1000 things everyday pal. Make sure this is one of them
    </p>

    <p>
    <i>Michael De Santa, Grand Theft Auto V</i>
    </p>
</div>

<button class="footer-btn">
Back To Top
</button>

<div class="socials-section">

</div>

`

const socialContainer = document.querySelector(".socials-section");

socialImages.forEach((image)=>{

    const imgHolder = document.createElement("span");
    imgHolder.innerHTML +=
    `
    <img src="${image.image}">
    `
    socialContainer.appendChild(imgHolder);

    imgHolder.addEventListener("click", ()=>{
        window.open(image.url,'_blank', 'noopener,noreferrer')

    })
})

//CLEAR BUTTON IMPLEMENTAION PER PAGE
const backBtn = document.querySelector(".results-head button");
const resultsContainer = document.querySelector(".results");
const resultsText = document.querySelector(".results-head");

//CLEAR BUTTON EMPTIES RESULTS AREA ON CLICK
backBtn.addEventListener("click",()=>{

    resultsContainer.textContent = "";
    resultsText.style.display ="none";

})

backBtn.addEventListener("mouseenter",()=>{

    gsap.to(backBtn, {
        scale: 1.1,
        duration: 0.2,       
    })
})

backBtn.addEventListener("mouseleave",()=>{

    gsap.to(backBtn, {
        scale: 1
    })
})



export function createTimeline(loadingBubbles){

    const loadingTimeline = gsap.to(loadingBubbles, {

        fill: "#FAFAFA",
        scale: 1.1,
        stagger: 0.1,
        duration: 0.2,
        repeat : -1,
        yoyo: true,
        paused: true
    })

    return loadingTimeline;
}


export function createSearch(searchbarVar, searchFunction){

    searchbarVar.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        event.preventDefault();
        resultsContainer.textContent = "";
        //loadingBar.style.display = "flex";
    
       searchFunction()
    }
    
});
}

/*
function createResultsContainers(){

    const searchbar = document.querySelector(".searchbar");
    const resultsContainer = document.querySelector(".results");
    const resultsText = document.querySelector(".results-head");
    const loadingBar = document.querySelector(".loading-bar");

    return searchbar, resultsContainer, resultsText
}
    */

const footerBtn = footer.querySelector(".footer-btn");

footerBtn.addEventListener("mouseenter", ()=>{
    gsap.to(footerBtn, {
        scaleX: 1.1
    })
})

footerBtn.addEventListener("mouseleave", ()=>{
    gsap.to(footerBtn, {
        scaleX: 1
    })
})

footerBtn.addEventListener("click",()=>{
    gsap.to(window, {
        scrollTo: header,
        ease: "power3.Out"
    })
})