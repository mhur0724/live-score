let liveGames = document.querySelector(".live-games");

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
    let homeTeamArray = [];
    let awayTeamArray = [];
    for (i in data.response) {
      let homeTeam = new Team(
        data.response[i].teams.home.name,
        data.response[i].teams.home.logo
      );
      homeTeamArray.push(homeTeam);
      let awayTeam = new Team(
        data.response[i].teams.away.name,
        data.response[i].teams.away.logo
      );
      awayTeamArray.push(awayTeam);
    }
  })
  .catch((err) => console.log(err));

function Team(name, logo) {
  this.name = name;
  this.logo = logo;
}
