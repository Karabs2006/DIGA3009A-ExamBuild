const header = document.querySelector("header");
const footer = document.querySelector("footer");
const hero = document.querySelector(".hero-section");

const pages = [

    {   name: "Games",
        path: "index.html",
    },

    {
        name: "Movies/TV",
        path: "./html/movies.html"
    },

    {
        name: "Music",
        path: "./html/music.html"
    },

    {
        name: "kb's 2026",
        path: "./html/recap.html"
    },
    
];

header.innerHTML=
`
    <img src="./images/logo.png" id="logo-img">

    <div class="search-area">
        <form>
        <input type="text" class="searchbar" name="searchbar" placeholder="Search..." >
        </form>
        
        <div class="results">
        <h1>Results:</h1>
        </div>
    </div>
`

pages.forEach((page) => {

    header.innerHTML += `
        <li class="nav-list">
            <a href="${page.path}">${page.name}</a>
        </li>
    `;
});

header.innerHTML +=
`
    <a href="./html/user.html">
    <img src="./images/profile.png" id="profile-img">
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

`

