const apiKey = "207e680a9fa749ca8cd65688cc10b8b8";
const platformsUrl = `https://api.rawg.io/api/platforms?key=`;
const gamesUrl = `https://api.rawg.io/api/games?key=${apiKey}`;
const container = document.querySelector("#must-plays-container");
const suggestContainer = document.querySelector("#suggestions-container");

const searchbar = document.querySelector(".searchbar");
const resultsContainer = document.querySelector(".results");
//const resultsHeading = document.querySelector("h1.results");

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

        card.classList.add(`${className}`);
        const date = new Date(element.released);

        card.innerHTML =
        `
            <img src="${element.background_image}" class="game-cover">
            <div class ="results-game-info">
                <h2>${element.name}</h2>
                <p><strong>Metacritic: </strong>${element.metacritic} </p>
                <p><strong>Released: </strong>${date.getFullYear()}</p>
                <p><strong>Genre: </strong>${element.genres[0].name}</p>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart save-button btn" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                </svg>

            </div>

        `
        container.appendChild(card);
        findText(card);

        let btnTl = gsap.timeline({paused: true, defaults: {duration: 0.2}});
        const saveButton = card.querySelector(".save-button");

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
        addGame(element, saveButton)
        }
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
function addGame(data, btn){

    if(btn != null)
    {
        btn.addEventListener("click", () => {

        let savedGames = JSON.parse(localStorage.getItem("savedGames")) || [];

            if (!savedGames.some(saved => saved.id === data.id)) {

                savedGames.push(data);

                localStorage.setItem("savedGames", JSON.stringify(savedGames));
            }

            console.log("I WENT")
        }
    );
    }
}

const fetchSuggestions = async() => {

    try
    {
        suggestionTerms.forEach(async(suggestion)=>{
            const searchUrl = `https://api.rawg.io/api/games/${suggestion}?key=${apiKey}`

             const res = await fetch(searchUrl, {

                headers:{

                    Accept: "application/json",
                    "User-Agent": "API Practice"
                }
            });

            const data = await res.json();
            console.log(data);

            createCard(data, suggestContainer, "game-card");
        });      
            
    }

    catch
    {
        console.log(error)
        console.error("Error fetching games:", error);
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
       
        const card = document.createElement("div");

        card.classList.add("results-card");
        const date = new Date(game.released);

        card.innerHTML =
        `
            <img src="${game.background_image}" class="game-cover">
            <div class ="results-game-info">
                <h2>${game.name}</h2>
                <p><strong>Metacritic: </strong>${game.metacritic} </p>
                <p><strong>Released: </strong>${date.getFullYear()}</p>
                <p><strong>Genre: </strong>${game.genres[0]}</p>
            </div>

        `
        resultsContainer.appendChild(card);
    
    });

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

if (suggestContainer) {
    fetchSuggestions();
}