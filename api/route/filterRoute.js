const express = require('express')
const router = express.Router()
const uploadImg = require('../middleware/upload')
const {
  handleDeleteData,
  handleUpdateProduct,
} = require('../controller/productController')
const {
  handleAllProduct,
  handleMinusTotal,
  handlePlusTotal,
  handleCheckSlip,
  handleUserPayment,
  handleAllAdmin,
  handleDeleteAdmin,
  handleaddAdmin,
  handleselectBillOrder,
  handleUpdateStatusBill,
  handleSelectAllAmountSell,
  handlesumPriceB,
  handlesumForChart,
  handleselectBillConfirm,
  generateBilling,
  handleSumLimit
} = require('../controller/filterController')

router.get('/listProduct', handleAllProduct)
router.post('/deleteProduct', handleDeleteData)
router.post('/updateProduct', handleUpdateProduct)
router.post('/minusProduct', handleMinusTotal)
router.post('/plusProduct', handlePlusTotal)
router.post('/slipCheck', uploadImg.single('files'), handleCheckSlip)
router.post('/confirmPayment', handleUserPayment)
router.get('/listAdmin', handleAllAdmin)
router.post('/deleteAdmin', handleDeleteAdmin)
router.post('/addAdmin', handleaddAdmin)
router.get('/allBill', handleselectBillOrder)
router.post('/udBill', handleUpdateStatusBill)
router.get('/allAmountSell', handleSelectAllAmountSell)
router.get('/sumpriceb', handlesumPriceB)
router.get('/sumForChart', handlesumForChart)
router.get('/selectBillConfirm', handleselectBillConfirm)
router.post('/getDataPrint', generateBilling)
router.get('/sumLimit', handleSumLimit)

module.exports = router
