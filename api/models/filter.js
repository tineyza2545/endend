const { sqlcmd } = require('../config/dbConnect')

class Filter {
  constructor(args) {
    Object.assign(this, args)
  }
  static selectAllProduct() {
    const query = `SELECT * FROM PRODUCT ORDER BY TOTAL ASC`
    return sqlcmd(query)
  }
  static selectAllAmountSell() {
    const query = `SELECT SUM(TOTAL * PRICE) as summary FROM allsell`
    return sqlcmd(query)
  }
  static selectAllAdmin() {
    const query = `SELECT ID, USERNAME, ROLE FROM USERS WHERE ROLE = 'ADMIN'`
    return sqlcmd(query)
  }
  static selectProductID(id) {
    const query = `SELECT TOTAL FROM PRODUCT WHERE ID = ${id}`
    return sqlcmd(query)
  }
  static sumPriceB() {
    const query = `SELECT SUM(PRICEB) AS PB FROM product `
    return sqlcmd(query)
  }
  static sumForChart() {
    const query = `SELECT NAME, COUNT( PID) AS PID, SUM(TOTAL * PRICE) AS ALLTOTALPRODUCT FROM allsell GROUP BY NAME ORDER BY  PID DESC`
    return sqlcmd(query)
  }

  static sumLimit() {
    const query = `SELECT NAME, COUNT(PID) AS PID, SUM(TOTAL * PRICE) AS ALLTOTALPRODUCT 
    FROM allsell 
    GROUP BY NAME 
    ORDER BY PID DESC 
    LIMIT 3`
    return sqlcmd(query)
  }

  static minusProduct(udTotal, id) {
    const query = `UPDATE PRODUCT SET TOTAL = ${udTotal} where id = ${id}`
    return sqlcmd(query)
  }

  static addBill(
    NAME,
    PRICE,
    CUSTOMER,
    TOTAL,
    TEL,
    BILL_ID,
    ALLCOST,
    STATUSBILL,
    ID
  ) {
    const query = `INSERT INTO allsell (NAME, PRICE, CUSTOMER, TOTAL, TEL, BILL_ID,  ALLCOST, STATUSBILL, PID) VALUES ('${NAME}', ${PRICE}, '${CUSTOMER}', ${TOTAL}, '${TEL}','${BILL_ID}', ${ALLCOST}, ${STATUSBILL}, ${ID}) `
    return sqlcmd(query)
  }

  static deleteAdmin(ID) {
    const query = `DELETE FROM USERS WHERE ID = ${ID};`
    return sqlcmd(query)
  }

  static checkUser(USERNAME) {
    const query = `SELECT USERNAME FROM USERS WHERE USERNAME = '${USERNAME}' `
    return sqlcmd(query)
  }

  static insertAdmin(USERNAME, PASSWORD, ROLE) {
    const query = `INSERT INTO USERS (USERNAME, PASSWORD, ROLE) VALUES ('${USERNAME}','${PASSWORD}', '${ROLE}')`
    return sqlcmd(query)
  }

  static selectBillOrder() {
    const query = `SELECT
    BILL_ID,
    CUSTOMER,
    TEL,
    GROUP_CONCAT(DISTINCT CONCAT(t1.NAME, ' ', t1.TOTAL, ' แพ็ค ',' ', t2.TotalItemPrice, ' บาท') ORDER BY t1.NAME) AS NameWithTotal,
    ALLCOST AS TotalPrice,
    create_date
    FROM
    allsell t1
    JOIN (
    SELECT NAME, TOTAL, PRICE * TOTAL AS TotalItemPrice
    FROM allsell
    ) t2 ON t1.NAME = t2.NAME AND t1.TOTAL = t2.TOTAL
    WHERE STATUSBILL = 0
    GROUP BY
    create_date
    `
    return sqlcmd(query)
  }
  static selectBillConfirm() {
    const query = `SELECT
    BILL_ID,
    CUSTOMER,
    TEL,
    GROUP_CONCAT(DISTINCT CONCAT(t1.NAME, ' ', t1.TOTAL, ' แพ็ค ',' ', t2.TotalItemPrice, ' บาท') ORDER BY t1.NAME) AS NameWithTotal,
    ALLCOST AS TotalPrice,
    create_date
    FROM
    allsell t1
    JOIN (
    SELECT NAME, TOTAL, PRICE * TOTAL AS TotalItemPrice
    FROM allsell
    ) t2 ON t1.NAME = t2.NAME AND t1.TOTAL = t2.TOTAL
    WHERE STATUSBILL = 1
    GROUP BY
    create_date
    `
    return sqlcmd(query)
  }

  static updateStatusBill(STATUSBILL, BILL_ID) {
    const query = `UPDATE ALLSELL SET STATUSBILL = ${STATUSBILL} WHERE BILL_ID = "${BILL_ID}"`
    return sqlcmd(query)
  }
}

module.exports = Filter
