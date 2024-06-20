const { sqlcmd } = require('../config/dbConnect')

class login {
  constructor(args) {
    Object.assign(this, args)
  }

  static selectUser(USERNAME) {
    const query = `SELECT * FROM USERS WHERE USERNAME =  '${USERNAME}'`
    return sqlcmd(query)
  }
}

module.exports = login
