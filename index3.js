var express = require("express");
var excel = require("node-excel-export");
var moment = require("moment");

var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
app.listen(4400);

// Body parser
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// MongoDB
var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/db_data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// =====================
// Helpers (Node v12-safe)
// =====================
function nvl(val, def) {
  return (val === null || val === undefined) ? def : val;
}

// =====================
// Schemas
// =====================
var data_CD_KwhCaSchema = new mongoose.Schema({
  CD_Kwh_Ca_timestamp: Date,

  data_CD_Tram01_A51_MV01_Kwh_Ca1: Number,
  data_CD_Tram01_A51_MV02_Kwh_Ca1: Number,
  data_CD_Tram01_A51_MV03_Kwh_Ca1: Number,
  data_CD_Tram01_A51_MV04_Kwh_Ca1: Number,
  data_CD_Tram01_A52_MV05_Kwh_Ca1: Number,
  data_CD_Tram02_A51_MV01_Kwh_Ca1: Number,
  data_CD_Tram03_A51_MV01_Kwh_Ca1: Number,
  data_CD_Tram04_A51_MV01_Kwh_Ca1: Number,
  data_CD_Tram05_A51_MV01_Kwh_Ca1: Number,

  data_CD_Tram01_A51_MV01_Kwh_Ca2: Number,
  data_CD_Tram01_A51_MV02_Kwh_Ca2: Number,
  data_CD_Tram01_A51_MV03_Kwh_Ca2: Number,
  data_CD_Tram01_A51_MV04_Kwh_Ca2: Number,
  data_CD_Tram01_A52_MV05_Kwh_Ca2: Number,
  data_CD_Tram02_A51_MV01_Kwh_Ca2: Number,
  data_CD_Tram03_A51_MV01_Kwh_Ca2: Number,
  data_CD_Tram04_A51_MV01_Kwh_Ca2: Number,
  data_CD_Tram05_A51_MV01_Kwh_Ca2: Number,

  data_CD_Tram01_A51_MV01_Kwh_Ca3: Number,
  data_CD_Tram01_A51_MV02_Kwh_Ca3: Number,
  data_CD_Tram01_A51_MV03_Kwh_Ca3: Number,
  data_CD_Tram01_A51_MV04_Kwh_Ca3: Number,
  data_CD_Tram01_A52_MV05_Kwh_Ca3: Number,
  data_CD_Tram02_A51_MV01_Kwh_Ca3: Number,
  data_CD_Tram03_A51_MV01_Kwh_Ca3: Number,
  data_CD_Tram04_A51_MV01_Kwh_Ca3: Number,
  data_CD_Tram05_A51_MV01_Kwh_Ca3: Number,

  note: String
});

var CdKwhCa = mongoose.model("data_CD_KwhCa", data_CD_KwhCaSchema, "data_CD_KwhCa");

var data_CD_KwhCaRpSchema = new mongoose.Schema({
  date: Date,

  data_CD_Tram01_A51_MV01_Kwh_Ca1: Number,
  data_CD_Tram01_A51_MV02_Kwh_Ca1: Number,
  data_CD_Tram01_A51_MV03_Kwh_Ca1: Number,
  data_CD_Tram01_A51_MV04_Kwh_Ca1: Number,
  data_CD_Tram01_A52_MV05_Kwh_Ca1: Number,
  data_CD_Tram02_A51_MV01_Kwh_Ca1: Number,
  data_CD_Tram03_A51_MV01_Kwh_Ca1: Number,
  data_CD_Tram04_A51_MV01_Kwh_Ca1: Number,
  data_CD_Tram05_A51_MV01_Kwh_Ca1: Number,

  data_CD_Tram01_A51_MV01_Kwh_Ca2: Number,
  data_CD_Tram01_A51_MV02_Kwh_Ca2: Number,
  data_CD_Tram01_A51_MV03_Kwh_Ca2: Number,
  data_CD_Tram01_A51_MV04_Kwh_Ca2: Number,
  data_CD_Tram01_A52_MV05_Kwh_Ca2: Number,
  data_CD_Tram02_A51_MV01_Kwh_Ca2: Number,
  data_CD_Tram03_A51_MV01_Kwh_Ca2: Number,
  data_CD_Tram04_A51_MV01_Kwh_Ca2: Number,
  data_CD_Tram05_A51_MV01_Kwh_Ca2: Number,

  data_CD_Tram01_A51_MV01_Kwh_Ca3: Number,
  data_CD_Tram01_A51_MV02_Kwh_Ca3: Number,
  data_CD_Tram01_A51_MV03_Kwh_Ca3: Number,
  data_CD_Tram01_A51_MV04_Kwh_Ca3: Number,
  data_CD_Tram01_A52_MV05_Kwh_Ca3: Number,
  data_CD_Tram02_A51_MV01_Kwh_Ca3: Number,
  data_CD_Tram03_A51_MV01_Kwh_Ca3: Number,
  data_CD_Tram04_A51_MV01_Kwh_Ca3: Number,
  data_CD_Tram05_A51_MV01_Kwh_Ca3: Number,

  note: String
});

var CdKwhCaRp = mongoose.model("CdKwhCaRp", data_CD_KwhCaRpSchema, "CdKwhCaRp");

// =====================
// Calc report (Node v12-safe)
// =====================
async function calcKwhByDayAndSaveReport(dateStr) {
  var startOfDay = new Date(dateStr + "T00:00:00.000+07:00");
  var endOfDay = new Date(dateStr + "T23:59:59.999+07:00");

  var firstDoc = await CdKwhCa.findOne({
    CD_Kwh_Ca_timestamp: { $gte: startOfDay, $lte: endOfDay }
  })
    .sort({ CD_Kwh_Ca_timestamp: 1 })
    .lean();

  var lastDoc = await CdKwhCa.findOne({
    CD_Kwh_Ca_timestamp: { $gte: startOfDay, $lte: endOfDay }
  })
    .sort({ CD_Kwh_Ca_timestamp: -1 })
    .lean();

  if (!firstDoc || !lastDoc) {
    return { date: dateStr, error: "Không có đủ dữ liệu trong ngày" };
  }

  var fields = [
    "data_CD_Tram01_A51_MV01_Kwh_Ca1",
    "data_CD_Tram01_A51_MV02_Kwh_Ca1",
    "data_CD_Tram01_A51_MV03_Kwh_Ca1",
    "data_CD_Tram01_A51_MV04_Kwh_Ca1",
    "data_CD_Tram01_A52_MV05_Kwh_Ca1",
    "data_CD_Tram02_A51_MV01_Kwh_Ca1",
    "data_CD_Tram03_A51_MV01_Kwh_Ca1",
    "data_CD_Tram04_A51_MV01_Kwh_Ca1",
    "data_CD_Tram05_A51_MV01_Kwh_Ca1",

    "data_CD_Tram01_A51_MV01_Kwh_Ca2",
    "data_CD_Tram01_A51_MV02_Kwh_Ca2",
    "data_CD_Tram01_A51_MV03_Kwh_Ca2",
    "data_CD_Tram01_A51_MV04_Kwh_Ca2",
    "data_CD_Tram01_A52_MV05_Kwh_Ca2",
    "data_CD_Tram02_A51_MV01_Kwh_Ca2",
    "data_CD_Tram03_A51_MV01_Kwh_Ca2",
    "data_CD_Tram04_A51_MV01_Kwh_Ca2",
    "data_CD_Tram05_A51_MV01_Kwh_Ca2",

    "data_CD_Tram01_A51_MV01_Kwh_Ca3",
    "data_CD_Tram01_A51_MV02_Kwh_Ca3",
    "data_CD_Tram01_A51_MV03_Kwh_Ca3",
    "data_CD_Tram01_A51_MV04_Kwh_Ca3",
    "data_CD_Tram01_A52_MV05_Kwh_Ca3",
    "data_CD_Tram02_A51_MV01_Kwh_Ca3",
    "data_CD_Tram03_A51_MV01_Kwh_Ca3",
    "data_CD_Tram04_A51_MV01_Kwh_Ca3",
    "data_CD_Tram05_A51_MV01_Kwh_Ca3"
  ];

  var reportDoc = { date: startOfDay };

  fields.forEach(function (f) {
    var firstVal = nvl(firstDoc[f], 0);
    var lastVal = nvl(lastDoc[f], 0);
    reportDoc[f] = lastVal - firstVal;
  });

  var saved = await CdKwhCaRp.findOneAndUpdate(
    { date: startOfDay },
    { $set: reportDoc },
    { upsert: true, new: true }
  ).lean();

  return { date: dateStr, status: saved };
}

module.exports = { calcKwhByDayAndSaveReport };

// =====================
// Routes
// =====================
app.get("/rp", async function (req, res) {
  try {
    var output = await calcKwhByDayAndSaveReport("2025-12-24");
    return res.render("a", { output: output });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error!");
  }
});

app.get("/rp/excel1", async function (req, res) {
  try {
    var fromStr = req.query.from || "2025-12-01";
    var toStr = req.query.to || "2025-12-24";

    // 1) Tính report từ ngày -> đến ngày
    var cur = moment(fromStr, "YYYY-MM-DD");
    var endMoment = moment(toStr, "YYYY-MM-DD");

    while (cur.isSameOrBefore(endMoment, "day")) {
      await calcKwhByDayAndSaveReport(cur.format("YYYY-MM-DD"));
      cur.add(1, "day");
    }

    // 2) Query report để export
    var start = new Date(fromStr + "T00:00:00.000+07:00");
    var end = new Date(toStr + "T23:59:59.999+07:00");

    var rows = await CdKwhCaRp.find({ date: { $gte: start, $lte: end } })
      .sort({ date: 1 })
      .lean();

    // styles (node-excel-export)
    var styles = {
      header: { font: { bold: true }, alignment: { horizontal: "center" } },
      number: { numFmt: "0.00" },
      text: {}
    };

    var specification = {
      date: {
        displayName: "Ngày",
        headerStyle: styles.header,
        width: 150,
        cellFormat: function (value) {
          return moment(value).format("YYYY-MM-DD");
        }
      },
      data_CD_Tram01_A51_MV01_Kwh_Ca1: {
        displayName: "MV01 (kWh)",
        headerStyle: styles.header,
        cellStyle: styles.number,
        width: 80
      },
      data_CD_Tram01_A51_MV02_Kwh_Ca1: {
        displayName: "MV02 (kWh)",
        headerStyle: styles.header,
        cellStyle: styles.number,
        width: 80
      },
      data_CD_Tram01_A51_MV03_Kwh_Ca1: {
        displayName: "MV03 (kWh)",
        headerStyle: styles.header,
        cellStyle: styles.number,
        width: 100
      },
      note: {
        displayName: "Ghi chú",
        headerStyle: styles.header,
        cellStyle: styles.text,
        width: 130
      }
    };

    // map data đúng key của specification
    var dataset = rows.map(function (r) {
      return {
        date: r.date,
        data_CD_Tram01_A51_MV01_Kwh_Ca1: nvl(r.data_CD_Tram01_A51_MV01_Kwh_Ca1, 0),
        data_CD_Tram01_A51_MV02_Kwh_Ca1: nvl(r.data_CD_Tram01_A51_MV02_Kwh_Ca1, 0),
        data_CD_Tram01_A51_MV03_Kwh_Ca1: nvl(r.data_CD_Tram01_A51_MV03_Kwh_Ca1, 0),
        note: nvl(r.note, "")
      };
    });

    var report = excel.buildExport([
      {
        name: "Report_" + fromStr + "_" + toStr,
        specification: specification,
        data: dataset
      }
    ]);

    var filename = "Report_" + fromStr + "_" + toStr + ".xlsx";
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", 'attachment; filename="' + filename + '"');

    return res.send(report);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error!");
  }
});

app.get("/rp/excel", async function (req, res) {
  try {
    var fromStr = req.query.from || "2025-12-01";
    var toStr = req.query.to || "2025-12-24";

    // 1) Tính report từ ngày -> đến ngày
    var cur = moment(fromStr, "YYYY-MM-DD");
    var endMoment = moment(toStr, "YYYY-MM-DD");

    while (cur.isSameOrBefore(endMoment, "day")) {
      await calcKwhByDayAndSaveReport(cur.format("YYYY-MM-DD"));
      cur.add(1, "day");
    }

    // 2) Query report để export
    var start = new Date(fromStr + "T00:00:00.000+07:00");
    var end = new Date(toStr + "T23:59:59.999+07:00");

    var rows = await CdKwhCaRp.find({ date: { $gte: start, $lte: end } })
      .sort({ date: 1 })
      .lean();

    // 3) List field cần xuất
    var fields = [
      // Ca1
      "data_CD_Tram01_A51_MV01_Kwh_Ca1",
      "data_CD_Tram01_A51_MV02_Kwh_Ca1",
      "data_CD_Tram01_A51_MV03_Kwh_Ca1",
      "data_CD_Tram01_A51_MV04_Kwh_Ca1",
      "data_CD_Tram01_A52_MV05_Kwh_Ca1",
      "data_CD_Tram02_A51_MV01_Kwh_Ca1",
      "data_CD_Tram03_A51_MV01_Kwh_Ca1",
      "data_CD_Tram04_A51_MV01_Kwh_Ca1",
      "data_CD_Tram05_A51_MV01_Kwh_Ca1",

      // Ca2
      "data_CD_Tram01_A51_MV01_Kwh_Ca2",
      "data_CD_Tram01_A51_MV02_Kwh_Ca2",
      "data_CD_Tram01_A51_MV03_Kwh_Ca2",
      "data_CD_Tram01_A51_MV04_Kwh_Ca2",
      "data_CD_Tram01_A52_MV05_Kwh_Ca2",
      "data_CD_Tram02_A51_MV01_Kwh_Ca2",
      "data_CD_Tram03_A51_MV01_Kwh_Ca2",
      "data_CD_Tram04_A51_MV01_Kwh_Ca2",
      "data_CD_Tram05_A51_MV01_Kwh_Ca2",

      // Ca3
      "data_CD_Tram01_A51_MV01_Kwh_Ca3",
      "data_CD_Tram01_A51_MV02_Kwh_Ca3",
      "data_CD_Tram01_A51_MV03_Kwh_Ca3",
      "data_CD_Tram01_A51_MV04_Kwh_Ca3",
      "data_CD_Tram01_A52_MV05_Kwh_Ca3",
      "data_CD_Tram02_A51_MV01_Kwh_Ca3",
      "data_CD_Tram03_A51_MV01_Kwh_Ca3",
      "data_CD_Tram04_A51_MV01_Kwh_Ca3",
      "data_CD_Tram05_A51_MV01_Kwh_Ca3"
    ];

    // 4) Styles
    var styles = {
      header: { font: { bold: true }, alignment: { horizontal: "center" } },
      number: { numFmt: "0.00" },
      text: {}
    };

    // 5) Specification
    var specification = {
      date: {
        displayName: "Ngày",
        headerStyle: styles.header,
        width: 140,
        cellFormat: function (value) {
          return moment(value).format("YYYY-MM-DD");
        }
      }
    };

    fields.forEach(function (f) {
      specification[f] = {
        displayName: f,
        headerStyle: styles.header,
        cellStyle: styles.number,
        width: 90
      };
    });

    specification.note = {
      displayName: "Ghi chú",
      headerStyle: styles.header,
      cellStyle: styles.text,
      width: 40
    };

    // 6) Dataset
    var dataset = rows.map(function (r) {
      var obj = { date: r.date };
      fields.forEach(function (f) {
        obj[f] = nvl(r[f], 0);
      });
      obj.note = nvl(r.note, "");
      return obj;
    });

    // 7) Export
    var report = excel.buildExport([
      {
        name: "Report_" + fromStr + "_" + toStr,
        specification: specification,
        data: dataset
      }
    ]);

    var filename = "Report_" + fromStr + "_" + toStr + ".xlsx";
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", 'attachment; filename="' + filename + '"');

    return res.send(report);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Export Excel Error!");
  }
});
