const excelJS = require("exceljs");
const SubscribeModel = require("../../models/SubscribeModel");
const moment = require('moment');

const exportSubscribers = async (req, res) => {
  try {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("My Subscribers");

    worksheet.columns = [
      { header: "S no.", key: "s_no", width: 10 },
      { header: "Email", key: "email", width: 30 },
      { header: "Subscribe Date", key: "subscribe_date", width: 20 },
      { header: "Role", key: "role", width: 15 },
      { header: "Communities", key: "communities", width: 70 },
    ];

    // Fetch subscribers and populate their communities
    const subscribers = await SubscribeModel.find().populate({ path: "communities", select: "slug title" });

    subscribers.forEach((subscriber, index) => {
      // Create the list of community URLs, joining them with a line break
      const communityList = subscriber?.communities?.map(community => 
        `${process.env.CLIENT_URL}/community/${community?.slug}`
      ).join("\n"); // Use '\n' for line breaks

      // Create a new row object with only the necessary fields
      const rowData = {
        s_no: index + 1,
        email: subscriber.email,
        subscribe_date: moment(subscriber?.createdAt).format("DD-MM-YYYY"),
        role: "Subscriber",
        communities: communityList // The joined string of community URLs with line breaks
      };

      // Add the new row to the worksheet
      worksheet.addRow(rowData);
    });

    // Make the first row bold (headers)
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Enable text wrapping for the communities column
    worksheet.getColumn("communities").alignment = { wrapText: true };

    // Set response headers for Excel download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=subscribers.xlsx");

    // Write the Excel file to the response
    await workbook.xlsx.write(res);

    // End the response
    res.end();
  } catch (err) {
    console.log(err.message);

    // Send error response if something goes wrong
    if (!res.headersSent) {
      res.status(500).json({ error: "An error occurred while exporting subscribers." });
    }
  }
};

module.exports = exportSubscribers;
