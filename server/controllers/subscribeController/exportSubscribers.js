const excelJS = require("exceljs");
const SubscribeModel = require("../../models/SubscribeModel")
const moment = require('moment')


const exportSubscribers = async (req, res) => {
  try {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("My Subscribers");

    worksheet.columns = [
      { header: "S no.", key: "s_no", width: 10 },          // Set the width for serial number
      { header: "Email", key: "email", width: 30 },         // Set a wider width for email
      { header: "Subscribe Date", key: "subscribe_date", width: 20 },  // Adjust width for date
      { header: "Role", key: "role", width: 15 },           // Adjust width for role
    ];
    

    const subscribers = await SubscribeModel.find();

    subscribers.forEach((subscriber, index) => {
      subscriber.s_no = index + 1;
      subscriber.role = "Subscriber";
      subscriber.subscribe_date = moment(subscriber?.createdAt).format("DD-MM-YYYY");
      worksheet.addRow(subscriber);
    })
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    })

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
    );

    res.setHeader("Content-Disposition", `attachment; filename=subscribers.xlsx`);

    try {
      const downloaded = await workbook.xlsx.write(res);
      if(downloaded) {
        res.status(200).json({
          msg: "Data is downloading"
        })
      } else {
        res.status(424).json({
          errors: {
            fail: {
              msg: "please try again!"
            }
          }
        })
      }
    } catch(err) {
      console.log(err.message)
    }
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = exportSubscribers;