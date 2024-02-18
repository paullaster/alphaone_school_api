import express from 'express';
import cors from 'cors';
import { application } from './config/index.js';
import {route } from './app/http/providers/index.js';
import { ApiResponder } from './app/http/middlewares/ApiResponder.js';
import path from 'path';
import { fileURLToPath } from 'url';


// APP INSTANCE
const app = express();


// APP SETTINGS
app.use(express.json());
app.use(cors());

app.use(ApiResponder);


// SERVING STATIC FILES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/storage', express.static(path.join(path.dirname(__dirname), 'storage')));

app.use(route)



app.listen(application.port, () => {
    console.log(`Server started. ${application.url}`)
})
