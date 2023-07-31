const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const axios = require('axios')

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.render('main')
})

//try composer api
const url = 'https://api.openopus.org/composer/list/pop.json'

axios.get(url).then(response => {
  let data = response.data;
  let composers = data.composers;
  for (let i = 0; i < composers.length; i++) {
    const composer = composers[i];
    const user = {
      name: `${composer.name}`,
      epoch: composer.epoch,
      portrait: composer.portrait
    };
    console.log(user);
  }
}).catch(function (error) {
  console.log(error);
})

console.log('this is a new page')


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})