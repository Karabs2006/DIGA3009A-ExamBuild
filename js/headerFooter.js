const header = document.querySelector("header");
const footer = document.querySelector("footer");
const hero = document.querySelector(".hero-section");


const pages = [

    {   name: "Games",
        path: ".././index.html",
        color: "#0BA3FF"
    },

    {
        name: "Movies/TV",
        path: "movies.html",
        color: "#FFEF00",
    },

    {
        name: "Music",
        path: "music.html",
        color: "#E0115F"
    },

    {
        name: "kb's 2026",
        path: "recap.html",
        color: "#89f336"
    },
    
];

const socialImages = [

    "../images/twitter.jpg",
    "../images/instagram.png",
    "../images/xbox.png",
    "../images/github.png",
]

header.innerHTML=
`
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

pages.forEach((page, index) => {

    header.innerHTML += `

        <div class="nav-area" id="page-${index}">
        
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
        </div>
    `;

});

header.innerHTML +=
`
    <a href="./html/user.html">
    <img src="../images/profile.png" id="profile-img">
    </a>
`

//On mouse hover, animate SVG underline for each page link and color it according to it's color property in its respective object
pages.forEach((page, index)=>{

    const nav = document.querySelector(`#page-${index}`);
    const line = nav.querySelector(".nav-line");

    let tl = gsap.timeline({ paused: true });
    
    
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


    
})


const imgTl = gsap.timeline({paused: true});
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

<button class="back-btn">
Back To Top
</button>

<div class="socials-section">

</div>

`

const socialContainer = document.querySelector(".socials-section");

socialImages.forEach((image)=>{

    socialContainer.innerHTML +=
    `
    <img src="${image}">
    `
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


export function createSearch(searchbarVar, url, searchFunction){

    searchbarVar.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        event.preventDefault();
        resultsContainer.textContent = "";
        //loadingBar.style.display = "flex";
    
       searchFunction(url)
    }
    
});
}


function createResultsContainers(){

    const searchbar = document.querySelector(".searchbar");
    const resultsContainer = document.querySelector(".results");
    const resultsText = document.querySelector(".results-head");
    const loadingBar = document.querySelector(".loading-bar");

    return searchbar, resultsContainer, resultsText
}