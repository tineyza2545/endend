const { sqlcmd } = require('../config/dbConnect')

class Product {
  constructor(args) {
    Object.assign(this, args)
  }
  static selectAllProduct() {
    const query = `SELECT * FROM PRODUCT`
    return sqlcmd(query)
  }

  static insertProduct(
    NAME,
    DETAIL,
    PRICE,
    PRICEB,
    TOTAL,
    FILELINK,
    FILENAME,
    PROMOTION,
    PROMOTION_PRICE
  ) {
    const query = `INSERT INTO PRODUCT (NAME, DETAIL, PRICE,PRICEB, TOTAL, FILELINK, FILENAME, PROMOTION, PROMOTION_PRICE) VALUES ('${NAME}','${DETAIL}',${PRICE}, ${PRICEB},${TOTAL}, '${FILELINK}', '${FILENAME}', ${PROMOTION}, ${PROMOTION_PRICE})`
    return sqlcmd(query)
  }

  static updateProduct(
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
  ) {
    let query = ``
    if (
      (FILELINK === null || FILELINK === undefined || FILELINK === '') &&
      (FILENAME === null || FILENAME === undefined || FILENAME === '')
    ) {
      query = `UPDATE PRODUCT SET NAME = '${NAME}', DETAIL = '${DETAIL}', PRICE = ${PRICE}, TOTAL = ${TOTAL}, PROMOTION = ${PROMOTION}, PROMOTION_PRICE = ${PROMOTION_PRICE}, PRICEB = ${PRICEB} WHERE ID = ${ID}`
    } else {
      query = `UPDATE PRODUCT SET NAME = '${NAME}', DETAIL = '${DETAIL}', PRICE = ${PRICE}, TOTAL = ${TOTAL}, PROMOTION = ${PROMOTION}, PROMOTION_PRICE = ${PROMOTION_PRICE}, FILELINK = "${FILELINK}", FILENAME = '${FILENAME}' WHERE ID = ${ID}`
    }

    const query1 = query
    return sqlcmd(query1)
  }

  static deleteProduct(ID) {
    const query = `DELETE FROM PRODUCT WHERE ID = ${ID};`
    return sqlcmd(query)
  }
}

module.exports = Product
