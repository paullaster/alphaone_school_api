import express from 'express';
import { application } from './config/index.js';
import {route } from './app/http/providers/index.js'


// APP INSTANCE
const app = express();


app.use(route)


app.get('/', (req, res) => {
    res.send("I am back home after a long time");
});


app.listen(application.port, () => {
    console.log(`Server started. ${application.url}`)
})
