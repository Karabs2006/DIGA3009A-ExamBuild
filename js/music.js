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

            const res = await fetch(songUrl, {
                headers: {
                Accept: "application/json",
                "User-Agent" : "API Practice"
            }
            })

            //console.log(matchedSong);
            console.log(data);
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