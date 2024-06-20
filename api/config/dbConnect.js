const mysql = require('mysql2')

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: '+07:00',
})

const sqlcmd = (option, value = []) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        throw err
      } else {
        conn.query(option, value, function (err, results, fields) {
          if (err) {
            console.log(err);
            reject(err)
          } else {
            resolve(JSON.parse(JSON.stringify(results)))
          }
          conn.release()
        })
      }
    })
  })
}
module.exports = {
  sqlcmd,
}
