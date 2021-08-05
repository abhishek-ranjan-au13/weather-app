const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocoding = require("./utils/geocode");
const forecast = require("./utils/forcast");
const app = express();

//console.log(__dirname);
//console.log(path.join(__dirname, "../public"));
const pathPublicFolder = path.join(__dirname, "../public");
const partialPath = path.join(__dirname, "../templets/partials");
const viewsPath = path.join(__dirname, "../templets/views");
app.use(express.static(pathPublicFolder));
// app.get("", (req, res) => { with app.use this wont get served in home page
//   res.send("<h1> Hello </h1>");
// });
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);
app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "Abhishek Ranjan" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Abhishek Ranjan" });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    msg: "Help though neighbour",
    name: "Abhishek Ranjan",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({ error: `please type a valid address` });
  } else {
    geocoding(req.query.address, (error, data) => {
      if (error) {
        res.send({ error });
        // console.log("error ", error);
      } else {
        forecast(data.latitude, data.longitude, (error, foreCastdata) => {
          if (error) {
            res.send({ error });
            // console.log("Error", error);
          } else {
            res.send({
              location: data.location,
              Forcast: foreCastdata,
              address: req.query.address,
            });
            // console.log(data.location);
            // console.log(foreCastdata);
          }
        });
      }
    });
  }
});
app.get("/help/*", (req, res) => {
  res.render("error", { msg: `can't find help article`, error: "404" });
});
app.get("*", (req, res) => {
  res.render("error", { msg: "page not found", error: "404" });
});

app.listen(5000, () => {
  console.log("listening to port 5000");
});
