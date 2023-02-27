const express = require('express');
const server = express();
const hbs = require('hbs');
const { getGameData } = require('./index.js');

// Set up the view engine
server.set('view engine', 'hbs');

// Set up the path to your views directory
server.set('views', __dirname + '/views');

// Register the partials directory
hbs.registerPartials(__dirname + '/views');

// set the MIME type for .css files
server.set('Content-Type', 'text/css');

// serve static files from the 'public' directory
server.use(express.static('public'));

// Set up the route to render the template
server.get('/', function(req, res) {
  getGameData(function(gameData) {
    const today = new Date().toDateString();
    const local = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const context = {
      title: 'AC Milan Game',
      localHtml: local,
      date: today,
      tournament: gameData.tournament,
      homeTeam: gameData.homeTeam,
      homeTeamImgLink: gameData.homeTeamImgLink,
      awayTeam: gameData.awayTeam,
      awayTeamImgLink: gameData.awayTeamImgLink,
      gameDate: gameData.date,
    };    
    res.render('template', context);
  });
});

// Start the server
server.listen(3000, function() {
  console.log('Listening on port 3000');
});
