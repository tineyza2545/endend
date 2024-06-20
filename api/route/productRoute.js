const express = require('express')
const router = express.Router()
const { handleAddProduct, handleUpdateProduct } = require('../controller/productController')

router.post('/addProduct', handleAddProduct)
router.post('/updateProduct', handleUpdateProduct)


module.exports = router
