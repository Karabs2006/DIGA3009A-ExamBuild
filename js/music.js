const searchbar = document.querySelector(".searchbar");
const resultsContainer = document.querySelector(".results");

const essentialsContainer = document.querySelector("#essentials-container")

const essentialSongs = [

    {   
        song: "Blinding Lights", 
        artist: "The Weeknd"
    },

    {song: "One Dance", artist:"Drake"},
    {song:"Billie Jean",artist:"Michael Jackson"},
    {song:"Levitating",artist:"Dua Lipa"},
    {song:"Hey Ya!",artist:"Outkast"},
    {song:"One More Time",artist:"Daft Punk"},
    {song:"I Gotta Feeling",artist:"Black Eyes Peas"},
    {song:"Empire State Of Mind",artist:"Jay-Z"},
    {song:"In the Air Tonight",artist:"Phil Collins"},
    {song:"Every Breath You Take",artist:"The Police"},

]

let artistIds = [];

//Look for Artist's unique ID
const fetchArtists = async() =>{

    essentialSongs.forEach(async(song)=>{

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

            const card = document.createElement("div");

            card.classList.add("song-card");

            card.innerHTML =
            `
                <img src="${matchedSong.artworkUrl100}" class="album-artwork">

                <div class="song-info">
                    <h2>${matchedSong.trackCensoredName}</h2>
                    <p>${matchedSong.artistName}</p>
                    <p>${matchedSong.collectionName}</p>
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

            essentialsContainer.appendChild(card)

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


fetchArtists();
//console.log(artistIds);