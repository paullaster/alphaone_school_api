import express from 'express';
import cors from 'cors';
import { application } from './config/index.js';
import {route } from './app/http/providers/index.js';
import { ApiResponder } from './app/http/middlewares/ApiResponder.js';


// APP INSTANCE
const app = express();


// APP SETTINGS
app.use(express.json());
app.use(cors());

app.use(ApiResponder);
app.get('/storage', (req,res) => {
 res.send('file');
});

app.use(route)



app.listen(application.port, () => {
    console.log(`Server started. ${application.url}`)
})
