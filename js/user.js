
import { createCard } from "./games.js";
import { createCards } from "./music.js";
import { fetchResults } from "./movies.js";

// MUSIC
const savedSongsContainer = document.querySelector(".music-container");

const savedSongs = JSON.parse(localStorage.getItem("savedSongs")) || [];

savedSongs.forEach((song) => {

    createCards(song, savedSongsContainer);
   
});

// MOVIES

const savedMoviesContainer = document.querySelector(".movie-container");

const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];


let movieTitles =[]; 
savedMovies.forEach((movie)=>{
      
    //Get movie titles from the savedMovies localStorage array and store them into the movieTitles
    movieTitles.push(movie.Title) 

})

fetchResults(movieTitles, savedMoviesContainer);

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
        infoContainer: ".games-container",
        cardsName: ".game-card"
    },
    
    {
        list: savedMovies,
        storageKey: "savedMovies",
        sectionID: "#user-movies",
        infoContainer: ".movie-container",
        cardsName: ".poster"
    },

    {
        list: savedSongs,
        storageKey: "savedSongs",
        sectionID: "#user-music",
        infoContainer: ".music-container",
        cardsName: ".song-card"
    },

]

listObjs.forEach((list)=>{

    const section = document.querySelector(list.sectionID);
    const catergoryHeader = section.querySelector(".section-head");
    const info = section.querySelector(list.infoContainer);
    

    if(list.list.length === 0){
        info.innerHTML = `<p class = "empty-msg"><em>No Results Yet!</em></p>`
    }

    const editListBtns = document.createElement("span");
    editListBtns.classList.add("editOptionsSection");


    const editSpan = document.createElement("span");
    editSpan.classList.add("editBtnSpan")
    editSpan.innerHTML = `<img src="../images/icons/edit.png">`;

    const clearBtn = document.createElement("button");
    clearBtn.type = "button"
    clearBtn.textContent = "Clear"

    editListBtns.appendChild(editSpan);
    editListBtns.appendChild(clearBtn);
    

    catergoryHeader.appendChild(editListBtns)
    

    clearBtn.addEventListener("click", ()=>{

       
        clearCollection(list.storageKey, list.list);
        info.innerHTML = `<p class = "empty-msg">No Results Yet!</p>`
    })

    createEdit(editSpan, info, list);

})


function createEdit(editBtn, container, listObj) {
    let isEditing = false;

    editBtn.addEventListener("click", () => {
        const cards = container.querySelectorAll(listObj.cardsName);

        if(listObj.cardsName ===".song-card"){
            
        }


        if (cards.length === 0) return;

        isEditing = !isEditing;

        cards.forEach((card, index) => {

            if (isEditing) {
                gsap.to(card, {
                    x: -5,
                    y: 2,
                    duration: 0.09,
                    repeat: -1,
                    yoyo: true,
                    ease: "power2.inOut"
                });

                // Use .onclick instead of addEventListener so toggling edit mode doesn't stack duplicate events
                card.onclick = () => {
                    if (!isEditing) return;

                    // Stop and reset audio on delete
                    if (card.audio) {
                        gsap.killTweensOf(card.audio);
                        card.audio.pause();
                        card.audio.currentTime = 0;
                    }

                    // Remove from localStorage
                    const itemData = listObj.list[index];
                    const currentIndex = listObj.list.indexOf(itemData);
                    if (currentIndex > -1) {
                        listObj.list.splice(currentIndex, 1);
                        localStorage.setItem(listObj.storageKey, JSON.stringify(listObj.list));
                    }

                    // Stop jiggle animation and remove card from DOM
                    gsap.killTweensOf(card);
                    card.remove();

                    // Show empty state if no cards remain
                    if (listObj.list.length === 0) {
                        container.innerHTML = `<p class="empty-msg"><em>No Results Yet!</em></p>`;
                        isEditing = false;
                    }
                };

            } else {
                gsap.killTweensOf(card);
                gsap.set(card, { x: 0, y: 0 });
                card.onclick = null; // Remove delete behavior when exiting edit mode
            }
        });
    });
}




