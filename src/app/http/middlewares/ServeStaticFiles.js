import path from 'node:path';
import express from 'express';

const staticFiles = express.Router();

staticFiles.get('/storage/*', (req, res) => {

});
