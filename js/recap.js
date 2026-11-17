import {fetchArtists} from "./music.js";
import {fetchResults} from "./movies.js";
import { fetchSuggestions } from "./games.js";

const songContainer = document.querySelector("#recap-songs-container");
const movieContainer = document.querySelector("#recap-movie-container");
const seriesContainer = document.querySelector("#recap-series-container");
const suggestContainer = document.querySelector("#recap-games-container")

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

const recapGames = [
    "forza-horizon-6",
    "gears-of-war-4",
    "red-dead-redemption-2",
    "resonance-a-plague-tale-legacy",
    "sleeping-dogs",
    "mouse-pi-for-hire",
    "gears-of-war-e-day",
    "wolfenstein-2-the-new-colossus",
    "the-walking-dead-the-final-season",
    "cyberpunk-2077",
    "shadow-of-the-tomb-raider",
    "resident-evil-7-biohazard",
    

]


fetchArtists(recapSongs,songContainer);
fetchResults(recapMovies,movieContainer);
fetchResults(recapSeries,seriesContainer);
fetchSuggestions(recapGames, suggestContainer)