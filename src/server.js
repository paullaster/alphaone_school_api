import express from 'express';


// APP INSTANCE
const app = express();




app.get('/', (req, res) => {
    res.send("I am back home after a long time");
});

const port = 3000;


app.listen(port, () => {
    console.log("Server listening on port " + port)
})
