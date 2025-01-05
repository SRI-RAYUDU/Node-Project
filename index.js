const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv').config();

const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files (CSS) from the 'public' directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { weather: null, error: null });
});

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.API_KEY; // Make sure to add your API key in the .env file

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
