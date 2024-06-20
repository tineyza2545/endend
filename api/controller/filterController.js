const Filter = require('../models/filter')
const FormData = require('form-data')
const bcrypt = require('bcrypt')
const { default: fetch } = require('node-fetch')
const Document = require('pdfkit')
const fs = require('fs')
const printer = require('node-thermal-printer')
const { PassThrough } = require('stream')

const handleAllProduct = async (req, res, next) => {
  try {
    const result = await Filter.selectAllProduct()
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const handleAllAdmin = async (req, res, next) => {
  try {
    const result = await Filter.selectAllAdmin()
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const handleselectBillOrder = async (req, res, next) => {
  try {
    const result = await Filter.selectBillOrder()
    if (result.length > 0) {
      // ส่งข้อความแจ้งเตือนผ่าน LINE Notify API
      // console.log(result);

      await sendLineNotification(result)
    }
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function sendLineNotification(data) {
  try {
    // Access Token ที่ได้จาก LINE Notify
    const accessToken = 'uQbeC9uOZkSiuSBmsx0Gv7dMKTYJb4Bk7pBsqqhCTIn'
    const message = 'มีรายการสั่งซื้อใหม่ ' + data.length + ' รายการ'

    // ส่งข้อความผ่าน LINE Notify API
    const response = await fetch('https://notify-api.line.me/api/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${accessToken}`,
      },
      body: new URLSearchParams({ message }),
    })
    const jsonResponse = await response.json()
    console.log('Notification sent:', jsonResponse)
  } catch (error) {
    console.error('Notification error:', error)
  }
}

const handleMinusTotal = async (req, res, next) => {
  const { TOTAL, ID } = req.body

  try {
    const selectPId = await Filter.selectProductID(ID)

    let udTotal = selectPId[0].TOTAL - TOTAL

    const result = await Filter.minusProduct(udTotal, ID)
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const handlePlusTotal = async (req, res, next) => {
  const { TOTAL, ID } = req.body

  try {
    const selectPId = await Filter.selectProductID(ID)
    let udTotal = selectPId[0].TOTAL + TOTAL

    const result = await Filter.minusProduct(udTotal, ID)
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const handleCheckSlip = async (req, res) => {
  const file = req.file

  try {
    const formdata = new FormData()
    formdata.append('files', file.buffer, { filename: file.originalname })

    const result = await fetch('https://api.slipok.com/api/line/apikey/20026', {
      method: 'POST',
      headers: {
        'x-authorization': 'SLIPOKPBWBRSE',
        ...formdata.getHeaders(),
      },

      body: formdata,
      log: true,
    })

    const data = await result.json()
    res.status(200).send(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const handleUserPayment = async (req, res) => {
  const { cartData, CUSTOMER, TEL, BILL_ID, ALLCOST } = req.body
  // console.log(cartData, CUSTOMER, TEL, BILL_ID, ALLCOST)

  const result2 = []
  try {
    for (let i = 0; i < cartData.length; i++) {
      const element = cartData[i]
      const STATUSBILL = 0

      const result = await Filter.addBill(
        element.NAME,
        element.PRICE,
        CUSTOMER,
        element.TOTAL,
        TEL,
        BILL_ID,
        ALLCOST,
        STATUSBILL,
        element.ID
      )
      result2.push(result)
    }
    res.status(200).send(result2)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const handleDeleteAdmin = async (req, res, next) => {
  const { ID } = req.body
  try {
    const result = await Filter.deleteAdmin(ID)
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const handleaddAdmin = async (req, res, next) => {
  const { USERNAME, PASSWORD } = req.body

  try {
    const checkUser = await Filter.checkUser(USERNAME)
    if (checkUser.length === 0) {
      const hashPass = await bcrypt.hash(PASSWORD, 10)
      const ROLE = 'ADMIN'
      const result = await Filter.insertAdmin(USERNAME, hashPass, ROLE)
      res.status(200).send(result)
    } else {
      res.status(500).send('username already')
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const handleUpdateStatusBill = async (req, res, next) => {
  const { BILL_ID } = req.body
  try {
    const STATUSBILL = 1
    const result = await Filter.updateStatusBill(STATUSBILL, BILL_ID)
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const handleSelectAllAmountSell = async (req, res) => {
  try {
    const result = await Filter.selectAllAmountSell()
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const handlesumPriceB = async (req, res) => {
  try {
    const result = await Filter.sumPriceB()
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const handlesumForChart = async (req, res) => {
  try {
    const result = await Filter.sumForChart()
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const handleselectBillConfirm = async (req, res) => {
  try {
    const result = await Filter.selectBillConfirm()
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// const generateBilling = async (req, res, next) => {
//   const { data } = req.body;
//   try {
//     // Create a new PDF document
//     const doc = new Document({ size: 'A7' });

//     // Set up a writable stream to save the PDF data
//     const pdfStream = res.writeHead(200, {
//       'Content-Type': 'application/pdf',
//       'Content-Disposition': 'attachment; filename=billing.pdf'
//     });

//     doc.pipe(pdfStream);

//     doc.fontSize(12);
//     // Header
//     doc.text('Billing Report', { align: 'center' });
//     // Customer Information
//     doc.text(`ชื่อลูกค้า: ${data.CUSTOMER}`, { align: 'left' });
//     doc.text(`เบอร์โทร: ${data.TEL}`, { align: 'left' });
//     // Itemized List (assuming data.Items is an array of objects)
//     doc.text('รายการ:', { align: 'left' });
//     if (data.Items && data.Items.length > 0) {
//       for (const item of data.Items) {
//         doc.text(`${item.Name} - ${item.Price}`, { align: 'left' });
//       }
//     } else {
//       doc.text('No items found in data', { align: 'left' });
//     }
//     // Total
//     doc.text(`ยอดรวม: ${data.TotalPrice}`, { align: 'left' });

//     // End the PDF document and send it to the client
//     doc.end();

//     // Handle the stream close event
//     // pdfStream.on('end', () => {
//     //   // Print the PDF data to the default printer
//     //   printer.printDirect({
//     //     data: pdfData,
//     //     type: 'PDF',
//     //     success: (jobID) => {
//     //       console.log(`Sent PDF to printer with job ID ${jobID}`);
//     //     },
//     //     error: (err) => {
//     //       console.error('Error printing PDF:', err);
//     //     }
//     //   });
//     // });

//     // Handle errors
//     pdfStream.on('error', (err) => {
//       console.error('Error sending PDF file:', err);
//       res.status(500).json({ message: 'Error sending PDF file' });
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
function jumpLine(doc, lines) {
  for (let index = 0; index < lines; index++) {
    doc.moveDown()
  }
}

const generateBilling = async (req, res, next) => {
  const { data } = req.body

  try {
    const thSarabunPSKFont = fs.readFileSync('fonts/THSarabunNew.ttf')
    const thSarabunPSKFontBuffer = Buffer.from(thSarabunPSKFont)

    console.log(thSarabunPSKFontBuffer)
    const doc = new Document({
      size: 'A7',
      margins: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    })
    doc.registerFont('THSarabunNew', thSarabunPSKFontBuffer)
    const pdfData = [] // Create an empty array to store the PDF data
    const distanceMargin = 8
    doc
      .stroke('#dd1818')
      .fill('#000000')
      .lineWidth(5)
      .lineJoin('round')
      .rect(
        distanceMargin,
        distanceMargin,
        doc.page.width - distanceMargin * 2,
        doc.page.height - distanceMargin * 2
      )
      .stroke()
    doc.font('THSarabunNew')
    doc.fontSize(12)
    // Header
    const maxWidth = 100
    const maxHeight = 50
    doc.image('assets/logo.png', doc.page.width / 2 - maxWidth / 2, 2, {
      fit: [maxWidth, maxHeight],
      align: 'center',
    })
    jumpLine(doc, 2)
    // Customer Information
    doc.text(`ชื่อลูกค้า: ${data.CUSTOMER}`, { align: 'left' })
    doc.text(`เบอร์โทร: ${data.TEL}`, { align: 'left' })
    // Itemized List (assuming data.Items is an array of objects)
    doc.text('รายการ:', { align: 'left' })
    const splitNameWithTotal = data.NameWithTotal.split(',')

    for (const item of splitNameWithTotal) {
      // ปรับแต่งความยาวบรรทัดตามต้องการ
      doc.text(item, { align: 'left' })
    }

    doc.text(`ยอดรวม: ${data.TotalPrice} บาท`, { align: 'left' })
    doc.end()

    const pdfStream = doc.pipe(new PassThrough())
    pdfStream.on('data', (chunk) => pdfData.push(chunk))
    pdfStream.on('end', () => {
      const pdfBuffer = Buffer.concat(pdfData)
      const base64Data = pdfBuffer.toString('base64')
      const responseData = {
        message: 'สร้างรายงานการเรียกเก็บเงินสำเร็จ',
        file: base64Data,
      }
      res.status(200).send(responseData)
    })
  } catch (error) {
    console.error(error) // Log the error for debugging
    res.status(500).json({ message: 'Error generating billing report' })
  }
}

const handleSumLimit = async (req, res) => {
  try {
    const result = await Filter.sumLimit()
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  generateBilling,
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
  handleSumLimit
}
