// model.js
const bd = require('./bd');

function createUser(username, password) {
  return new Promise((resolve, reject) => {
    bd.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function getUserByUsername(username) {
  return new Promise((resolve, reject) => {
    bd.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
}

function getAllUsers() {
  return new Promise((resolve, reject) => {
      bd.query('SELECT * FROM users', (err, results) => {
          if (err) {
              reject(err);
          } else {
              resolve(results);
          }
      });
  });
}

module.exports = {
  createUser,
  getUserByUsername,
  getAllUsers // Exportando a função para buscar todos os usuários
};
