import express from 'express';
import cors from 'cors';
import { application } from './config/index.js';
import {route } from './app/http/providers/index.js';
import { ApiResponder } from './app/http/middlewares/ApiResponder.js';
// import { staticFiles } from './app/http/middlewares/ServeStaticFiles.js';
import path from  'node:path';


// APP INSTANCE
const app = express();


// APP SETTINGS
app.use(express.json());
app.use(cors());

app.use(ApiResponder);
app.use('/storage/*', express.static(path.join(__dirname, 'storage', 'public', 'images')));
// app.use(staticFiles);

app.use(route)



app.listen(application.port, () => {
    console.log(`Server started. ${application.url}`)
})
