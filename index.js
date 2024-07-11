import express from "express";

import fs from "fs";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use((req, res, next) => {
  const timeOfDay = new Date().getHours();
  const DayOfWeek = new Date().getDay();

  if (timeOfDay < 9 || timeOfDay > 17 || DayOfWeek === 0 || DayOfWeek === 6) {
    res.send("opps🫡 looks like the public web is not active at this hour");
  } else {
    next();
  }
});

app.get("/", (req, res) => {
  const homepageCcontent = fs.readFileSync("./public/home_page.html", "utf8");
  res.send(homepageCcontent);
});

app.get("/services", (req, res) => {
  const servicesContent = fs.readFileSync("./public/our_service.html", "utf8");
  res.send(servicesContent);
});

app.get("/contacts", (req, res) => {
  const contactsContent = fs.readFileSync("./public/contact_us.html", "utf8");
  res.send(contactsContent);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
