const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express();

// connect to mongoDB
const dbURI = "mongodb+srv://root:root@nodetuts.zkksloy.mongodb.net/node-tuts?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => app.listen(3000))
    .catch((err) => console.log(err))

// regiser view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded( { extended: true } ))
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.redirect('/blogs')

})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

// blog routes
app.use('/blogs', blogRoutes)

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page not found' });
})