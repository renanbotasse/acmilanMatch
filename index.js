const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("73fe1a77e453b80406a2b15408e1b538e61c65c0d381f644bbb53feca5208643");
const local = Intl.DateTimeFormat().resolvedOptions().timeZone;
const [fakeLocal, realLocal] = local.split('/');
const params = {
  q: "ac milan",
  location: realLocal
};

const getGameData = function(callback) {
  search.json(params, function(data) {
    const homeTeam = data.sports_results.games[0].teams[0].name;
    const homeTeamImgLink = data.sports_results.games[0].teams[0].thumbnail;
    const awayTeam = data.sports_results.games[0].teams[1].name;
    const awayTeamImgLink = data.sports_results.games[0].teams[1].thumbnail;
    const tournament = data.sports_results.games[0].tournament;
    const date = [data.sports_results.games[0].date, + ' ' + data.sports_results.games[0].time];
    const gameData = { homeTeam, homeTeamImgLink, awayTeam, awayTeamImgLink, tournament, date };
    
    callback(gameData);
  });
}

module.exports = { getGameData };
