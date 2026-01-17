var express = require("express");
const excel = require('node-excel-export');
var moment = require('moment');
var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");

var server = require("http").Server(app);
var io = require('socket.io')(server);
app.listen(3022);

//var bodyParser = require('body-parser');

var s ;

//var s2 ="a"
//var s = "123"
//console.log(s);


var bodyParser = require('body-parser');
//var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//MongoDB
var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/db_data", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});


var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	role: String,
	information: String,
	note: String,
});
var DB_USER = mongoose.model('DB_USER', userSchema, 'users');

var user1Schema = new mongoose.Schema({
	username1: String,
	password1: String,
	role1: String,
	information1: String,
	note1: String,
});
var DB_USER1 = mongoose.model('DB_USER1', user1Schema, 'users1');


var congviec1Schema = new mongoose.Schema({
	phongban1: String,
	tencongviec1: String,
	mota1: String,
	nguoigiao1: String,
	ngaygiao1: String,
	ngayketthuc1: String,
	note3: String,
});
var DB_CONGVIEC1 = mongoose.model('DB_CONGVIEC1', congviec1Schema, 'congviecs1');

// -----------------------------------------------------------------------------------
// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
// START Giám sát năng lượng Tang Loong
///////////////////////////////////////////////////////////////////////////////////////
// PLC TL Start Cơ sở dữ liệu Giám sát năng lượng Tang Loong 
var data_TL_Kwh_Schema = new mongoose.Schema({
	TL_Kwh_timestamp: Date,
	TL_Kwh_timestamp_01:{
		type: Date,	
		unique: true // 👈 Đây là khai báo khóa duy nhất
	},
	data_TL_TramRP1_A51_MV01_Kwh: Number,
	data_TL_TramRP1_A51_MV02_Kwh: Number,
	data_TL_TramRP1_A51_MV03_Kwh: Number,
	data_TL_TramRP1_A51_MV04_Kwh: Number,

	data_TL_TramRP2_A51_MV01_Kwh: Number,
	data_TL_TramRP2_A51_MV02_Kwh: Number,
	data_TL_TramRP2_A51_MV03_Kwh: Number,
	data_TL_TramRP2_A51_MV04_Kwh: Number,
	data_TL_TramRP2_A52_MV05_Kwh: Number,
	data_TL_TramRP2_A52_MV06_Kwh: Number,
	data_TL_TramRP2_A52_MV07_Kwh: Number,
	data_TL_TramRP2_A52_MV08_Kwh: Number,

	data_TL_TramRP3_A51_MV01_Kwh: Number,
	data_TL_TramRP3_A51_MV02_Kwh: Number,
	data_TL_TramRP3_A51_MV03_Kwh: Number,
	data_TL_TramRP3_A51_MV04_Kwh: Number,
	data_TL_TramRP3_A52_MV05_Kwh: Number,

	data_TL_TramKTP55_A51_MV01_Kwh: Number,

	data_TL_TramKTP56_A51_MV01_Kwh: Number,

	data_TL_TramKTP7_A51_MV01_Kwh: Number,
	data_TL_TramKTP7_A51_MV02_Kwh: Number,

	data_TL_Tram1306B_A51_MV01_Kwh: Number,
	data_TL_Tram1306B_A51_MV02_Kwh: Number,

	note: String,
});
var DB_TL_Kwh_DATA = mongoose.model('DB_TL_Kwh_DATA', data_TL_Kwh_Schema, 'data_TL_Kwh');
///////////////////////////////////////////////////////////////////////////////////////
var data_TL_Kvarh_Schema = new mongoose.Schema({
	TL_Kvarh_timestamp: Date,
	TL_Kvarh_timestamp_01:{
		type: Date,	
		unique: true // 👈 Đây là khai báo khóa duy nhất
	},
	data_TL_TramRP1_A51_MV01_Kvarh: Number,
	data_TL_TramRP1_A51_MV02_Kvarh: Number,
	data_TL_TramRP1_A51_MV03_Kvarh: Number,
	data_TL_TramRP1_A51_MV04_Kvarh: Number,

	data_TL_TramRP2_A51_MV01_Kvarh: Number,
	data_TL_TramRP2_A51_MV02_Kvarh: Number,
	data_TL_TramRP2_A51_MV03_Kvarh: Number,
	data_TL_TramRP2_A51_MV04_Kvarh: Number,
	data_TL_TramRP2_A52_MV05_Kvarh: Number,
	data_TL_TramRP2_A52_MV06_Kvarh: Number,
	data_TL_TramRP2_A52_MV07_Kvarh: Number,
	data_TL_TramRP2_A52_MV08_Kvarh: Number,

	data_TL_TramRP3_A51_MV01_Kvarh: Number,
	data_TL_TramRP3_A51_MV02_Kvarh: Number,
	data_TL_TramRP3_A51_MV03_Kvarh: Number,
	data_TL_TramRP3_A51_MV04_Kvarh: Number,
	data_TL_TramRP3_A52_MV05_Kvarh: Number,

	data_TL_TramKTP55_A51_MV01_Kvarh: Number,

	data_TL_TramKTP56_A51_MV01_Kvarh: Number,

	data_TL_TramKTP7_A51_MV01_Kvarh: Number,
	data_TL_TramKTP7_A51_MV02_Kvarh: Number,

	data_TL_Tram1306B_A51_MV01_Kvarh: Number,
	data_TL_Tram1306B_A51_MV02_Kvarh: Number,

	note: String,
});
var DB_TL_Kvarh_DATA = mongoose.model('DB_TL_Kvarh_DATA', data_TL_Kwh_Schema, 'data_TL_Kvarh');
///////////////////////////////////////////////////////////////////////////////////////
var data_TL_KwhDay_Schema = new mongoose.Schema({
	TL_KwhDay_timestamp: Date,

	data_TL_TramRP1_A51_MV01_KwhDay: Number,
	data_TL_TramRP1_A51_MV02_KwhDay: Number,
	data_TL_TramRP1_A51_MV03_KwhDay: Number,
	data_TL_TramRP1_A51_MV04_KwhDay: Number,

	data_TL_TramRP2_A51_MV01_KwhDay: Number,
	data_TL_TramRP2_A51_MV02_KwhDay: Number,
	data_TL_TramRP2_A51_MV03_KwhDay: Number,
	data_TL_TramRP2_A51_MV04_KwhDay: Number,
	data_TL_TramRP2_A52_MV05_KwhDay: Number,
	data_TL_TramRP2_A52_MV06_KwhDay: Number,
	data_TL_TramRP2_A52_MV07_KwhDay: Number,
	data_TL_TramRP2_A52_MV08_KwhDay: Number,

	data_TL_TramRP3_A51_MV01_KwhDay: Number,
	data_TL_TramRP3_A51_MV02_KwhDay: Number,
	data_TL_TramRP3_A51_MV03_KwhDay: Number,
	data_TL_TramRP3_A51_MV04_KwhDay: Number,
	data_TL_TramRP3_A52_MV05_KwhDay: Number,

	data_TL_TramKTP55_A51_MV01_KwhDay: Number,

	data_TL_TramKTP56_A51_MV01_KwhDay: Number,

	data_TL_TramKTP7_A51_MV01_KwhDay: Number,
	data_TL_TramKTP7_A51_MV02_KwhDay: Number,

	data_TL_Tram1306B_A51_MV01_KwhDay: Number,
	data_TL_Tram1306B_A51_MV02_KwhDay: Number,
	
	note: String,
});
var DB_TL_KwhDay_DATA = mongoose.model('DB_TL_KwhDay_DATA', data_TL_KwhDay_Schema, 'data_TL_KwhDay');
///////////////////////////////////////////////////////////////////////////////////////
var data_TL_Cosphi_Schema = new mongoose.Schema({
	TL_Cosphi_timestamp: Date,
	TL_Cosphi_timestamp_01:{
		type: Date,	
		unique: true // 👈 Đây là khai báo khóa duy nhất
	},


	data_TL_TramRP1_A51_MV01_Cosphi: Number,
	data_TL_TramRP1_A51_MV02_Cosphi: Number,
	data_TL_TramRP1_A51_MV03_Cosphi: Number,
	data_TL_TramRP1_A51_MV04_Cosphi: Number,

	data_TL_TramRP2_A51_MV01_Cosphi: Number,
	data_TL_TramRP2_A51_MV02_Cosphi: Number,
	data_TL_TramRP2_A51_MV03_Cosphi: Number,
	data_TL_TramRP2_A51_MV04_Cosphi: Number,
	data_TL_TramRP2_A52_MV05_Cosphi: Number,
	data_TL_TramRP2_A52_MV06_Cosphi: Number,
	data_TL_TramRP2_A52_MV07_Cosphi: Number,
	data_TL_TramRP2_A52_MV08_Cosphi: Number,

	data_TL_TramRP3_A51_MV01_Cosphi: Number,
	data_TL_TramRP3_A51_MV02_Cosphi: Number,
	data_TL_TramRP3_A51_MV03_Cosphi: Number,
	data_TL_TramRP3_A51_MV04_Cosphi: Number,
	data_TL_TramRP3_A52_MV05_Cosphi: Number,

	data_TL_TramKTP55_A51_MV01_Cosphi: Number,

	data_TL_TramKTP56_A51_MV01_Cosphi: Number,

	data_TL_TramKTP7_A51_MV01_Cosphi: Number,
	data_TL_TramKTP7_A51_MV02_Cosphi: Number,

	data_TL_Tram1306B_A51_MV01_Cosphi: Number,
	data_TL_Tram1306B_A51_MV02_Cosphi: Number,

	note: String,
});
var DB_TL_Cosphi_DATA = mongoose.model('DB_TL_Cosphi_DATA', data_TL_Cosphi_Schema, 'data_TL_Cosphi');


///////////////////////////////////////////////////////////////////////////////////////
var data_TL_Kwh_Ca_Schema = new mongoose.Schema({
	TL_Kwh_Ca_timestamp: Date,
	data_TL_TramRP1_A51_MV01_Kwh_Ca1: Number,
	data_TL_TramRP1_A51_MV02_Kwh_Ca1: Number,
	data_TL_TramRP1_A51_MV03_Kwh_Ca1: Number,
	data_TL_TramRP1_A51_MV04_Kwh_Ca1: Number,

	data_TL_TramRP2_A51_MV01_Kwh_Ca1: Number,
	data_TL_TramRP2_A51_MV02_Kwh_Ca1: Number,
	data_TL_TramRP2_A51_MV03_Kwh_Ca1: Number,
	data_TL_TramRP2_A51_MV04_Kwh_Ca1: Number,
	data_TL_TramRP2_A52_MV05_Kwh_Ca1: Number,
	data_TL_TramRP2_A52_MV06_Kwh_Ca1: Number,
	data_TL_TramRP2_A52_MV07_Kwh_Ca1: Number,
	data_TL_TramRP2_A52_MV08_Kwh_Ca1: Number,

	data_TL_TramRP3_A51_MV01_Kwh_Ca1: Number,
	data_TL_TramRP3_A51_MV02_Kwh_Ca1: Number,
	data_TL_TramRP3_A51_MV03_Kwh_Ca1: Number,
	data_TL_TramRP3_A51_MV04_Kwh_Ca1: Number,
	data_TL_TramRP3_A52_MV05_Kwh_Ca1: Number,

	data_TL_TramKTP55_A51_MV01_Kwh_Ca1: Number,

	data_TL_TramKTP56_A51_MV01_Kwh_Ca1: Number,

	data_TL_TramKTP7_A51_MV01_Kwh_Ca1: Number,
	data_TL_TramKTP7_A51_MV02_Kwh_Ca1: Number,

	data_TL_Tram1306B_A51_MV01_Kwh_Ca1: Number,
	data_TL_Tram1306B_A51_MV02_Kwh_Ca1: Number,
	///////////////////////////////
	data_TL_TramRP1_A51_MV01_Kwh_Ca2: Number,
	data_TL_TramRP1_A51_MV02_Kwh_Ca2: Number,
	data_TL_TramRP1_A51_MV03_Kwh_Ca2: Number,
	data_TL_TramRP1_A51_MV04_Kwh_Ca2: Number,

	data_TL_TramRP2_A51_MV01_Kwh_Ca2: Number,
	data_TL_TramRP2_A51_MV02_Kwh_Ca2: Number,
	data_TL_TramRP2_A51_MV03_Kwh_Ca2: Number,
	data_TL_TramRP2_A51_MV04_Kwh_Ca2: Number,
	data_TL_TramRP2_A52_MV05_Kwh_Ca2: Number,
	data_TL_TramRP2_A52_MV06_Kwh_Ca2: Number,
	data_TL_TramRP2_A52_MV07_Kwh_Ca2: Number,
	data_TL_TramRP2_A52_MV08_Kwh_Ca2: Number,

	data_TL_TramRP3_A51_MV01_Kwh_Ca2: Number,
	data_TL_TramRP3_A51_MV02_Kwh_Ca2: Number,
	data_TL_TramRP3_A51_MV03_Kwh_Ca2: Number,
	data_TL_TramRP3_A51_MV04_Kwh_Ca2: Number,
	data_TL_TramRP3_A52_MV05_Kwh_Ca2: Number,

	data_TL_TramKTP55_A51_MV01_Kwh_Ca2: Number,

	data_TL_TramKTP56_A51_MV01_Kwh_Ca2: Number,

	data_TL_TramKTP7_A51_MV01_Kwh_Ca2: Number,
	data_TL_TramKTP7_A51_MV02_Kwh_Ca2: Number,

	data_TL_Tram1306B_A51_MV01_Kwh_Ca2: Number,
	data_TL_Tram1306B_A51_MV02_Kwh_Ca2: Number,
	///////////////////////////////
	data_TL_TramRP1_A51_MV01_Kwh_Ca3: Number,
	data_TL_TramRP1_A51_MV02_Kwh_Ca3: Number,
	data_TL_TramRP1_A51_MV03_Kwh_Ca3: Number,
	data_TL_TramRP1_A51_MV04_Kwh_Ca3: Number,

	data_TL_TramRP2_A51_MV01_Kwh_Ca3: Number,
	data_TL_TramRP2_A51_MV02_Kwh_Ca3: Number,
	data_TL_TramRP2_A51_MV03_Kwh_Ca3: Number,
	data_TL_TramRP2_A51_MV04_Kwh_Ca3: Number,
	data_TL_TramRP2_A52_MV05_Kwh_Ca3: Number,
	data_TL_TramRP2_A52_MV06_Kwh_Ca3: Number,
	data_TL_TramRP2_A52_MV07_Kwh_Ca3: Number,
	data_TL_TramRP2_A52_MV08_Kwh_Ca3: Number,

	data_TL_TramRP3_A51_MV01_Kwh_Ca3: Number,
	data_TL_TramRP3_A51_MV02_Kwh_Ca3: Number,
	data_TL_TramRP3_A51_MV03_Kwh_Ca3: Number,
	data_TL_TramRP3_A51_MV04_Kwh_Ca3: Number,
	data_TL_TramRP3_A52_MV05_Kwh_Ca3: Number,

	data_TL_TramKTP55_A51_MV01_Kwh_Ca3: Number,

	data_TL_TramKTP56_A51_MV01_Kwh_Ca3: Number,

	data_TL_TramKTP7_A51_MV01_Kwh_Ca3: Number,
	data_TL_TramKTP7_A51_MV02_Kwh_Ca3: Number,

	data_TL_Tram1306B_A51_MV01_Kwh_Ca3: Number,
	data_TL_Tram1306B_A51_MV02_Kwh_Ca3: Number,
	note: String,
});
var DB_TL_KwhCa_DATA = mongoose.model('DB_TL_KwhCa_DATA', data_TL_Kwh_Ca_Schema, 'data_TL_KwhCa');
///////////////////////////////////////////////////////////////////////////////////////
// PLC CD End Cơ sở dữ liệu Giám sát năng lượng Tang Loong
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
///////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// END Giám sát năng lượng Tang Loong
// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
// -----------------------------------------------------------------------------------

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

const cookieParser = require('cookie-parser')
app.use(cookieParser()) // use to read format cookie

// // Cau hinh EJS


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Giám sát năng lượng tuyển Tang Loong Cơ bản:
app.get("/1ahome_GSNL_TL_01",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/1ahome_GSNL_TL_01');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("1ahome_GSNL_TL_01",{
			user: user
		});
	});
});

app.get("/1ahome_GSNL_TL_02",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/1ahome_GSNL_TL_02');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("1ahome_GSNL_TL_02",{
			user: user
		});
	});
});

app.get("/1ahome_GSNL_TL_03",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/1ahome_GSNL_TL_03');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("1ahome_GSNL_TL_03",{
			user: user
		});
	});
});

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Giám sát năng lượng Tuyển Tang Loong: Sơ đồ
app.get("/1ahome_GSNL_TL_Sodo01",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/1ahome_GSNL_TL_Sodo01');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("1ahome_GSNL_TL_Sodo01",{
			user: user
		});
	});
});

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Giám sát năng lượng Tuyển Tang Loong theo Ca
app.get("/1ahome_GSNL_TL_KwhCa",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/1ahome_GSNL_TL_KwhCa');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("1ahome_GSNL_TL_KwhCa",{
			user: user
		});
	});
});

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Biểu đồ Giám sát năng lượng Tuyển Tang Loong theo Ca START
// ---------------------------
// Năng lượng Ca Tram 01 MV01 
app.get("/1ahome_GSNL_BieudoCa_TL_Tram01_A51_MV01",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/1ahome_GSNL_BieudoCa_TL_Tram01_A51_MV01');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("1ahome_GSNL_BieudoCa_TL_Tram01_A51_MV01",{
			user: user
		});
	});
});
// ----------------------------



// Biểu đồ Giám sát năng lượng Tuyển Tang Loong theo Ca END
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

///////////////////////////////////////////////////////////////////////////////////////
// Giám sát năng lượng Bắc Nhạc sơn: Sơ đồ
app.get("/1ahome_GSNL_CNCoDien_Sodo01",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/1ahome_GSNL_CNCoDien_Sodo01');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("1ahome_GSNL_CNCoDien_Sodo01",{
			user: user
		});
	});
});
//////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////
// Giám sát năng lượng Bao cao Excell
var Excel = require('exceljs');
function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

///////////////////////////////////////////////////////////////////////////////////////


// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
// Bao cao Excell Kwh START

// Giám sát năng lượng Bao cao Excell Kwh Start

// Báo cáo Excell Giám sát năng lượng Tuyển Cam đường Kwh Get
app.get("/1ahome_GSNL_TL_BaocaoExcell_Kwh", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BaocaoExcell_Kwh", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
///////////////////////////////////////////////////////////////////////////////////////////
app.post("/1ahome_GSNL_TL_BaocaoExcell_Kwh", async function(req,res){	
	let date_from = new Date(req.body.date_from);
  	let date_to = new Date(req.body.date_to);
	console.log("date_from = " + date_from + " date_to = " + date_to)
	
	//Giới hạn số dữ liệu ở ô Limit
	let histories = await DB_TL_Kwh_DATA.find({ TL_Kwh_timestamp: { $gte: date_from, $lte: date_to }}).limit(2000);
	let data = []
	let temp1;
	let temp2;

	//console.log(histories)

	// Write to Excel
	let filename = 'template/Report1 CN Tang Loong Tram RP1.xlsx';
	let workbook = new Excel.Workbook();
	await workbook.xlsx.readFile(filename);
	let worksheet = workbook.getWorksheet("Sheet1");
	let startRow = 11;
	worksheet.getColumn(1).alignment = {vertical: 'center', horizontal: 'left'}
	worksheet.getColumn(2).alignment = {vertical: 'center', horizontal: 'center'}
	worksheet.getColumn(3).alignment = {vertical: 'center', horizontal: 'center'}
	worksheet.getColumn(4).alignment = {vertical: 'center', horizontal: 'center'}
	worksheet.getColumn(5).alignment = {vertical: 'center', horizontal: 'center'}
	worksheet.getColumn(6).alignment = {vertical: 'center', horizontal: 'center'}


	histories.forEach(function(history) {
		temp2 = "";
		// if (water.data > 80) {
		// 	temp2 = "Hight"
		// }
		// if (water.data < 20) {
		// 	temp2 = "Low"
		// }
		// moment().format('MMMM Do YYYY, h:mm:ss a');
		let data1 = {
			"time"  : moment(history.TL_Kwh_timestamp + 7).format('DD-MM-YYYY HH:mm:ss') ,
			"RP1_MV01"  : history.data_TL_TramRP1_A51_MV01_Kwh,
			"RP1_MV02"  : history.data_TL_TramRP1_A51_MV02_Kwh,
			"RP1_MV03"  : history.data_TL_TramRP1_A51_MV03_Kwh,
			"RP1_MV04"  : history.data_TL_TramRP1_A51_MV04_Kwh,
			"RP2_MV01"  : history.data_TL_TramRP2_A51_MV01_Kwh,
			"RP2_MV02"  : history.data_TL_TramRP2_A51_MV02_Kwh,
			"RP2_MV03"  : history.data_TL_TramRP2_A51_MV03_Kwh,
			"RP2_MV04"  : history.data_TL_TramRP2_A51_MV04_Kwh,
			"RP2_MV05"  : history.data_TL_TramRP2_A52_MV05_Kwh,
			"RP2_MV06"  : history.data_TL_TramRP2_A52_MV06_Kwh,
			"RP2_MV07"  : history.data_TL_TramRP2_A52_MV07_Kwh,
			"RP2_MV08"  : history.data_TL_TramRP2_A52_MV08_Kwh,
			"RP3_MV01"  : history.data_TL_TramRP3_A51_MV01_Kwh,
			"RP3_MV02"  : history.data_TL_TramRP3_A51_MV02_Kwh,
			"RP3_MV03"  : history.data_TL_TramRP3_A51_MV03_Kwh,
			"RP3_MV04"  : history.data_TL_TramRP3_A51_MV04_Kwh,
			"RP3_MV05"  : history.data_TL_TramRP3_A52_MV05_Kwh,
			"KTP55_MV01"  : history.data_TL_TramKTP55_A51_MV01_Kwh,
			"KTP56_MV01"  : history.data_TL_TramKTP56_A51_MV01_Kwh,
			"KTP7_MV01"  : history.data_TL_TramKTP7_A51_MV01_Kwh,
			"KTP7_MV02"  : history.data_TL_TramKTP7_A51_MV02_Kwh,
			"Tr1306B_MV01"  : history.data_TL_Tram1306B_A51_MV01_Kwh,
			"Tr1306B_MV02"  : history.data_TL_Tram1306B_A51_MV02_Kwh,
			"checked" : true
		};

		worksheet.spliceRows(startRow, 0,
			
			[data1.time,
				data1.RP1_MV01, data1.RP1_MV02, data1.RP1_MV03, data1.RP1_MV04,
				data1.RP2_MV01, data1.RP2_MV02, data1.RP2_MV03, data1.RP2_MV04,
				data1.RP2_MV05, data1.RP2_MV06, data1.RP2_MV07, data1.RP2_MV08,
				data1.RP3_MV01, data1.RP3_MV02, data1.RP3_MV03, data1.RP3_MV04, data1.RP3_MV05,
				data1.KTP55_MV01,
				data1.KTP56_MV01,
				data1.KTP7_MV01,
				data1.KTP7_MV02,
				data1.Tr1306B_MV01,
				data1.Tr1306B_MV02,
			]
		  );
		// let row = worksheet.insertRow(startRow);
		// row.getCell(1).value = data1.time;   	//A7
		// row.getCell(2).value = data1.MV01;		//B7
		// row.getCell(3).value = data1.MV02;		//C7
		// row.getCell(4).value = data1.MV03;		//
		// row.getCell(5).value = data1.MV04;
		// row.getCell(6).value = data1.MV05;
		// row.commit();
		startRow = startRow +1	// Cộng thêm 1 dòng rồi lặp lại
	})

	// let row6 = worksheet.getCell(6,3);
	// let row7 = worksheet.insertRow(7);
	    worksheet.getCell('C6').value = date_from;
		// row6.commit();
		worksheet.getCell('C7').value = date_to;
		// row7.commit();
		

	  // Save as new file trong folder Report
	  let outputPath = 'reports/RP1 CN Tang Loong Tram RP1.xlsx';
	  let newFilename = "RP1 CN Tang Loong Tram RP1.xlsx"
	  workbook.xlsx.writeFile(outputPath);
	  // Gửi file về client để tải xuống
	  await delay(500);
	
	  res.download(outputPath, newFilename, async (err) => {
		if (err) {
			console.error("Lỗi khi gửi file:", err);
			res.status(500).send("Lỗi khi tải file");
		}
	  });
		//res.render('report/index');
});
// Giám sát năng lượng Bao cao Excell Kwh End

// Giám sát năng lượng Bao cao Excell Cosphi Start
// Báo cáo Excell Giám sát năng lượng Tuyển Cam đường Cosphi Get
app.get("/1ahome_GSNL_TL_BaocaoExcell_Cosphi", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Cosphi_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Cosphi_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BaocaoExcell_Cosphi", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
///////////////////////////////////////////////////////////////////////////////////////////
app.post("/1ahome_GSNL_TL_BaocaoExcell_Cosphi", async function(req,res){	
	let date_from = new Date(req.body.date_from);
  	let date_to = new Date(req.body.date_to);
	console.log("date_from = " + date_from + " date_to = " + date_to)
	
	//Giới hạn số dữ liệu ở ô Limit
	let histories = await DB_TL_Kwh_DATA.find({ TL_Kwh_timestamp: { $gte: date_from, $lte: date_to }}).limit(2000);
	let data = []
	let temp1;
	let temp2;

	//console.log(histories)

	// Write to Excel
	let filename = 'template/Report1 CN Tang Loong Tram RP1.xlsx';
	let workbook = new Excel.Workbook();
	await workbook.xlsx.readFile(filename);
	let worksheet = workbook.getWorksheet("Sheet1");
	let startRow = 11;
	worksheet.getColumn(1).alignment = {vertical: 'center', horizontal: 'left'}
	worksheet.getColumn(2).alignment = {vertical: 'center', horizontal: 'center'}
	worksheet.getColumn(3).alignment = {vertical: 'center', horizontal: 'center'}
	worksheet.getColumn(4).alignment = {vertical: 'center', horizontal: 'center'}
	worksheet.getColumn(5).alignment = {vertical: 'center', horizontal: 'center'}
	worksheet.getColumn(6).alignment = {vertical: 'center', horizontal: 'center'}


	histories.forEach(function(history) {
		temp2 = "";
		// if (water.data > 80) {
		// 	temp2 = "Hight"
		// }
		// if (water.data < 20) {
		// 	temp2 = "Low"
		// }
		// moment().format('MMMM Do YYYY, h:mm:ss a');
		let data1 = {
			"time"  : moment(history.TL_Cosphi_timestamp + 7).format('DD-MM-YYYY HH:mm:ss') ,
			"RP1_MV01"  : history.data_TL_TramRP1_A51_MV01_Cosphi,
			"RP1_MV02"  : history.data_TL_TramRP1_A51_MV02_Cosphi,
			"RP1_MV03"  : history.data_TL_TramRP1_A51_MV03_Cosphi,
			"RP1_MV04"  : history.data_TL_TramRP1_A51_MV04_Cosphi,
			"RP2_MV01"  : history.data_TL_TramRP2_A51_MV01_Cosphi,
			"RP2_MV02"  : history.data_TL_TramRP2_A51_MV02_Cosphi,
			"RP2_MV03"  : history.data_TL_TramRP2_A51_MV03_Cosphi,
			"RP2_MV04"  : history.data_TL_TramRP2_A51_MV04_Cosphi,
			"RP2_MV05"  : history.data_TL_TramRP2_A52_MV05_Cosphi,
			"RP2_MV06"  : history.data_TL_TramRP2_A52_MV06_Cosphi,
			"RP2_MV07"  : history.data_TL_TramRP2_A52_MV07_Cosphi,
			"RP2_MV08"  : history.data_TL_TramRP2_A52_MV08_Cosphi,
			"RP3_MV01"  : history.data_TL_TramRP3_A51_MV01_Cosphi,
			"RP3_MV02"  : history.data_TL_TramRP3_A51_MV02_Cosphi,
			"RP3_MV03"  : history.data_TL_TramRP3_A51_MV03_Cosphi,
			"RP3_MV04"  : history.data_TL_TramRP3_A51_MV04_Cosphi,
			"RP3_MV05"  : history.data_TL_TramRP3_A52_MV05_Cosphi,
			"KTP55_MV01"  : history.data_TL_TramKTP55_A51_MV01_Cosphi,
			"KTP56_MV01"  : history.data_TL_TramKTP56_A51_MV01_Cosphi,
			"KTP7_MV01"  : history.data_TL_TramKTP7_A51_MV01_Cosphi,
			"KTP7_MV02"  : history.data_TL_TramKTP7_A51_MV02_Cosphi,
			"Tr1306B_MV01"  : history.data_TL_Tram1306B_A51_MV01_Cosphi,
			"Tr1306B_MV02"  : history.data_TL_Tram1306B_A51_MV02_Cosphi,
			"checked" : true
		};

		worksheet.spliceRows(startRow, 0,
			
			[data1.time,
				data1.RP1_MV01, data1.RP1_MV02, data1.RP1_MV03, data1.RP1_MV04,
				data1.RP2_MV01, data1.RP2_MV02, data1.RP2_MV03, data1.RP2_MV04,
				data1.RP2_MV05, data1.RP2_MV06, data1.RP2_MV07, data1.RP2_MV08,
				data1.RP3_MV01, data1.RP3_MV02, data1.RP3_MV03, data1.RP3_MV04, data1.RP3_MV05,
				data1.KTP55_MV01,
				data1.KTP56_MV01,
				data1.KTP7_MV01,
				data1.KTP7_MV02,
				data1.Tr1306B_MV01,
				data1.Tr1306B_MV02,
			]
		  );
		// let row = worksheet.insertRow(startRow);
		// row.getCell(1).value = data1.time;   	//A7
		// row.getCell(2).value = data1.MV01;		//B7
		// row.getCell(3).value = data1.MV02;		//C7
		// row.getCell(4).value = data1.MV03;		//
		// row.getCell(5).value = data1.MV04;
		// row.getCell(6).value = data1.MV05;
		// row.commit();
		startRow = startRow +1	// Cộng thêm 1 dòng rồi lặp lại
	})

	// let row6 = worksheet.getCell(6,3);
	// let row7 = worksheet.insertRow(7);
	    worksheet.getCell('C6').value = date_from;
		// row6.commit();
		worksheet.getCell('C7').value = date_to;
		// row7.commit();
		

	  // Save as new file trong folder Report
	  let outputPath = 'reports/RP1 CN Tang Loong Tram RP1.xlsx';
	  let newFilename = "RP1 CN Tang Loong Tram RP1.xlsx"
	  workbook.xlsx.writeFile(outputPath);
	  // Gửi file về client để tải xuống
	  await delay(500);
	
	  res.download(outputPath, newFilename, async (err) => {
		if (err) {
			console.error("Lỗi khi gửi file:", err);
			res.status(500).send("Lỗi khi tải file");
		}
	  });
		//res.render('report/index');
});
// Giám sát năng lượng Bao cao Excell Cosphi End



// Báo cáo Excell Giám sát năng lượng Tuyển Tang Loong KwhDay Get
app.get("/1ahome_GSNL_TL_BaocaoExcell_KwhDay", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_KwhDay_DATA.find().sort({TL_KwhDay_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_KwhDay_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BaocaoExcell_KwhDay", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
///////////////////////////////////////////////////////////////////////////////////////////
app.post("/1ahome_GSNL_TL_BaocaoExcell_KwhDay", async function(req,res){	
	let date_from = new Date(req.body.date_from);
  	let date_to = new Date(req.body.date_to);
	console.log("date_from = " + date_from + " date_to = " + date_to)
	
	//Giới hạn số dữ liệu ở ô Limit
	let histories = await DB_TL_KwhDay_DATA.find({ TL_KwhDay_timestamp: { $gte: date_from, $lte: date_to }}).limit(2000);
	let data = []
	let temp1;
	let temp2;

	//console.log(histories)

	// Write to Excel
	let filename = 'template/Report1 CN Tang Loong Tram RP1.xlsx';
	let workbook = new Excel.Workbook();
	await workbook.xlsx.readFile(filename);
	let worksheet = workbook.getWorksheet("Sheet1");
	let startRow = 11;
	worksheet.getColumn(1).alignment = {vertical: 'center', horizontal: 'left'}
	worksheet.getColumn(2).alignment = {vertical: 'center', horizontal: 'center'}
	worksheet.getColumn(3).alignment = {vertical: 'center', horizontal: 'center'}
	worksheet.getColumn(4).alignment = {vertical: 'center', horizontal: 'center'}
	worksheet.getColumn(5).alignment = {vertical: 'center', horizontal: 'center'}
	worksheet.getColumn(6).alignment = {vertical: 'center', horizontal: 'center'}


	histories.forEach(function(history) {
		temp2 = "";
		// if (water.data > 80) {
		// 	temp2 = "Hight"
		// }
		// if (water.data < 20) {
		// 	temp2 = "Low"
		// }
		// moment().format('MMMM Do YYYY, h:mm:ss a');
		let data1 = {
			"time"  : moment(history.TL_KwhDay_timestamp + 7).format('DD-MM-YYYY HH:mm:ss') ,
			"RP1_MV01"  : history.data_TL_TramRP1_A51_MV01_KwhDay,
			"RP1_MV02"  : history.data_TL_TramRP1_A51_MV02_KwhDay,
			"RP1_MV03"  : history.data_TL_TramRP1_A51_MV03_KwhDay,
			"RP1_MV04"  : history.data_TL_TramRP1_A51_MV04_KwhDay,
			"RP2_MV01"  : history.data_TL_TramRP2_A51_MV01_KwhDay,
			"RP2_MV02"  : history.data_TL_TramRP2_A51_MV02_KwhDay,
			"RP2_MV03"  : history.data_TL_TramRP2_A51_MV03_KwhDay,
			"RP2_MV04"  : history.data_TL_TramRP2_A51_MV04_KwhDay,
			"RP2_MV05"  : history.data_TL_TramRP2_A52_MV05_KwhDay,
			"RP2_MV06"  : history.data_TL_TramRP2_A52_MV06_KwhDay,
			"RP2_MV07"  : history.data_TL_TramRP2_A52_MV07_KwhDay,
			"RP2_MV08"  : history.data_TL_TramRP2_A52_MV08_KwhDay,
			"RP3_MV01"  : history.data_TL_TramRP3_A51_MV01_KwhDay,
			"RP3_MV02"  : history.data_TL_TramRP3_A51_MV02_KwhDay,
			"RP3_MV03"  : history.data_TL_TramRP3_A51_MV03_KwhDay,
			"RP3_MV04"  : history.data_TL_TramRP3_A51_MV04_KwhDay,
			"RP3_MV05"  : history.data_TL_TramRP3_A52_MV05_KwhDay,
			"KTP55_MV01"  : history.data_TL_TramKTP55_A51_MV01_KwhDay,
			"KTP56_MV01"  : history.data_TL_TramKTP56_A51_MV01_KwhDay,
			"KTP7_MV01"  : history.data_TL_TramKTP7_A51_MV01_KwhDay,
			"KTP7_MV02"  : history.data_TL_TramKTP7_A51_MV02_KwhDay,
			"Tr1306B_MV01"  : history.data_TL_Tram1306B_A51_MV01_KwhDay,
			"Tr1306B_MV02"  : history.data_TL_Tram1306B_A51_MV02_KwhDay,
			"checked" : true
		};

		worksheet.spliceRows(startRow, 0,
			
			[data1.time,
				data1.RP1_MV01, data1.RP1_MV02, data1.RP1_MV03, data1.RP1_MV04,
				data1.RP2_MV01, data1.RP2_MV02, data1.RP2_MV03, data1.RP2_MV04,
				data1.RP2_MV05, data1.RP2_MV06, data1.RP2_MV07, data1.RP2_MV08,
				data1.RP3_MV01, data1.RP3_MV02, data1.RP3_MV03, data1.RP3_MV04, data1.RP3_MV05,
				data1.KTP55_MV01,
				data1.KTP56_MV01,
				data1.KTP7_MV01,
				data1.KTP7_MV02,
				data1.Tr1306B_MV01,
				data1.Tr1306B_MV02,
			]
		  );
		// let row = worksheet.insertRow(startRow);
		// row.getCell(1).value = data1.time;   	//A7
		// row.getCell(2).value = data1.MV01;		//B7
		// row.getCell(3).value = data1.MV02;		//C7
		// row.getCell(4).value = data1.MV03;		//
		// row.getCell(5).value = data1.MV04;
		// row.getCell(6).value = data1.MV05;
		// row.commit();
		startRow = startRow +1	// Cộng thêm 1 dòng rồi lặp lại
	})

	// let row6 = worksheet.getCell(6,3);
	// let row7 = worksheet.insertRow(7);
	    worksheet.getCell('C6').value = date_from;
		// row6.commit();
		worksheet.getCell('C7').value = date_to;
		// row7.commit();
		

	  // Save as new file trong folder Report
	  let outputPath = 'reports/RP1 CN Tang Loong Tram RP1.xlsx';
	  let newFilename = "RP1 CN Tang Loong Tram RP1.xlsx"
	  workbook.xlsx.writeFile(outputPath);
	  // Gửi file về client để tải xuống
	  await delay(500);
	
	  res.download(outputPath, newFilename, async (err) => {
		if (err) {
			console.error("Lỗi khi gửi file:", err);
			res.status(500).send("Lỗi khi tải file");
		}
	  });
		//res.render('report/index');
});
// Giám sát năng lượng Bao cao Excell KwhDay End


// Bao cao Excell Kwh END
// BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
///////////////////////////////////////////////////////////////////////








// START AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong START

//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP1 MV01 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_TramRP1_A51MV01", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_TramRP1_A51MV01", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_TramRP1_A51MV01", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_TramRP1_A51_MV01_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP1_A51_MV01_Kwh > 0){
				Array_TL_TramRP1_A51_MV01_Kwh.unshift(data.data_TL_TramRP1_A51_MV01_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_TramRP1_A51_MV01_Kwh) - Math.min(...Array_TL_TramRP1_A51_MV01_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP1 MV01 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP1 MV02 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_TramRP1_A51MV02", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_TramRP1_A51MV02", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_TramRP1_A51MV02", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_TramRP1_A51_MV02_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP1_A51_MV02_Kwh > 0){
				Array_TL_TramRP1_A51_MV02_Kwh.unshift(data.data_TL_TramRP1_A51_MV02_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_TramRP1_A51_MV02_Kwh) - Math.min(...Array_TL_TramRP1_A51_MV02_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP1 MV02 End
//-------------------------------------


//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP1 MV03 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_TramRP1_A51MV03", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_TramRP1_A51MV03", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_TramRP1_A51MV03", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_TramRP1_A51_MV03_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP1_A51_MV03_Kwh > 0){
				Array_TL_TramRP1_A51_MV03_Kwh.unshift(data.data_TL_TramRP1_A51_MV03_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_TramRP1_A51_MV03_Kwh) - Math.min(...Array_TL_TramRP1_A51_MV03_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP1 MV03 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP1 MV04 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_TramRP1_A51MV04", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_TramRP1_A51MV04", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_TramRP1_A51MV04", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_TramRP1_A51_MV04_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP1_A51_MV04_Kwh > 0){
				Array_TL_TramRP1_A51_MV04_Kwh.unshift(data.data_TL_TramRP1_A51_MV04_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_TramRP1_A51_MV04_Kwh) - Math.min(...Array_TL_TramRP1_A51_MV04_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP1 MV04 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV01 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_TramRP2_A51MV01", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_TramRP2_A51MV01", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_TramRP2_A51MV01", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_TramRP2_A51_MV01_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP2_A51_MV01_Kwh > 0){
				Array_TL_TramRP2_A51_MV01_Kwh.unshift(data.data_TL_TramRP2_A51_MV01_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_TramRP2_A51_MV01_Kwh) - Math.min(...Array_TL_TramRP2_A51_MV01_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV01 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV02 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_TramRP2_A51MV02", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({CD_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_TramRP2_A51MV02", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_TramRP2_A51MV02", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_TramRP2_A51_MV02_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP2_A51_MV02_Kwh > 0){
				Array_TL_TramRP2_A51_MV02_Kwh.unshift(data.data_TL_TramRP2_A51_MV02_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_TramRP2_A51_MV02_Kwh) - Math.min(...Array_TL_TramRP2_A51_MV02_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV02 End
//-------------------------------------
//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV03 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_TramRP2_A51MV03", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_TramRP2_A51MV03", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_TramRP2_A51MV03", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_TramRP2_A51_MV03_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP2_A51_MV03_Kwh > 0){
				Array_TL_TramRP2_A51_MV03_Kwh.unshift(data.data_TL_TramRP2_A51_MV03_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_TramRP2_A51_MV03_Kwh) - Math.min(...Array_TL_TramRP2_A51_MV03_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV03 End
//-------------------------------------
//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV04 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_TramRP2_A51MV04", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_TramRP2_A51MV04", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_TramRP2_A51MV04", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_TramRP2_A51_MV04_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP2_A51_MV04_Kwh > 0){
				Array_TL_TramRP2_A51_MV04_Kwh.unshift(data.data_TL_TramRP2_A51_MV04_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_TramRP2_A51_MV04_Kwh) - Math.min(...Array_TL_TramRP2_A51_MV04_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV04 End
//-------------------------------------
//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV05 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_TramRP2_A52MV05", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({CD_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_TramRP2_A52MV05", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_TramRP2_A52MV05", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_TramRP2_A52_MV05_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP2_A52_MV05_Kwh > 0){
				Array_TL_TramRP2_A52_MV05_Kwh.unshift(data.data_TL_TramRP2_A52_MV05_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_TramRP2_A52_MV05_Kwh) - Math.min(...Array_TL_TramRP2_A52_MV05_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV05 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV06 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_TramRP2_A52MV06", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_TramRP2_A52MV06", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_TramRP2_A52MV06", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_TramRP2_A52_MV06_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP2_A52_MV06_Kwh > 0){
				Array_TL_TramRP2_A52_MV06_Kwh.unshift(data.data_TL_TramRP2_A52_MV06_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_TramRP2_A52_MV06_Kwh) - Math.min(...Array_TL_TramRP2_A52_MV06_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV06 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV07 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_TramRP2_A52MV07", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_TramRP2_A52MV07", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_TramRP2_A52MV07", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_TramRP2_A52_MV07_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP2_A52_MV07_Kwh > 0){
				Array_TL_TramRP2_A52_MV07_Kwh.unshift(data.data_TL_TramRP2_A52_MV07_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_TramRP2_A52_MV07_Kwh) - Math.min(...Array_TL_TramRP2_A52_MV07_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV07 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV08 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_TramRP2_A52MV08", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_TramRP2_A52MV08", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_TramRP2_A52MV08", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_TramRP2_A52_MV08_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP2_A52_MV08_Kwh > 0){
				Array_TL_TramRP2_A52_MV08_Kwh.unshift(data.data_TL_TramRP2_A52_MV08_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_TramRP2_A52_MV08_Kwh) - Math.min(...Array_TL_TramRP2_A52_MV08_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV08 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP3 MV01 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_TramRP3_A51MV01", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_TramRP3_A51MV01", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_TramRP3_A51MV01", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_TramRP3_A51_MV01_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP3_A51_MV01_Kwh > 0){
				Array_TL_TramRP3_A51_MV01_Kwh.unshift(data.data_TL_TramRP3_A51_MV01_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_TramRP3_A51_MV01_Kwh) - Math.min(...Array_TL_TramRP3_A51_MV01_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP3 MV01 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP3 MV02 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_TramRP3_A51MV02", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_TramRP3_A51MV02", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_TramRP3_A51MV02", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_TramRP3_A51_MV02_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP3_A51_MV02_Kwh > 0){
				Array_TL_TramRP3_A51_MV02_Kwh.unshift(data.data_TL_TramRP3_A51_MV02_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_TramRP3_A51_MV02_Kwh) - Math.min(...Array_TL_TramRP3_A51_MV02_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP3 MV02 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP3 MV03 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_TramRP3_A51MV03", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_TramRP3_A51MV03", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_TramRP3_A51MV03", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_TramRP3_A51_MV03_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP3_A51_MV03_Kwh > 0){
				Array_TL_TramRP3_A51_MV03_Kwh.unshift(data.data_TL_TramRP3_A51_MV03_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_TramRP3_A51_MV03_Kwh) - Math.min(...Array_TL_TramRP3_A51_MV03_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP3 MV03 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP3 MV04 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_TramRP3_A51MV04", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_TramRP3_A51MV04", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_TramRP3_A51MV04", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_TramRP3_A51_MV04_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP3_A51_MV04_Kwh > 0){
				Array_TL_TramRP3_A51_MV04_Kwh.unshift(data.data_TL_TramRP3_A51_MV04_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_TramRP3_A51_MV04_Kwh) - Math.min(...Array_TL_TramRP3_A51_MV04_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP3 MV04 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP3 MV05 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_TramRP3_A52MV05", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_TramRP3_A52MV05", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_TramRP3_A52MV05", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_TramRP3_A52_MV05_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP3_A52_MV05_Kwh > 0){
				Array_TL_TramRP3_A52_MV05_Kwh.unshift(data.data_TL_TramRP3_A52_MV05_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_TramRP3_A52_MV05_Kwh) - Math.min(...Array_TL_TramRP3_A52_MV05_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong TramRP3 MV05 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong Tram KTP55 MV01 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_TramKTP55_A51MV01", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_TramKTP55_A51MV01", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_TramKTP55_A51MV01", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_TramKTP55_A51_MV01_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramKTP55_A51_MV01_Kwh > 0){
				Array_TL_TramKTP55_A51_MV01_Kwh.unshift(data.data_TL_TramKTP55_A51_MV01_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_TramKTP55_A51_MV01_Kwh) - Math.min(...Array_TL_TramKTP55_A51_MV01_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong Tram KTP55 MV01 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong Tram KTP56 MV01 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_TramKTP56_A51MV01", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_TramKTP56_A51MV01", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_TramKTP56_A51MV01", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_TramKTP56_A51_MV01_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramKTP56_A51_MV01_Kwh > 0){
				Array_TL_TramKTP56_A51_MV01_Kwh.unshift(data.data_TL_TramKTP56_A51_MV01_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_TramKTP56_A51_MV01_Kwh) - Math.min(...Array_TL_TramKTP56_A51_MV01_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong Tram KTP56 MV01 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong Tram KTP7 MV01 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_TramKTP7_A51MV01", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_TramKTP7_A51MV01", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_TramKTP7_A51MV01", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_TramKTP7_A51_MV01_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramKTP7_A51_MV01_Kwh > 0){
				Array_TL_TramKTP7_A51_MV01_Kwh.unshift(data.data_TL_TramKTP7_A51_MV01_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_TramKTP7_A51_MV01_Kwh) - Math.min(...Array_TL_TramKTP7_A51_MV01_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong Tram KTP7 MV01 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong Tram KTP7 MV02 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_TramKTP7_A51MV02", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_TramKTP7_A51MV02", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_TramKTP7_A51MV02", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_TramKTP7_A51_MV02_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramKTP7_A51_MV02_Kwh > 0){
				Array_TL_TramKTP7_A51_MV02_Kwh.unshift(data.data_TL_TramKTP7_A51_MV02_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_TramKTP7_A51_MV02_Kwh) - Math.min(...Array_TL_TramKTP7_A51_MV02_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong Tram KTP7 MV02 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong Tram 1306B MV01 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_Tram1306B_A51MV01", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_Tram1306B_A51MV01", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_Tram1306B_A51MV01", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_Tram1306B_A51_MV01_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_Tram1306B_A51_MV01_Kwh > 0){
				Array_TL_Tram1306B_A51_MV01_Kwh.unshift(data.data_TL_Tram1306B_A51_MV01_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_Tram1306B_A51_MV01_Kwh) - Math.min(...Array_TL_Tram1306B_A51_MV01_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong Tram 1306B MV01 End
//-------------------------------------


//-------------------------------------
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong Tram 1306B MV02 Start
app.get("/1ahome_GSNL_TL_BieudoNgay_Tram1306B_A51MV02", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoNgay_Tram1306B_A51MV02", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/apiGetDataChart_GSNL_TL_BieudoNgay_Tram1306B_A51MV02", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];
	let Array_TL_Tram1306B_A51_MV02_Kwh = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg ;

		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_Tram1306B_A51_MV02_Kwh > 0){
				Array_TL_Tram1306B_A51_MV02_Kwh.unshift(data.data_TL_Tram1306B_A51_MV02_Kwh);
				
			}

			
			
			avg = (Math.max(...Array_TL_Tram1306B_A51_MV02_Kwh) - Math.min(...Array_TL_Tram1306B_A51_MV02_Kwh))/(i+1);


			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[3] > 0 ){
			// 	avg = Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[3];
				
			// }

			// if(Array_CD_Tram01_A51_MV01_Kwh[0] > 0 && Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1] > 0 ){
			// 	avg = (Array_CD_Tram01_A51_MV01_Kwh[0] -  Array_CD_Tram01_A51_MV01_Kwh[Array_CD_Tram01_A51_MV01_Kwh.length - 1])/(i+1);
			// }
		});

		
		let temp_data = 
		{
			TL_Kwh_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
// Biểu đồ tiêu thụ theo Ngày Giám sát năng lượng Tuyển Tằng Loong Tram 1306B MV02 End
//-------------------------------------

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//END   BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB

// START AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP1 MV01 Start
app.get("/1ahome_GSNL_TL_BieudoThang_TramRP1_A51MV01", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_TramRP1_A51MV01", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_TramRP1_A51MV01", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_TramRP1_A51_MV01_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP1_A51_MV01_Kwh > 0){
				Array_TL_TramRP1_A51_MV01_Kwh_Month.unshift(data.data_TL_TramRP1_A51_MV01_Kwh);
			}

			if(Array_TL_TramRP1_A51_MV01_Kwh_Month[0] > 0 && Array_TL_TramRP1_A51_MV01_Kwh_Month[Array_TL_TramRP1_A51_MV01_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_TramRP1_A51_MV01_Kwh_Month[0] -  Array_TL_TramRP1_A51_MV01_Kwh_Month[Array_TL_TramRP1_A51_MV01_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP1 MV01 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP1 MV02 Start
app.get("/1ahome_GSNL_TL_BieudoThang_TramRP1_A51MV02", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_TramRP1_A51MV02", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_TramRP1_A51MV02", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_TramRP1_A51_MV02_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP1_A51_MV02_Kwh > 0){
				Array_TL_TramRP1_A51_MV02_Kwh_Month.unshift(data.data_TL_TramRP1_A51_MV02_Kwh);
			}

			if(Array_TL_TramRP1_A51_MV02_Kwh_Month[0] > 0 && Array_TL_TramRP1_A51_MV02_Kwh_Month[Array_TL_TramRP1_A51_MV02_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_TramRP1_A51_MV02_Kwh_Month[0] -  Array_TL_TramRP1_A51_MV02_Kwh_Month[Array_TL_TramRP1_A51_MV02_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP1 MV02 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP1 MV03 Start
app.get("/1ahome_GSNL_TL_BieudoThang_TramRP1_A51MV03", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_TramRP1_A51MV03", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_TramRP1_A51MV03", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_TramRP1_A51_MV03_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP1_A51_MV03_Kwh > 0){
				Array_TL_TramRP1_A51_MV03_Kwh_Month.unshift(data.data_TL_TramRP1_A51_MV03_Kwh);
			}

			if(Array_TL_TramRP1_A51_MV03_Kwh_Month[0] > 0 && Array_TL_TramRP1_A51_MV03_Kwh_Month[Array_TL_TramRP1_A51_MV03_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_TramRP1_A51_MV03_Kwh_Month[0] -  Array_TL_TramRP1_A51_MV03_Kwh_Month[Array_TL_TramRP1_A51_MV03_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP1 MV03 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP1 MV04 Start
app.get("/1ahome_GSNL_TL_BieudoThang_TramRP1_A51MV04", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_TramRP1_A51MV04", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_TramRP1_A51MV04", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_TramRP1_A51_MV04_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP1_A51_MV04_Kwh > 0){
				Array_TL_TramRP1_A51_MV04_Kwh_Month.unshift(data.data_TL_TramRP1_A51_MV04_Kwh);
			}

			if(Array_TL_TramRP1_A51_MV04_Kwh_Month[0] > 0 && Array_TL_TramRP1_A51_MV04_Kwh_Month[Array_TL_TramRP1_A51_MV04_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_TramRP1_A51_MV04_Kwh_Month[0] -  Array_TL_TramRP1_A51_MV04_Kwh_Month[Array_TL_TramRP1_A51_MV04_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP1 MV04 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV01 Start
app.get("/1ahome_GSNL_TL_BieudoThang_TramRP2_A51MV01", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_TramRP2_A51MV01", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_TramRP2_A51MV01", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_TramRP2_A51_MV01_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP2_A51_MV01_Kwh > 0){
				Array_TL_TramRP2_A51_MV01_Kwh_Month.unshift(data.data_TL_TramRP2_A51_MV01_Kwh);
			}

			if(Array_TL_TramRP2_A51_MV01_Kwh_Month[0] > 0 && Array_TL_TramRP2_A51_MV01_Kwh_Month[Array_TL_TramRP2_A51_MV01_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_TramRP2_A51_MV01_Kwh_Month[0] -  Array_TL_TramRP2_A51_MV01_Kwh_Month[Array_TL_TramRP2_A51_MV01_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV01 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV02 Start
app.get("/1ahome_GSNL_TL_BieudoThang_TramRP2_A51MV02", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_TramRP2_A51MV02", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_TramRP2_A51MV02", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_TramRP2_A51_MV02_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP2_A51_MV02_Kwh > 0){
				Array_TL_TramRP2_A51_MV02_Kwh_Month.unshift(data.data_TL_TramRP2_A51_MV02_Kwh);
			}

			if(Array_TL_TramRP2_A51_MV02_Kwh_Month[0] > 0 && Array_TL_TramRP2_A51_MV02_Kwh_Month[Array_TL_TramRP2_A51_MV02_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_TramRP2_A51_MV02_Kwh_Month[0] -  Array_TL_TramRP2_A51_MV02_Kwh_Month[Array_TL_TramRP2_A51_MV02_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV02 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV03 Start
app.get("/1ahome_GSNL_TL_BieudoThang_TramRP2_A51MV03", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_TramRP2_A51MV03", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_TramRP2_A51MV03", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_TramRP2_A51_MV03_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP2_A51_MV03_Kwh > 0){
				Array_TL_TramRP2_A51_MV03_Kwh_Month.unshift(data.data_TL_TramRP2_A51_MV03_Kwh);
			}

			if(Array_TL_TramRP2_A51_MV03_Kwh_Month[0] > 0 && Array_TL_TramRP2_A51_MV03_Kwh_Month[Array_TL_TramRP2_A51_MV03_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_TramRP2_A51_MV03_Kwh_Month[0] -  Array_TL_TramRP2_A51_MV03_Kwh_Month[Array_TL_TramRP2_A51_MV03_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV03 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV04 Start
app.get("/1ahome_GSNL_TL_BieudoThang_TramRP2_A51MV04", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_TramRP2_A51MV04", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_TramRP2_A51MV04", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_TramRP2_A51_MV04_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP2_A51_MV04_Kwh > 0){
				Array_TL_TramRP2_A51_MV04_Kwh_Month.unshift(data.data_TL_TramRP2_A51_MV04_Kwh);
			}

			if(Array_TL_TramRP2_A51_MV04_Kwh_Month[0] > 0 && Array_TL_TramRP2_A51_MV04_Kwh_Month[Array_TL_TramRP2_A51_MV04_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_TramRP2_A51_MV04_Kwh_Month[0] -  Array_TL_TramRP2_A51_MV04_Kwh_Month[Array_TL_TramRP2_A51_MV04_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV04 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV05 Start
app.get("/1ahome_GSNL_TL_BieudoThang_TramRP2_A52MV05", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_TramRP2_A52MV05", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_TramRP2_A52MV05", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_TramRP2_A52_MV05_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP2_A52_MV05_Kwh > 0){
				Array_TL_TramRP2_A52_MV05_Kwh_Month.unshift(data.data_TL_TramRP2_A52_MV05_Kwh);
			}

			if(Array_TL_TramRP2_A52_MV05_Kwh_Month[0] > 0 && Array_TL_TramRP2_A52_MV05_Kwh_Month[Array_TL_TramRP2_A52_MV05_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_TramRP2_A52_MV05_Kwh_Month[0] -  Array_TL_TramRP2_A52_MV05_Kwh_Month[Array_TL_TramRP2_A52_MV05_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV05 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV06 Start
app.get("/1ahome_GSNL_TL_BieudoThang_TramRP2_A52MV06", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_TramRP2_A52MV06", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_TramRP2_A52MV06", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_TramRP2_A52_MV06_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP2_A52_MV06_Kwh > 0){
				Array_TL_TramRP2_A52_MV06_Kwh_Month.unshift(data.data_TL_TramRP2_A52_MV06_Kwh);
			}

			if(Array_TL_TramRP2_A52_MV06_Kwh_Month[0] > 0 && Array_TL_TramRP2_A52_MV06_Kwh_Month[Array_TL_TramRP2_A52_MV06_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_TramRP2_A52_MV06_Kwh_Month[0] -  Array_TL_TramRP2_A52_MV06_Kwh_Month[Array_TL_TramRP2_A52_MV06_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV06 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV07 Start
app.get("/1ahome_GSNL_TL_BieudoThang_TramRP2_A52MV07", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_TramRP2_A52MV07", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_TramRP2_A52MV07", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_TramRP2_A52_MV07_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP2_A52_MV07_Kwh > 0){
				Array_TL_TramRP2_A52_MV07_Kwh_Month.unshift(data.data_TL_TramRP2_A52_MV07_Kwh);
			}

			if(Array_TL_TramRP2_A52_MV07_Kwh_Month[0] > 0 && Array_TL_TramRP2_A52_MV07_Kwh_Month[Array_TL_TramRP2_A52_MV07_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_TramRP2_A52_MV07_Kwh_Month[0] -  Array_TL_TramRP2_A52_MV07_Kwh_Month[Array_TL_TramRP2_A52_MV07_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV07 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV08 Start
app.get("/1ahome_GSNL_TL_BieudoThang_TramRP2_A52MV08", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_TramRP2_A52MV08", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_TramRP2_A52MV08", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_TramRP2_A52_MV08_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP2_A52_MV08_Kwh > 0){
				Array_TL_TramRP2_A52_MV08_Kwh_Month.unshift(data.data_TL_TramRP2_A52_MV08_Kwh);
			}

			if(Array_TL_TramRP2_A52_MV08_Kwh_Month[0] > 0 && Array_TL_TramRP2_A52_MV08_Kwh_Month[Array_TL_TramRP2_A52_MV08_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_TramRP2_A52_MV08_Kwh_Month[0] -  Array_TL_TramRP2_A52_MV08_Kwh_Month[Array_TL_TramRP2_A52_MV08_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP2 MV08 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP3 MV01 Start
app.get("/1ahome_GSNL_TL_BieudoThang_TramRP3_A51MV01", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_TramRP3_A51MV01", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_TramRP3_A51MV01", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_TramRP3_A51_MV01_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP3_A51_MV01_Kwh > 0){
				Array_TL_TramRP3_A51_MV01_Kwh_Month.unshift(data.data_TL_TramRP3_A51_MV01_Kwh);
			}

			if(Array_TL_TramRP3_A51_MV01_Kwh_Month[0] > 0 && Array_TL_TramRP3_A51_MV01_Kwh_Month[Array_TL_TramRP3_A51_MV01_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_TramRP3_A51_MV01_Kwh_Month[0] -  Array_TL_TramRP3_A51_MV01_Kwh_Month[Array_TL_TramRP3_A51_MV01_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP3 MV01 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP3 MV02 Start
app.get("/1ahome_GSNL_TL_BieudoThang_TramRP3_A51MV02", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_TramRP3_A51MV02", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_TramRP3_A51MV02", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_TramRP3_A51_MV02_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP3_A51_MV02_Kwh > 0){
				Array_TL_TramRP3_A51_MV02_Kwh_Month.unshift(data.data_TL_TramRP3_A51_MV02_Kwh);
			}

			if(Array_TL_TramRP3_A51_MV02_Kwh_Month[0] > 0 && Array_TL_TramRP3_A51_MV02_Kwh_Month[Array_TL_TramRP3_A51_MV02_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_TramRP3_A51_MV02_Kwh_Month[0] -  Array_TL_TramRP3_A51_MV02_Kwh_Month[Array_TL_TramRP3_A51_MV02_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP3 MV02 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP3 MV03 Start
app.get("/1ahome_GSNL_TL_BieudoThang_TramRP3_A51MV03", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_TramRP3_A51MV03", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_TramRP3_A51MV03", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_TramRP3_A51_MV03_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP3_A51_MV03_Kwh > 0){
				Array_TL_TramRP3_A51_MV03_Kwh_Month.unshift(data.data_TL_TramRP3_A51_MV03_Kwh);
			}

			if(Array_TL_TramRP3_A51_MV03_Kwh_Month[0] > 0 && Array_TL_TramRP3_A51_MV03_Kwh_Month[Array_TL_TramRP3_A51_MV03_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_TramRP3_A51_MV03_Kwh_Month[0] -  Array_TL_TramRP3_A51_MV03_Kwh_Month[Array_TL_TramRP3_A51_MV03_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP3 MV03 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP3 MV04 Start
app.get("/1ahome_GSNL_TL_BieudoThang_TramRP3_A51MV04", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_TramRP3_A51MV04", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_TramRP3_A51MV04", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_TramRP3_A51_MV04_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP3_A51_MV04_Kwh > 0){
				Array_TL_TramRP3_A51_MV04_Kwh_Month.unshift(data.data_TL_TramRP3_A51_MV04_Kwh);
			}

			if(Array_TL_TramRP3_A51_MV04_Kwh_Month[0] > 0 && Array_TL_TramRP3_A51_MV04_Kwh_Month[Array_TL_TramRP3_A51_MV04_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_TramRP3_A51_MV04_Kwh_Month[0] -  Array_TL_TramRP3_A51_MV04_Kwh_Month[Array_TL_TramRP3_A51_MV04_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP3 MV04 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP3 MV05 Start
app.get("/1ahome_GSNL_TL_BieudoThang_TramRP3_A52MV05", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_TramRP3_A52MV05", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_TramRP3_A52MV05", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_TramRP3_A52_MV05_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramRP3_A52_MV05_Kwh > 0){
				Array_TL_TramRP3_A52_MV05_Kwh_Month.unshift(data.data_TL_TramRP3_A52_MV05_Kwh);
			}

			if(Array_TL_TramRP3_A52_MV05_Kwh_Month[0] > 0 && Array_TL_TramRP3_A52_MV05_Kwh_Month[Array_TL_TramRP3_A52_MV05_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_TramRP3_A52_MV05_Kwh_Month[0] -  Array_TL_TramRP3_A52_MV05_Kwh_Month[Array_TL_TramRP3_A52_MV05_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramRP3 MV05 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramKTP55 MV01 Start
app.get("/1ahome_GSNL_TL_BieudoThang_TramKTP55_A51MV01", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_TramKTP55_A51MV01", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_TramKTP55_A51MV01", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_TramKTP55_A51_MV01_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramKTP55_A51_MV01_Kwh > 0){
				Array_TL_TramKTP55_A51_MV01_Kwh_Month.unshift(data.data_TL_TramKTP55_A51_MV01_Kwh);
			}

			if(Array_TL_TramKTP55_A51_MV01_Kwh_Month[0] > 0 && Array_TL_TramKTP55_A51_MV01_Kwh_Month[Array_TL_TramKTP55_A51_MV01_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_TramKTP55_A51_MV01_Kwh_Month[0] -  Array_TL_TramKTP55_A51_MV01_Kwh_Month[Array_TL_TramKTP55_A51_MV01_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramKTP55 MV01 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramKTP56 MV01 Start
app.get("/1ahome_GSNL_TL_BieudoThang_TramKTP56_A51MV01", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_TramKTP56_A51MV01", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_TramKTP56_A51MV01", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_TramKTP56_A51_MV01_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramKTP56_A51_MV01_Kwh > 0){
				Array_TL_TramKTP56_A51_MV01_Kwh_Month.unshift(data.data_TL_TramKTP56_A51_MV01_Kwh);
			}

			if(Array_TL_TramKTP56_A51_MV01_Kwh_Month[0] > 0 && Array_TL_TramKTP56_A51_MV01_Kwh_Month[Array_TL_TramKTP56_A51_MV01_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_TramKTP56_A51_MV01_Kwh_Month[0] -  Array_TL_TramKTP56_A51_MV01_Kwh_Month[Array_TL_TramKTP56_A51_MV01_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramKTP56 MV01 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramKTP7 MV01 Start
app.get("/1ahome_GSNL_TL_BieudoThang_TramKTP7_A51MV01", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_TramKTP7_A51MV01", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_TramKTP7_A51MV01", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_TramKTP7_A51_MV01_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramKTP7_A51_MV01_Kwh > 0){
				Array_TL_TramKTP7_A51_MV01_Kwh_Month.unshift(data.data_TL_TramKTP7_A51_MV01_Kwh);
			}

			if(Array_TL_TramKTP7_A51_MV01_Kwh_Month[0] > 0 && Array_TL_TramKTP7_A51_MV01_Kwh_Month[Array_TL_TramKTP7_A51_MV01_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_TramKTP7_A51_MV01_Kwh_Month[0] -  Array_TL_TramKTP7_A51_MV01_Kwh_Month[Array_TL_TramKTP7_A51_MV01_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramKTP7 MV01 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramKTP7 MV02 Start
app.get("/1ahome_GSNL_TL_BieudoThang_TramKTP7_A51MV02", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_TramKTP7_A51MV02", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_TramKTP7_A51MV02", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_TramKTP7_A51_MV02_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_TramKTP7_A51_MV02_Kwh > 0){
				Array_TL_TramKTP7_A51_MV02_Kwh_Month.unshift(data.data_TL_TramKTP7_A51_MV02_Kwh);
			}

			if(Array_TL_TramKTP7_A51_MV02_Kwh_Month[0] > 0 && Array_TL_TramKTP7_A51_MV02_Kwh_Month[Array_TL_TramKTP7_A51_MV02_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_TramKTP7_A51_MV02_Kwh_Month[0] -  Array_TL_TramKTP7_A51_MV02_Kwh_Month[Array_TL_TramKTP7_A51_MV02_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong TramKTP7 MV02 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong Tram1306B MV01 Start
app.get("/1ahome_GSNL_TL_BieudoThang_Tram1306B_A51MV01", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_Tram1306B_A51MV01", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_Tram1306B_A51MV01", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_Tram1306B_A51_MV01_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_Tram1306B_A51_MV01_Kwh > 0){
				Array_TL_Tram1306B_A51_MV01_Kwh_Month.unshift(data.data_TL_Tram1306B_A51_MV01_Kwh);
			}

			if(Array_TL_Tram1306B_A51_MV01_Kwh_Month[0] > 0 && Array_TL_Tram1306B_A51_MV01_Kwh_Month[Array_TL_Tram1306B_A51_MV01_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_Tram1306B_A51_MV01_Kwh_Month[0] -  Array_TL_Tram1306B_A51_MV01_Kwh_Month[Array_TL_Tram1306B_A51_MV01_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong Tram1306B MV01 End
//-------------------------------------

//-------------------------------------
// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong Tram1306B MV02 Start
app.get("/1ahome_GSNL_TL_BieudoThang_Tram1306B_A51MV02", async function(req,res){
	//Nếu chưa đăng nhập thì trả về /user để đăng nhập
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	//Nếu đã đăng nhập thì tìm user đã đăng nhập đúng không?
	// Nếu sai thì trả về /user để đăng nhập lại.
	// Nếu đúng thì mới cho vào thực hiện tìm /data.
	let user = await DB_USER.findById(req.cookies.userId)
	if (!user) {
		res.redirect('/user');
		return;
	};

	var perPage = 10;
  	var page = req.query.page || 1;
	
	let startdate = new Date();
	// Sort = -1 là sắp xếp dữ liệu mới đến cũ (id cao -> id thấp)
	// Sort = 1 sắp xếp dữ liệu cũ đến mới (id từ nhỏ đến lớn) 
	let data = await DB_TL_Kwh_DATA.find().sort({TL_Kwh_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_TL_Kwh_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("1ahome_GSNL_TL_BieudoThang_Tram1306B_A51MV02", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
app.post("/apiGetDataChart_GSNL_TL_BieudoThang_Tram1306B_A51MV02", async function(req, res){
	currentDay = new Date();
	
	let year = req.body.year || moment().year();
	let month = parseInt(req.body.month) || moment().month() + 1;
	
	console.log(year, month)
	
	var d1 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	var d2 = moment(year + "-" + month + "-02", "YYYY-M-DD");
	
	let StartMonth = d1.startOf('month');
    let EndMonth = d2.endOf('month');
	
	//strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	//let dtStartDate = new Date(strStartDate);
  	//let strYear = dtStartDate.getFullYear();
  	//let strMonth = dtStartDate.getMonth()+1;
  	//let strDate = dtStartDate.getDate();
  

	//console.log(d1.format('DD/MM/YYYY'), StartMonth.format('DD/MM/YYYY') + " " + EndMonth.format('MM/DD/YYYY'))

	var data1 = [];
	let tmp_date = StartMonth;
	
	for (let j = 1; j <= EndMonth.date(); j++) {
		let start_date = moment(tmp_date).startOf('date')
		let end_date = moment(tmp_date).endOf('date')
		
		//console.log(start_date.format('MM/DD/YYYY hh:mm:ss') , end_date.format('MM/DD/YYYY hh:mm:ss'))
		
        histories = await DB_TL_Kwh_DATA.find({TL_Kwh_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b ;
		let count = 0, sum = 0, avg = 0;
		let Array_TL_Tram1306B_A51_MV02_Kwh_Month = [];
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.DB_TL_Kwh_DATA;
			b = data.TL_Kwh_timestamp;
			
			count++;

			if(data.data_TL_Tram1306B_A51_MV02_Kwh > 0){
				Array_TL_Tram1306B_A51_MV02_Kwh_Month.unshift(data.data_TL_Tram1306B_A51_MV02_Kwh);
			}

			if(Array_TL_Tram1306B_A51_MV02_Kwh_Month[0] > 0 && Array_TL_Tram1306B_A51_MV02_Kwh_Month[Array_TL_Tram1306B_A51_MV02_Kwh_Month.length - 1] > 0 ){
				avg = Array_TL_Tram1306B_A51_MV02_Kwh_Month[0] -  Array_TL_Tram1306B_A51_MV02_Kwh_Month[Array_TL_Tram1306B_A51_MV02_Kwh_Month.length - 1];
			}
			

		});

		let temp_data = 
		{
			TL_Kwh_timestamp: moment(tmp_date).format('DD-MM-YY'),
			value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

// Biểu đồ tiêu thụ theo Tháng Giám sát năng lượng Tuyển Tằng Loong Tram1306B MV02 End
//-------------------------------------

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// END BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB



// START AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Giám sát năng lượng CN Tuyển Tằng Loong: Sơ đồ
app.get("/1ahome_GSNL_TL_SodoMBA110KV",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/1ahome_GSNL_TL_SodoMBA110KV');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("1ahome_GSNL_TL_SodoMBA110KV",{
			user: user
		});
	});
});
app.get("/1ahome_GSNL_TL_SodoRP1",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/1ahome_GSNL_TL_SodoRP1');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("1ahome_GSNL_TL_SodoRP1",{
			user: user
		});
	});
});
app.get("/1ahome_GSNL_TL_SodoRP2",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/1ahome_GSNL_TL_SodoRP2');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("1ahome_GSNL_TL_SodoRP2",{
			user: user
		});
	});
});
app.get("/1ahome_GSNL_TL_SodoRP3",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/1ahome_GSNL_TL_SodoRP3');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("1ahome_GSNL_TL_SodoRP3",{
			user: user
		});
	});
});
app.get("/1ahome_GSNL_TL_SodoKTP5556",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/1ahome_GSNL_TL_SodoKTP5556');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("1ahome_GSNL_TL_SodoKTP5556",{
			user: user
		});
	});
});
app.get("/1ahome_GSNL_TL_SodoKTP7",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/1ahome_GSNL_TL_SodoKTP7');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("1ahome_GSNL_TL_SodoKTP7",{
			user: user
		});
	});
});
app.get("/1ahome_GSNL_TL_Sodo1306B",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/1ahome_GSNL_TL_Sodo1306B');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("1ahome_GSNL_TL_Sodo1306B",{
			user: user
		});
	});
});

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// END BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB


// START AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Giám sát năng lượng Tuyển Cam Đường theo Ca
app.get("/1ahome_GSNL_TL_KwhCa",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/1ahome_GSNL_TL_KwhCa');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("1ahome_GSNL_TL_KwhCa",{
			user: user
		});
	});
});

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// END BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB

// START AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Giám sát năng lượng Tuyển Cam Đường theo Ca
app.get("/1ahome_GSNL_TL_KwhCa",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/1ahome_GSNL_TL_KwhCa');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("1ahome_GSNL_TL_KwhCa",{
			user: user
		});
	});
});
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Năng lượng Ca Tram RP1 MV01 
app.get("/1ahome_GSNL_TL_BieudoCa_TramRP1_A51_MV01",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/1ahome_GSNL_TL_BieudoCa_TramRP1_A51_MV01');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("1ahome_GSNL_TL_BieudoCa_TramRP1_A51_MV01",{
			user: user
		});
	});
});
// ----------------------------
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// END BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB


//////////////////////////////////////////////////////////////////////////////////////////
// Quan ly user các PLC

app.get("/user",function(req,res){
		res.render("user");
		});
app.get("/menu",function(req,res){
		res.render("menu");
		});

app.post("/user",function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	DB_USER.findOne({username: username, password: password}).then(function(user){
	
		if(user){
			console.log('user: ' + user)
			if(user.role == "admin"){
				res.cookie('userId', user.id);
				res.redirect("/admin")
				
			}
			if(user.role == "admin1"){
				res.cookie('userId', user.id);
				res.redirect("/admin1")	
		
			}
			if(user.role == "admin2"){
				res.cookie('userId', user.id);
				res.redirect("/admin2")	
		
			}
			if(user.role == "admin11"){
				res.cookie('userId', user.id);
				res.redirect("/home02")	
		
			}
			if(user.role == "camduong"){
				res.cookie('userId', user.id);
				res.redirect("/1ahome_GSNL_CD_01")	
		
			}
			if(user.role == "tangloong"){
				res.cookie('userId', user.id);
				res.redirect("/1ahome_GSNL_TL_01")	
		
			}
			res.cookie('userId', user.id);
			res.redirect("/home01");
			user: user
		}		
		res.render("user",{
			
		});
	});
});

app.get("/user/logout",function(req,res){
	res.clearCookie("userId");
	res.redirect("/user");
});


app.get("/admin",async function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user || user.role != "admin") {
			res.redirect('/user');
			return;
		};
		
		DB_USER.find({}, function (err, users) {
			res.render("admin",{
				user: user,
				users: users
			});
		});
	});
		
});

app.get("/admin1",async function(req,res){
	console.log(req.cookies.userId)
	console.log('=======================')
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	
	DB_USER.findById(req.cookies.userId).then(function(user){
		console.log(user)
		if (!user || user.role != "admin1") {
			res.redirect('/user');
			return;
		};		
		DB_USER.findById(req.cookies.userId).then(function(user){
		DB_USER1.find({}, function (err, users) {
			console.log('users= ', users)
			res.render("admin1",{
				user: user,
				users1: users,
				users: users
			});
		});		
		});
	});

	});


app.get("/admin2",async function(req,res){
	console.log(req.cookies.userId)
	console.log('=======================')
	if (!req.cookies.userId) {
		res.redirect('/user');
		return;
	}
	
	DB_USER.findById(req.cookies.userId).then(function(user){
		console.log(user)
		if (!user || user.role != "admin2") {
			res.redirect('/user');
			return;
		};		
		DB_USER.findById(req.cookies.userId).then(function(user){
		DB_DATACD20.find({}, function (err, users) {
			console.log('users= ', users)
			res.render("admin2",{
				user: user,
				dataCD20: users,
				users: users
			});
		});		
		});
	});

	});



app.get("/admin3Congviec",async function(req,res){
		console.log(req.cookies.userId)
		console.log('=======================')
		if (!req.cookies.userId) {
			res.redirect('/user');
			return;
		}
		
		DB_USER.findById(req.cookies.userId).then(function(user){
			console.log(user)
			if (!user || user.role != "admin3Congviec") {
				res.redirect('/user');
				return;
			};		
			DB_USER.findById(req.cookies.userId).then(function(user){
				DB_CONGVIEC1.find({}, function (err, users) {
				console.log('users= ', users)
				res.render("admin3Congviec",{
					user: user,
					congviecs1: users,
					users: users
				});
			});		
			});
		});
	
		});	
//app.get("/admin",function(req,res){
	//DB_USER.find({}, function (err, users) {
	//res.render("admin",{
		//users: users
		//});
	//);
//});
		

app.post("/admin",function(req,res){
	console.log(req.body);
	DB_USER.insertMany(req.body, function(err) {
		if (err) return handleError(err);
	});
	res.redirect('/admin');
		console.log(req.body);
	DB_USER1.insertMany(req.body, function(err) {
		if (err) return handleError(err);
	});
	res.redirect('/admin');
});

app.post("/admin1",function(req,res){
	console.log(req.body);
	DB_USER1.insertMany(req.body, function(err) {
		if (err) return handleError(err);
	});
	res.redirect('/admin1');
});

app.post("/admin2",function(req,res){
	console.log(req.body);
	DB_DATACD20.insertMany(req.body, function(err) {
		if (err) return handleError(err);
	});
	res.redirect('/admin2');
});

app.post("/admin3Congviec",function(req,res){
	console.log(req.body);
	DB_CONGVIEC1.insertMany(req.body, function(err) {
		if (err) return handleError(err);
	});
	res.redirect('/admin3Congviec');
});

app.get("/admin/delete/:id",function(req,res){
	var id = req.params.id;
	DB_USER.findByIdAndDelete(id, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    res.redirect('/admin');
	});	
});

app.get("/admin1/delete/:id",function(req,res){
	var id = req.params.id;
	DB_USER1.findByIdAndDelete(id, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    res.redirect('/admin1');
	});	
});

app.get("/admin2/delete/:id",function(req,res){
	var id = req.params.id;
	DB_DATACD20.findByIdAndDelete(id, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    res.redirect('/admin2');
	});	
});

app.get("/admin3Congviec/delete/:id",function(req,res){
	var id = req.params.id;
	DB_CONGVIEC1.findByIdAndDelete(id, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    res.redirect('/admin3Congviec');
	});	
});





//-------------------------------------------------------------------
app.get('/favicon.ico', (req, res) => res.status(204));

//-------------------------------------------------------------------
//Socket IO
server.listen(3023, function(){
	console.log('Socket io listening on *:3023');

});

//=========================================================
var mqtt = require('mqtt')
var client  = mqtt.connect('http://27.71.231.45:1883')
 
