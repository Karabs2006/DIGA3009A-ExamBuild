const apiKey = "0783a19fabd5427c8dfe36c86cc1ab03";
const platformsUrl = `https://api.rawg.io/api/platforms?key=`;
const gamesUrl = `https://api.rawg.io/api/games?key=${apiKey}`;
const container = document.querySelector("#must-plays-container");
const suggestContainer = document.querySelector("#suggestions-container");

const searchbar = document.querySelector(".searchbar");
const resultsContainer = document.querySelector(".results");

const loadingBubbles = document.querySelectorAll(".loading-circle");
const loadingBar = document.querySelector(".loading-bar");
const resultsText = document.querySelector(".results-head");

import { createTimeline } from "./headerFooter.js";
//const resultsHeading = document.querySelector("h1.results");

const loadingTimeline = createTimeline(loadingBubbles);

const suggestionTerms = [
    "gears-of-war-2",
    "sleeping-dogs",
    "burnout-paradise",
    "the-walking-dead-season-2",
    "forza-horizon-5",
    "assassins-creed-mirage",
    "control",
    "shadow-of-the-tomb-raider",
    "south-park-the-fractured-but-whole",
    "saints-row-the-third",
    "evil-west",
    "rayman-origins",
    "need-for-speed-unbound",
    "doom-64"
]


//Create cards based on data from API request fetch() data
export function createCard(element, container, className, enableSave = true ){

     const card = document.createElement("div");

        card.classList.add(...className.split(" "));
        const date = new Date(element.released);

        card.innerHTML =
        `
            <img src="${element.background_image}" class="game-cover">
            <div class ="results-game-info">
                <h2>${element.name}</h2>
                <p><strong>Metacritic: </strong>${element.metacritic} </p>
                <p><strong>Released: </strong>${date.getFullYear()}</p>
                <p><strong>Genre: </strong>${element.genres?.[0]?.name || "Unknown" }</p>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart save-button btn" viewBox="0 0 16 16">
                <path class="fill-path" fill="#ff4d6d" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                </svg>

            </div>

        `
        const cover = card.querySelector(".game-cover");

            cover.onerror = () => {
                cover.src = "../images/placeholder.jpg";
            };
        container.appendChild(card);
        findText(card);

        let btnTl = gsap.timeline({paused: true, defaults: {duration: 0.2}});
        const saveButton = card.querySelector(".save-button");
        const fillPath = card.querySelector(".fill-path");

       

        btnTl.to(saveButton, {
            scale: 1.2,
        })
            saveButton.addEventListener("mouseenter", ()=>{
            btnTl.restart();
                
            })

            saveButton.addEventListener("mouseleave", ()=>{
            btnTl.reverse();
                
        })

        if(enableSave){
        addGame(element, saveButton, fillPath)
        }

        return card;


}

//Function to create animations for multiple cards 
function findText(targetCard){

    const paragraphs = targetCard.querySelectorAll("p");
    const titles = targetCard.querySelectorAll("strong");
    const heading = targetCard.querySelector("h2");
    const saveButton = targetCard.querySelector(".save-button");

    createGameAnim(targetCard, paragraphs,titles, heading, saveButton);

}
//Create timeline depending on elements of card
function createGameAnim(card, paragraph, titles, h, button, ){

    const tl = gsap.timeline({paused: true, defaults: {duration: 0.3}});

        tl.to(card, {
            scale: 1.02,
            //paddingRight: 200,
            backgroundColor: "#FAFFFA",
            
        },0).to([paragraph, titles, h], {
            color: "#232526"

        },0).to(button,{

            display: "block",
            opacity: 1
        },0)

        card.addEventListener("mouseenter", ()=>{
            tl.restart();
        })

        card.addEventListener("mouseleave", ()=>{
            tl.reverse();
        })

}

//On click, pass game data into JSON onto the user.js file
function addGame(data, btn, fill){

    if(btn != null)
    {
        btn.addEventListener("click", () => {

        let savedGames = JSON.parse(localStorage.getItem("savedGames")) || [];

            if (!savedGames.some(saved => saved.id === data.id)) {

                savedGames.push(data);

                localStorage.setItem("savedGames", JSON.stringify(savedGames));
            }

            
            gsap.to(fill, {
            fill: "#ff00ff"
            })

            console.log("I WENT")
        }
    );
    }
}

/*
const loadingArea = document.querySelectorAll(".loading-area");

loadingArea.forEach((area)=>{
    area.innerHTML = loadingBar.innerHTML
});
*/


export const fetchSuggestions = async(list, container) => {

    try
    {
        list.forEach(async(suggestion)=>{
            const searchUrl = `https://api.rawg.io/api/games/${suggestion}?key=${apiKey}`

             const res = await fetch(searchUrl, {

                headers:{

                    Accept: "application/json",
                    "User-Agent": "API Practice"
                }
            });

            const data = await res.json();
            console.log(data);

            createCard(data, container, "game-card");
        });      
            
    }

    catch
    {
        console.log(error)
        console.error("Error fetching games:", error);
    }
    finally
    {
        suggestLoadingTimeline.pause(0);
        suggestLoadingBar.style.display = "none";
    }
}

const fetchKey = async() => {

     try {
        const res = await fetch(gamesUrl, {

            headers:{

                Accept: "application/json",
                "User-Agent": "API Practice"
            }
        }
            
    );

    const data = await res.json();
    console.log(data);

    data.results.forEach((game) => {

        createCard(game, container, "game-card");

    },
);
    } 
    
    catch (error) {
        console.log(error)
        console.error("Error fetching games:", error);
    }

}

const search = async(url)=>{

    loadingTimeline.play();
    resultsText.style.display ="none";
    loadingBar.style.display = "flex";

    const searchUrl = url
    const res = await fetch(url, {

        headers:{

            Accept: "application/json",
            "User-Agent": "API Practice"
        
        }
        });

        const data = await res.json();
        console.log(data);

        data.results.forEach((game) => {
            
        createCard(game, resultsContainer, "game-card results-card");
    
    });

    loadingTimeline.pause(0);
    loadingBar.style.display = "none";
    resultsText.style.display = "flex";


}

//Searchbar function to call search() function
searchbar.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        event.preventDefault();
        console.log(searchbar.value);
        resultsContainer.textContent = ""; 

        let searchTermUrl = `https://api.rawg.io/api/games?key=${apiKey}&search=${searchbar.value}`

        search(searchTermUrl);

    }
    
});


//Had to check if containers exist because they caused compilation errors as soon as the script was exported
if (container) {
    fetchKey();
}

if (suggestContainer && !document.querySelector("#recap-games-container")) {
    fetchSuggestions(suggestionTerms, suggestContainer);
}