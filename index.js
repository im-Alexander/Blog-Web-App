import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { writeFile } from 'node:fs';

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
var postNumber = 0;

// defines the static folder
app.use(express.static("public"));

// lets the app use body parser
app.use(bodyParser.urlencoded({ extended: true }));

// loads home page
app.get("/", (req, res) => {

    res.render(__dirname + "/views/index.ejs",
        {
            title: "Home",
            year: getCurrentYear()
        });
});

// loads create a post page
app.get("/create", (req, res) => {

    res.render(__dirname + "/views/create.ejs",
        {
            title: "Create a post",
            year: getCurrentYear()
        });
});

// When the user creates a post
app.post("/publish", (req, res) => {
    const title = req.body.title;
    const body = req.body.body;

    const entry = title + "\n\n" + body;

    // writes to a text file in the posts folder
    writeFile('posts/' + postNumber + '.txt', entry, (err) => {
        if (err) throw err;
        console.log('The txt file has been created!');
        postNumber++;
    });

    res.render(__dirname + "/views/publish.ejs",
        {
            title: "Publish Successful!",
            year: getCurrentYear()
        });
});

// runs express
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

// gets current year
function getCurrentYear() {
    const d = new Date();
    let currentYear = d.getFullYear();

    return currentYear;
}