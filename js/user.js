/*
const catergoryHeaders = document.querySelectorAll(".section-head");

catergoryHeaders.forEach((section) =>{
    
    const clearBtn = document.createElement("button");
    clearBtn.type = "button"
    clearBtn.textContent = "Clear"

    section.appendChild(clearBtn);

})
*/
import { createCard } from "./games.js";





// MUSIC
const savedSongsContainer = document.querySelector(".music-container");

const savedSongs = JSON.parse(localStorage.getItem("savedSongs")) || [];

savedSongs.forEach((song) => {

    const card = document.createElement("div");

    card.classList.add("song-card");

    card.innerHTML = `
        <img src="${song.artworkUrl100}" class="album-artwork">

        <div class="song-info">
            <h2>${song.trackCensoredName}</h2>
            <p>${song.artistName}</p>
            <p>${song.collectionName}</p>
        </div>

        <div class="user-buttons">

            <svg xmlns="http://www.w3.org/2000/svg"
                width="16" height="16" fill="currentColor"
                class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg"
                width="16" height="16" fill="currentColor"
                class="bi bi-plus" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>

        </div>
    `;

    savedSongsContainer.appendChild(card);

});

// MOVIES

const savedMoviesContainer = document.querySelector(".movie-container");

const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];


savedMovies.forEach((movie)=>{

        const card = document.createElement("div");
        card.classList.add("poster");


        card.innerHTML =
        `
            <img src ="${movie.Poster}">
        `
savedMoviesContainer.appendChild(card);

})

// GAMES
const gamesSection = document.querySelector("#user-games");




const savedGamesContainer = document.querySelector(".games-container");

const savedGames = JSON.parse(localStorage.getItem("savedGames")) || [];



savedGames.forEach((game)=>{

    const card = createCard(game, savedGamesContainer, "game-card", false);

    const fillPath = card.querySelector(".fill-path");

    fillPath.style.fill = "#ff00ff";

    fillPath.addEventListener("click",()=>{
        
    })

    
})

function clearCollection(sectionKey, list){

    
    // 1. Clear the array in memory (works with 'const')
    list.length = 0;

    // 2. Save the empty array back to localStorage
    localStorage.setItem(sectionKey, JSON.stringify(list));


}

const listObjs = [

    {
        list: savedGames,
        storageKey: "savedGames",
        sectionID: "#user-games",
        infoContainer: ".games-container"
    },
    
    {
        list: savedMovies,
        storageKey: "savedMovies",
        sectionID: "#user-movies",
        infoContainer: ".movie-container"
    },

    {
        list: savedSongs,
        storageKey: "savedSongs",
        sectionID: "#user-music",
        infoContainer: ".music-container"
    },

]

listObjs.forEach((list)=>{

    const section = document.querySelector(list.sectionID);
    const catergoryHeader = section.querySelector(".section-head");
    const info = section.querySelector(list.infoContainer);
    

    if(list.list.length === 0){
        info.innerHTML = `<p class = "empty-msg"><em>No Results Yet!</em></p>`
    }

    const clearBtn = document.createElement("button");
    clearBtn.type = "button"
    clearBtn.textContent = "Clear"

    catergoryHeader.appendChild(clearBtn);

    clearBtn.addEventListener("click", ()=>{

       
        clearCollection(list.storageKey, list.list);
        info.innerHTML = `<p class = "empty-msg">No Results Yet!</p>`
    })

})



