const header = document.querySelector("header");
const footer = document.querySelector("footer");
const hero = document.querySelector(".hero-section");


const pages = [

    {   name: "Games",
        path: ".././index.html",
    },

    {
        name: "Movies/TV",
        path: "movies.html"
    },

    {
        name: "Music",
        path: "music.html"
    },

    {
        name: "kb's 2026",
        path: "recap.html"
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

pages.forEach((page) => {

    header.innerHTML += `
        <div class="nav-area">
        <li class="nav-list">
            <a href="${page.path}">${page.name}</a>
        </li>
        <svg>
                <path
                    class="nav-line"
                    d="M20 50 L60 50"
                    stroke-dasharray="300" 
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

