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


            const card = document.createElement("div");

            card.classList.add("game-card");

            card.innerHTML =

            `
            <img src="${data.background_image}" class="game-cover">
            <h2>${data.name}</h2>
            <p><strong>Metacritic: </strong>${data.metacritic} </p>
            <p><strong>Released: </strong>${data.released}</p>
            <p><strong>Genre: </strong>${data.genres[0]}</p>
                
            `

            suggestContainer.appendChild(card);
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
       
        const card = document.createElement("div");

        card.classList.add("game-card");

        card.innerHTML =
        `
            <img src="${game.background_image}" class="game-cover">
            <h2>${game.name}</h2>
            <p><strong>Metacritic: </strong>${game.metacritic} </p>
            <p><strong>Released: </strong>${game.released}</p>
            <p><strong>Genre: </strong>${game.genres[0]}</p>

        `
        container.appendChild(card);
    },

);


    } 
    
    catch (error) {
        console.log(error)
        console.error("Error fetching games:", error);
    }

}


const searchGame = async(url)=>{

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

        card.innerHTML =
        `
            <img src="${game.background_image}" class="game-cover">
            <div class ="results-game-info">
                <h2>${game.name}</h2>
                <p><strong>Metacritic: </strong>${game.metacritic} </p>
                <p><strong>Released: </strong>${game.released}</p>
                <p><strong>Genre: </strong>${game.genres[0]}</p>
            </div>

        `
        resultsContainer.appendChild(card);
    
    });

        

    
}


searchbar.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        event.preventDefault();
        console.log(searchbar.value);
        resultsContainer.textContent = ""; 

        let searchTermUrl = `https://api.rawg.io/api/games?key=${apiKey}&search=${searchbar.value}`

        searchGame(searchTermUrl);

        
    }
    
});

fetchKey();
fetchSuggestions();