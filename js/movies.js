//const apiKey = "4fcc086a";
const apiKey = "864d1651"
const mainUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=power+rangers`;

const moviesContainer = document.querySelector("#movie-container");
const seriesContainer = document.querySelector("#series-container");
const suggestContainer = document.querySelector("#suggestions-container");

const searchbar = document.querySelector(".searchbar");
const resultsContainer = document.querySelector(".results");
const resultsText = document.querySelector(".results-head");

const loadingBubbles = document.querySelectorAll(".loading-circle");
const loadingBar = document.querySelector(".loading-bar");

import { createTimeline } from "./headerFooter.js";

searchbar.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        event.preventDefault();
        console.log(searchbar.value);
        resultsContainer.textContent = "";
        loadingBar.style.display = "flex";

        let searchTermUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchbar.value}`

        search(searchTermUrl)
    }
    
});

const loadingTimeline = createTimeline(loadingBubbles);

const search = async(url) =>{

    loadingTimeline.play();
    resultsText.style.display ="none";

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
    finally {
        loadingTimeline.pause(0);
        loadingBar.style.display = "none";
        resultsText.style.display ="flex";
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

            

            let imgUrl;

            if(item.Poster && (item.Poster !== "N/A" || item.Poster !== null)){
                imgUrl = item.Poster
            } else{
                imgUrl = `../images/placeholder.jpg`
            }

            card.innerHTML =
            `
                <img src="${imgUrl}" class="results-poster">
                <div class ="results-info">
                    <h2>${item.Title}</h2>
                    <p><strong><i>${item.Actors}</strong></i></p>
                    <p><strong>Released: </strong>${item.Year}</p>
                    <p><strong>imdb Rating: </strong><span class="imdb-rating">${item.imdbRating}</span></p>
                    <p><strong>Genre: </strong>${item.Genre}</p>
                </div>

                <div class="user-buttons">

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart save-button btn" viewBox="0 0 16 16">
                    <path class="fill-path" fill="#ff4d6d" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                </svg>


                </div>
            `

            const poster = card.querySelector(".results-poster");

            poster.onerror = () => {
                poster.src = "../images/placeholder.jpg";
            };

            
            const ratingElement = card.querySelector(".imdb-rating");

            let btnTl = gsap.timeline({paused: true, defaults: {duration: 0.2}});
            const saveButton = card.querySelector(".save-button");
            const fillPath = saveButton.querySelector(".fill-path");

                    saveButton.addEventListener("click", () => {

                        console.log("CLICKEDDDD")
                       
                            let savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];

                            if (!savedMovies.some(saved => saved.imdbID === item.imdbID)) {
                                savedMovies.push(item);
                                localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
                            }

                            gsap.to(fillPath, {
                            fill: "#ff00ff"
                            })

                    
                });

            
                btnTl.to(saveButton, {
                    scale: 1.2,
                })
                    saveButton.addEventListener("mouseenter", ()=>{
                    btnTl.restart();
                        
                    })

                    saveButton.addEventListener("mouseleave", ()=>{
                    btnTl.reverse();
                        
                })

            //CHANGE BACKGROUND COLOR OF IMDB SCORE BASED ON ITS RATING
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

export const fetchResults = async(list, container)=>{
    
     try{

        list.forEach(async(element) => {

        const searchUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${element}`;

        const res = await fetch(searchUrl);

        const data = await res.json();
        console.log(data)

        // If the data is valid then create the cards
            if (data.Response === "False" || !data.Title || data.Title === "N/A") {
                return;
            }

        const card = document.createElement("div");
        card.classList.add("poster");


        card.innerHTML =
        `   
            <img src ="${data.Poster}" class="poster-click">
    
        `
        //GSAP ANIMATIONS

        let extraInfoEnabled = false;

            const img = card.querySelector(".poster-click");


           

                img.addEventListener("mouseenter", ()=>{

                if(!extraInfoEnabled){
                    gsap.to(img,
                        {   
                            scale: 1.04,
                            //ease: "power2.inOut"
                        }
                    )
                }
                })

                img.addEventListener("mouseleave", ()=>{

                    if(!extraInfoEnabled){
                    gsap.to(img,
                        {   
                            scale: 1,
                            //ease: "power2.inOut"
                        }
                    )
                }
                });
            
            /*
            img.addEventListener("click", ()=>{

                gsap.to(img,
                    {   
                        scale: 0.8,
                        //ease: "power2.inOut"
                    }
                )
            });
*/
            
            

        let isClicked = false;
        const posterBtn = card.querySelector(".poster-click");

        posterBtn.addEventListener("click",() => {

            const scaleTl = gsap.timeline({paused: true, defaults : {ease: "power1.Out", duration: 0.5}});

                scaleTl.fromTo(img,
                    {   
                        scale: 1,
                        

                    },{
                        scale:0.9,
                        
                    }
                ).to(img, {
                    scale: 1
                })


            if(isClicked == false)
            {
                
                isClicked = true;
                extraInfoEnabled = true;

                
                scaleTl.restart();


                const extraInfo = document.createElement("div");
                extraInfo.classList.add("extra-info")

                extraInfo.innerHTML =
                `
                    <h2>${data.Title}</h2>
                    <p>${data.Plot}</p>
                    <p><i><span class="text">imdb Rating:</span></i><span class="imdb-rating-static"> ${data.imdbRating}</span></p>

                    <div class="user-buttons">

                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart save-button btn" viewBox="0 0 16 16">
                        <path class="fill-path" fill="#ff4d6d" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                        </svg>

                       
                    </div>
                `

                
                //let criteria = `${Number(item.imdbRating)}>=${condition.min}&&${Number(item.imdbRating)}<=${condition.max}`
                
                const ratingElement = extraInfo.querySelector(".imdb-rating-static");
                conditions.forEach((condition)=>{

                    if(Number(data.imdbRating) >= condition.min && Number(data.imdbRating) <= condition.max){
                        {
                            ratingElement.style.setProperty
                            (
                                "--rating-color",
                                condition.color
                            );
                        }
                    }
                })
                    


                    card.appendChild(extraInfo);

                    let btnTl = gsap.timeline({paused: true, defaults: {duration: 0.2}});
                    const saveButton = extraInfo.querySelector(".save-button");
                    const fillPath = saveButton.querySelector(".fill-path");

                    saveButton.addEventListener("click", () => {

                        console.log("CLICKEDDDD")
                       
                            let savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];

                            if (!savedMovies.some(saved => saved.imdbID === data.imdbID)) {
                                savedMovies.push(data);
                                localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
                            }

                            gsap.to(fillPath, {
                            fill: "#ff00ff"
                            })

            
                            return extraInfo;
                        
                        
                    });

                    
                btnTl.to(saveButton, {
                    scale: 1.2,
                })
                    saveButton.addEventListener("mouseenter", ()=>{
                    btnTl.restart();
                        
                    })

                    saveButton.addEventListener("mouseleave", ()=>{
                    btnTl.reverse();
                        
                })

            }  else {

                const extraInfo = card.querySelector(".extra-info");

                if (extraInfo) {
                    extraInfo.remove();
                }
               
                isClicked = false;
                extraInfoEnabled = false
                scaleTl.restart();
            }


        })

        //SAVE BUTTON LOGIC THAT KEEPS RECORD OF MOVIES IN THE USER.JS FILE
       

        container.appendChild(card);
        
        return card;
        });

        }

    catch(error){
        console.log(error);
    }


}

if (moviesContainer) {
    fetchResults(movieTerms, moviesContainer);
}

if (seriesContainer) {
    fetchResults(seriesTerms, seriesContainer);
}

if (suggestContainer) {
    fetchResults(suggestionTerms, suggestContainer);
}


