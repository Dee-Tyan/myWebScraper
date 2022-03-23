const data = require("../database.json");

function find() {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
}

function findyId(){


}

module.exports = { find, findById };
