const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// define paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "António Ramos"
    });
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "António Ramos"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        helpMessage: "Help message",
        name: "António Ramos"
    });
});

app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide an adrress."
        });
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Help",
        errorMessage: "Help article not found",
        name: "Andrew"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Page not found",
        name: "Andrew"
    });
});

app.listen(3333, () => {
    console.log("Server started on port 3333");
});