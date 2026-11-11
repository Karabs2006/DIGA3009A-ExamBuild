const searchbar = document.querySelector(".searchbar");
const resultsContainer = document.querySelector(".results");
const resultsText = document.querySelector(".results-head");

const essentialsContainer = document.querySelector("#essentials-container");
const trendingContainer = document.querySelector("#trending-container");

const loadingBubbles = document.querySelectorAll(".loading-circle");
const loadingBar = document.querySelector(".loading-bar");

import { createTimeline } from "./headerFooter.js";
import { createSearch } from "./headerFooter.js";

const essentialSongs = [

    {song: "Blinding Lights", artist: "The Weeknd"},
    {song: "One Dance", artist:"Drake"},
    {song:"Billie Jean",artist:"Michael Jackson"},
    {song:"Levitating",artist:"Dua Lipa"},
    {song:"Hey Ya!",artist:"Outkast"},
    {song:"One More Time",artist:"Daft Punk"},
    {song:"I Gotta Feeling",artist:"Black Eyes Peas"},
    {song:"Empire State Of Mind",artist:"Jay-Z"},
    {song:"In the Air Tonight",artist:"Phil Collins"},
    {song:"Every Breath You Take",artist:"The Police"},

];

const trendingSongs = [

    {song: "the feeling",  artist: "Steve Lacy"},
    {song: "maggots for brains", artist:"Olivia Rodrigo"},
    {song:"DANCE...", artist:"slayyter"},
    {song:"The Peace", artist:"underscores"},
    {song:"petal", artist:"ariana grande"},
    {song:"nicole kidman", artist:"adela"},
    {song:"BbY WOW", artist:"karol G"},
    {song:"Loser", artist:"Tame Impala"},
    {song:"oh yeah!", artist:"steve lacy"},
    {song:"housewife", artist:"tate mcrae"},

];

const loadingTimeline = createTimeline(loadingBubbles);

/*if(searchbar){
    searchbar.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            event.preventDefault();
            console.log(searchbar.value);
            resultsContainer.textContent = "";
            loadingBar.style.display = "flex";
            
            
            let searchTermUrl = `https://itunes.apple.com/search?term=${searchbar.value}&entity=song`
            search(searchTermUrl);

        }
        
    });
}
*/


const search = async(url) =>{

    loadingTimeline.play();
    resultsText.style.display ="none";

    try{ 
        const res = await fetch (url, {

            headers:{
                Accept: "application/json",
                "User-Agent":"API Practice"
            }

        })

        const data = await res.json();

        if(resultsContainer){
            data.results.forEach((result)=>{
                createCards(result,resultsContainer)
            })
        }

    }

    catch(error){
        console.log(error)
    }

    finally {
        loadingTimeline.pause(0);
        loadingBar.style.display = "none";
        resultsText.style.display ="flex";
    }
}

createSearch(searchbar,search(`https://itunes.apple.com/search?term=${searchbar.value}&entity=song`));

let artistIds = [];

function createCards(song, container){

    if (!container) return; 
    const card = document.createElement("div");

            card.classList.add("song-card");

            card.innerHTML =
            `
                <img src="${song.artworkUrl100}" class="album-artwork">

                <div class="song-info">
                    <h2>${song.trackCensoredName}</h2>
                    <p>${song.artistName}</p>
                    <p>${song.collectionName}</p>
                </div>

               <div class="user-buttons">

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart save-button" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus " viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                </svg>

                </div>
            
            `
            //AUDIO

            const audio = new Audio(song.previewUrl);
            

            //GSAP ANIMATIONS

            const songInfo = card.querySelector(".song-info");

            const tl = gsap.timeline();

            card.addEventListener("mouseenter",()=> {

                audio.volume = 0;
                audio.play();
                
                gsap.to(audio, {
                    volume: 1,
                    duration: 4

                })

                gsap.to(card, {
                    scale: 1.02,
                    duration: 0.5,
                    backgroundColor: "#FAFAFA",
                    
                })
                
            });

            card.addEventListener("mouseleave",()=> {

                gsap.to(audio, {
                    volume: 0,
                    duration: 0.4,
                     onComplete: () => {
                        audio.pause();
                        audio.currentTime = 0;
                    }

                })
                
                gsap.to(card, {
                    scale: 1,
                    duration: 0.5,
                    backgroundColor: "#121212",
                })
            })

          

            const saveButton = card.querySelector(".save-button");

            saveButton.addEventListener("click", () => {

                let savedSongs = JSON.parse(localStorage.getItem("savedSongs")) || [];

                if (!savedSongs.some(saved => saved.trackId === song.trackId)) {

                    savedSongs.push(song);

                    localStorage.setItem("savedSongs", JSON.stringify(savedSongs));
                }

            });

        container.appendChild(card)
}

//Look for Artist's unique ID
export const fetchArtists = async(list, container) =>{

    list.forEach(async(song)=>{

        let artistUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(song.artist)}&entity=musicArtist`

        try{

        const res = await fetch(artistUrl, {

            headers: {
                Accept: "application/json",
                "User-Agent" : "API Practice"
            }
        })

        const data = await res.json();
        //console.log(data.results[0]);

        if (!data.results.length) return;

        //Compile list of the artist ID's
        artistIds.push(data.results[0].artistId);

        //Search song name using artist's unique iTunes ID
        let songUrl = `https://itunes.apple.com/lookup?id=${data.results[0].artistId}&entity=song&limit=200`
        
        //TRY CATCH TWO
        try{

            const res = await fetch(songUrl);
            const songData = await res.json();

            const matchedSong = songData.results.find((track) =>
                track.trackName?.toLowerCase() === song.song.toLowerCase()
            );

            //METHOD
            if (matchedSong){
                createCards(matchedSong, container);
            }

    console.log(matchedSong);

        }
        catch(error){
            console.log(error);
        }
    }

    catch(error){
        console.log(error);
    }
    })
}


if (essentialsContainer && trendingContainer) {
    fetchArtists(essentialSongs, essentialsContainer);
    fetchArtists(trendingSongs, trendingContainer);
}

