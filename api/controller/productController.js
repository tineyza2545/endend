const Product = require('../models/product')

const handleAllProduct = async (req, res, next) => {
  try {
    const result = await Product.selectAllProduct()
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const handleAddProduct = async (req, res, next) => {
  const {
    NAME,
    DETAIL,
    PRICE,
    PRICEB,
    TOTAL,
    FILELINK,
    FILENAME,
    PROMOTION,
    PROMOTION_PRICE,
  } = req.body

  try {
    const result = await Product.insertProduct(
      NAME,
      DETAIL,
      PRICE,
      PRICEB,
      TOTAL,
      FILELINK,
      FILENAME,
      PROMOTION,
      PROMOTION_PRICE
    )
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const handleUpdateProduct = async (req, res, next) => {
  const {
    NAME,
    DETAIL,
    PRICE,
    PRICEB,
    TOTAL,
    FILELINK,
    FILENAME,
    PROMOTION,
    PROMOTION_PRICE,
    ID,
  } = req.body

  try {
    const result = await Product.updateProduct(
      NAME,
      DETAIL,
      PRICE,
      PRICEB,
      TOTAL,
      FILELINK,
      FILENAME,
      PROMOTION,
      PROMOTION_PRICE,
      ID
    )
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const handleDeleteData = async (req, res, next) => {
  const { ID } = req.body
  try {
    const result = await Product.deleteProduct(ID)
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  handleAddProduct,
  handleAllProduct,
  handleUpdateProduct,
  handleDeleteData,
}
