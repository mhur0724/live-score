let liveGames = document.querySelector(".live-games");

// Setting the date
let today = new Date();
let date = today.getDate();

if (date <= 9) {
  date = `0` + date;
}
date = 05;
let year = today.getFullYear();
let month = today.getMonth() + 1;

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

fetch(
  // `https://api-basketball.p.rapidapi.com/games?timezone=America/Los_Angeles&season=${season}&league=12&date=${fullDate}`,
  "data.json",

  {
    method: "GET",
    headers: {
      "x-rapidapi-host": "api-basketball.p.rapidapi.com",
      "x-rapidapi-key": "c9bfc37e9fmshf134f4277b71718p11a766jsnc263c0972da5",
    },
  }
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
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
  let gameStatus = response.status.long;

  // Create DOM elements
  let gameDiv = document.createElement("div");
  let homeTitle = document.createElement("h2");
  let awayTitle = document.createElement("h2");
  // Home Team
  let teamHomeDiv = document.createElement("div");
  let teamHomeName = document.createElement("h2");
  let teamHomeLogo = document.createElement("img");

  // Away Team
  let teamAwayDiv = document.createElement("div");
  let teamAwayName = document.createElement("h2");
  let teamAwayLogo = document.createElement("img");

  let gameInfoDiv = document.createElement("div");
  let gameStatusP = document.createElement("p");

  let score = document.createElement("p");

  // Create DOM element content
  homeTitle.innerHTML = "Home";
  awayTitle.innerHTML = "Away";
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
  teamHomeDiv.append(homeTitle, teamHomeLogo, teamHomeName);
  teamHomeDiv.classList.add("team", "home");
  // Away Team
  teamAwayDiv.append(awayTitle, teamAwayLogo, teamAwayName);
  teamAwayDiv.classList.add("team", "away");

  gameStatusP.innerHTML = gameStatus;
  gameStatusP.classList.add("game-status");
  switch (gameStatus) {
    case "Game Finished":
      gameStatusP.classList.add("game-finished");
      break;
    case "Quarter 1":
      gameStatusP.classList.add("game-live");
      break;
    case "Quarter 2":
      gameStatusP.classList.add("game-live");
      break;
    case "Quarter 3":
      gameStatusP.classList.add("game-live");
      break;
    case "Quarter 4":
      gameStatusP.classList.add("game-live");
      break;
    case "Over Time":
      gameStatusP.classList.add("game-live");
      break;
    case "Halftime":
      gameStatusP.classList.add("game-live");
      break;
  }

  if (gameStatus == "Not Started") {
    score.innerHTML = "";
  } else {
    score.innerHTML = `${homeScore} - ${awayScore}`;
  }
  score.classList.add("score");
  gameInfoDiv.append(gameStatusP, score);
  gameInfoDiv.classList.add("game-info");

  gameDiv.classList.add("game");
  gameDiv.append(teamHomeDiv, gameInfoDiv, teamAwayDiv);

  liveGames.appendChild(gameDiv);
}

function createTeams(response) {
  let teamHome = response.teams.home;
  let teamAway = response.teams.away;
  let homeScore = response.scores.home.total;
  let awayScore = response.scores.away.total;
}
