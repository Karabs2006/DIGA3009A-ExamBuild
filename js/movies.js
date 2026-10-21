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

            let uniqueUrl = `http://www.omdbapi.com/?i=${id}`



            // UNIQUE SEARCH BRUHHHHHHHH




            
            const card = document.createElement("div");
            

            card.classList.add("results-card");

            card.innerHTML =
            `
                <img src="${item.Poster}" class="results-poster">
                <div class ="results-info">
                    <h2>${item.Title}</h2>
                    <p><strong><i>${item.Actors}</i></p>
                    <p><strong>Released: </strong>${item.Year}</p>
                    <p><strong>imdb Rating: </strong>${item.imdbRating}</p>
                    <p><strong>Genre: </strong>${item.Genre}</p>
                </div>
            `

            resultsContainer.appendChild(card);

        })
        

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


