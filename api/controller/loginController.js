const login = require('../models/login')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res, next) => {
  const { USERNAME, PASSWORD } = req.body
  try {
    const findUser = await login.selectUser(USERNAME)
    if (findUser.length > 0) {
      const match = await bcrypt.compare(PASSWORD, findUser[0].PASSWORD)

      if (match) {
        const token = await jwt.sign(
          {
            ID: findUser[0].ID,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '1d' }
        )

        res.send({
          token,
          name: findUser[0].ROLE,
        })
      } else {
        res.sendStatus(401)
      }
    } else {
      res.status(500).json({ message: error.message })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
module.exports = {
  handleLogin,
}
