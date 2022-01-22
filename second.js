let gamesDiv = document.querySelector(".games");
let gameStatus = document.querySelectorAll("game-status");
// Setting the date
let today = new Date();
let date = today.getDate();

if (date <= 9) {
  date = `0` + date;
}

let year = today.getFullYear();
let month = today.getMonth() + 1;

// Parameters
let fullDate = `${year}-${month}-${date}`;
let season = `${year}-${year + 1}`;
let timezone = "America/Los_Angeles";

let games = [];

fetch(
  //   "https://api-nba-v1.p.rapidapi.com/games/live/",
  "data3.json",

  {
    method: "GET",
    headers: {
      "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
      "x-rapidapi-key": "c9bfc37e9fmshf134f4277b71718p11a766jsnc263c0972da5",
    },
  }
)
  .then((response) => response.json())
  .then((data) => {
    for (i in data.api.games) {
      let homeTeam = data.api.games[i].hTeam;
      let awayTeam = data.api.games[i].vTeam;
      let gameStatus = data.api.games[i].statusGame;
      let currentQuarter = data.api.games[i].currentPeriod;
      let game = new Game(homeTeam, awayTeam, gameStatus, currentQuarter);
      games.push(game);
      createGameCards(games[i]);
    }
  })
  .catch((err) => {
    console.error(err);
  });

function Game(homeTeam, awayTeam, gameStatus, currentQuarter) {
  this.homeTeam = homeTeam;
  this.awayTeam = awayTeam;
  this.gameStatus = gameStatus;
  this.currentQuarter = currentQuarter;
}

function createGameCards(game) {
  //  Skeleton

  let gameDiv = document.createElement("div");

  let homeTeamDiv = document.createElement("div");
  let homeTitle = document.createElement("h2");
  let homeTeamName = document.createElement("h2");
  let homeTeamLogo = document.createElement("img");

  let awayTeamDiv = document.createElement("div");
  let awayTitle = document.createElement("h2");
  let awayTeamName = document.createElement("h2");
  let awayTeamLogo = document.createElement("img");

  let gameInfoDiv = document.createElement("div");
  let gameStatusP = document.createElement("p");
  let score = document.createElement("p");

  // Append elements
  gamesDiv.append(gameDiv);
  gameDiv.append(homeTeamDiv, gameInfoDiv, awayTeamDiv);
  homeTeamDiv.append(homeTitle, homeTeamLogo, homeTeamName);
  awayTeamDiv.append(awayTitle, awayTeamLogo, awayTeamName);

  // Home Team
  homeTeamName.innerHTML = game.homeTeam.nickName;
  homeTeamLogo.src = game.homeTeam.logo;
  homeTitle.innerHTML = "Home";

  // Game Info
  gameInfoDiv.append(gameStatusP, score);
  gameStatusP.innerHTML = game.gameStatus;
  score.innerHTML = `${game.homeTeam.score.points} - ${game.awayTeam.score.points}`;

  // Away Team
  awayTeamName.innerHTML = game.awayTeam.nickName;
  awayTeamLogo.src = game.awayTeam.logo;
  awayTitle.innerHTML = "Away";

  //  Add Classes
  gamesDiv.classList.add("games");
  gameDiv.classList.add("game");

  homeTeamDiv.classList.add("team", "home");
  homeTeamName.classList.add("team-name");
  homeTeamLogo.classList.add("logo");

  gameInfoDiv.classList.add("game-info");
  gameStatusP.classList.add("game-status");
  score.classList.add("score");

  awayTeamDiv.classList.add("team", "away");
  awayTeamName.classList.add("team-name");
  awayTeamLogo.classList.add("logo");
}

function gameStatusLiveUpdate() {
  const gameStatus = document.querySelectorAll(".game-status");
  const gameScore = document.querySelectorAll(".score");

  setInterval(() => {
    fetch(
      "https://api-nba-v1.p.rapidapi.com/games/live/",

      //   "data3.json",

      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "c9bfc37e9fmshf134f4277b71718p11a766jsnc263c0972da5",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        gameStatus.forEach((game) => {
          game.textContent = data.api.games[i].statusGame;
        });
        gameScore.forEach((game) => {
          game.textContent = `${data.api.games[i].homeTeam.score.points} - ${data.api.games[i].awayTeam.score.points}`;
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, 15000);

  console.log(gameScore);
}

document.addEventListener("DOMContentLoaded", gameStatusLiveUpdate);
