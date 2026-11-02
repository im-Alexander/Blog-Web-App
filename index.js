import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"));

app.get("/", (req, res) => {
    // gets current year
    const d = new Date();
    let currentYear = d.getFullYear();

    res.render(__dirname + "/views/index.ejs",
        {
            title: "Home",
            year: currentYear
        });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});