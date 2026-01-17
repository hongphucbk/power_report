var express = require("express");
const excel = require('node-excel-export');
var moment = require('moment');
var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");

var server = require("http").Server(app);
app.listen(3000);

//var bodyParser = require('body-parser');

var bodyParser = require('body-parser');
//var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//MongoDB
var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/db_data", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});




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


	note: String,
});
var CdKwhCa = mongoose.model('data_CD_KwhCa', data_CD_KwhCaSchema, 'data_CD_KwhCa');

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

	note: String,
});
var CdKwhCaRp = mongoose.model('CdKwhCaRp', data_CD_KwhCaRpSchema, 'CdKwhCaRp');




async function calcKwhByDayAndSaveReport1(dateStr) {
  const startOfDay = new Date(`${dateStr}T00:00:00.000+07:00`);
  const endOfDay   = new Date(`${dateStr}T23:59:59.999+07:00`);

  //1. Bản ghi đầu ngày
  const firstDoc = await CdKwhCa.findOne({
    CD_Kwh_Ca_timestamp: { $gte: startOfDay, $lte: endOfDay }
  	})
    .sort({ CD_Kwh_Ca_timestamp: 1 })
    .lean();

  //2. Bản ghi cuối ngày
  const lastDoc = await CdKwhCa.findOne({
    CD_Kwh_Ca_timestamp: { $gte: startOfDay, $lte: endOfDay }
  })
    .sort({ CD_Kwh_Ca_timestamp: -1 })
    .lean();

  if (!firstDoc || !lastDoc) {
    return { date: dateStr, error: "Không có đủ dữ liệu trong ngày" };
  }

  
	// 4) tạo object để lưu report
  const reportDoc = {
    date: startOfDay, // lưu ngày dạng 00:00:00
    
    data_CD_Tram01_A51_MV01_Kwh_Ca1: lastDoc.data_CD_Tram01_A51_MV01_Kwh_Ca1 - firstDoc.data_CD_Tram01_A51_MV01_Kwh_Ca1,
    data_CD_Tram01_A51_MV02_Kwh_Ca1: lastDoc.data_CD_Tram01_A51_MV02_Kwh_Ca1 - firstDoc.data_CD_Tram01_A51_MV02_Kwh_Ca1,
    data_CD_Tram01_A51_MV03_Kwh_Ca1: lastDoc.data_CD_Tram01_A51_MV03_Kwh_Ca1 - firstDoc.data_CD_Tram01_A51_MV03_Kwh_Ca1,

  };

  // 5) lưu vào bảng Report (upsert: có thì update, chưa có thì insert)
  const saved = await CdKwhCaRp.findOneAndUpdate(
    { date: startOfDay },        // điều kiện tìm report theo ngày
    { $set: reportDoc },         // set toàn bộ field
    { upsert: true, new: true }  // upsert + trả về bản ghi mới
  ).lean();

  return {
    date: dateStr,
    status: saved
  };

  
  
}

async function calcKwhByDayAndSaveReport(dateStr) {
  const startOfDay = new Date(`${dateStr}T00:00:00.000+07:00`);
  const endOfDay   = new Date(`${dateStr}T23:59:59.999+07:00`);

  const firstDoc = await CdKwhCa.findOne({
    CD_Kwh_Ca_timestamp: { $gte: startOfDay, $lte: endOfDay }
  }).sort({ CD_Kwh_Ca_timestamp: 1 }).lean();

  const lastDoc = await CdKwhCa.findOne({
    CD_Kwh_Ca_timestamp: { $gte: startOfDay, $lte: endOfDay }
  }).sort({ CD_Kwh_Ca_timestamp: -1 }).lean();

  if (!firstDoc || !lastDoc) {
    return { date: dateStr, error: "Không có đủ dữ liệu trong ngày" };
  }

  // ✅ Danh sách tất cả field cần tính
  const fields = [
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

  const reportDoc = { date: startOfDay };

  // ✅ tính chênh lệch: last - first
  fields.forEach((f) => {
    const firstVal = firstDoc[f] ?? 0;
    const lastVal  = lastDoc[f] ?? 0;
    reportDoc[f] = lastVal - firstVal;
  });

  const saved = await CdKwhCaRp.findOneAndUpdate(
    { date: startOfDay },
    { $set: reportDoc },
    { upsert: true, new: true }
  ).lean();

  return { date: dateStr, status: saved };
}


module.exports = { calcKwhByDayAndSaveReport };


app.get("/rp", async function(req,res){
  try {

    const output = await calcKwhByDayAndSaveReport("2025-12-24");

    return res.render("a", { output });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error!");
  }

});

app.get("/rp/excel1", async function(req,res){
  try {
    let fromStr = req.query.from || "2025-12-01";
    let toStr   = req.query.to || "2025-12-24";

    // ===== 1) TÍNH REPORT TỪ NGÀY -> ĐẾN NGÀY =====
    let cur = moment(fromStr, "YYYY-MM-DD");
    const endMoment = moment(toStr, "YYYY-MM-DD");

    const calcResults = [];
    while (cur.isSameOrBefore(endMoment, "day")) {
      const d = cur.format("YYYY-MM-DD");
      const r = await calcKwhByDayAndSaveReport(d);
      //calcResults.push(r); // nếu bạn muốn log/kiểm tra
      cur.add(1, "day");
    }

    //const output = await calcKwhByDayAndSaveReport("2025-12-24");

    // set theo timezone +07 như bạn đang dùng
    const start = new Date(`${fromStr}T00:00:00.000+07:00`);
    const end   = new Date(`${toStr}T23:59:59.999+07:00`);

    const rows = await CdKwhCaRp.find({ date: { $gte: start, $lte: end } })
      .sort({ date: 1 })
      .lean();

    // styles (node-excel-export)
    const styles = {
      header: {
        font: { bold: true },
        alignment: { horizontal: "center" }
      },
      number: {
        numFmt: "0.00"
      },
      text: {}
    };

    const specification = {
      date: {
        displayName: "Ngày",
        headerStyle: styles.header,
        width:150,
        cellFormat: (value) => moment(value).format("YYYY-MM-DD")
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
    const dataset = rows.map(r => ({
      date: r.date,
      data_CD_Tram01_A51_MV01_Kwh_Ca1: r.data_CD_Tram01_A51_MV01_Kwh_Ca1 ?? 0,
      data_CD_Tram01_A51_MV02_Kwh_Ca1: r.data_CD_Tram01_A51_MV02_Kwh_Ca1 ?? 0,
      data_CD_Tram01_A51_MV03_Kwh_Ca1: r.data_CD_Tram01_A51_MV03_Kwh_Ca1 ?? 0,
      note: r.note ?? ""
    }));

    const report = excel.buildExport([
      {
        name: `Report_${fromStr}_${toStr}`,
        specification,
        data: dataset
      }
    ]);

    const filename = `Report_${fromStr}_${toStr}.xlsx`;
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    return res.send(report);


    return res.render("a", { output });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error!");
  }

});

app.get("/rp/excel", async function (req, res) {
  try {
    let fromStr = req.query.from || "2025-12-01";
    let toStr   = req.query.to   || "2025-12-24";

    // ===== 1) TÍNH REPORT TỪ NGÀY -> ĐẾN NGÀY =====
    let cur = moment(fromStr, "YYYY-MM-DD");
    const endMoment = moment(toStr, "YYYY-MM-DD");

    while (cur.isSameOrBefore(endMoment, "day")) {
      await calcKwhByDayAndSaveReport(cur.format("YYYY-MM-DD"));
      cur.add(1, "day");
    }

    // ===== 2) QUERY REPORT ĐỂ EXPORT =====
    const start = new Date(`${fromStr}T00:00:00.000+07:00`);
    const end   = new Date(`${toStr}T23:59:59.999+07:00`);

    const rows = await CdKwhCaRp.find({ date: { $gte: start, $lte: end } })
      .sort({ date: 1 })
      .lean();

    // ===== 3) KHAI BÁO LIST FIELD CẦN XUẤT =====
    const fields = [
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

    // ===== 4) STYLES =====
    const styles = {
      header: { font: { bold: true }, alignment: { horizontal: "center" } },
      number: { numFmt: "0.00" },
      text: {}
    };

    // ===== 5) BUILD SPECIFICATION (CỘT) =====
    const specification = {
      date: {
        displayName: "Ngày",
        headerStyle: styles.header,
        width: 140,
        cellFormat: (value) => moment(value).format("YYYY-MM-DD")
      }
    };

    // Mỗi field 1 cột, cho width rộng hơn
    fields.forEach((f) => {
      specification[f] = {
        displayName: f,              // nếu muốn tên ngắn hơn, mình đổi giúp
        headerStyle: styles.header,
        cellStyle: styles.number,
        width: 90
      };
    });

    // thêm cột ghi chú cuối
    specification["note"] = {
      displayName: "Ghi chú",
      headerStyle: styles.header,
      cellStyle: styles.text,
      width: 40
    };

    // ===== 6) BUILD DATASET (DỮ LIỆU) =====
    const dataset = rows.map((r) => {
      const obj = { date: r.date };
      fields.forEach((f) => (obj[f] = r[f] ?? 0));
      obj.note = r.note ?? "";
      return obj;
    });

    // ===== 7) EXPORT =====
    const report = excel.buildExport([
      {
        name: `Report_${fromStr}_${toStr}`,
        specification,
        data: dataset
      }
    ]);

    const filename = `Report_${fromStr}_${toStr}.xlsx`;
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    return res.send(report);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Export Excel Error!");
  }
});

  
