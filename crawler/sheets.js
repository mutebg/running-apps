const sheetsy = require("sheetsy");
const { urlToKey, getWorkbook, getSheet } = sheetsy;
const fs = require("fs");

const URL =
  "https://docs.google.com/spreadsheets/d/1GEzrr4pdYf54zQVP2w3D29nhckrACXWxXCkg1UcEmi4/edit?usp=sharing";

const getAppsList = async () => {
  const key = urlToKey(URL);

  const workbook = await getWorkbook(key);
  const rows = await getSheet(key, workbook.sheets[0].id);
  return rows.rows;
};

const saveFile = (data, path) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const formatRow = (row) => {
  const {
    slug,
    name,
    website,
    googleurl,
    appleurl,
    free,
    submonthly,
    subyearly,
    watchsupport,
    category,
    apple,
    google,
  } = row;

  return {
    slug,
    name,
    website,
    googleurl,
    appleurl,
    free,
    submonthly,
    subyearly,
    watchsupport,
    category,
    apple,
    google,
  };
};

const formatList = (list) => list.map(formatRow);

module.exports = {
  getAppsList,
  saveFile,
  formatList,
};
