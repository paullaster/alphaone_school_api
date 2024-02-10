import express from 'express';
import { application } from './config/index.js';
import { router } from './routes/index.js';


// APP INSTANCE
const app = express();




app.get('/', (req, res) => {
    res.send("I am back home after a long time");
});


app.listen(application.port, () => {
    console.log(`Server started. ${application.url}`)
})
