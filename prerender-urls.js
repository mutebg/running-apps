const appsList = require("./data/list.json");

let urls = [
  {
    url: "/",
    title: "Homepage",
  },
];

appsList.forEach((app) => {
  urls.push({
    url: "/view/" + app.slug,
    title: app.name,
  });
});

module.exports = urls;
