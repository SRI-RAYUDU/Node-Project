const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv').config();

const app = express();


app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { weather: null, error: null });
});

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.API_KEY; 

  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  let weather;
  let error = null;

  try {
    const response = await axios.get(APIUrl);
    weather = response.data;
  } catch (err) {
    error = 'Unable to fetch weather data. Please try again later.';
    weather = null;
    console.error(err);
  }

  res.render('index', { weather, error });
});

const port = process.env.PORT || 5668;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
