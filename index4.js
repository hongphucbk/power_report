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
var data_CD_KwhSchema = new mongoose.Schema({
  CD_Kwh_timestamp: Date,

  data_CD_Tram01_A51_MV01_Kwh: Number,
  data_CD_Tram01_A51_MV02_Kwh: Number,
  data_CD_Tram01_A51_MV03_Kwh: Number,
  data_CD_Tram01_A51_MV04_Kwh: Number,
  data_CD_Tram01_A52_MV05_Kwh: Number,

  data_CD_Tram02_A51_MV01_Kwh: Number,
  data_CD_Tram03_A51_MV01_Kwh: Number,
  data_CD_Tram04_A51_MV01_Kwh: Number,
  data_CD_Tram05_A51_MV01_Kwh: Number,

  note: String
});

var CdKwh = mongoose.model("data_CD_Kwh", data_CD_KwhSchema, "data_CD_Kwh");

var dataBNSKwhSchema = new mongoose.Schema(
  {
    BNSA51_Kwh_timestamp: { type: Date },
    dataBNS_A51_MV01_Kwh: Number,
    dataBNS_A51_MV02_Kwh: Number,
    dataBNS_A51_MV03_Kwh: Number,
    dataBNS_A51_MV04_Kwh: Number,

    dataBNS_A52_MV05_Kwh: Number,
    dataBNS_A52_MV06_Kwh: Number,
    dataBNS_A52_MV07_Kwh: Number,

    dataBNS_A53_MV10_Kwh: Number,
    dataBNS_A53_MV11_Kwh: Number,
    dataBNS_A53_MV12_Kwh: Number,

    dataBNS_A54_MV13_Kwh: Number,
    dataBNS_A54_MV14_Kwh: Number,
    dataBNS_A54_MV15_Kwh: Number,
    dataBNS_A54_MV16_Kwh: Number

});

var BNSKwh = mongoose.model("data_BNSA51_Kwh", dataBNSKwhSchema, "data_BNSA51_Kwh");

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

    function nvl(v, d) {
      return v === undefined || v === null ? d : v;
    }

    // ✅ HARD-CODE fields (không lấy từ DB)
    var fields = [
      "data_CD_Tram01_A51_MV01_Kwh",
      "data_CD_Tram01_A51_MV02_Kwh",
      "data_CD_Tram01_A51_MV03_Kwh",
      "data_CD_Tram01_A51_MV04_Kwh",
      "data_CD_Tram01_A52_MV05_Kwh",
      "data_CD_Tram02_A51_MV01_Kwh",
      "data_CD_Tram03_A51_MV01_Kwh",
      "data_CD_Tram04_A51_MV01_Kwh",
      "data_CD_Tram05_A51_MV01_Kwh"
    ];

    // ✅ Projection cũng build từ fields hardcode
    var projection = ["CD_Kwh_timestamp"].concat(fields).join(" ");

    // 1) record đầu ngày from
    var firstDoc = await CdKwh.findOne({
      CD_Kwh_timestamp: { $gte: startFrom, $lte: endFrom }
    })
      .sort({ CD_Kwh_timestamp: 1 })
      .lean()
      .select(projection);

    // 2) record cuối ngày to
    var lastDoc = await CdKwh.findOne({
      CD_Kwh_timestamp: { $gte: startTo, $lte: endTo }
    })
      .sort({ CD_Kwh_timestamp: -1 })
      .lean()
      .select(projection);

    if (!firstDoc || !lastDoc) {
      return res
        .status(400)
        .send("Không có đủ dữ liệu để xuất (thiếu record ngày đầu hoặc ngày cuối).");
    }

    // 2.5) Lấy tất cả record của ngày from và ngày to (theo projection hardcode)
    var [allFromDocs, allToDocs] = await Promise.all([
      CdKwh.find({ CD_Kwh_timestamp: { $gte: startFrom, $lte: endFrom } })
        .sort({ CD_Kwh_timestamp: 1 })
        .lean()
        .select(projection),

      CdKwh.find({ CD_Kwh_timestamp: { $gte: startTo, $lte: endTo } })
        .sort({ CD_Kwh_timestamp: 1 })
        .lean()
        .select(projection)
    ]);

    function calcTotal(obj) {
      var sum = 0;
      fields.forEach(function (f) {
        sum += Number(nvl(obj[f], 0));
      });
      return sum;
    }

    function pickValues(doc) {
      var obj = {};
      fields.forEach(function (f) {
        obj[f] = Number(nvl(doc[f], 0));
      });
      obj.TOTAL = calcTotal(obj);
      return obj;
    }

    // ✅ Separator row: có đủ field để không bị undefined
    function buildSeparatorRow(lbl) {
      var r = { type: "", label: lbl, date: null };
      fields.forEach(function (f) {
        r[f] = ""; // hoặc 0 nếu bạn muốn
      });
      r.TOTAL = "";
      return r;
    }

    // 3 dòng chính
    var row1 = {
      type: "Dòng 1",
      label: "Ngày đầu (record đầu ngày)",
      date: firstDoc.CD_Kwh_timestamp
    };
    Object.assign(row1, pickValues(firstDoc));

    var row2 = {
      type: "Dòng 2",
      label: "Ngày cuối (record cuối ngày)",
      date: lastDoc.CD_Kwh_timestamp
    };
    Object.assign(row2, pickValues(lastDoc));

    var row3 = { type: "Dòng 3", label: "Chênh lệch (Ngày cuối - Ngày đầu)", date: null };
    fields.forEach(function (f) {
      row3[f] = Number(nvl(row2[f], 0)) - Number(nvl(row1[f], 0));
    });
    row3.TOTAL = calcTotal(row3);

    // detail rows
    function toDetailRow(doc, groupLabel, idx) {
      var r = {
        type: groupLabel,
        label: groupLabel + " #" + String(idx + 1).padStart(3, "0"),
        date: doc.CD_Kwh_timestamp
      };
      Object.assign(r, pickValues(doc));
      return r;
    }

    // ✅ dataset không còn undefined ở dòng separator
    var dataset = [
      row1,
      row2,
      row3,
      buildSeparatorRow("---- ALL RECORDS (FROM) ----"),
      ...allFromDocs.map((d, i) => toDetailRow(d, "FROM", i)),
      buildSeparatorRow("---- ALL RECORDS (TO) ----"),
      ...allToDocs.map((d, i) => toDetailRow(d, "TO", i))
    ];

    var styles = {
      header: { font: { bold: true }, alignment: { horizontal: "center" } },
      number: { numFmt: "0" },
      text: {}
    };

    var specification = {
      type: { displayName: "Nhóm", headerStyle: styles.header, cellStyle: styles.text, width: 70 },
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
        width: 120
      };
    });

    specification.TOTAL = {
      displayName: "TOTAL",
      headerStyle: styles.header,
      cellStyle: styles.number,
      width: 110
    };

    var report = excel.buildExport([
      { name: "Report_" + fromStr + "_" + toStr, specification: specification, data: dataset }
    ]);

    var filename = "Report_3rows_" + fromStr + "_" + toStr + ".xlsx";
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
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

// app.get("/rp/excel2", ...)
app.get("/rp/excel2", async function (req, res) {
  try {
    const fromStr = req.query.from || "2025-12-01";
    const toStr = req.query.to || "2025-12-24";

    const startFrom = new Date(fromStr + "T00:00:00.000+07:00");
    const endFrom = new Date(fromStr + "T23:59:59.999+07:00");
    const startTo = new Date(toStr + "T00:00:00.000+07:00");
    const endTo = new Date(toStr + "T23:59:59.999+07:00");

    // ===== helpers =====
    function nvl(v, d) {
      return v === undefined || v === null ? d : v;
    }
    function toNum(v) {
      const n = Number(nvl(v, 0));
      return Number.isFinite(n) ? n : 0;
    }
    function fmtTs(v) {
      return v ? moment(v).format("YYYY-MM-DD HH:mm:ss") : "";
    }
    function calcTotal(obj, fields) {
      let sum = 0;
      fields.forEach((f) => (sum += toNum(obj[f])));
      return sum;
    }

    // separator row để không bị undefined ở các cột field
    function buildSeparatorRow(label, fields) {
      const r = { type: "", label, date: null };
      fields.forEach((f) => (r[f] = "")); // hoặc 0 nếu muốn
      r.TOTAL = "";
      return r;
    }

    function pickValues(doc, fields) {
      const o = {};
      fields.forEach((f) => (o[f] = toNum(doc[f])));
      o.TOTAL = calcTotal(o, fields);
      return o;
    }

    function toDetailRow(doc, tsField, fields, groupLabel, idx) {
      const r = {
        type: groupLabel,
        label: groupLabel + " #" + String(idx + 1).padStart(3, "0"),
        date: doc[tsField]
      };
      Object.assign(r, pickValues(doc, fields));
      return r;
    }

    async function buildDataset({
      Model,
      tsField,
      fields,
      startFrom,
      endFrom,
      startTo,
      endTo
    }) {
      const projection = [tsField].concat(fields).join(" ");

      const firstDoc = await Model.findOne({ [tsField]: { $gte: startFrom, $lte: endFrom } })
        .sort({ [tsField]: 1 })
        .lean()
        .select(projection);

      const lastDoc = await Model.findOne({ [tsField]: { $gte: startTo, $lte: endTo } })
        .sort({ [tsField]: -1 })
        .lean()
        .select(projection);

      if (!firstDoc || !lastDoc) {
        return { firstDoc: null, lastDoc: null, dataset: null };
      }

      const [allFromDocs, allToDocs] = await Promise.all([
        Model.find({ [tsField]: { $gte: startFrom, $lte: endFrom } })
          .sort({ [tsField]: 1 })
          .lean()
          .select(projection),

        Model.find({ [tsField]: { $gte: startTo, $lte: endTo } })
          .sort({ [tsField]: 1 })
          .lean()
          .select(projection)
      ]);

      const row1 = { type: "Dòng 1", label: "Ngày đầu (record đầu ngày)", date: firstDoc[tsField] };
      Object.assign(row1, pickValues(firstDoc, fields));

      const row2 = { type: "Dòng 2", label: "Ngày cuối (record cuối ngày)", date: lastDoc[tsField] };
      Object.assign(row2, pickValues(lastDoc, fields));

      const row3 = { type: "Dòng 3", label: "Chênh lệch (Ngày cuối - Ngày đầu)", date: null };
      fields.forEach((f) => (row3[f] = toNum(row2[f]) - toNum(row1[f])));
      row3.TOTAL = calcTotal(row3, fields);

      const dataset = [
        row1,
        row2,
        row3,
        buildSeparatorRow("---- ALL RECORDS (FROM) ----", fields),
        ...allFromDocs.map((d, i) => toDetailRow(d, tsField, fields, "FROM", i)),
        buildSeparatorRow("---- ALL RECORDS (TO) ----", fields),
        ...allToDocs.map((d, i) => toDetailRow(d, tsField, fields, "TO", i))
      ];

      return { firstDoc, lastDoc, dataset };
    }

    // ===== Fields hardcode theo 2 model mới =====
    const fieldsCd = [
      "data_CD_Tram01_A51_MV01_Kwh",
      "data_CD_Tram01_A51_MV02_Kwh",
      "data_CD_Tram01_A51_MV03_Kwh",
      "data_CD_Tram01_A51_MV04_Kwh",
      "data_CD_Tram01_A52_MV05_Kwh",
      "data_CD_Tram02_A51_MV01_Kwh",
      "data_CD_Tram03_A51_MV01_Kwh",
      "data_CD_Tram04_A51_MV01_Kwh",
      "data_CD_Tram05_A51_MV01_Kwh"
    ];

    const fieldsBns = [
      "dataBNS_A51_MV01_Kwh",
      "dataBNS_A51_MV02_Kwh",
      "dataBNS_A51_MV03_Kwh",
      "dataBNS_A51_MV04_Kwh",
      "dataBNS_A52_MV05_Kwh",
      "dataBNS_A52_MV06_Kwh",
      "dataBNS_A52_MV07_Kwh",
      "dataBNS_A53_MV10_Kwh",
      "dataBNS_A53_MV11_Kwh",
      "dataBNS_A53_MV12_Kwh",
      "dataBNS_A54_MV13_Kwh",
      "dataBNS_A54_MV14_Kwh",
      "dataBNS_A54_MV15_Kwh",
      "dataBNS_A54_MV16_Kwh"
    ];

    // ===== Build datasets =====
    const cdPack = await buildDataset({
      Model: CdKwh,
      tsField: "CD_Kwh_timestamp",
      fields: fieldsCd,
      startFrom,
      endFrom,
      startTo,
      endTo
    });

    if (!cdPack.dataset) {
      return res.status(400).send("Thiếu dữ liệu CD (ngày đầu hoặc ngày cuối).");
    }

    const bnsPack = await buildDataset({
      Model: BNSKwh,
      tsField: "BNSA51_Kwh_timestamp",
      fields: fieldsBns,
      startFrom,
      endFrom,
      startTo,
      endTo
    });

    if (!bnsPack.dataset) {
      return res.status(400).send("Thiếu dữ liệu BNS (ngày đầu hoặc ngày cuối).");
    }

    // ===== Load template =====
    const templatePath = path.join(process.cwd(), "./template/Template1.xlsx");
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile(templatePath);

    // ===== Write helper (đổ dữ liệu vào sheet theo format template) =====
    function writeSheet(ws, title, fields, dataset) {
      // Title (A1)
      ws.getCell(1, 1).value = title;

      // Header row (row 2): A.. = type,label,date + fields + TOTAL
      ws.getCell(2, 1).value = "Nhóm";
      ws.getCell(2, 2).value = "Mô tả";
      ws.getCell(2, 3).value = "Thời điểm";

      fields.forEach((f, idx) => {
        ws.getCell(2, 4 + idx).value = f; // từ cột D
      });

      ws.getCell(2, 4 + fields.length).value = "TOTAL";

      // Clear old rows from row 3 downward
      const existing = ws.rowCount || 0;
      if (existing >= 3) {
        ws.spliceRows(3, existing - 2);
      }

      // Write data from row 3
      dataset.forEach((r, i) => {
        const rowIndex = 3 + i;

        ws.getCell(rowIndex, 1).value = nvl(r.type, "");
        ws.getCell(rowIndex, 2).value = nvl(r.label, "");
        ws.getCell(rowIndex, 3).value = r.date ? fmtTs(r.date) : "";

        fields.forEach((f, idx) => {
          ws.getCell(rowIndex, 4 + idx).value = r[f];
        });

        ws.getCell(rowIndex, 4 + fields.length).value = r.TOTAL;
      });
    }

    // ===== Sheet CD: dùng sheet đầu tiên trong template =====
    const wsCd = wb.worksheets[0];
    wsCd.name = `CD_${fromStr}_${toStr}`.slice(0, 31);
    writeSheet(
      wsCd,
      `Report CDKwh ${fromStr} -> ${toStr}`,
      fieldsCd,
      cdPack.dataset
    );

    // ===== Sheet BNS: tạo sheet mới (vì BNS nhiều cột hơn template CD) =====
    const wsBns = wb.addWorksheet(`BNS_${fromStr}_${toStr}`.slice(0, 31));

    // set width cơ bản cho dễ nhìn
    wsBns.getColumn(1).width = 12;  // Nhóm
    wsBns.getColumn(2).width = 28;  // Mô tả
    wsBns.getColumn(3).width = 20;  // Thời điểm
    for (let c = 4; c <= 4 + fieldsBns.length; c++) wsBns.getColumn(c).width = 22;

    // style header giống đơn giản (bold + center)
    const headerRow = wsBns.getRow(2);
    headerRow.font = { bold: true };
    headerRow.alignment = { horizontal: "center" };

    writeSheet(
      wsBns,
      `Report BNSKwh ${fromStr} -> ${toStr}`,
      fieldsBns,
      bnsPack.dataset
    );

    // ===== Export =====
    const buffer = await wb.xlsx.writeBuffer();

    const filename = `BaoCao_${fromStr}_${toStr}.xlsx`;
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









