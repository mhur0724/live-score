let liveGames = document.querySelector(".live-games");

// Setting the date
let today = new Date();
let date = today.getDate();

if (date <= 9) {
  date = `0` + date;
}

let year = today.getFullYear();
let month = today.getMonth();

// Parameters
let fullDate = `${year}-${month}-${date}`;
let season = `${year}-${year + 1}`;
let timezone = "America/Los_Angeles";

// Fetching API Data
// fetch(
//   `https://api-basketball.p.rapidapi.com/games?timezone=America/Los_Angeles&season=${season}&league=12&date=${fullDate}`,
//   {
//     method: "GET",
//     headers: {
//       "x-rapidapi-host": "api-basketball.p.rapidapi.com",
//       "x-rapidapi-key": "c9bfc37e9fmshf134f4277b71718p11a766jsnc263c0972da5",
//     },
//   }
// )
//   .then((response) => response.json())
//   .then((data) => console.log(data.response[0]))
//   .catch((err) => console.log(err));
let games = [];

fetch("data.json", {
  method: "GET",
  headers: {
    "x-rapidapi-host": "api-basketball.p.rapidapi.com",
    "x-rapidapi-key": "c9bfc37e9fmshf134f4277b71718p11a766jsnc263c0972da5",
  },
})
  .then((response) => response.json())
  .then((data) => {
    for (i in data.response) {
      createGame(data.response[i]);
    }
  })
  .catch((err) => console.log(err));

function createGame(response) {
  // Breakdown reponse data
  let teamHome = response.teams.home;
  let teamAway = response.teams.away;
  let homeScore = response.scores.home.total;
  let awayScore = response.scores.away.total;
  let gameDiv = document.createElement("div");

  // Create DOM elements
  // Home Team
  let teamHomeDiv = document.createElement("div");
  let teamHomeName = document.createElement("h2");
  let teamHomeLogo = document.createElement("img");

  // Away Team
  let teamAwayDiv = document.createElement("div");
  let teamAwayName = document.createElement("h2");
  let teamAwayLogo = document.createElement("img");

  let score = document.createElement("p");

  // Create DOM element content
  // Home Team
  teamHomeName.innerHTML = teamHome.name;
  teamHomeName.classList.add("team-name");
  teamHomeLogo.src = teamHome.logo;
  teamHomeLogo.classList.add("logo");

  // AwayTeam
  teamAwayName.innerHTML = teamAway.name;
  teamAwayName.classList.add("team-name");
  teamAwayLogo.src = teamAway.logo;
  teamAwayLogo.classList.add("logo");

  // Append content into DOM elements
  // Home Team
  teamHomeDiv.append(teamHomeLogo, teamHomeName);
  teamHomeDiv.classList.add("team", "home");
  // Away Team
  teamAwayDiv.append(teamAwayLogo, teamAwayName);
  teamAwayDiv.classList.add("team", "away");

  score.innerHTML = `${homeScore} - ${awayScore}`;
  score.classList.add("score");

  gameDiv.classList.add("game");
  gameDiv.append(teamHomeDiv, score, teamAwayDiv);

  liveGames.appendChild(gameDiv);
}
