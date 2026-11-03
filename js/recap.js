import {fetchArtists} from "./music.js";
import {fetchResults} from "./movies.js";

const songContainer = document.querySelector("#recap-songs-container");
const movieContainer = document.querySelector("#recap-movie-container");
const seriesContainer = document.querySelector("#recap-series-container");

const recapSongs = [
    {song: `ear to the cocoon`, artist:`willow`},
    {song: `the feeling`, artist:`steve lacy`},
    {song: `breakout`, artist:`nerd`},
    {song: `hypnotize u`, artist:`nerd`},
    {song: `feminine adornments`, artist:`julie`},
    {song: `wasted time`, artist:`proderics`},
    {song: `gush`, artist:`pharell williams`},
    {song: `sober`, artist:`sebastian`},
    {song: `camera`, artist:`charli xcx`},
    {song: `i wanna know`, artist:`bnyx`},
    {song: `cold`, artist:`future`},
]

const recapMovies = [
    "Obsession",
    "Good Time",
    "Se7en",
    "Parasite", 
    "Casino Royale",
    "The Prestige",
    "Nightcrawler",
    "The Drama",
    "Skyfall",
    "Batman: Knightfall Part 1",
    "Marty Supreme",
    "Supergirl(2026)",
    "Resident Evil(2026)"
]

const recapSeries = [
    "Sweetpea",
    "Lanterns",
    "The Marvelous Misadventures of Flapjack",
    "The Bear",
    "Atlanta",
    "MacGruber",
    "Daredevil",
    "South Park"

]


fetchArtists(recapSongs,songContainer);
fetchResults(recapMovies,movieContainer);
fetchResults(recapSeries,seriesContainer);