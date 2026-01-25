var express = require("express");
var excel = require("node-excel-export");
var moment = require("moment");
const path = require("path");
const ExcelJS = require("exceljs");


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

var dataBNSA51KwhDaySchema = new mongoose.Schema(
  {
    BNSA51_KwhDay_timestamp: { type: Date },

    dataBNS_TotalDay_Kwh_A51_MV01: { type: Number, default: 0 },
    dataBNS_TotalDay_Kwh_A51_MV02: { type: Number, default: 0 },
    dataBNS_TotalDay_Kwh_A51_MV03: { type: Number, default: 0 },
    dataBNS_TotalDay_Kwh_A51_MV04: { type: Number, default: 0 },

    dataBNS_TotalDay_Kwh_A52_MV05: { type: Number, default: 0 },
    dataBNS_TotalDay_Kwh_A52_MV06: { type: Number, default: 0 },
    dataBNS_TotalDay_Kwh_A52_MV07: { type: Number, default: 0 },

    dataBNS_TotalDay_Kwh_A53_MV10: { type: Number, default: 0 },
    dataBNS_TotalDay_Kwh_A53_MV11: { type: Number, default: 0 },
    dataBNS_TotalDay_Kwh_A53_MV12: { type: Number, default: 0 },

    dataBNS_TotalDay_Kwh_A54_MV13: { type: Number, default: 0 },
    dataBNS_TotalDay_Kwh_A54_MV14: { type: Number, default: 0 },
    dataBNS_TotalDay_Kwh_A54_MV15: { type: Number, default: 0 },
    dataBNS_TotalDay_Kwh_A54_MV16: { type: Number, default: 0 }
});

var DataBNSA51KwhDay = mongoose.model("data_BNSA51_KwhDay", dataBNSA51KwhDaySchema, "data_BNSA51_KwhDay");

var DelHistorySchema = new mongoose.Schema({
    from: { type: String, required: true }, // "YYYY-MM-DD"
    to: { type: String, required: true },

    start: { type: Date, required: true }, // from 00:00:00+07
    end: { type: Date, required: true },   // to 23:59:59+07

    collections: [
      {
        name: { type: String, required: true }, // "CdKwhCa" / "DataBNSA51KwhDay"
        deletedCount: { type: Number, default: 0 }
      }
    ],

    note: { type: String, default: "" },

    // audit
    ip: { type: String, default: "" },
    user: { type: String, default: "" }, // nếu bạn có auth thì set req.user.username/email
    userAgent: { type: String, default: "" }
  },
  { timestamps: true, collection: "del_history" } // ✅ tên collection đúng yêu cầu
);

var DelHistory = mongoose.model("DelHistory", DelHistorySchema);

// =====================
// Routes
// =====================
app.get("/rp", async function (req, res) {
  try {
    var output = [] //await calcKwhByDayAndSaveReport("2025-12-24");
    return res.render("a", { output: output });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error!");
  }
});


app.get("/rp/excel", async function (req, res) {
  try {
    var fromStr = req.query.from || "2025-12-01";
    var toStr = req.query.to || "2025-12-24";

    var startFrom = new Date(fromStr + "T00:00:00.000+07:00");
    var endFrom = new Date(fromStr + "T23:59:59.999+07:00");
    var startTo = new Date(toStr + "T00:00:00.000+07:00");
    var endTo = new Date(toStr + "T23:59:59.999+07:00");

    // 1) record đầu ngày from
    var firstDoc = await CdKwhCa.findOne({
      CD_Kwh_Ca_timestamp: { $gte: startFrom, $lte: endFrom }
    })
      .sort({ CD_Kwh_Ca_timestamp: 1 })
      .lean();

    // 2) record cuối ngày to
    var lastDoc = await CdKwhCa.findOne({
      CD_Kwh_Ca_timestamp: { $gte: startTo, $lte: endTo }
    })
      .sort({ CD_Kwh_Ca_timestamp: -1 })
      .lean();

    if (!firstDoc || !lastDoc) {
      return res
        .status(400)
        .send("Không có đủ dữ liệu để xuất (thiếu record ngày đầu hoặc ngày cuối).");
    }

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

    // ✅ helper tính tổng các field
    function calcTotal(obj) {
      var sum = 0;
      fields.forEach(function (f) {
        sum += Number(nvl(obj[f], 0));
      });
      return sum;
    }

    // 4) Build 3 rows
    function pickValues(doc) {
      var obj = {};
      fields.forEach(function (f) {
        obj[f] = Number(nvl(doc[f], 0));
      });
      // ✅ thêm total vào cuối
      obj.TOTAL = calcTotal(obj);
      return obj;
    }

    var row1 = {
      type: "Dòng 1",
      label: "Ngày đầu (record đầu ngày)",
      date: firstDoc.CD_Kwh_Ca_timestamp
    };
    Object.assign(row1, pickValues(firstDoc));

    var row2 = {
      type: "Dòng 2",
      label: "Ngày cuối (record cuối ngày)",
      date: lastDoc.CD_Kwh_Ca_timestamp
    };
    Object.assign(row2, pickValues(lastDoc));

    var row3 = {
      type: "Dòng 3",
      label: "Chênh lệch (Ngày cuối - Ngày đầu)",
      date: null
    };
    fields.forEach(function (f) {
      row3[f] = Number(nvl(row2[f], 0)) - Number(nvl(row1[f], 0));
    });
    // ✅ total dòng chênh lệch
    row3.TOTAL = calcTotal(row3);

    var dataset = [row1, row2, row3];

    // 5) Styles
    var styles = {
      header: { font: { bold: true }, alignment: { horizontal: "center" } },
      number: { numFmt: "0.00" },
      text: {}
    };

    // 6) Specification
    var specification = {
      type: { displayName: "Dòng", headerStyle: styles.header, cellStyle: styles.text, width: 60 },
      label: { displayName: "Mô tả", headerStyle: styles.header, cellStyle: styles.text, width: 220 },
      date: {
        displayName: "Thời điểm",
        headerStyle: styles.header,
        width: 160,
        cellFormat: function (value) {
          return value ? moment(value).format("YYYY-MM-DD HH:mm:ss") : "";
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

    // ✅ thêm cột TOTAL cuối cùng
    specification.TOTAL = {
      displayName: "TOTAL",
      headerStyle: styles.header,
      cellStyle: styles.number,
      width: 110
    };

    // 7) Export
    var report = excel.buildExport([
      { name: "Report_" + fromStr + "_" + toStr, specification: specification, data: dataset }
    ]);

    var filename = "Report_3rows_" + fromStr + "_" + toStr + ".xlsx";
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


// Report 2
app.get("/rp2", async function (req, res) {
  try {
    var output = [] //await calcKwhByDayAndSaveReport("2025-12-24");
    return res.render("b", { output: output });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error!");
  }
});

app.get("/rp/excel2", async function (req, res) {
  try {
    var fromStr = req.query.from || "2025-12-01";
    var toStr = req.query.to || "2025-12-24";

    var startFrom = new Date(fromStr + "T00:00:00.000+07:00");
    var endFrom = new Date(fromStr + "T23:59:59.999+07:00");
    var startTo = new Date(toStr + "T00:00:00.000+07:00");
    var endTo = new Date(toStr + "T23:59:59.999+07:00");

    // 1) record đầu ngày from
    var firstDoc = await DataBNSA51KwhDay.findOne({
      BNSA51_KwhDay_timestamp: { $gte: startFrom, $lte: endFrom }
    })
      .sort({ BNSA51_KwhDay_timestamp: 1 })
      .lean();

    // 2) record cuối ngày to
    var lastDoc = await DataBNSA51KwhDay.findOne({
      BNSA51_KwhDay_timestamp: { $gte: startTo, $lte: endTo }
    })
      .sort({ BNSA51_KwhDay_timestamp: -1 })
      .lean();

    if (!firstDoc || !lastDoc) {
      return res
        .status(400)
        .send("Không có đủ dữ liệu để xuất (thiếu record ngày đầu hoặc ngày cuối).");
    }

    // 3) List field cần xuất
    var fields = [
      "dataBNS_TotalDay_Kwh_A51_MV01",
      "dataBNS_TotalDay_Kwh_A51_MV02",
      "dataBNS_TotalDay_Kwh_A51_MV03",
      "dataBNS_TotalDay_Kwh_A51_MV04",

      "dataBNS_TotalDay_Kwh_A52_MV05",
      "dataBNS_TotalDay_Kwh_A52_MV06",
      "dataBNS_TotalDay_Kwh_A52_MV07",

      "dataBNS_TotalDay_Kwh_A53_MV10",
      "dataBNS_TotalDay_Kwh_A53_MV11",
      "dataBNS_TotalDay_Kwh_A53_MV12",

      "dataBNS_TotalDay_Kwh_A54_MV13",
      "dataBNS_TotalDay_Kwh_A54_MV14",
      "dataBNS_TotalDay_Kwh_A54_MV15",
      "dataBNS_TotalDay_Kwh_A54_MV16"
    ];

    // tính tổng cột cuối
    function calcTotal(obj) {
      var s = 0;
      fields.forEach(function (f) {
        s += Number(nvl(obj[f], 0));
      });
      return s;
    }

    function pickValues(doc) {
      var obj = {};
      fields.forEach(function (f) {
        obj[f] = Number(nvl(doc[f], 0));
      });
      // thêm TOTAL
      obj.TOTAL = calcTotal(obj);
      return obj;
    }

    // 4) Build 3 rows
    var row1 = {
      type: "Dòng 1",
      label: "Ngày đầu (record đầu ngày)",
      date: firstDoc.BNSA51_KwhDay_timestamp
    };
    Object.assign(row1, pickValues(firstDoc));

    var row2 = {
      type: "Dòng 2",
      label: "Ngày cuối (record cuối ngày)",
      date: lastDoc.BNSA51_KwhDay_timestamp
    };
    Object.assign(row2, pickValues(lastDoc));

    var row3 = {
      type: "Dòng 3",
      label: "Chênh lệch (Ngày cuối - Ngày đầu)",
      date: null
    };

    fields.forEach(function (f) {
      row3[f] = Number(nvl(row2[f], 0)) - Number(nvl(row1[f], 0));
    });
    // TOTAL cho dòng chênh lệch
    row3.TOTAL = calcTotal(row3);

    var dataset = [row1, row2, row3];

    // 5) Styles (giống bạn)
    var styles = {
      header: { font: { bold: true }, alignment: { horizontal: "center" } },
      number: { numFmt: "0.00" },
      text: {}
    };

    // 6) Specification
    var specification = {
      type: { displayName: "Dòng", headerStyle: styles.header, cellStyle: styles.text, width: 60 },
      label: { displayName: "Mô tả", headerStyle: styles.header, cellStyle: styles.text, width: 220 },
      date: {
        displayName: "Thời điểm",
        headerStyle: styles.header,
        width: 160,
        cellFormat: function (value) {
          return value ? moment(value).format("YYYY-MM-DD HH:mm:ss") : "";
        }
      }
    };

    // cột data
    fields.forEach(function (f) {
      specification[f] = {
        displayName: f,
        headerStyle: styles.header,
        cellStyle: styles.number,
        width: 110
      };
    });

    // cột tổng cuối
    specification.TOTAL = {
      displayName: "TOTAL",
      headerStyle: styles.header,
      cellStyle: styles.number,
      width: 110
    };

    // 7) Export
    var report = excel.buildExport([
      { name: "Report_" + fromStr + "_" + toStr, specification: specification, data: dataset }
    ]);

    var filename = "Report_BNSA51_3rows_" + fromStr + "_" + toStr + ".xlsx";
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

function nvl(v, d) {
  return v === null || v === undefined || v === "" ? d : v;
}
function toNum(v) {
  return Number(nvl(v, 0));
}


// app.get("/rp/excel3", ...)
app.get("/rp/excel3", async function (req, res) {
  try {
    // dùng chung from/to cho cả 2 report
    var fromStr = req.query.from || "2025-12-01";
    var toStr = req.query.to || "2025-12-24";

    var startFrom = new Date(fromStr + "T00:00:00.000+07:00");
    var endFrom = new Date(fromStr + "T23:59:59.999+07:00");
    var startTo = new Date(toStr + "T00:00:00.000+07:00");
    var endTo = new Date(toStr + "T23:59:59.999+07:00");

    // ===== BLOCK 1: CD =====
    var firstCd = await CdKwhCa.findOne({
      CD_Kwh_Ca_timestamp: { $gte: startFrom, $lte: endFrom }
    }).sort({ CD_Kwh_Ca_timestamp: 1 }).lean();

    var lastCd = await CdKwhCa.findOne({
      CD_Kwh_Ca_timestamp: { $gte: startTo, $lte: endTo }
    }).sort({ CD_Kwh_Ca_timestamp: -1 }).lean();

    if (!firstCd || !lastCd) {
      return res.status(400).send("Thiếu dữ liệu CD (ngày đầu hoặc ngày cuối).");
    }

    var fieldsCd = [
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

    // ===== BLOCK 2: DAY (BNS) =====
    var firstDay = await DataBNSA51KwhDay.findOne({
      BNSA51_KwhDay_timestamp: { $gte: startFrom, $lte: endFrom }
    }).sort({ BNSA51_KwhDay_timestamp: 1 }).lean();

    var lastDay = await DataBNSA51KwhDay.findOne({
      BNSA51_KwhDay_timestamp: { $gte: startTo, $lte: endTo }
    }).sort({ BNSA51_KwhDay_timestamp: -1 }).lean();

    if (!firstDay || !lastDay) {
      return res.status(400).send("Thiếu dữ liệu DAY (ngày đầu hoặc ngày cuối).");
    }

    var fieldsDay = [
      "dataBNS_TotalDay_Kwh_A51_MV01",
      "dataBNS_TotalDay_Kwh_A51_MV02",
      "dataBNS_TotalDay_Kwh_A51_MV03",
      "dataBNS_TotalDay_Kwh_A51_MV04",
      "dataBNS_TotalDay_Kwh_A52_MV05",
      "dataBNS_TotalDay_Kwh_A52_MV06",
      "dataBNS_TotalDay_Kwh_A52_MV07",
      "dataBNS_TotalDay_Kwh_A53_MV10",
      "dataBNS_TotalDay_Kwh_A53_MV11",
      "dataBNS_TotalDay_Kwh_A53_MV12",
      "dataBNS_TotalDay_Kwh_A54_MV13",
      "dataBNS_TotalDay_Kwh_A54_MV14",
      "dataBNS_TotalDay_Kwh_A54_MV15",
      "dataBNS_TotalDay_Kwh_A54_MV16"
    ];

    // ===== helpers =====
    function fmtTs(v) {
      return v ? moment(v).format("YYYY-MM-DD HH:mm:ss") : "";
    }

    function sumDoc(doc, fields) {
      var s = 0;
      fields.forEach(function (f) { s += toNum(doc[f]); });
      return s;
    }

    // ===== Load template =====
    // Bạn đặt file template ở đâu thì chỉnh lại đường dẫn này cho đúng.
    // Ví dụ: ./templates/Bao cao Template.xlsx
    const templatePath = path.join(process.cwd(), "./template/Template1.xlsx");

    const wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile(templatePath);

    // template đang có 1 sheet
    const ws = wb.worksheets[0];

    // đổi tên sheet theo from/to (<=31 ký tự là ok)
    ws.name = `Report_${fromStr}_${toStr}`.slice(0, 31);

    // ===== Mapping cột theo template =====
    // CD: D..AD (27 cột)  => colStart = 4
    // TOTAL_CD: AE (31)
    // BNS: D..Q (14 cột)  => colStart = 4
    // TOTAL_DAY: R (18)
    const COL_START = 4;        // cột D
    const CD_TOTAL_COL = 31;    // AE
    const DAY_TOTAL_COL = 18;   // R

    // ===== Điền CD rows (row 3,4,5) =====
    // Row 3: Dòng 1
    ws.getCell(3, 1).value = "Dòng 1";
    ws.getCell(3, 2).value = "CD - Ngày đầu (record đầu ngày)";
    ws.getCell(3, 3).value = fmtTs(firstCd.CD_Kwh_Ca_timestamp);
    fieldsCd.forEach((f, idx) => {
      ws.getCell(3, COL_START + idx).value = toNum(firstCd[f]);
    });
    // TOTAL_CD row3: template có thể để trống, mình set luôn cho đủ
    ws.getCell(3, CD_TOTAL_COL).value = sumDoc(firstCd, fieldsCd);

    // Row 4: Dòng 2
    ws.getCell(4, 1).value = "Dòng 2";
    ws.getCell(4, 2).value = "CD - Ngày cuối (record cuối ngày)";
    ws.getCell(4, 3).value = fmtTs(lastCd.CD_Kwh_Ca_timestamp);
    fieldsCd.forEach((f, idx) => {
      ws.getCell(4, COL_START + idx).value = toNum(lastCd[f]);
    });
    ws.getCell(4, CD_TOTAL_COL).value = sumDoc(lastCd, fieldsCd);

    // Row 5: Dòng 3 (chênh lệch)
    ws.getCell(5, 1).value = "Dòng 3";
    ws.getCell(5, 2).value = "CD - Chênh lệch (Ngày cuối - Ngày đầu)";
    ws.getCell(5, 3).value = ""; // template để rỗng
    fieldsCd.forEach((f, idx) => {
      ws.getCell(5, COL_START + idx).value = toNum(lastCd[f]) - toNum(firstCd[f]);
    });
    // AE5 trong template đã có công thức =SUM(D5:AD5) (giữ nguyên),
    // nhưng nếu template trống thì có thể bật dòng dưới:
    // ws.getCell(5, CD_TOTAL_COL).value = { formula: "SUM(D5:AD5)" };

    // ===== Điền BNS rows (row 8,9,10) =====
    // Row 8: Dòng 4
    ws.getCell(8, 1).value = "Dòng 4";
    ws.getCell(8, 2).value = "DAY - Ngày đầu (record đầu ngày)";
    ws.getCell(8, 3).value = fmtTs(firstDay.BNSA51_KwhDay_timestamp);
    fieldsDay.forEach((f, idx) => {
      ws.getCell(8, COL_START + idx).value = toNum(firstDay[f]);
    });
    ws.getCell(8, DAY_TOTAL_COL).value = sumDoc(firstDay, fieldsDay);

    // Row 9: Dòng 5
    ws.getCell(9, 1).value = "Dòng 5";
    ws.getCell(9, 2).value = "DAY - Ngày cuối (record cuối ngày)";
    ws.getCell(9, 3).value = fmtTs(lastDay.BNSA51_KwhDay_timestamp);
    fieldsDay.forEach((f, idx) => {
      ws.getCell(9, COL_START + idx).value = toNum(lastDay[f]);
    });
    ws.getCell(9, DAY_TOTAL_COL).value = sumDoc(lastDay, fieldsDay);

    // Row 10: Dòng 6 (chênh lệch)
    ws.getCell(10, 1).value = "Dòng 6";
    ws.getCell(10, 2).value = "DAY - Chênh lệch (Ngày cuối - Ngày đầu)";
    ws.getCell(10, 3).value = "";
    fieldsDay.forEach((f, idx) => {
      ws.getCell(10, COL_START + idx).value = toNum(lastDay[f]) - toNum(firstDay[f]);
    });
    // R10 trong template đã có công thức =SUM(D10:Q10) (giữ nguyên),
    // nhưng nếu template trống thì có thể bật dòng dưới:
    // ws.getCell(10, DAY_TOTAL_COL).value = { formula: "SUM(D10:Q10)" };

    // ===== Row 12: Tổng (template đã có công thức ở D12: =AE5+R10) =====
    ws.getCell(12, 1).value = "Dòng 7";
    ws.getCell(12, 2).value = "TỔNG";
    // Cột D12: giữ nguyên formula trong template

    // ===== Export =====
    const buffer = await wb.xlsx.writeBuffer();

    var filename = `BaoCao_${fromStr}_${toStr}.xlsx`;
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    return res.send(Buffer.from(buffer));
  } catch (err) {
    console.log(err);
    return res.status(500).send("Export Excel Error!");
  }
});


app.get("/del", async function (req, res) {
  try {
    var output = [] //await calcKwhByDayAndSaveReport("2025-12-24");
    return res.render("del", { output: output });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error!");
  }
});

app.post("/del", async function (req, res) {
  try {
    var fromStr = req.query.from || "2020-12-01";
    var toStr = req.query.to || "2020-12-01";
    var note = req.query.note || "";

    // thời gian đầu ngày và cuối ngày (GMT+7)
    var start = new Date(fromStr + "T00:00:00.000+07:00");
    var end = new Date(toStr + "T23:59:59.999+07:00");

    // validate
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).send("Sai định dạng ngày. Dùng YYYY-MM-DD");
    }
    if (start > end) {
      return res.status(400).send("Sai ngày: from phải nhỏ hơn hoặc bằng to.");
    }

    // ✅ XÓA CD
    var delCd = await CdKwhCa.deleteMany({
      CD_Kwh_Ca_timestamp: { $gte: start, $lte: end }
    });

    // ✅ XÓA DAY
    var delDay = await DataBNSA51KwhDay.deleteMany({
      BNSA51_KwhDay_timestamp: { $gte: start, $lte: end }
    });

    // ✅ LƯU LỊCH SỬ
    // (tùy hệ thống auth, bạn có thể set user từ req.user)
    var history = await DelHistory.create({
      from: fromStr,
      to: toStr,
      start: start,
      end: end,
      collections: [
        { name: "CdKwhCa", deletedCount: delCd.deletedCount || 0 },
        { name: "DataBNSA51KwhDay", deletedCount: delDay.deletedCount || 0 }
      ],
      note: note,

      ip: (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").toString(),
      user: (req.user && (req.user.username || req.user.email)) ? (req.user.username || req.user.email) : "",
      userAgent: req.headers["user-agent"] || ""
    });

    return res.json({
      message: "Xóa dữ liệu thành công!",
      from: fromStr,
      to: toStr,
      deleted: {
        CdKwhCa: delCd.deletedCount || 0,
        DataBNSA51KwhDay: delDay.deletedCount || 0
      },
      historyId: history._id
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Delete Error!");
  }
});









