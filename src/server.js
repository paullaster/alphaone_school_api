import express from 'express';
import { application } from './config/index.js';
import {route } from './app/http/providers/index.js';


// APP INSTANCE
const app = express();


// APP SETTINGS
app.use(express.json());



app.use(route)



app.listen(application.port, () => {
    console.log(`Server started. ${application.url}`)
})
