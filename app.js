const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', {data: beersFromApi});
    })
    .catch(error => console.log(error));
})

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      res.render('random-beer', randomBeer[0]);
    })
    .catch(error => console.log(error));
})
//Didn't get the 2nd bonus...

// app.get('/specific-beer', (req, res) => {
//   punkAPI
//     .getBeer(296)
//     .then(specificBeer => {
//       res.render('specific-beer', specificBeer[0]);
//       console.log(specificBeer);
//     })
//     .catch(error => console.log(error));
// })

app.listen(3000, () => console.log('🏃‍ on port 3000'));
