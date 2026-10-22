const apiKey = "4fcc086a";
const mainUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=power+rangers`;

const moviesContainer = document.querySelector("#movie-container");
const seriesContainer = document.querySelector("#series-container");
const suggestContainer = document.querySelector("#suggestions-container");

const searchbar = document.querySelector(".searchbar");
const resultsContainer = document.querySelector(".results");


searchbar.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        event.preventDefault();
        console.log(searchbar.value);
        resultsContainer.textContent = ""; 

        let searchTermUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchbar.value}`

        search(searchTermUrl)
    }
    
});

const search = async(url) =>{

    try{

        const res = await fetch(url, {

            headers:{

                Accept: "application/json",
                "User-Agent": "API Practice"
        
            }
        });

        const data = await res.json();
        console.log(data);

        data.Search.forEach((item)=>{

            const id = item.imdbID;

            let uniqueUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`;

            
            uniqueSearch(uniqueUrl);

           
        })
        

    }
    catch(error){
        console.log(error);

    }
}

//This is a list with various conditions to be used to change the bakground color of each item's imdb-rating element

const conditions = [

    {   min: 9.0,
        max: 10.0,
        color: "#57B9FF"
    },

    {   min: 8.0,
        max: 8.9,
        color: "#45d529"
    },

    {   min: 7.0,
        max: 7.9,
        color: "#f19b1b"
    },

    {   min: 6.0,
        max: 6.9,
        color: "#583d05"
    },

    {   min: 5.0,
        max: 5.9,
        color: "#7e2507"
    },

]



//Get information about each unique item that search function for the api does not fetch

const uniqueSearch = async(idUrl) =>{
    
    try{

        const res = await fetch(idUrl, {

            headers: {

                Accept: "application/json",
                "User-Agent": "API Practice"
            }
        });

        const item = await res.json();

        const card = document.createElement("div");
            

            card.classList.add("results-card");

            card.innerHTML =
            `
                <img src="${item.Poster}" class="results-poster">
                <div class ="results-info">
                    <h2>${item.Title}</h2>
                    <p><strong><i>${item.Actors}</i></p>
                    <p><strong>Released: </strong>${item.Year}</p>
                    <p><strong>imdb Rating: </strong><span class="imdb-rating">${item.imdbRating}</span></p>
                    <p><strong>Genre: </strong>${item.Genre}</p>
                </div>

                <div class="user-buttons">

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                </svg>

                </div>
            `

            const ratingElement = card.querySelector(".imdb-rating");

            conditions.forEach((condition) =>{

                //let criteria = `${Number(item.imdbRating)}>=${condition.min}&&${Number(item.imdbRating)}<=${condition.max}`

                if( Number(item.imdbRating) >= condition.min && Number(item.imdbRating) <= condition.max)
                {
                    ratingElement.style.setProperty
                    (
                        "--rating-color",
                        condition.color
                    );
                }
            })


            resultsContainer.appendChild(card);
    }

    catch(error){
        console.log(error);
    }


}

//Arrays for search terms
const movieTerms = [
    "The Shawshank Redemption",
    "The Godfather Part II",
    "The Dark Knight",
    "Pulp Fiction",
    "Fight Club",
    "Star Wars: Episode V - The Empire Strikes Back",
    "Interstellar",
    "Schindler's List",
    "GoodFellas",
    "The Silence of the Lambs",
]

const seriesTerms = [
    "Breaking Bad",
    "The Wire",
    "The Sopranos",
    "Game of Thrones",
    "Batman: The Animated Series",
    "Better Call Saul",
    "The Office",
    "Arcane",
    "Black Mirror",
    "Avatar: The Last Airbender",
]

const suggestionTerms = [
    "Lanterns",
    "Atlanta",
    "Sweetpea",
    "Pickle and Peanut",
    "F1",
    "Good Time",
    "Kick-Ass",
    "Batman Beyond",
    "The Bear",
    "Baby Reindeer"
    
]

//Function to find relvant movies/shows according to terms in an array and put them in their relevant places on the page

const fetchResults = async(list, container)=>{
    
     try{

        list.forEach(async(element) => {

        const searchUrl = `http://www.omdbapi.com/?apikey=${apiKey}&t=${element}`;

        const res = await fetch(searchUrl, {

            headers:{

                Accept: "application/json",
                "User-Agent": "API Practice"
            }
        });


        const data = await res.json();
        console.log(data)


        const card = document.createElement("div");
        card.classList.add("poster");


        card.innerHTML =
        `
            <img src ="${data.Poster}">
        `

        container.appendChild(card);        
        });

    }

    catch(error){
        console.log(error);
    }


}

fetchResults(movieTerms, moviesContainer);
fetchResults(seriesTerms, seriesContainer);
fetchResults(suggestionTerms, suggestContainer);


