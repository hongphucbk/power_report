var express = require("express");
const excel = require('node-excel-export');
var moment = require('moment');
var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");

var server = require("http").Server(app);
var io = require('socket.io')(server);
app.listen(3200);

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
var dataSchema = new mongoose.Schema({
	timestamp: Date,
	Xut: Number,
	TTLong: Number,
	MD1: Number,
	MD2: Number,
	MD3: Number,
	XutCurrentDay: Number,
	TTLongCurrentDay: Number,
	MD1CurrentDay: Number,
	MD2CurrentDay: Number,
	MD3CurrentDay: Number,
	note: String,
});
var DB_DATA = mongoose.model('DB_DATA', dataSchema, 'data');

//var data2Schema = new mongoose.Schema({
//	timestamp: Date,
//	station2: Number,
//	nhietdo2: Number,
//	pH2: Number,
//	oxy2: Number,
//	doman2: Number,
//	note2: String,	
//});
//var DB_DATA2 = mongoose.model('DB_DATA2', data2Schema, 'data2');


var dataCD01Schema = new mongoose.Schema({
	CD01_timestamp: Date,
	CD01_station: Number,
	CD01_nongdobun: Number,
	CD01_khoiluongdo: Number,
	CD01_tytrongquang: Number,
	note: String,
});
var DB_DATACD01 = mongoose.model('DB_DATACD01', dataCD01Schema, 'dataCD01');

var dataBNSa01Schema = new mongoose.Schema({
	BNSa01_timestamp: Date,
	BNSa01_station: Number,
	BNSa01_nongdobun: Number,
	BNSa01_khoiluongdo: Number,
	BNSa01_tytrongquang: Number,
	note: String,
});
var DB_DATABNSa01 = mongoose.model('DB_DATABNSa01', dataBNSa01Schema, 'dataBNSa01');



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

var dataCD20Schema = new mongoose.Schema({
	dataCD20_21: String,
	dataCD20_22: String,
	role2: String,
	information2: String,
	note2: String,
});
var DB_DATACD20 = mongoose.model('DB_DATACD20', dataCD20Schema, 'dataCD20');




const cookieParser = require('cookie-parser')
app.use(cookieParser()) // use to read format cookie

// Cau hinh EJS
app.get("/home01",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/home01');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("home01",{
			user: user
		});
	});
});

app.get("/home1011",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/home1011');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("home1011",{
			user: user
		});
	});
});


app.get("/home1012",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/home1012');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("home1012",{
			user: user
		});
	});
});


// PLC 03:

app.get("/home2011",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/home2011');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("home2011",{
			user: user
		});
	});
});


app.get("/home2012",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/home2012');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("home2012",{
			user: user
		});
	});
});


app.get("/home2013",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/home2013');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("home2013",{
			user: user
		});
	});
});

app.get("/home2014",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/home2014');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("home2014",{
			user: user
		});
	});
});

// PLC 04 Đoc dong ho dien nuoc:

app.get("/home3011",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/home3011');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("home3011",{
			user: user
		});
	});
});





app.get("/home02",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/home02');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		if(user.role == "admin11"){
		res.render("home02",{
			user: user
		});
		
			}

	});
});

app.get("/home02a",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/home02a');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("home02a",{
			user: user
		});
	});
});

app.get("/home4",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/home4');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("home4",{
			user: user
		});
	});
});

app.get("/home12",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/home12');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("home12",{
			user: user
		});
	});
});

app.get("/home131",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/home131');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("home131",{
			user: user
		});
	});
});


app.get("/home132",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/home132');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("home132",{
			user: user
		});
	});
});


app.get("/home133",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/home133');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("home133",{
			user: user
		});
	});
});

app.get("/home134",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/home134');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("home134",{
			user: user
		});
	});
});

app.get("/home135",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/home135');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("home135",{
			user: user
		});
	});
});

app.get("/home14",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/home14');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("home14",{
			user: user
		});
	});
});

//app.get("/admin1",function(req,res){
//	if (!req.cookies.userId) {
//		res.redirect('/admin1');
//		return;
//	}
//	DB_USER.findById(req.cookies.userId).then(function(user){
//		if (!user) {
//			res.redirect('/user');
//			return;
//		};
//		
//		res.render("admin1",{
//			user: user
//		});
//	});
//});

app.get("/home31", async function(req,res){
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
	let data = await DB_DATA.find().sort({timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("home31", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});

app.get("/home3", async function(req,res){
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
	let data = await DB_DATA.find().sort({timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("home3", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});

app.get("/home321", async function(req,res){
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
	let data = await DB_DATA.find().sort({timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("home321", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});

app.get("/home322", async function(req,res){
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
	let data = await DB_DATA.find().sort({timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("home322", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});


app.get("/home323", async function(req,res){
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
	let data = await DB_DATA.find().sort({timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("home323", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});


app.get("/home324", async function(req,res){
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
	let data = await DB_DATA.find().sort({timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("home324", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});


app.get("/home325", async function(req,res){
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
	let data = await DB_DATA.find().sort({timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("home325", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});


app.get("/home326", async function(req,res){
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
	let data = await DB_DATA.find().sort({timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("home326", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});

app.get("/home321thang", async function(req,res){
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
	let data = await DB_DATA.find().sort({timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("home321thang", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});


app.get("/home6/:year/:month", async function(req, res){
	currentDay = new Date();
	
	let year = req.params.year || moment().year();
	let month = parseInt(req.params.month) || moment().month() + 1;
	
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
		
        histories = await DB_DATA.find({timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b
		let count = 0, sum = 0, avg = 0;
		let tempData = 
			
		await histories.forEach(function(data){
			
			a = a + " " +  data.Xut
			b = data.timestamp;
			
			count++;
			sum += data.Xut
			avg = count == 0 ? 0 : Math.round( sum*100/count)/100;
			
			
			
		});
		let temp_data = 
		{
		  timestamp: moment(tmp_date).format('DD-MM-YY'),
		  value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }

	
//	for (let i = 0; i < 24; i++) {
//		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
//		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
//		
//		histories = await DB_DATA.find({timestamp: { $gte: start_date , $lte: end_date}});
//		let a = ""; let b
//		let count = 0, sum = 0, avg = 0;
//		let tempData = 
//		await histories.forEach(function(data){
//			a = a + " " +  data.nhietdo
//			b = data.timestamp;
//			
//			count++;
//			sum += data.nhietdo
//			avg = count == 0 ? 0 : Math.round( sum*100/count)/100;
//		});
//		
//		
// 		
// 		//await console.log("-------------------------------------")
// 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
// 		//await console.log(b + " " + a)
//	}
//	
	console.log(data1)
	res.json(data1);
})
	
app.get("/menu1", async function(req,res){
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
	let data = await DB_DATA.find().sort({timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_DATA.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("menu1", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});
		






app.post("/apiGetDataChart1", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_DATA.find({timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b
		let count = 0, sum = 0, avg = 0;
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.Xut
			b = data.timestamp;
			
			count++;
			sum += data.Xut
			avg = count == 0 ? 0 : Math.round( sum*100/count)/100;
		});
		
		let temp_data = 
		{
		  timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})


app.post("/apiGetDataChart2", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_DATA.find({timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b
		let count = 0, sum = 0, avg = 0;
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.TTLong
			b = data.timestamp;
			
			count++;
			sum += data.TTLong
			avg = count == 0 ? 0 : Math.round( sum*100/count)/100;
		});
		
		let temp_data = 
		{
		  timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})


app.post("/apiGetDataChart3", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_DATA.find({timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b
		let count = 0, sum = 0, avg = 0;
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.MD1
			b = data.timestamp;
			
			count++;
			sum += data.MD1
			avg = count == 0 ? 0 : Math.round( sum*100/count)/100;
		});
		
		let temp_data = 
		{
		  timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})


app.post("/apiGetDataChart4", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_DATA.find({timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b
		let count = 0, sum = 0, avg = 0;
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.MD2
			b = data.timestamp;
			
			count++;
			sum += data.MD2
			avg = count == 0 ? 0 : Math.round( sum*100/count)/100;
		});
		
		let temp_data = 
		{
		  timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})



app.post("/apiGetDataChart5", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_DATA.find({timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b
		let count = 0, sum = 0, avg = 0;
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.MD3
			b = data.timestamp;
			
			count++;
			sum += data.MD3
			avg = count == 0 ? 0 : Math.round( sum*100/count)/100;
		});
		
		let temp_data = 
		{
		  timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})



app.post("/apiGetDataChart6", async function(req, res){
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];

	for (let i = 0; i < 31; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_DATA.find({timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b
		let count = 0, sum = 0, avg = 0;
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.MD3
			b = data.timestamp;
			
			count++;
			sum += data.MD3
			avg = count == 0 ? 0 : Math.round( sum*100/count)/100;
		});
		
		let temp_data = 
		{
		  timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})


app.post("/apiGetMonthDataChart", async function(req, res){
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
		
        histories = await DB_DATA.find({timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b
		let count = 0, sum = 0, avg = 0;
		let tempData = 
			
		await histories.forEach(function(data){
			
			a = a + " " +  data.XutCurrentDay
			b = data.timestamp;
			
			count++;
			sum += data.XutCurrentDay
			avg = count == 0 ? 0 : Math.round( sum*100/count)/100;
			
		});
		let temp_data = 
		{
		  timestamp: moment(tmp_date).format('DD-MM-YY'),
		  value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})



//export excel
app.post("/home31", async function(req,res){	
	let date_from = new Date(req.body.date_from);
  	let date_to = new Date(req.body.date_to);
	console.log("date_from = " + date_from + " date_to = " + date_to)
	
	//Giới hạn số dữ liệu ở ô Limit
	let histories = await DB_DATA.find({ timestamp: { $gte: date_from, $lte: date_to }}).limit(13000);
	let data = []
	let temp1;
	let temp2;

	histories.forEach(function(history) {
		temp2 = "";
		// if (water.data > 80) {
		// 	temp2 = "Hight"
		// }
		// if (water.data < 20) {
		// 	temp2 = "Low"
		// }

		temp1 = {time: history.timestamp +7, Xut: history.Xut, TTLong: history.TTLong, MD1: history.MD1, MD2: history.MD2, MD3: history.MD3, XutCurrentDay: history.XutCurrentDay, TTLongCurrentDay: history.TTLongCurrentDay, MD1CurrentDay: history.MD1CurrentDay, MD2CurrentDay: history.MD2CurrentDay, MD3CurrentDay: history.MD3CurrentDay,}  // moment().format('MMMM Do YYYY, h:mm:ss a');
		data.push(temp1)
	})
	
	//Excel
		// You can define styles as json object
		const styles = {
		  headerDark: {
			fill: {
			  fgColor: {
				rgb: 'FF000000'
			  }
			},
			font: {
			  color: {
				rgb: 'FFFFFFFF'
			  },
			  sz: 12,
			  bold: true,
			  underline: false
			}
		  },
		  headerBlue: {
			fill: {
			  fgColor: {
				rgb: '00c8fa'
			  }
			},
			font: {
			  color: {
				rgb: 'FFFFFFFF'
			  },
			  sz: 14,
			  bold: true,
			  underline: false
			}
		  },
		  cellPink: {
			fill: {
			  fgColor: {
				rgb: 'FFFFCCFF'
			  }
			}
		  },
		  cellGreen: {
			fill: {
			  fgColor: {
				rgb: 'FF00FF00'
			  }
			}
		  },
		  cellRed: {
			fill: {
			  fgColor: {
				rgb: 'f5938c'
			  }
			}
		  },
		  cellYellow: {
			fill: {
			  fgColor: {
				rgb: 'eff59d'
			  }
			}
		  },
		  cellWhite: {
			fill: {
			  fgColor: {
				rgb: 'ffffff'
			  }
			}
		  }
		};

		//Array of objects representing heading rows (very top)
		const heading = [
		  [ {value: 'IOT - REPORT: BÁO CÁO HỆ THỐNG ĐỊNH LƯỢNG THUỐC TUYỂN', style: styles.headerBlue}, 
			// {value: 'b1', style: styles.headerDark}, 
			// {value: 'c1', style: styles.headerDark} ],
			]
		  //['a2', 'b2', 'c2'] // <-- It can be only values
			
		];

		//Here you specify the export structure
		const specification = {
		  time: { // <- the key should match the actual data key
			displayName: 'Time', // <- Here you specify the column header
			headerStyle: styles.headerDark, // <- Header style
			cellStyle: {numFmt: "dd/MM/yyyy hh:mm:ss", alignment: {horizontal: "left"}}, //<- Canh lề, format 
			width: 152 // <- width in pixels
			},
		  Xut: {
			displayName: 'Xút(Lít/Giờ)',
			headerStyle: styles.headerDark,
			cellStyle: {alignment: {horizontal: "center"}},
			// cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
			//   return (value == 1) ? 'Active' : 'Inactive';
			// },
			width: 50 // <- width in chars (when the number is passed as string)
		  },
		  TTLong: {
			displayName: 'TT Lỏng(Lít/Giờ)',
			headerStyle: styles.headerDark,
			//cellStyle: styles.cellPink, // <- Cell style
			// cellStyle: function(value, row) { // <- style renderer function
			//   // if the status is 1 then color in green else color in red
			//   // Notice how we use another cell value to style the current one
			//   return (row.value <= 80 & row.value >= 20) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible 
			// },
			width: 50 // <- width in pixels
			
		  },
		   MD1: {
		     displayName: 'MD 1(Lít/Giờ)',
		     headerStyle: styles.headerDark,
		     //cellStyle: styles.cellPink, // <- Cell style
//		     cellStyle: function(value, row) { // <- style renderer function
//		       // if the status is 1 then color in green else color in red
//		       // Notice how we use another cell value to style the current one
//		       if (row.value > 80) {
//		       	return styles.cellRed
//		       }
//		       if (row.value < 20) {
//		       	return styles.cellYellow
//		       }
//		       return styles.cellWhite
//
//		     },
		     width: 50 // <- width in pixels
			},
			
			MD2: {
		     displayName: 'MD 2(Lít/Giờ)',
		     headerStyle: styles.headerDark,
		     //cellStyle: styles.cellPink, // <- Cell style
//		     cellStyle: function(value, row) { // <- style renderer function
//		       // if the status is 1 then color in green else color in red
//		       // Notice how we use another cell value to style the current one
//		       if (row.value > 80) {
//		       	return styles.cellRed
//		       }
//		       if (row.value < 20) {
//		       	return styles.cellYellow
//		       }
//		       return styles.cellWhite
//
//		     },
		     width: 50 // <- width in pixels
			},
			 MD3: {
		     displayName: 'MD 3(Lít/Giờ)',
		     headerStyle: styles.headerDark,
		     //cellStyle: styles.cellPink, // <- Cell style
//		     cellStyle: function(value, row) { // <- style renderer function
//		       // if the status is 1 then color in green else color in red
//		       // Notice how we use another cell value to style the current one
//		       if (row.value > 80) {
//		       	return styles.cellRed
//		       }
//		       if (row.value < 20) {
//		       	return styles.cellYellow
//		       }
//		       return styles.cellWhite
//
//		     },
		     width: 50 // <- width in pixels
			},

			
			 XutCurrentDay: {
		     displayName: 'Tổng Xút(Lít)',
		     headerStyle: styles.headerDark,
		     //cellStyle: styles.cellPink, // <- Cell style
//		     cellStyle: function(value, row) { // <- style renderer function
//		       // if the status is 1 then color in green else color in red
//		       // Notice how we use another cell value to style the current one
//		       if (row.value > 80) {
//		       	return styles.cellRed
//		       }
//		       if (row.value < 20) {
//		       	return styles.cellYellow
//		       }
//		       return styles.cellWhite
//
//		     },
		     width: 80 // <- width in pixels
			},

			 TTLongCurrentDay: {
		     displayName: 'Tổng TTLong(Lít)',
		     headerStyle: styles.headerDark,
		     //cellStyle: styles.cellPink, // <- Cell style
//		     cellStyle: function(value, row) { // <- style renderer function
//		       // if the status is 1 then color in green else color in red
//		       // Notice how we use another cell value to style the current one
//		       if (row.value > 80) {
//		       	return styles.cellRed
//		       }
//		       if (row.value < 20) {
//		       	return styles.cellYellow
//		       }
//		       return styles.cellWhite
//
//		     },
		     width: 80 // <- width in pixels
			},		
			 MD1CurrentDay: {
		     displayName: 'Tổng MD1(Lít)',
		     headerStyle: styles.headerDark,
		     //cellStyle: styles.cellPink, // <- Cell style
//		     cellStyle: function(value, row) { // <- style renderer function
//		       // if the status is 1 then color in green else color in red
//		       // Notice how we use another cell value to style the current one
//		       if (row.value > 80) {
//		       	return styles.cellRed
//		       }
//		       if (row.value < 20) {
//		       	return styles.cellYellow
//		       }
//		       return styles.cellWhite
//
//		     },
		     width: 80 // <- width in pixels
			},
			 MD2CurrentDay: {
		     displayName: 'Tổng MD2(Lít)',
		     headerStyle: styles.headerDark,
		     //cellStyle: styles.cellPink, // <- Cell style
//		     cellStyle: function(value, row) { // <- style renderer function
//		       // if the status is 1 then color in green else color in red
//		       // Notice how we use another cell value to style the current one
//		       if (row.value > 80) {
//		       	return styles.cellRed
//		       }
//		       if (row.value < 20) {
//		       	return styles.cellYellow
//		       }
//		       return styles.cellWhite
//
//		     },
		     width: 80 // <- width in pixels
			},	
			
			
			 MD3CurrentDay: {
		     displayName: 'Tổng MD3(Lít)',
		     headerStyle: styles.headerDark,
		     //cellStyle: styles.cellPink, // <- Cell style
//		     cellStyle: function(value, row) { // <- style renderer function
//		       // if the status is 1 then color in green else color in red
//		       // Notice how we use another cell value to style the current one
//		       if (row.value > 80) {
//		       	return styles.cellRed
//		       }
//		       if (row.value < 20) {
//		       	return styles.cellYellow
//		       }
//		       return styles.cellWhite
//
//		     },
		     width: 80 // <- width in pixels
			},
			
		  // time: {
		  //   displayName: 'THỜI GIAN',
		  //   headerStyle: styles.headerDark,
		  //   //cellStyle: styles.cellPink, // <- Cell style
		  //   width: 200 // <- width in pixels
		  // }
		}

		// The data set should have the following shape (Array of Objects)
		// The order of the keys is irrelevant, it is also irrelevant if the
		// dataset contains more fields as the report is build based on the
		// specification provided above. But you should have all the fields
		// that are listed in the report specification
		// const dataset = [
		//   {station: '1', status_id: 1, note: 'some note', misc: 'not shown'},
		//   {station: '1', status_id: 0, note: 'some note'},
		//   {station: '1', status_id: 0, note: 'some note', misc: 'not shown'}
		// ]

		const dataset = data;

		// Define an array of merges. 1-1 = A:1
		// The merges are independent of the data.
		// A merge will overwrite all data _not_ in the top-left cell.
		const merges = [
		  { start: { row: 1, column: 1 }, end: { row: 1, column: 11 } },
		  // { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
		  // { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
		]

		// Create the excel report.
		// This function will return Buffer
		const report = excel.buildExport(
		  [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
			{
			  name: 'IOT Report Bao cao he thong dinh luong thuoc tuyen ', // <- Specify sheet name (optional)
			  heading: heading, // <- Raw heading array (optional)
			  merges: merges, // <- Merge cell ranges
			  specification: specification, // <- Report specification
			  data: dataset // <-- Report data
			}
		  ]
		);

		// You can then return this straight
		res.attachment('IOTReport Bao cao he thong dinh luong thuoc tuyen.xlsx'); // This is sails.js specific (in general you need to set headers)
		return res.send(report);
		console.log(data);
		//res.render("data");
});

// PLC Bắc Nhạc Sơn Đo nồng độ bùn

app.get("/homeBNSa01",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/homeBNSa01');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("homeBNSa01",{
			user: user
		});
	});
});


app.get("/homeBNSa02",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/homeBNSa02');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("homeBNSa02",{
			user: user
		});
	});
});

app.get("/homebNS01BaocaoExcell", async function(req,res){
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
	let data = await DB_DATABNSa01.find().sort({timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_DATABNSa01.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("homebNS01BaocaoExcell", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});

//export excel
app.post("/homebNS01BaocaoExcell", async function(req,res){	
	let date_from = new Date(req.body.date_from);
  	let date_to = new Date(req.body.date_to);
	console.log("date_from = " + date_from + " date_to = " + date_to)
	
	//Giới hạn số dữ liệu ở ô Limit
	let histories = await DB_DATABNSa01.find({ BNSa01_timestamp: { $gte: date_from, $lte: date_to }}).limit(13000);
	let data = []
	let temp1;
	let temp2;

	histories.forEach(function(history) {
		temp2 = "";
		// if (water.data > 80) {
		// 	temp2 = "Hight"
		// }
		// if (water.data < 20) {
		// 	temp2 = "Low"
		// }

		temp1 = {time: history.BNSa01_timestamp +7, Nongdobun: history.BNSa01_nongdobun, Khoiluongdo: history.BNSa01_khoiluongdo, Tytrongquang: history.BNSa01_tytrongquang,}  // moment().format('MMMM Do YYYY, h:mm:ss a');
		data.push(temp1)
	})
	
	//Excel
		// You can define styles as json object
		const styles = {
		  headerDark: {
			fill: {
			  fgColor: {
				rgb: 'FF000000'
			  }
			},
			font: {
			  color: {
				rgb: 'FFFFFFFF'
			  },
			  sz: 12,
			  bold: true,
			  underline: false
			}
		  },
		  headerBlue: {
			fill: {
			  fgColor: {
				rgb: '00c8fa'
			  }
			},
			font: {
			  color: {
				rgb: 'FFFFFFFF'
			  },
			  sz: 14,
			  bold: true,
			  underline: false
			}
		  },
		  cellPink: {
			fill: {
			  fgColor: {
				rgb: 'FFFFCCFF'
			  }
			}
		  },
		  cellGreen: {
			fill: {
			  fgColor: {
				rgb: 'FF00FF00'
			  }
			}
		  },
		  cellRed: {
			fill: {
			  fgColor: {
				rgb: 'f5938c'
			  }
			}
		  },
		  cellYellow: {
			fill: {
			  fgColor: {
				rgb: 'eff59d'
			  }
			}
		  },
		  cellWhite: {
			fill: {
			  fgColor: {
				rgb: 'ffffff'
			  }
			}
		  }
		};

		//Array of objects representing heading rows (very top)
		const heading = [
		  [ {value: 'IOT - REPORT: BÁO CÁO HỆ THỐNG ĐO NỒNG ĐỘ BÙN Bắc Nhạc Sơn', style: styles.headerBlue}, 
			// {value: 'b1', style: styles.headerDark}, 
			// {value: 'c1', style: styles.headerDark} ],
			]
		  //['a2', 'b2', 'c2'] // <-- It can be only values
			
		];

		//Here you specify the export structure
		const specification = {
		  time: { // <- the key should match the actual data key
			displayName: 'Time', // <- Here you specify the column header
			headerStyle: styles.headerDark, // <- Header style
			cellStyle: {numFmt: "dd/MM/yyyy hh:mm:ss", alignment: {horizontal: "center"}}, //<- Canh lề, format 
			width: 352 // <- width in pixels
			},
		  Nongdobun: {
			displayName: 'Nồng độ bùn %',
			headerStyle: styles.headerDark,
			cellStyle: {alignment: {horizontal: "center"}},
			// cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
			//   return (value == 1) ? 'Active' : 'Inactive';
			// },
			width: 150 // <- width in chars (when the number is passed as string)
		  },
		  Khoiluongdo: {
			displayName: 'Khối lượng đo mg',
			headerStyle: styles.headerDark,
			cellStyle: {alignment: {horizontal: "center"}},
			//cellStyle: styles.cellPink, // <- Cell style
			// cellStyle: function(value, row) { // <- style renderer function
			//   // if the status is 1 then color in green else color in red
			//   // Notice how we use another cell value to style the current one
			//   return (row.value <= 80 & row.value >= 20) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible 
			// },
			width: 150 // <- width in pixels
			
		  },
		   Tytrongquang: {
		     displayName: 'Tỷ trọng quặng',
		     headerStyle: styles.headerDark,
			 cellStyle: {alignment: {horizontal: "center"}},
		     //cellStyle: styles.cellPink, // <- Cell style
//		     cellStyle: function(value, row) { // <- style renderer function
//		       // if the status is 1 then color in green else color in red
//		       // Notice how we use another cell value to style the current one
//		       if (row.value > 80) {
//		       	return styles.cellRed
//		       }
//		       if (row.value < 20) {
//		       	return styles.cellYellow
//		       }
//		       return styles.cellWhite
//
//		     },
		     width: 150 // <- width in pixels
			},

		  // time: {
		  //   displayName: 'THỜI GIAN',
		  //   headerStyle: styles.headerDark,
		  //   //cellStyle: styles.cellPink, // <- Cell style
		  //   width: 200 // <- width in pixels
		  // }
		}

		// The data set should have the following shape (Array of Objects)
		// The order of the keys is irrelevant, it is also irrelevant if the
		// dataset contains more fields as the report is build based on the
		// specification provided above. But you should have all the fields
		// that are listed in the report specification
		// const dataset = [
		//   {station: '1', status_id: 1, note: 'some note', misc: 'not shown'},
		//   {station: '1', status_id: 0, note: 'some note'},
		//   {station: '1', status_id: 0, note: 'some note', misc: 'not shown'}
		// ]

		const dataset = data;

		// Define an array of merges. 1-1 = A:1
		// The merges are independent of the data.
		// A merge will overwrite all data _not_ in the top-left cell.
		const merges = [
		  { start: { row: 1, column: 1 }, end: { row: 1, column: 11 } },
		  // { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
		  // { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
		]

		// Create the excel report.
		// This function will return Buffer
		const report = excel.buildExport(
		  [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
			{
			  name: 'IOT Report Bao cao he thong do nong do bun Bac Nhac Son', // <- Specify sheet name (optional)
			  heading: heading, // <- Raw heading array (optional)
			  merges: merges, // <- Merge cell ranges
			  specification: specification, // <- Report specification
			  data: dataset // <-- Report data
			}
		  ]
		);

		// You can then return this straight
		res.attachment('IOTReport Bao cao he thong do nong do bun Bac Nhac Son.xlsx'); // This is sails.js specific (in general you need to set headers)
		return res.send(report);
		console.log(data);
		//res.render("data");
});
// PLC Cam đường Đo nồng độ bùn

app.get("/homeCD01",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/homeCD01');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("homeCD01",{
			user: user
		});
	});
});

app.get("/homeCD01Dashboard",async function(req,res){
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
	let data = await DB_DATACD01.find().sort({timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_DATACD01.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("homeCD01Dashboard", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});
	
	
});

app.get("/homeCD01Baocaongay",async function(req,res){
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
	let data = await DB_DATACD01.find().sort({timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_DATACD01.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("homeCD01Baocaongay", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});
	
});

app.get("/homeCD01Baocaothang", async function(req,res){
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
	let data = await DB_DATACD01.find().sort({timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_DATACD01.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("homeCD01Baocaothang", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});

app.get("/homeCD02",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/homeCD02');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("homeCD02",{
			user: user
		});
	});
});

app.get("/homeCD02a",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/homeCD02a');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("homeCD02a",{
			user: user
		});
	});
});



app.get("/homeCD03Setup",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/homeCD03Setup');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("homeCD03Setup",{
			user: user
		});
	});
});

app.get("/homeCD04Chart",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/homeCD04Chart');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("homeCD04Chart",{
			user: user
		});
	});
});

app.get("/homeCD04Chart",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/homeCD04Chart');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("homeCD05Chart",{
			user: user
		});
	});
});


app.get("/homeCD04Chart02",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/homeCD04Chart02');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("homeCD04Chart02",{
			user: user
		});
	});
});


app.get("/homeCD04Chart03",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/homeCD04Chart03');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("homeCD04Chart03",{
			user: user
		});
	});
});


app.get("/homeCD04Chart04",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/homeCD04Chart04');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("homeCD04Chart04",{
			user: user
		});
	});
});

app.get("/homeCD04Chart05",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/homeCD04Chart05');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("homeCD04Chart05",{
			user: user
		});
	});
});


app.get("/homeCD04Chart06",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/homeCD04Chart06');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("homeCD04Chart06",{
			user: user
		});
	});
});

app.get("/homeCD04Bando",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/homeCD04Bando');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("homeCD04Bando",{
			user: user
		});
	});
});


app.get("/homeCD04AdminLte301",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/homeCD04AdminLte301');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("homeCD04AdminLte301",{
			user: user
		});
	});
});

app.get("/homeCD01AdminAlte2",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/homeCD01AdminAlte2');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("homeCD01AdminAlte2",{
			user: user
		});
	});
});

app.post("/apiGetDataChartCD01", async function(req, res){
	
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_DATACD01.find({CD01_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b
		let count = 0, sum = 0, avg = 0;
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.CD01_nongdobun
			b = data.CD01_timestamp;
			
			count++;
			sum += data.CD01_nongdobun
			avg = count == 0 ? 0 : Math.round( sum*100/count)/100;
		});
		
		let temp_data = 
		{
		  CD01_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})

app.post("/apiGetDataChartCD01Baocaongay", async function(req, res){
	
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  	let strYear = dtStartDate.getFullYear();
  	let strMonth = dtStartDate.getMonth()+1;
  	let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await DB_DATACD01.find({CD01_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b
		let count = 0, sum = 0, avg = 0;
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.CD01_nongdobun
			b = data.CD01_timestamp;
			
			count++;
			sum += data.CD01_nongdobun
			avg = count == 0 ? 0 : Math.round( sum*100/count)/100;
		});
		
		let temp_data = 
		{
		  CD01_timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
		
	}	
	res.json(data);
})
//----------------------------------------------------------

app.post("/apiGetDataChartCD01Baocaothang", async function(req, res){
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
		
        histories = await DB_DATACD01.find({CD01_timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b
		let count = 0, sum = 0, avg = 0;
		let tempData = 
			
		await histories.forEach(function(data){
			
			a = a + " " +  data.CD01_nongdobun
			b = data.CD01_timestamp;
			
			count++;
			sum += data.CD01_nongdobun
			avg = count == 0 ? 0 : Math.round( sum*100/count)/100;
			
		});
		let temp_data = 
		{
		  CD01_timestamp: moment(tmp_date).format('DD-MM-YY'),
		  value: avg
		}

		data1.push(temp_data)
		
		tmp_date = moment(start_date).add(1, 'days')
    }
	console.log(data1)
	res.json(data1);
})

//------------------------------------------------------
app.get("/homeCD01BaocaoExcell", async function(req,res){
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
	let data = await DB_DATACD01.find().sort({CD01_timestamp: -1}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await DB_DATACD01.countDocuments({});
	let pages = Math.ceil(recordsTotal / perPage);
	res.render("homeCD01BaocaoExcell", {
		data : data,
		moment: moment,
		perPage: perPage,
		current : page,
		pages: pages,
		startdate: startdate,
		user: user
	});

});

//export excel
app.post("/homeCD01BaocaoExcell", async function(req,res){	
	let date_from = new Date(req.body.date_from);
  	let date_to = new Date(req.body.date_to);
	console.log("date_from = " + date_from + " date_to = " + date_to)
	
	//Giới hạn số dữ liệu ở ô Limit
	let histories = await DB_DATACD01.find({ CD01_timestamp: { $gte: date_from, $lte: date_to }}).limit(13000);
	let data = []
	let temp1;
	let temp2;

	histories.forEach(function(history) {
		temp2 = "";
		// if (water.data > 80) {
		// 	temp2 = "Hight"
		// }
		// if (water.data < 20) {
		// 	temp2 = "Low"
		// }

		temp1 = {time: history.CD01_timestamp +7, Nongdobun: history.CD01_nongdobun, Khoiluongdo: history.CD01_khoiluongdo, Tytrongquang: history.CD01_tytrongquang,}  // moment().format('MMMM Do YYYY, h:mm:ss a');
		data.push(temp1)
	})
	
	//Excel
		// You can define styles as json object
		const styles = {
		  headerDark: {
			fill: {
			  fgColor: {
				rgb: 'FF000000'
			  }
			},
			font: {
			  color: {
				rgb: 'FFFFFFFF'
			  },
			  sz: 12,
			  bold: true,
			  underline: false
			}
		  },
		  headerBlue: {
			fill: {
			  fgColor: {
				rgb: '00c8fa'
			  }
			},
			font: {
			  color: {
				rgb: 'FFFFFFFF'
			  },
			  sz: 14,
			  bold: true,
			  underline: false
			}
		  },
		  cellPink: {
			fill: {
			  fgColor: {
				rgb: 'FFFFCCFF'
			  }
			}
		  },
		  cellGreen: {
			fill: {
			  fgColor: {
				rgb: 'FF00FF00'
			  }
			}
		  },
		  cellRed: {
			fill: {
			  fgColor: {
				rgb: 'f5938c'
			  }
			}
		  },
		  cellYellow: {
			fill: {
			  fgColor: {
				rgb: 'eff59d'
			  }
			}
		  },
		  cellWhite: {
			fill: {
			  fgColor: {
				rgb: 'ffffff'
			  }
			}
		  }
		};

		//Array of objects representing heading rows (very top)
		const heading = [
		  [ {value: 'IOT - REPORT: BÁO CÁO HỆ THỐNG ĐO NỒNG ĐỘ BÙN', style: styles.headerBlue}, 
			// {value: 'b1', style: styles.headerDark}, 
			// {value: 'c1', style: styles.headerDark} ],
			]
		  //['a2', 'b2', 'c2'] // <-- It can be only values
			
		];

		//Here you specify the export structure
		const specification = {
		  time: { // <- the key should match the actual data key
			displayName: 'Time', // <- Here you specify the column header
			headerStyle: styles.headerDark, // <- Header style
			cellStyle: {numFmt: "dd/MM/yyyy hh:mm:ss", alignment: {horizontal: "left"}}, //<- Canh lề, format 
			width: 152 // <- width in pixels
			},
		  Nongdobun: {
			displayName: 'Nồng độ bùn %',
			headerStyle: styles.headerDark,
			cellStyle: {alignment: {horizontal: "center"}},
			// cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
			//   return (value == 1) ? 'Active' : 'Inactive';
			// },
			width: 50 // <- width in chars (when the number is passed as string)
		  },
		  Khoiluongdo: {
			displayName: 'Khối lượng đo mg',
			headerStyle: styles.headerDark,
			//cellStyle: styles.cellPink, // <- Cell style
			// cellStyle: function(value, row) { // <- style renderer function
			//   // if the status is 1 then color in green else color in red
			//   // Notice how we use another cell value to style the current one
			//   return (row.value <= 80 & row.value >= 20) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible 
			// },
			width: 50 // <- width in pixels
			
		  },
		   Tytrongquang: {
		     displayName: 'Tỷ trọng quặng',
		     headerStyle: styles.headerDark,
		     //cellStyle: styles.cellPink, // <- Cell style
//		     cellStyle: function(value, row) { // <- style renderer function
//		       // if the status is 1 then color in green else color in red
//		       // Notice how we use another cell value to style the current one
//		       if (row.value > 80) {
//		       	return styles.cellRed
//		       }
//		       if (row.value < 20) {
//		       	return styles.cellYellow
//		       }
//		       return styles.cellWhite
//
//		     },
		     width: 50 // <- width in pixels
			},

		  // time: {
		  //   displayName: 'THỜI GIAN',
		  //   headerStyle: styles.headerDark,
		  //   //cellStyle: styles.cellPink, // <- Cell style
		  //   width: 200 // <- width in pixels
		  // }
		}

		// The data set should have the following shape (Array of Objects)
		// The order of the keys is irrelevant, it is also irrelevant if the
		// dataset contains more fields as the report is build based on the
		// specification provided above. But you should have all the fields
		// that are listed in the report specification
		// const dataset = [
		//   {station: '1', status_id: 1, note: 'some note', misc: 'not shown'},
		//   {station: '1', status_id: 0, note: 'some note'},
		//   {station: '1', status_id: 0, note: 'some note', misc: 'not shown'}
		// ]

		const dataset = data;

		// Define an array of merges. 1-1 = A:1
		// The merges are independent of the data.
		// A merge will overwrite all data _not_ in the top-left cell.
		const merges = [
		  { start: { row: 1, column: 1 }, end: { row: 1, column: 11 } },
		  // { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
		  // { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
		]

		// Create the excel report.
		// This function will return Buffer
		const report = excel.buildExport(
		  [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
			{
			  name: 'IOT Report Bao cao he thong do nong do bun ', // <- Specify sheet name (optional)
			  heading: heading, // <- Raw heading array (optional)
			  merges: merges, // <- Merge cell ranges
			  specification: specification, // <- Report specification
			  data: dataset // <-- Report data
			}
		  ]
		);

		// You can then return this straight
		res.attachment('IOTReport Bao cao he thong do nong do bun.xlsx'); // This is sails.js specific (in general you need to set headers)
		return res.send(report);
		console.log(data);
		//res.render("data");
});


// PLC04 Cam đường Máy nghiền bi

app.get("/homeCD0401",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/homeCD0401');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("homeCD0401",{
			user: user
		});
	});
});

app.get("/homeCD0402",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/homeCD0402');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("homeCD0402",{
			user: user
		});
	});
});

///////////////////////////////////////////////
///////////////////////////////////////////////

// PLC Cam đường Điều khiển Van DN200

app.get("/homeCD3201",function(req,res){
	if (!req.cookies.userId) {
		res.redirect('/homeCD3201');
		return;
	}
	DB_USER.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.redirect('/user');
			return;
		};
		
		res.render("homeCD3201",{
			user: user
		});
	});
});


///////////////////////////////////////////////
///////////////////////////////////////////////

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
				res.redirect("/homeCD02")	
		
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
//Socket IO
server.listen(3201, function(){
	console.log('Socket io listening on *:3201');

});

//=========================================================
var mqtt = require('mqtt')
var client  = mqtt.connect('http://27.71.231.45:1883')
 
//=========================================================

// PLC 01 - Định lượng thuốc tuyển bắc nhạc sơn
client.on('connect', function (){
  client.subscribe('IOT/Topic01', function (err) {
    if (!err) {
      client.publish('IOT/Topic01', 'Error Socket IO: IoT/Topic01')
    }
  })

})

io.on('connection', function(socket){
	console.log('a user connected');
	io.emit('data', "Hello user: " + socket.id);
    
	socket.on("data31", function(data2){
	var s1 = data2;
	//socket.emit('s', data2);
	console.log(data2);
	console.log("s1 = " + s1);

	var s = s1;
	client.publish('demo/write1', s);
	console.log(s);
		
	});
	socket.on("data32", function(data2){
	var s2 = data2;
	//socket.emit('s', data2);
	console.log(data2);
	console.log("s2 = " + s2);

	var s = s2;
	client.publish('demo/write1', s);
	console.log(s);
	
	});	
	socket.on("data33", function(data2){
	var s3 = data2;
	//socket.emit('s', data2);
	console.log(data2);
	console.log("s3 = " + s3);

	var s = s3;
	client.publish('demo/write1', s);
	console.log(s);
	
	});	
	
	socket.on("data34", function(data2){
	var s4 = data2;
	//socket.emit('s', data2);
	console.log(data2);
	console.log("s4 = " + s4);

	var s = s4;
	client.publish('demo/write1', s);
	console.log(s);
	
	});	
	
	socket.on("data35", function(data2){
	var s5 = data2;
	//socket.emit('s', data2);
	console.log(data2);
	console.log("s5 = " + s5);

	var s = s5;
	client.publish('demo/write1', s);
	console.log(s);
	
	});	

});
//User name, Password
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

//app.post('/home', urlencodedParser, function (req, res) {
	//var u = red.body.username;
	//var p = red.body.password;
  //res.send("user:" +u+"password:"+p)
//})


//client.on('connect', function (){
	//client.publish('demo/write1', "abc")
//});

//client.on('connect', function () {
 //client.publish('demo/write3', 'on3')
//})

//client.on('connect', function(){
	//setInterval(function(){client.publish('demo/write1','on1');},3000); 
//})
 
//client.on('message', function (topic, message){
	//console.log(message.toString());
	//var data1;
  //if(message.toString() === "on"){
	 // data1 = "Den da sang 11";
 // }else{
	 // data1 = "Den da tat 11";
  //}
 // io.emit('data', data1);
	
//})


var count_to_save_database = 0;
//var count_to_save_database2 = 0;


client.on('message', function (topic, message){
 if(topic === 'IOT/Topic02'){
	//Xử lý topic 02
 	console.log(' Day la topic 2 ----------------')
  	console.log(topic, message.toString())
 	console.log('----------------')
	 
	var data02_0;
	var data02_1;
	var data02_2;
	var data02_3;
	var data02_4;
	var data02_5;
	var data02_6;
	var data02_7;
	var data02_8;
	var data02_9;
	var data02_10;
	var data02_11;
	var data02_12;
	var data02_13;
	var data02_14;
	var data02_15;
	var data02_16;
	var data02_17;
	var data02_18;
	var data02_19;
	var data02_20;
	var data02_21;
	var data02_22;
	var data02_23;
	var data02_24;
	var data02_25;
	var data02_26;
	var data02_27;
	var data02_28;
	var data02_29;
	var data02_30;
	var data02_31;

	
	
	 data02_0 = message.toString()
	 //Xut Ca1, Ca2, Ca3 Yesterday
	 data02_1 = data02_0.slice(0,6)
	 data02_2 = data02_0.slice(6,12)
	 data02_3 = data02_0.slice(12,18)
	 //TTL Ca1, Ca2, Ca3 Yesterday
	 data02_4 = data02_0.slice(18,24)
	 data02_5 = data02_0.slice(24,30)
	 data02_6 = data02_0.slice(30,36)
	 //MD1 Ca1, Ca2, Ca3 Yesterday
	 data02_7 = data02_0.slice(36,42)
	 data02_8 = data02_0.slice(42,48)
	 data02_9 = data02_0.slice(48,54)
	  //MD2 Ca1, Ca2, Ca3 Yesterday
	 data02_10 = data02_0.slice(54,60)
	 data02_11 = data02_0.slice(60,66)
	 data02_12 = data02_0.slice(66,72)
	  //MD3 Ca1, Ca2, Ca3 Yesterday
	 data02_13 = data02_0.slice(72,78)
	 data02_14 = data02_0.slice(78,84)
	 data02_15 = data02_0.slice(84,90)
	 //Xut Ca1, Ca2, Ca3 Today
	 data02_16 = data02_0.slice(90,96)
	 data02_17 = data02_0.slice(96,102)
	 data02_18 = data02_0.slice(102,108)
	 //TTL Ca1, Ca2, Ca3 Today
	 data02_19 = data02_0.slice(108,114)
	 data02_20 = data02_0.slice(114,120)
	 data02_21 = data02_0.slice(120,126)
	 //MD1 Ca1, Ca2, Ca3 Today
	 data02_22 = data02_0.slice(126,132)
	 data02_23 = data02_0.slice(132,138)
	 data02_24 = data02_0.slice(138,144)
	 //MD2 Ca1, Ca2, Ca3 Today
	 data02_25 = data02_0.slice(144,150)
	 data02_26 = data02_0.slice(150,156)
	 data02_27 = data02_0.slice(156,162)
	 //MD3 Ca1, Ca2, Ca3 Today
	 data02_28 = data02_0.slice(162,168)
	 data02_29 = data02_0.slice(168,174)
	 data02_30 = data02_0.slice(174,180)
	 data02_31 = data02_0.slice(180,186)

	console.log(' Day la data30 ----------------')
  	console.log(data02_29)
	console.log(data02_30)
	console.log(data02_31)
 	console.log('----------------')
	

	 io.emit('data02_1', data02_1);
	 io.emit('data02_2', data02_2);
	 io.emit('data02_3', data02_3);
	 io.emit('data02_4', data02_4);
	 io.emit('data02_5', data02_5);
	 io.emit('data02_6', data02_6);
	 io.emit('data02_7', data02_7);
	 io.emit('data02_8', data02_8);
	 io.emit('data02_9', data02_9);
	 io.emit('data02_10', data02_10);
	 io.emit('data02_11', data02_11);
	 io.emit('data02_12', data02_12);
	 io.emit('data02_13', data02_13);
	 io.emit('data02_14', data02_14);
	 io.emit('data02_15', data02_15);
	 io.emit('data02_16', data02_16);
	 io.emit('data02_17', data02_17);
	 io.emit('data02_18', data02_18);
	 io.emit('data02_19', data02_19);
	 io.emit('data02_20', data02_20);
	 io.emit('data02_21', data02_21);
	 io.emit('data02_22', data02_22);
	 io.emit('data02_23', data02_23);
	 io.emit('data02_24', data02_24);
	 io.emit('data02_25', data02_25);
	 io.emit('data02_26', data02_26);
	 io.emit('data02_27', data02_27);
	 io.emit('data02_28', data02_28);
	 io.emit('data02_29', data02_29);
	 io.emit('data02_30', data02_30);
	 io.emit('data02_31', data02_31);
	 
 }
	
if(topic === 'IOT/Topic01'){
//Xử lý topic 01
console.log(' Day la topic 1----------------')
console.log(topic, message.toString())
console.log('----------------')
	
		var data1;
		var data3;
		var data4;
		var data5;
		var data6;
		var data7;
		var data8;
		var data9;
		var data10;
		var data11;
		var data12;
		var data13;
		var data14;
		var data15;
		var data16;
		var data17;
		var data18;
		var data19;
		var data20;
		var data21;
		var data22;
		var Status1;
		var Status2;
		var Status3;
		var Status4;
		var Status5;

		data1 = message.toString()

		data3 = data1.slice(0,4)
		data4 = data1.slice(4,8)
		data5 = data1.slice(8,12)
		data6 = data1.slice(12,16)

		data7 = data1.slice(16,20)
		data8 = data1.slice(20,24)
		data9 = data1.slice(24,28)
		data10 = data1.slice(28,32)


		data11 = data1.slice(32,36)
		data12 = data1.slice(36,40)
		data13 = data1.slice(40,41)
		data14 = data1.slice(41,42)

		data15 = data1.slice(42,43)
		data16 = data1.slice(43,44)
		data17 = data1.slice(44,45)

		data18 = data1.slice(45,51)
		data19 = data1.slice(51,57)
		data20 = data1.slice(57,63)
		data21 = data1.slice(63,69)
		data22 = data1.slice(69,75)
	

		count_to_save_database = count_to_save_database +1;
		const d11 = new Date();
		  let minutes11 = d11.getMinutes();
		  let seconds11 = d11.getSeconds();

		  // 600s luu 1 lan
		  if(minutes11 == 0 & seconds11 < 10){
			var saveData = { 
			timestamp: new Date(),
			Xut: parseFloat(data4),
			TTLong: parseFloat(data6),
			MD1: parseFloat(data8),
			MD2: parseFloat(data10),
			MD3: parseFloat(data12),
			XutCurrentDay: parseFloat(data18),
			TTLongCurrentDay: parseFloat(data19),
			MD1CurrentDay: parseFloat(data20),
			MD2CurrentDay: parseFloat(data21),
			MD3CurrentDay: parseFloat(data22),				
			}
		console.log('saveData: ', saveData);

		DB_DATA.insertMany(saveData, function(err){
		if (err) return "Error";
		});
		count_to_save_database = 0;
		}

		//count_to_save_database2 = count_to_save_database2 +1;
		// 30s luu 1 lan
		//if(count_to_save_database2 > 6000000 ){
			//var saveData = { 
			//timestamp: new Date(),
			//station2: 2,
			//nhietdo2: parseFloat(data8),
			//pH2: parseFloat(data9),
			//oxy2: parseFloat(data10),
			//doman2: parseFloat(data11)
			//}
		//console.log('saveData: ', saveData);

		//DB_DATA2.insertMany(saveData, function(err) {
		//if (err) return "Error";
		//});
		//count_to_save_database2 = 0;
		//}
	
	
	
		if(data13 == 1){
			 Status1 = "Rửa tự động";
		}
		else if(data13 == 2){
			 Status1 = "Rửa chế độ tay";
		}
		else if(data13 == 3){
			 Status1 = "Cấp Hóa Chất";
		}	
		else{
			 Status1 = "Dừng hoạt động";           
		}

		if(data14 == 1){
			 Status2 = "Rửa tự động";
		}
		else if(data14 == 2){
			 Status2 = "Rửa chế độ tay";
		}
		else if(data14 == 3){
			 Status2 = "Cấp Hóa Chất";
		}
		else{
			 Status2 = "Dừng hoạt động";           
		}

	
		if(data15 == 1){
			 Status3 = "Rửa tự động";
		}
		else if(data15 == 2){
			 Status3 = "Rửa chế độ tay";
		}
		else if(data15 == 3){
			 Status3 = "Cấp thuốc tuyển";
		}
		else{
			 Status3 = "Dừng hoạt động";           
		}

		if(data16 == 1){
			 Status4 = "Rửa tự động";
		}
		else if(data16 == 2){
			 Status4 = "Rửa chế độ tay";
		}
		else if(data16 == 3){
			 Status4 = "Cấp thuốc tuyển";
		}
		else{
			 Status4 = "Dừng hoạt động";           
		}

		if(data17 == 1){
			 Status5 = "Rửa tự động";
		}
		else if(data17 == 2){
			 Status5 = "Rửa chế độ tay";
		}
		else if(data17 == 3){
			 Status5 = "Cấp thuốc tuyển";
		}
		else{
			 Status5 = "Chế độ tay";           
		}
	

		io.emit('data3', data3);
		io.emit('data4', data4);
		io.emit('data5', data5);
		io.emit('data6', data6);
		io.emit('data7', data7);
		io.emit('data8', data8);
		io.emit('data9', data9);
		io.emit('data10', data10);
		io.emit('data11', data11);
		io.emit('data12', data12);
		io.emit('data13', data13);
		io.emit('data14', data14);
		io.emit('data15', data15);
		io.emit('data16', data16);
		io.emit('data17', data17);
		io.emit('data18', data18);
		io.emit('data19', data19);
		io.emit('data20', data20);
		io.emit('data21', data21);
		io.emit('data22', data22);


		io.emit('Status1', Status1);
		io.emit('Status2', Status2);
		io.emit('Status3', Status3);
		io.emit('Status4', Status4);
		io.emit('Status5', Status5);
}
 
})


client.on('connect', function (){
  client.subscribe('IOT/Topic02', function (err) {
    if (!err) {
      client.publish('IOT/Topic02', 'Socket IO: IoT/Topic02')
    }
  })	
})


////////////////////////////////////////////

// PLC 02

client.on('connect', function (){
  client.subscribe('IOT/Topic101', function (err) {
    if (!err) {
      client.publish('IOT/Topic101', 'Error Socket IO: IoT/Topic101')
    }
  })

})



client.on('connect', function (){
  client.subscribe('IOT/Topic102', function (err) {
    if (!err) {
      client.publish('IOT/Topic102', 'Error Socket IO: IoT/Topic102')
    }
  })
	
})



io.on('connection', function(socket){
	console.log('a user connected');
	io.emit('data', "Hello user: " + socket.id);
    
	socket.on("data101_31", function(data101_2){
	var s101_1 = data101_2;
	//socket.emit('s', data2);
	console.log(data101_2);
	console.log("s101_1 = " + s101_1);

	var s101 = s101_1;
	client.publish('demo/write3', s101);
	console.log(s101);
		
	});
	socket.on("data101_32", function(data101_2){
	var s101_2 = data101_2;
	//socket.emit('s', data2);
	console.log(data101_2);
	console.log("s101_2 = " + s101_2);

	var s101 = s101_2;
	client.publish('demo/write3', s101);
	console.log(s101);
	
	});	
	socket.on("data101_33", function(data101_2){
	var s101_3 = data101_2;
	//socket.emit('s', data2);
	console.log(data101_2);
	console.log("s101_3 = " + s101_3);

	var s101 = s101_3;
	client.publish('demo/write3', s101);
	console.log(s101);
	
	});	
	
	socket.on("data101_34", function(data101_2){
	var s101_4 = data101_2;
	//socket.emit('s', data2);
	console.log(data101_2);
	console.log("s101_4 = " + s101_4);

	var s101 = s101_4;
	client.publish('demo/write3', s101);
	console.log(s101);
	
	});	
	
	socket.on("data101_35", function(data101_2){
	var s101_35 = data101_2;
	//socket.emit('s', data2);
	console.log(data101_2);
	console.log("s101_35 = " + s101_35);

	var s101 = s101_35;
	client.publish('demo/write3', s101);
	console.log(s101);
	
	});	
	
	socket.on("data101_36", function(data101_2){
	var s101_36 = data101_2;
	//socket.emit('s', data2);
	console.log(data101_2);
	console.log("s101_36 = " + s101_36);

	var s101 = s101_36;
	client.publish('demo/write3', s101);
	console.log(s101);
	
	});
	
	socket.on("data101_37", function(data101_2){
	var s101_37 = data101_2;
	//socket.emit('s', data2);
	console.log(data101_2);
	console.log("s101_37 = " + s101_37);

	var s101 = s101_37;
	client.publish('demo/write3', s101);
	console.log(s101);
	
	});
	
	socket.on("data101_38", function(data101_2){
	var s101_38 = data101_2;
	//socket.emit('s', data2);
	console.log(data101_2);
	console.log("s101_38 = " + s101_38);

	var s101 = s101_38;
	client.publish('demo/write3', s101);
	console.log(s101);
	
	});
	
	socket.on("data101_39", function(data101_2){
	var s101_39 = data101_2;
	//socket.emit('s', data2);
	console.log(data101_2);
	console.log("s101_39 = " + s101_39);

	var s101 = s101_39;
	client.publish('demo/write3', s101);
	console.log(s101);
	
	});
	
	socket.on("data101_40", function(data101_2){
	var s101_40 = data101_2;
	//socket.emit('s', data2);
	console.log(data101_2);
	console.log("s101_40 = " + s101_40);

	var s101 = s101_40;
	client.publish('demo/write3', s101);
	console.log(s101);
	
	});
	
	socket.on("data101_41", function(data101_2){
	var s101_41 = data101_2;
	//socket.emit('s', data2);
	console.log(data101_2);
	console.log("s101_41 = " + s101_41);

	var s101 = s101_41;
	client.publish('demo/write3', s101);
	console.log(s101);
	
	});
	
	socket.on("data101_42", function(data101_2){
	var s101_42 = data101_2;
	//socket.emit('s', data2);
	console.log(data101_2);
	console.log("s101_42 = " + s101_42);

	var s101 = s101_42;
	client.publish('demo/write3', s101);
	console.log(s101);
	
	});
	
	socket.on("data101_43", function(data101_2){
	var s101_43 = data101_2;
	//socket.emit('s', data2);
	console.log(data101_2);
	console.log("s101_43 = " + s101_43);

	var s101 = s101_43;
	client.publish('demo/write3', s101);
	console.log(s101);
	
	});
	
	socket.on("data101_44", function(data101_2){
	var s101_44 = data101_2;
	//socket.emit('s', data2);
	console.log(data101_2);
	console.log("s101_44 = " + s101_44);

	var s101 = s101_44;
	client.publish('demo/write3', s101);
	console.log(s101);
	
	});
	
	socket.on("data101_45", function(data101_2){
	var s101_45 = data101_2;
	//socket.emit('s', data2);
	console.log(data101_2);
	console.log("s101_45 = " + s101_45);

	var s101 = s101_45;
	client.publish('demo/write3', s101);
	console.log(s101);
	
	});
	
	socket.on("data101_46", function(data101_2){
	var s101_46 = data101_2;
	//socket.emit('s', data2);
	console.log(data101_2);
	console.log("s101_46 = " + s101_46);

	var s101 = s101_46;
	client.publish('demo/write3', s101);
	console.log(s101);
	
	});
	
	socket.on("data101_47", function(data101_2){
	var s101_47 = data101_2;
	//socket.emit('s', data2);
	console.log(data101_2);
	console.log("s101_47 = " + s101_47);

	var s101 = s101_47;
	client.publish('demo/write3', s101);
	console.log(s101);
	
	});
	
	socket.on("data101_48", function(data101_2){
	var s101_48 = data101_2;
	//socket.emit('s', data2);
	console.log(data101_2);
	console.log("s101_48 = " + s101_48);

	var s101 = s101_48;
	client.publish('demo/write3', s101);
	console.log(s101);
	
	});
	
	
});


client.on('message', function (topic, message){
if(topic === 'IOT/Topic101'){
	//Xử lý topic 101
 	console.log(' Day la topic 101----------------')
  	console.log(topic, message.toString())
	console.log('my name is toan 101')
 	console.log('----------------')
	
	var data101;
		var data101_3;
		var data101_4;
		var data101_5;
		var data101_6;
		var data101_7;
		var data101_8;
		var data101_9;
		var data101_10;
		var data101_11;
		var data101_12;
		var data101_13;
		var data101_14;
		var data101_15;
		var data101_16;
		var data101_17;
		var data101_18;
		var data101_19;
		var data101_20;
		var data101_21;
		var data101_22;
	
	
	var Status101_1;
	var Status101_2;
	var Status101_3;
	var Status101_4;
	var Status101_5;
	
	
	data101 = message.toString()
	data101_3 = data101.slice(0,12)
	data101_4 = data101.slice(12,24)
	data101_5 = data101.slice(24,36)
	data101_6 = data101.slice(36,48)
	
	
	
	
  data101_7 = data101.slice(48,60)
  data101_8 = data101.slice(60,72)
  data101_9 = data101.slice(72,84)
  data101_10 = data101.slice(84,96)

	
  data101_11 = data101.slice(96,108)
  data101_12 = data101.slice(108,120)
  data101_13 = data101.slice(120,132)
  data101_14 = data101.slice(132,144)
	
	
	
	
  data101_15 = data101.slice(144,156)
  data101_16 = data101.slice(156,168)
  data101_17 = data101.slice(168,180)
  
  data101_18 = data101.slice(180,192)
  data101_19 = data101.slice(192,204)
  data101_20 = data101.slice(204,216)
  data101_21 = data101.slice(216,228)
  data101_22 = data101.slice(228,240)
	
	
		
	
//	console.log(data3);
//	console.log(data4);
//	console.log(dataH1);
//	console.log(dataH2);
//	console.log(dataH3);
//	console.log(dataH4);
//	console.log(dataH5);
//	console.log(dataH6);
//	console.log(dataH7);
//	console.log(dataH8);


  io.emit('data101_3', data101_3);
  io.emit('data101_4', data101_4);
  io.emit('data101_5', data101_5);
  io.emit('data101_6', data101_6);
  io.emit('data101_7', data101_7);
  io.emit('data101_8', data101_8);
  io.emit('data101_9', data101_9);
  io.emit('data101_10', data101_10);
  io.emit('data101_11', data101_11);
  io.emit('data101_12', data101_12);
  io.emit('data101_13', data101_13);
  io.emit('data101_14', data101_14);
  io.emit('data101_15', data101_15);
  io.emit('data101_16', data101_16);
  io.emit('data101_17', data101_17);
  io.emit('data101_18', data101_18);
  io.emit('data101_19', data101_19);
  io.emit('data101_20', data101_20);
  io.emit('data101_21', data101_21);
  io.emit('data101_22', data101_22);
		
 }

	
	if(topic === 'IOT/Topic102'){
	//Xử lý topic 102
 	console.log(' Day la topic 102----------------')
  	console.log(topic, message.toString())
	console.log('my name is toan 102')
 	console.log('----------------')
	
	var data102;
		var data102_3;
		var data102_4;
		var data102_5;
		var data102_6;
		var data102_7;
		var data102_8;
		var data102_9;
		var data102_10;
		var data102_11;
		var data102_12;
		var data102_13;
		var data102_14;
		var data102_15;
		var data102_16;
		var data102_17;
		var data102_18;
		var data102_19;
		var data102_20;
		var data102_21;
		var data102_22;
	
	
	var Status102_1;
	var Status102_2;
	var Status102_3;
	var Status102_4;
	var Status102_5;
	
	
	data102 = message.toString()
	data102_3 = data102.slice(0,1)
	data102_4 = data102.slice(1,2)
	data102_5 = data102.slice(2,3)
	data102_6 = data102.slice(3,4)
		
  data102_7 = data102.slice(5,6)
  data102_8 = data102.slice(7,8)
	
	
  data102_9 = data102.slice(72,84)
  data102_10 = data102.slice(84,96)

	
  data102_11 = data102.slice(96,108)
  data102_12 = data102.slice(108,120)
  data102_13 = data102.slice(120,132)
  data102_14 = data102.slice(132,144)
	
	
	
	
  data102_15 = data102.slice(144,156)
  data102_16 = data102.slice(156,168)
  data102_17 = data102.slice(168,180)
  
  data102_18 = data102.slice(180,192)
  data102_19 = data102.slice(192,204)
  data102_20 = data102.slice(204,216)
  data102_21 = data102.slice(216,228)
  data102_22 = data102.slice(228,240)
	
	
	
	
	if(data102_3 == 1){
			 Status102_1 = "Đèn sáng";
		}
		else if(data102_3 == 2){
			 Status102_1 = "Đèn lỗi";
		}
		else{
			 Status102_1 = "Dừng hoạt động";           
		}
	if(data102_4 == 1){
			 Status102_2 = "Đèn sáng";
		}
		else if(data102_4 == 2){
			 Status102_2 = "Đèn lỗi";
		}
		else{
			 Status102_2 = "Dừng hoạt động";           
		}
	if(data102_5 == 1){
			 Status102_3 = "Đèn sáng";
		}
		else if(data102_5 == 2){
			 Status102_3 = "Đèn lỗi";
		}
		else{
			 Status102_3 = "Dừng hoạt động";           
		}
	if(data102_6 == 1){
			 Status102_4 = "Đèn sáng";
		}
		else if(data102_6 == 2){
			 Status102_4 = "Đèn lỗi";
		}
		else{
			 Status102_4 = "Dừng hoạt động";           
		}
	if(data102_7 == 1){
			 Status102_5 = "Đèn sáng";
		}
		else if(data102_7 == 2){
			 Status102_5 = "Đèn lỗi";
		}
		else{
			 Status102_5 = "Dừng hoạt động";           
		}
	if(data102_8 == 1){
			 Status102_6 = "Đèn sáng";
		}
		else if(data102_8 == 2){
			 Status102_6 = "Đèn lỗi";
		}
		else{
			 Status102_6 = "Dừng hoạt động";           
		}

	console.log(Status102_1);
	console.log(Status102_2);
	console.log(Status102_3);
		
	
	
//	console.log(data3);
//	console.log(data4);
//	console.log(dataH1);
//	console.log(dataH2);
//	console.log(dataH3);
//	console.log(dataH4);
//	console.log(dataH5);
//	console.log(dataH6);
//	console.log(dataH7);
//	console.log(dataH8);


  io.emit('data102_3', data102_3);
  io.emit('data102_4', data102_4);
  io.emit('data102_5', data102_5);
  io.emit('data102_6', data102_6);
  io.emit('data102_7', data102_7);
  io.emit('data102_8', data102_8);
  io.emit('data102_9', data102_9);
  io.emit('data102_10', data102_10);
  io.emit('data102_11', data102_11);
  io.emit('data102_12', data102_12);
  io.emit('data102_13', data102_13);
  io.emit('data102_14', data102_14);
  io.emit('data102_15', data102_15);
  io.emit('data102_16', data102_16);
  io.emit('data102_17', data102_17);
  io.emit('data102_18', data102_18);
  io.emit('data102_19', data102_19);
  io.emit('data102_20', data102_20);
  io.emit('data102_21', data102_21);
  io.emit('data102_22', data102_22);
		
	
	io.emit('Status102_1', Status102_1);
	io.emit('Status102_2', Status102_2);
	io.emit('Status102_3', Status102_3);
	io.emit('Status102_4', Status102_4);
	io.emit('Status102_5', Status102_5);
	io.emit('Status102_6', Status102_6);	
 }
	
})

// PLC 03 Connect to Server:


client.on('connect', function (){
  client.subscribe('IOT/Topic201', function (err) {
    if (!err) {
      client.publish('IOT/Topic201', 'Error Socket IO: IoT/Topic201')
    }
  })

})

client.on('connect', function (){
  client.subscribe('IOT/Topic202', function (err) {
    if (!err) {
      client.publish('IOT/Topic202', 'Error Socket IO: IoT/Topic202')
    }
  })
	
})



io.on('connection', function(socket){
	console.log('a user connected');
	io.emit('data', "Hello user: " + socket.id);
    
	socket.on("data201_31", function(data201_2){
	var s201_1 = data201_2;
	//socket.emit('s', data2);
	console.log(data201_2);
	console.log("s201_1 = " + s201_1);

	var s201 = s201_1;
	client.publish('demo/write20', s201);
	console.log(s201);
		
	});
	socket.on("data201_32", function(data201_2){
	var s201_2 = data201_2;
	//socket.emit('s', data2);
	console.log(data201_2);
	console.log("s201_2 = " + s201_2);

	var s101 = s201_2;
	client.publish('demo/write20', s201);
	console.log(s201);
	
	});	
	socket.on("data201_33", function(data201_2){
	var s201_3 = data201_2;
	//socket.emit('s', data2);
	console.log(data201_2);
	console.log("s201_3 = " + s201_3);

	var s101 = s201_3;
	client.publish('demo/write20', s201);
	console.log(s201);
	
	});	
	
	socket.on("data201_34", function(data201_2){
	var s201_4 = data201_2;
	//socket.emit('s', data2);
	console.log(data201_2);
	console.log("s201_4 = " + s201_4);

	var s201 = s201_4;
	client.publish('demo/write20', s201);
	console.log(s201);
	
	});	
	
	socket.on("data201_35", function(data201_2){
	var s201_35 = data201_2;
	//socket.emit('s', data2);
	console.log(data201_2);
	console.log("s201_35 = " + s201_35);

	var s201 = s201_35;
	client.publish('demo/write20', s201);
	console.log(s201);
	
	});	
	
	socket.on("data201_36", function(data201_2){
	var s201_36 = data201_2;
	//socket.emit('s', data2);
	console.log(data201_2);
	console.log("s201_36 = " + s201_36);

	var s201 = s201_36;
	client.publish('demo/write20', s201);
	console.log(s201);
	
	});
	
	socket.on("data201_37", function(data201_2){
	var s201_37 = data201_2;
	//socket.emit('s', data2);
	console.log(data201_2);
	console.log("s201_37 = " + s201_37);

	var s201 = s201_37;
	client.publish('demo/write20', s201);
	console.log(s201);
	
	});
	
	socket.on("data201_38", function(data201_2){
	var s201_38 = data201_2;
	//socket.emit('s', data2);
	console.log(data201_2);
	console.log("s201_38 = " + s201_38);

	var s101 = s201_38;
	client.publish('demo/write20', s201);
	console.log(s201);
	
	});
	
	socket.on("data201_39", function(data201_2){
	var s201_39 = data201_2;
	//socket.emit('s', data2);
	console.log(data201_2);
	console.log("s201_39 = " + s201_39);

	var s201 = s201_39;
	client.publish('demo/write20', s201);
	console.log(s201);
	
	});
	
	socket.on("data201_40", function(data201_2){
	var s201_40 = data201_2;
	//socket.emit('s', data2);
	console.log(data201_2);
	console.log("s201_40 = " + s201_40);

	var s201 = s201_40;
	client.publish('demo/write20', s201);
	console.log(s201);
	
	});
	
	socket.on("data201_41", function(data201_2){
	var s201_41 = data201_2;
	//socket.emit('s', data2);
	console.log(data201_2);
	console.log("s201_41 = " + s201_41);

	var s201 = s201_41;
	client.publish('demo/write20', s201);
	console.log(s201);
	
	});
	
	socket.on("data201_42", function(data201_2){
	var s201_42 = data201_2;
	//socket.emit('s', data2);
	console.log(data201_2);
	console.log("s201_42 = " + s201_42);

	var s201 = s201_42;
	client.publish('demo/write20', s201);
	console.log(s201);
	
	});
	
	socket.on("data201_43", function(data201_2){
	var s201_43 = data201_2;
	//socket.emit('s', data2);
	console.log(data201_2);
	console.log("s201_43 = " + s201_43);

	var s201 = s201_43;
	client.publish('demo/write20', s201);
	console.log(s201);
	
	});
	
	socket.on("data201_44", function(data201_2){
	var s201_44 = data201_2;
	//socket.emit('s', data2);
	console.log(data201_2);
	console.log("s201_44 = " + s201_44);

	var s201 = s201_44;
	client.publish('demo/write20', s201);
	console.log(s201);
	
	});
	
	socket.on("data201_45", function(data201_2){
	var s201_45 = data201_2;
	//socket.emit('s', data2);
	console.log(data201_2);
	console.log("s201_45 = " + s201_45);

	var s201 = s201_45;
	client.publish('demo/write20', s201);
	console.log(s201);
	
	});
	
	socket.on("data201_46", function(data201_2){
	var s201_46 = data201_2;
	//socket.emit('s', data2);
	console.log(data201_2);
	console.log("s201_46 = " + s201_46);

	var s201 = s201_46;
	client.publish('demo/write20', s201);
	console.log(s201);
	
	});
	
	socket.on("data201_47", function(data201_2){
	var s201_47 = data201_2;
	//socket.emit('s', data2);
	console.log(data201_2);
	console.log("s201_47 = " + s201_47);

	var s201 = s201_47;
	client.publish('demo/write20', s201);
	console.log(s201);
	
	});
	
	socket.on("data201_48", function(data201_2){
	var s201_48 = data201_2;
	//socket.emit('s', data2);
	console.log(data201_2);
	console.log("s201_48 = " + s201_48);

	var s201 = s201_48;
	client.publish('demo/write20', s201);
	console.log(s201);
	
	});
	
	
});


client.on('message', function (topic, message){
if(topic === 'IOT/Topic201'){
	//Xử lý topic 101
 	console.log(' Day la topic 201----------------')
  	console.log(topic, message.toString())
	console.log('my name is toan 201')
 	console.log('----------------')
	
	var data201;
		var data201_3;
		var data201_4;
		var data201_5;
		var data201_6;
		var data201_7;
		var data201_8;
		var data201_9;
		var data201_10;
		var data201_11;
		var data201_12;
		var data201_13;
		var data201_14;
		var data201_15;
		var data201_16;
		var data201_17;
		var data201_18;
		var data201_19;
		var data201_20;
		var data201_21;
		var data201_22;
	
	
	var Status201_1;
	var Status201_2;
	var Status201_3;
	var Status201_4;
	var Status201_5;
	
	
	data201 = message.toString()
	data201_3 = data201.slice(0,3)
	data201_4 = data201.slice(3,8)
	data201_5 = data201.slice(8,13)
	data201_6 = data201.slice(13,17)
	
	
	
	
  data201_7 = data201.slice(17,20)
  data201_8 = data201.slice(60,72)
  data201_9 = data201.slice(72,84)
  data201_10 = data201.slice(84,96)

	
  data201_11 = data201.slice(96,108)
  data201_12 = data201.slice(108,120)
  data201_13 = data201.slice(120,132)
  data201_14 = data201.slice(132,144)
	
	
	
	
  data201_15 = data201.slice(144,156)
  data201_16 = data201.slice(156,168)
  data201_17 = data201.slice(168,180)
  
  data201_18 = data201.slice(180,192)
  data201_19 = data201.slice(192,204)
  data201_20 = data201.slice(204,216)
  data201_21 = data201.slice(216,228)
  data201_22 = data201.slice(228,240)
	
	
		
	
//	console.log(data3);
//	console.log(data4);
//	console.log(dataH1);
//	console.log(dataH2);
//	console.log(dataH3);
//	console.log(dataH4);
//	console.log(dataH5);
//	console.log(dataH6);
//	console.log(dataH7);
//	console.log(dataH8);


  io.emit('data201_3', data201_3);
  io.emit('data201_4', data201_4);
  io.emit('data201_5', data201_5);
  io.emit('data201_6', data201_6);
  io.emit('data201_7', data201_7);
  io.emit('data201_8', data201_8);
  io.emit('data201_9', data201_9);
  io.emit('data201_10', data201_10);
  io.emit('data201_11', data201_11);
  io.emit('data201_12', data201_12);
  io.emit('data201_13', data201_13);
  io.emit('data201_14', data201_14);
  io.emit('data201_15', data201_15);
  io.emit('data201_16', data201_16);
  io.emit('data201_17', data201_17);
  io.emit('data201_18', data201_18);
  io.emit('data201_19', data201_19);
  io.emit('data201_20', data201_20);
  io.emit('data201_21', data201_21);
  io.emit('data201_22', data201_22);
		
 }

	
	if(topic === 'IOT/Topic202'){
	//Xử lý topic 202
 	console.log(' Day la topic 202----------------')
  	console.log(topic, message.toString())
	console.log('my name is toan 202')
 	console.log('----------------')
	
	var data202;
		var data202_3;
		var data202_4;
		var data202_5;
		var data202_6;
		var data202_7;
		var data202_8;
		var data202_9;
		var data202_10;
		var data202_11;
		var data202_12;
		var data202_13;
		var data202_14;
		var data202_15;
		var data202_16;
		var data202_17;
		var data202_18;
		var data202_19;
		var data202_20;
		var data202_21;
		var data202_22;
	
	
	var Status202_1;
	var Status202_2;
	var Status202_3;
	var Status202_4;
	var Status202_5;
	
	
	data202 = message.toString()
	data202_3 = data202.slice(0,1)
	data202_4 = data202.slice(1,2)
	data202_5 = data202.slice(2,3)
	data202_6 = data202.slice(3,4)
		
  data202_7 = data202.slice(5,6)
  data202_8 = data202.slice(7,8)
	
	
  data202_9 = data202.slice(72,84)
  data202_10 = data202.slice(84,96)

	
  data202_11 = data202.slice(96,108)
  data202_12 = data202.slice(108,120)
  data202_13 = data202.slice(120,132)
  data202_14 = data202.slice(132,144)
	
	
	
	
  data202_15 = data202.slice(144,156)
  data202_16 = data202.slice(156,168)
  data202_17 = data202.slice(168,180)
  
  data202_18 = data202.slice(180,192)
  data202_19 = data202.slice(192,204)
  data202_20 = data202.slice(204,216)
  data202_21 = data202.slice(216,228)
  data202_22 = data202.slice(228,240)
	
	
	
	
	if(data202_3 == 1){
			 Status202_1 = "Đèn sáng";
		}
		else if(data202_3 == 2){
			 Status202_1 = "Đèn lỗi";
		}
		else{
			 Status202_1 = "Dừng hoạt động";           
		}
	if(data202_4 == 1){
			 Status202_2 = "Đèn sáng";
		}
		else if(data202_4 == 2){
			 Status202_2 = "Đèn lỗi";
		}
		else{
			 Status202_2 = "Dừng hoạt động";           
		}
	if(data202_5 == 1){
			 Status202_3 = "Đèn sáng";
		}
		else if(data202_5 == 2){
			 Status202_3 = "Đèn lỗi";
		}
		else{
			 Status202_3 = "Dừng hoạt động";           
		}
	if(data202_6 == 1){
			 Status202_4 = "Đèn sáng";
		}
		else if(data202_6 == 2){
			 Status202_4 = "Đèn lỗi";
		}
		else{
			 Status202_4 = "Dừng hoạt động";           
		}
	if(data202_7 == 1){
			 Status202_5 = "Đèn sáng";
		}
		else if(data202_7 == 2){
			 Status202_5 = "Đèn lỗi";
		}
		else{
			 Status202_5 = "Dừng hoạt động";           
		}
	if(data202_8 == 1){
			 Status202_6 = "Đèn sáng";
		}
		else if(data202_8 == 2){
			 Status202_6 = "Đèn lỗi";
		}
		else{
			 Status202_6 = "Dừng hoạt động";           
		}

	console.log(Status202_1);
	console.log(Status202_2);
	console.log(Status202_3);
		


  io.emit('data202_3', data202_3);
  io.emit('data202_4', data202_4);
  io.emit('data202_5', data202_5);
  io.emit('data202_6', data202_6);
  io.emit('data202_7', data202_7);
  io.emit('data202_8', data202_8);
  io.emit('data202_9', data202_9);
  io.emit('data202_10', data202_10);
  io.emit('data202_11', data202_11);
  io.emit('data202_12', data202_12);
  io.emit('data202_13', data202_13);
  io.emit('data202_14', data202_14);
  io.emit('data202_15', data202_15);
  io.emit('data202_16', data202_16);
  io.emit('data202_17', data202_17);
  io.emit('data202_18', data202_18);
  io.emit('data202_19', data202_19);
  io.emit('data202_20', data202_20);
  io.emit('data202_21', data202_21);
  io.emit('data202_22', data202_22);
		
	
	io.emit('Status202_1', Status202_1);
	io.emit('Status202_2', Status202_2);
	io.emit('Status202_3', Status202_3);
	io.emit('Status202_4', Status202_4);
	io.emit('Status202_5', Status202_5);
	io.emit('Status202_6', Status202_6);	
 }
	
})


/////////////////////////////////////////////

////////////////////////////////////////////

// PLC 04

client.on('connect', function (){
  client.subscribe('IOT/Topic301', function (err) {
    if (!err) {
      client.publish('IOT/Topic301', 'Error Socket IO: IoT/Topic301')
    }
  })

})

client.on('connect', function (){
  client.subscribe('IOT/Topic302', function (err) {
    if (!err) {
      client.publish('IOT/Topic302', 'Error Socket IO: IoT/Topic302')
    }
  })
	
})



io.on('connection', function(socket){
	console.log('a user connected');
	io.emit('data', "Hello user: " + socket.id);
    
	socket.on("data301_31", function(data101_2){
	var s101_1 = data101_2;
	//socket.emit('s', data2);
	console.log(data101_2);
	console.log("s101_1 = " + s101_1);

	var s101 = s101_1;
	client.publish('demo/write3', s101);
	console.log(s101);
		
	});
	
});


client.on('message', function (topic, message){
if(topic === 'IOT/Topic301'){
	//Xử lý topic 301
	console.log(' Day la topic 301----------------')
	console.log(topic, message.toString())
	console.log('my name is toan 301')
	console.log('----------------')
	
		var data301;
		var data301_3;
		var data301_4;
		var data301_5;
		var data301_6;
		var data301_7;
		var data301_8;
		var data301_9;
		var data301_10;
		var data301_11;
		var data301_12;
		var data301_13;
		var data301_14;
		var data301_15;
		var data301_16;
		var data301_17;
		var data301_18;
		var data301_19;
		var data301_20;
		var data301_21;
		var data301_22;


		data301 = message.toString()
		data301_3 = data301.slice(0,12)
		data301_4 = data301.slice(12,24)
		data301_5 = data301.slice(24,36)
		data301_6 = data301.slice(36,48)

		data301_7 = data301.slice(48,60)
		data301_8 = data301.slice(60,72)
		data301_9 = data301.slice(72,84)
		data301_10 = data301.slice(84,96)

		data301_11 = data301.slice(96,108)
		data301_12 = data301.slice(108,120)
		data301_13 = data301.slice(120,132)
		data301_14 = data301.slice(132,144)	

		data301_15 = data301.slice(144,156)
		data301_16 = data301.slice(156,168)
		data301_17 = data301.slice(168,180)

		data301_18 = data301.slice(180,192)
		data301_19 = data301.slice(192,204)
		data301_20 = data301.slice(204,216)
		data301_21 = data301.slice(216,228)
		data301_22 = data301.slice(228,240)

		io.emit('data301_3', data301_3);
		io.emit('data301_4', data301_4);
		io.emit('data301_5', data301_5);
		io.emit('data301_6', data301_6);
		io.emit('data301_7', data301_7);
		io.emit('data301_8', data301_8);
		io.emit('data301_9', data301_9);
		io.emit('data301_10', data301_10);
		io.emit('data301_11', data301_11);
		io.emit('data301_12', data301_12);
		io.emit('data301_13', data301_13);
		io.emit('data301_14', data301_14);
		io.emit('data301_15', data301_15);
		io.emit('data301_16', data301_16);
		io.emit('data301_17', data301_17);
		io.emit('data301_18', data301_18);
		io.emit('data301_19', data301_19);
		io.emit('data301_20', data301_20);
		io.emit('data301_21', data301_21);
		io.emit('data301_22', data301_22);	
}

	
if(topic === 'IOT/Topic302'){
//Xử lý topic 302
console.log(' Day la topic 302----------------')
console.log(topic, message.toString())
console.log('my name is toan 302')
console.log('----------------')
	
		var data302;
		var data302_3;
		var data302_4;
		var data302_5;
		var data302_6;
		var data302_7;
		var data302_8;
		var data302_9;
		var data302_10;
		var data302_11;
		var data302_12;
		var data302_13;
		var data302_14;
		var data302_15;
		var data302_16;
		var data302_17;
		var data302_18;
		var data302_19;
		var data302_20;
		var data302_21;
		var data302_22;

		data302 = message.toString()
		data302_3 = data302.slice(0,12)
		data302_4 = data302.slice(12,24)
		data302_5 = data302.slice(24,36)
		data302_6 = data302.slice(36,48)

		data302_7 = data302.slice(48,60)
		data302_8 = data302.slice(60,72)
		data302_9 = data302.slice(72,84)
		data302_10 = data302.slice(84,96)

		data302_11 = data302.slice(96,108)
		data302_12 = data302.slice(108,120)
		data302_13 = data302.slice(120,132)
		data302_14 = data302.slice(132,144)

		data302_15 = data302.slice(144,156)
		data302_16 = data302.slice(156,168)
		data302_17 = data302.slice(168,180)
		data302_18 = data302.slice(180,192)
	
		data302_19 = data302.slice(192,204)
		data302_20 = data302.slice(204,216)
		data302_21 = data302.slice(216,228)
		data302_22 = data302.slice(228,240)

		io.emit('data302_3', data302_3);
		io.emit('data302_4', data302_4);
		io.emit('data302_5', data302_5);
		io.emit('data302_6', data302_6);
		io.emit('data302_7', data302_7);
		io.emit('data302_8', data302_8);
		io.emit('data302_9', data302_9);
		io.emit('data302_10', data302_10);
		io.emit('data302_11', data302_11);
		io.emit('data302_12', data302_12);
		io.emit('data302_13', data302_13);
		io.emit('data302_14', data302_14);
		io.emit('data302_15', data302_15);
		io.emit('data302_16', data302_16);
		io.emit('data302_17', data302_17);
		io.emit('data302_18', data302_18);
		io.emit('data302_19', data302_19);
		io.emit('data302_20', data302_20);
		io.emit('data302_21', data302_21);
		io.emit('data302_22', data302_22);
}
	
})


/////////////////////////////////////////////

////////////////////////////////////////////

// PLC 01 Cam Đường

client.on('connect', function (){
  client.subscribe('IOT/TopicCD01', function (err) {
    if (!err) {
      client.publish('IOT/TopicCD01', 'Error Socket IO: IoT/TopicCD01')
    }
  })

})

io.on('connection', function(socket){
	console.log('a user connected');
	io.emit('data', "Hello user: " + socket.id);
    
	socket.on("dataCDTimer", function(data2){
	var s1 = data2;
	//socket.emit('s', data2);
	console.log(data2);
	console.log("s1 = " + s1);

	var s = s1;
	client.publish('demo/writeCD01', s);
	console.log(s);
		
	});
	socket.on("dataCDd", function(data2){
	var s2 = data2;
	//socket.emit('s', data2);
	console.log(data2);
	console.log("s2 = " + s2);

	var s = s2;
	client.publish('demo/writeCD01', s);
	console.log(s);
	
	});	
	socket.on("dataCDV", function(data2){
	var s3 = data2;
	//socket.emit('s', data2);
	console.log(data2);
	console.log("s3 = " + s3);

	var s = s3;
	client.publish('demo/writeCD01', s);
	console.log(s);
	
	});	
		
	socket.on("dataCDm1", function(data2){
	var s5 = data2;
	//socket.emit('s', data2);
	console.log(data2);
	console.log("s5 = " + s5);

	var s = s5;
	client.publish('demo/writeCD01', s);
	console.log(s);
	
	});	

});

client.on('connect', function (){
  client.subscribe('IOT/TopicCD02', function (err) {
    if (!err) {
      client.publish('IOT/TopicCD02', 'Error Socket IO: IoT/TopicCD02')
    }
  })
	
})

client.on('connect', function (){
  client.subscribe('IOT/TopicCD03', function (err) {
    if (!err) {
      client.publish('IOT/TopicCD03', 'Error Socket IO: IoT/TopicCD03')
    }
  })
	
})

client.on('connect', function (){
  client.subscribe('IOT/TopicCD04', function (err) {
    if (!err) {
      client.publish('IOT/TopicCD04', 'Error Socket IO: IoT/TopicCD04')
    }
  })
	
})


client.on('connect', function (){
  client.subscribe('IOT/TopicCD05', function (err) {
    if (!err) {
      client.publish('IOT/TopicCD05', 'Error Socket IO: IoT/TopicCD05')
    }
  })
	
})



io.on('connection', function(socket){
	console.log('a user connected');
	io.emit('data', "Hello user: " + socket.id);
    
	socket.on("dataCD01_31", function(data101_2){
	var s_CD_101_1 = data_CD_101_2;
	//socket.emit('s', data2);
	console.log(data_CD_101_2);
	console.log("s_CD_101_1 = " + s_CD_101_1);

	var s_CD_101 = s_CD_101_1;
	client.publish('demo/writeCD01', s_CD_101);
	console.log(s_CD_101);
		
	});
	
});

var count_to_save_databaseCD01 = 0;
client.on('message', function (topic, message){
if(topic === 'IOT/TopicCD01'){
	//Xử lý topic CD01
	console.log(' Day la topic CD01----------------')
	console.log(topic, message.toString())
	console.log('my name is toan CD01')
	console.log('----------------')
	
		var dataCD01;
		var dataCD01_1;
		var dataCD01_2;
		var dataCD01_3;
		var dataCD01_4;
		var dataCD01_5;
		var dataCD01_6;
		var dataCD01_7;
		var dataCD01_8;
		var dataCD01_9;
		var dataCD01_10;
		var dataCD01_11;
		var dataCD01_12;
		var dataCD01_13;
		var dataCD01_14;
		var dataCD01_15;
		var dataCD01_16;
		var dataCD01_17;
		var dataCD01_18;
		var dataCD01_19;
		var dataCD01_20;


		dataCD01 = message.toString()
		dataCD01_1 = dataCD01.slice(0,12)
		dataCD01_2 = dataCD01.slice(12,24)
		dataCD01_3 = dataCD01.slice(24,36)
		dataCD01_4 = dataCD01.slice(36,48)

		dataCD01_5 = dataCD01.slice(48,60)
		dataCD01_6 = dataCD01.slice(60,72)
		dataCD01_7 = dataCD01.slice(72,84)
		dataCD01_8 = dataCD01.slice(84,96)

		dataCD01_9 = dataCD01.slice(96,108)
		dataCD01_10 = dataCD01.slice(108,120)
		dataCD01_11 = dataCD01.slice(120,132)
		dataCD01_12 = dataCD01.slice(132,144)	

		dataCD01_13 = dataCD01.slice(144,156)
		dataCD01_14 = dataCD01.slice(156,168)
		dataCD01_15 = dataCD01.slice(168,180)

		dataCD01_16 = dataCD01.slice(180,192)
		dataCD01_17 = dataCD01.slice(192,204)
		dataCD01_18 = dataCD01.slice(204,216)
		dataCD01_19 = dataCD01.slice(216,228)
		dataCD01_20 = dataCD01.slice(228,240)
	
		count_to_save_databaseCD01 = count_to_save_databaseCD01 +1;
		const d1 = new Date();
		  let minutes1 = d1.getMinutes();
		  let seconds1 = d1.getSeconds();

		  // 600s luu 1 lan
		  if(minutes1 == 0 & seconds1 < 10){
			var saveData = { 
			CD01_timestamp: new Date(),
			CD01_nongdobun: parseFloat(dataCD01_7),
			CD01_khoiluongdo: parseFloat(dataCD01_2),
			CD01_tytrongquang: parseFloat(dataCD01_3),
			}
		console.log('saveDataCD01: ', saveData);
		DB_DATACD01.insertMany(saveData, function(err){
		if (err) return "Error";
		});
		count_to_save_databaseCD01 = 0;
		}
	
	
	

		io.emit('dataCD01_1', dataCD01_1);
		io.emit('dataCD01_2', dataCD01_2);
		io.emit('dataCD01_3', dataCD01_3);
		io.emit('dataCD01_4', dataCD01_4);
		io.emit('dataCD01_5', dataCD01_5);
		io.emit('dataCD01_6', dataCD01_6);
		io.emit('dataCD01_7', dataCD01_7);
		io.emit('dataCD01_8', dataCD01_8);
		io.emit('dataCD01_9', dataCD01_9);
		io.emit('dataCD01_10', dataCD01_10);
		io.emit('dataCD01_11', dataCD01_11);
		io.emit('dataCD01_12', dataCD01_12);
		io.emit('dataCD01_13', dataCD01_13);
		io.emit('dataCD01_14', dataCD01_14);
		io.emit('dataCD01_15', dataCD01_15);
		io.emit('dataCD01_16', dataCD01_16);
		io.emit('dataCD01_17', dataCD01_17);
		io.emit('dataCD01_18', dataCD01_18);
		io.emit('dataCD01_19', dataCD01_19);
		io.emit('dataCD01_20', dataCD01_20);	
}

	
if(topic === 'IOT/TopicCD02'){
//Xử lý topic CD02
console.log(' Day la topic CD02----------------')
console.log(topic, message.toString())
console.log('my name is toan CD02')
console.log('----------------')
	
		var dataCD02;
		var dataCD02_23;
		var dataCD02_0;
		var dataCD02_1;
		var dataCD02_2;
		var dataCD02_3;
		var dataCD02_4;
		var dataCD02_5;
		var dataCD02_6;
		var dataCD02_7;
		var dataCD02_8;
		var dataCD02_9;
		var dataCD02_10;
		var dataCD02_11;
		var dataCD02_12;
		var dataCD02_13;
		var dataCD02_14;

		dataCD02 = message.toString()
		dataCD02_23 = dataCD02.slice(0,12)
		dataCD02_0 = dataCD02.slice(12,24)
		dataCD02_1 = dataCD02.slice(24,36)
		dataCD02_2 = dataCD02.slice(36,48)

		dataCD02_3 = dataCD02.slice(48,60)
		dataCD02_4 = dataCD02.slice(60,72)
		dataCD02_5 = dataCD02.slice(72,84)
		dataCD02_6 = dataCD02.slice(84,96)

		dataCD02_7 = dataCD02.slice(96,108)
		dataCD02_8 = dataCD02.slice(108,120)
		dataCD02_9 = dataCD02.slice(120,132)
		dataCD02_10 = dataCD02.slice(132,144)

		dataCD02_11 = dataCD02.slice(144,156)
		dataCD02_12 = dataCD02.slice(156,168)
		dataCD02_13 = dataCD02.slice(168,180)
		dataCD02_14 = dataCD02.slice(180,192)

		io.emit('dataCD02_23', dataCD02_23);
		io.emit('dataCD02_0', dataCD02_0);
		io.emit('dataCD02_1', dataCD02_1);
		io.emit('dataCD02_2', dataCD02_2);
		io.emit('dataCD02_3', dataCD02_3);
		io.emit('dataCD02_4', dataCD02_4);
		io.emit('dataCD02_5', dataCD02_5);
		io.emit('dataCD02_6', dataCD02_6);
		io.emit('dataCD02_7', dataCD02_7);
		io.emit('dataCD02_8', dataCD02_8);
		io.emit('dataCD02_9', dataCD02_9);
		io.emit('dataCD02_10', dataCD02_10);
		io.emit('dataCD02_11', dataCD02_11);
		io.emit('dataCD02_12', dataCD02_12);
		io.emit('dataCD02_13', dataCD02_13);
		io.emit('dataCD02_14', dataCD02_14);

}

	
if(topic === 'IOT/TopicCD03'){
//Xử lý topic CD03
console.log(' Day la topic CD03----------------')
console.log(topic, message.toString())
console.log('my name is toan CD03')
console.log('----------------')
	
		var dataCD03;
		var dataCD03_15;
		var dataCD03_16;
		var dataCD03_17;
		var dataCD03_18;
		var dataCD03_19;
		var dataCD03_20;
		var dataCD03_21;
		var dataCD03_22;


		dataCD03 = message.toString()
		dataCD03_15 = dataCD03.slice(0,12)
		dataCD03_16 = dataCD03.slice(12,24)
		dataCD03_17 = dataCD03.slice(24,36)
		dataCD03_18 = dataCD03.slice(36,48)

		dataCD03_19 = dataCD03.slice(48,60)
		dataCD03_20 = dataCD03.slice(60,72)
		dataCD03_21 = dataCD03.slice(72,84)
		dataCD03_22 = dataCD03.slice(84,96)


		io.emit('dataCD03_15', dataCD03_15);
		io.emit('dataCD03_16', dataCD03_16);
		io.emit('dataCD03_17', dataCD03_17);
		io.emit('dataCD03_18', dataCD03_18);
		io.emit('dataCD03_19', dataCD03_19);
		io.emit('dataCD03_20', dataCD03_20);
		io.emit('dataCD03_21', dataCD03_21);
		io.emit('dataCD03_22', dataCD03_22);

}


if(topic === 'IOT/TopicCD04'){
//Xử lý topic CD04
console.log(' Day la topic CD04----------------')
console.log(topic, message.toString())
console.log('my name is toan CD04')
console.log('----------------')
	
		var dataCD04;
		var dataCD04_23;
		var dataCD04_0;
		var dataCD04_1;
		var dataCD04_2;
		var dataCD04_3;
		var dataCD04_4;
		var dataCD04_5;
		var dataCD04_6;
		var dataCD04_7;
		var dataCD04_8;
		var dataCD04_9;
		var dataCD04_10;
		var dataCD04_11;
		var dataCD04_12;
		var dataCD04_13;
		var dataCD04_14;

		dataCD04 = message.toString()
		dataCD04_23 = dataCD04.slice(0,12)
		dataCD04_0 = dataCD04.slice(12,24)
		dataCD04_1 = dataCD04.slice(24,36)
		dataCD04_2 = dataCD04.slice(36,48)

		dataCD04_3 = dataCD04.slice(48,60)
		dataCD04_4 = dataCD04.slice(60,72)
		dataCD04_5 = dataCD04.slice(72,84)
		dataCD04_6 = dataCD04.slice(84,96)

		dataCD04_7 = dataCD04.slice(96,108)
		dataCD04_8 = dataCD04.slice(108,120)
		dataCD04_9 = dataCD04.slice(120,132)
		dataCD04_10 = dataCD04.slice(132,144)

		dataCD04_11 = dataCD04.slice(144,156)
		dataCD04_12 = dataCD04.slice(156,168)
		dataCD04_13 = dataCD04.slice(168,180)
		dataCD04_14 = dataCD04.slice(180,192)

		io.emit('dataCD04_23', dataCD04_23);
		io.emit('dataCD04_0', dataCD04_0);
		io.emit('dataCD04_1', dataCD04_1);
		io.emit('dataCD04_2', dataCD04_2);
		io.emit('dataCD04_3', dataCD04_3);
		io.emit('dataCD04_4', dataCD04_4);
		io.emit('dataCD04_5', dataCD04_5);
		io.emit('dataCD04_6', dataCD04_6);
		io.emit('dataCD04_7', dataCD04_7);
		io.emit('dataCD04_8', dataCD04_8);
		io.emit('dataCD04_9', dataCD04_9);
		io.emit('dataCD04_10', dataCD04_10);
		io.emit('dataCD04_11', dataCD04_11);
		io.emit('dataCD04_12', dataCD04_12);
		io.emit('dataCD04_13', dataCD04_13);
		io.emit('dataCD04_14', dataCD04_14);

}

if(topic === 'IOT/TopicCD05'){
//Xử lý topic CD05
console.log(' Day la topic CD05----------------')
console.log(topic, message.toString())
console.log('my name is toan CD05')
console.log('----------------')
	
		var dataCD05;
		var dataCD05_15;
		var dataCD05_16;
		var dataCD05_17;
		var dataCD05_18;
		var dataCD05_19;
		var dataCD05_20;
		var dataCD05_21;
		var dataCD05_22;


		dataCD05 = message.toString()
		dataCD05_15 = dataCD05.slice(0,12)
		dataCD05_16 = dataCD05.slice(12,24)
		dataCD05_17 = dataCD05.slice(24,36)
		dataCD05_18 = dataCD05.slice(36,48)

		dataCD05_19 = dataCD05.slice(48,60)
		dataCD05_20 = dataCD05.slice(60,72)
		dataCD05_21 = dataCD05.slice(72,84)
		dataCD05_22 = dataCD05.slice(84,96)


		io.emit('dataCD05_15', dataCD05_15);
		io.emit('dataCD05_16', dataCD05_16);
		io.emit('dataCD05_17', dataCD05_17);
		io.emit('dataCD05_18', dataCD05_18);
		io.emit('dataCD05_19', dataCD05_19);
		io.emit('dataCD05_20', dataCD05_20);
		io.emit('dataCD05_21', dataCD05_21);
		io.emit('dataCD05_22', dataCD05_22);
}
	
})


/////////////////////////////////////////////

////////////////////////////////////////////

// PLC 04 Máy nghiền bi Cam Đường

client.on('connect', function (){
  client.subscribe('IOT/TopicCD0401', function (err) {
    if (!err) {
      client.publish('IOT/TopicCD0401', 'Error Socket IO: IoT/TopicCD0401')
    }
  })

})

io.on('connection', function(socket){
	console.log('a user connected');
	io.emit('data', "Hello user: " + socket.id);
    
	socket.on("dataCDTimer", function(data2){
	var s1 = data2;
	//socket.emit('s', data2);
	console.log(data2);
	console.log("s1 = " + s1);

	var s = s1;
	client.publish('demo/writeCD0401', s);
	console.log(s);
		
	});
	socket.on("dataCDd", function(data2){
	var s2 = data2;
	//socket.emit('s', data2);
	console.log(data2);
	console.log("s2 = " + s2);

	var s = s2;
	client.publish('demo/writeCD0401', s);
	console.log(s);
	
	});	
	socket.on("dataCDV", function(data2){
	var s3 = data2;
	//socket.emit('s', data2);
	console.log(data2);
	console.log("s3 = " + s3);

	var s = s3;
	client.publish('demo/writeCD0401', s);
	console.log(s);
	
	});	
		
	socket.on("dataCDm1", function(data2){
	var s5 = data2;
	//socket.emit('s', data2);
	console.log(data2);
	console.log("s5 = " + s5);

	var s = s5;
	client.publish('demo/writeCD0401', s);
	console.log(s);
	
	});	

});

client.on('connect', function (){
  client.subscribe('IOT/TopicCD0402', function (err) {
    if (!err) {
      client.publish('IOT/TopicCD0402', 'Error Socket IO: IoT/TopicCD0402')
    }
  })
	
})

client.on('connect', function (){
  client.subscribe('IOT/TopicCD0403', function (err) {
    if (!err) {
      client.publish('IOT/TopicCD03', 'Error Socket IO: IoT/TopicCD0403')
    }
  })
	
})

client.on('connect', function (){
  client.subscribe('IOT/TopicCD0404', function (err) {
    if (!err) {
      client.publish('IOT/TopicCD0404', 'Error Socket IO: IoT/TopicCD0404')
    }
  })
	
})


client.on('connect', function (){
  client.subscribe('IOT/TopicCD0405', function (err) {
    if (!err) {
      client.publish('IOT/TopicCD0405', 'Error Socket IO: IoT/TopicCD0405')
    }
  })
	
})



io.on('connection', function(socket){
	console.log('a user connected');
	io.emit('data', "Hello user: " + socket.id);
    
	socket.on("dataCD0401_31", function(data101_2){
	var s_CD_101_1 = data_CD_101_2;
	//socket.emit('s', data2);
	console.log(data_CD_101_2);
	console.log("s_CD_101_1 = " + s_CD_101_1);

	var s_CD_101 = s_CD_101_1;
	client.publish('demo/writeCD0401', s_CD_101);
	console.log(s_CD_101);
		
	});
	
});

//var count_to_save_databaseCD0401 = 0;
client.on('message', function (topic, message){
if(topic === 'IOT/TopicCD0401'){
	//Xử lý topic CD0401
	console.log(' Day la topic CD0401----------------')
	console.log(topic, message.toString())
	console.log('my name is toan CD0401')
	console.log('----------------')
	
		var dataCD0401;
		var dataCD0401_1;
		var dataCD0401_2;
		var dataCD0401_3;
		var dataCD0401_4;
		var dataCD0401_5;
		var dataCD0401_6;
		var dataCD0401_7;
		var dataCD0401_8;
		var dataCD0401_9;
		var dataCD0401_10;
		var dataCD0401_11;
		var dataCD0401_12;
		var dataCD0401_13;
		var dataCD0401_14;
		var dataCD0401_15;
		var dataCD0401_16;
		var dataCD0401_17;
		var dataCD0401_18;
		var dataCD0401_19;
		var dataCD0401_20;


		dataCD0401 = message.toString()
		dataCD0401_1 = dataCD0401.slice(0,12)
		dataCD0401_2 = dataCD0401.slice(12,24)
		dataCD0401_3 = dataCD0401.slice(24,36)
		dataCD0401_4 = dataCD0401.slice(36,48)

		dataCD0401_5 = dataCD0401.slice(48,60)
		dataCD0401_6 = dataCD0401.slice(60,72)
		dataCD0401_7 = dataCD0401.slice(72,84)
		dataCD0401_8 = dataCD0401.slice(84,96)

		dataCD0401_9 = dataCD0401.slice(96,108)
		dataCD0401_10 = dataCD0401.slice(108,120)
		dataCD0401_11 = dataCD0401.slice(120,132)
		dataCD0401_12 = dataCD0401.slice(132,144)	

		dataCD0401_13 = dataCD0401.slice(144,156)
		dataCD0401_14 = dataCD0401.slice(156,168)
		dataCD0401_15 = dataCD0401.slice(168,180)

		dataCD0401_16 = dataCD0401.slice(180,192)
		dataCD0401_17 = dataCD0401.slice(192,204)
		dataCD0401_18 = dataCD0401.slice(204,216)
		dataCD0401_19 = dataCD0401.slice(216,228)
		dataCD0401_20 = dataCD0401.slice(228,240)
	
//		count_to_save_databaseCD0401 = count_to_save_databaseCD0401 +1;
//		// 60s luu 1 lan
//		if(count_to_save_databaseCD0401 > 300 ){
//			var saveData = { 
//			CD0401_timestamp: new Date(),
//			CD0401_nongdobun: parseFloat(dataCD0401_1),
//			CD0401_khoiluongdo: parseFloat(dataCD0401_2),
//			CD0401_tytrongquang: parseFloat(dataCD0401_3),
//			}
//		console.log('saveDataCD01: ', saveData);
//		DB_DATACD0401.insertMany(saveData, function(err){
//		if (err) return "Error";
//		});
//		count_to_save_databaseCD0401 = 0;
//		}
	
	
	

		io.emit('dataCD0401_1', dataCD0401_1);
		io.emit('dataCD0401_2', dataCD0401_2);
		io.emit('dataCD0401_3', dataCD0401_3);
		io.emit('dataCD0401_4', dataCD0401_4);
		io.emit('dataCD0401_5', dataCD0401_5);
		io.emit('dataCD0401_6', dataCD0401_6);
		io.emit('dataCD0401_7', dataCD0401_7);
		io.emit('dataCD0401_8', dataCD0401_8);
		io.emit('dataCD0401_9', dataCD0401_9);
		io.emit('dataCD0401_10', dataCD0401_10);
		io.emit('dataCD0401_11', dataCD0401_11);
		io.emit('dataCD0401_12', dataCD0401_12);
		io.emit('dataCD0401_13', dataCD0401_13);
		io.emit('dataCD0401_14', dataCD0401_14);
		io.emit('dataCD0401_15', dataCD0401_15);
		io.emit('dataCD0401_16', dataCD0401_16);
		io.emit('dataCD0401_17', dataCD0401_17);
		io.emit('dataCD0401_18', dataCD0401_18);
		io.emit('dataCD0401_19', dataCD0401_19);
		io.emit('dataCD0401_20', dataCD0401_20);	
}

	
if(topic === 'IOT/TopicCD0402'){
//Xử lý topic CD0402
console.log(' Day la topic CD0402----------------')
console.log(topic, message.toString())
console.log('my name is toan CD0402')
console.log('----------------')
	
		var dataCD0402;
		var dataCD0402_23;
		var dataCD0402_0;
		var dataCD0402_1;
		var dataCD0402_2;
		var dataCD0402_3;
		var dataCD0402_4;
		var dataCD0402_5;
		var dataCD0402_6;
		var dataCD0402_7;
		var dataCD0402_8;
		var dataCD0402_9;
		var dataCD0402_10;
		var dataCD0402_11;
		var dataCD0402_12;
		var dataCD0402_13;
		var dataCD0402_14;

		dataCD0402 = message.toString()
		dataCD0402_23 = dataCD0402.slice(0,12)
		dataCD0402_0 = dataCD0402.slice(12,24)
		dataCD0402_1 = dataCD0402.slice(24,36)
		dataCD0402_2 = dataCD0402.slice(36,48)

		dataCD0402_3 = dataCD0402.slice(48,60)
		dataCD0402_4 = dataCD0402.slice(60,72)
		dataCD0402_5 = dataCD0402.slice(72,84)
		dataCD0402_6 = dataCD0402.slice(84,96)

		dataCD0402_7 = dataCD0402.slice(96,108)
		dataCD0402_8 = dataCD0402.slice(108,120)
		dataCD0402_9 = dataCD0402.slice(120,132)
		dataCD0402_10 = dataCD0402.slice(132,144)

		dataCD0402_11 = dataCD0402.slice(144,156)
		dataCD0402_12 = dataCD0402.slice(156,168)
		dataCD0402_13 = dataCD0402.slice(168,180)
		dataCD0402_14 = dataCD0402.slice(180,192)

		io.emit('dataCD0402_23', dataCD0402_23);
		io.emit('dataCD0402_0', dataCD0402_0);
		io.emit('dataCD0402_1', dataCD0402_1);
		io.emit('dataCD0402_2', dataCD0402_2);
		io.emit('dataCD0402_3', dataCD0402_3);
		io.emit('dataCD0402_4', dataCD0402_4);
		io.emit('dataCD0402_5', dataCD0402_5);
		io.emit('dataCD0402_6', dataCD0402_6);
		io.emit('dataCD0402_7', dataCD0402_7);
		io.emit('dataCD0402_8', dataCD0402_8);
		io.emit('dataCD0402_9', dataCD0402_9);
		io.emit('dataCD0402_10', dataCD0402_10);
		io.emit('dataCD0402_11', dataCD0402_11);
		io.emit('dataCD0402_12', dataCD0402_12);
		io.emit('dataCD0402_13', dataCD0402_13);
		io.emit('dataCD0402_14', dataCD0402_14);

}

	
if(topic === 'IOT/TopicCD0403'){
//Xử lý topic CD0403
console.log(' Day la topic CD0403----------------')
console.log(topic, message.toString())
console.log('my name is toan CD0403')
console.log('----------------')
	
		var dataCD0403;
		var dataCD0403_15;
		var dataCD0403_16;
		var dataCD0403_17;
		var dataCD0403_18;
		var dataCD0403_19;
		var dataCD0403_20;
		var dataCD0403_21;
		var dataCD0403_22;


		dataCD0403 = message.toString()
		dataCD0403_15 = dataCD0403.slice(0,12)
		dataCD0403_16 = dataCD0403.slice(12,24)
		dataCD0403_17 = dataCD0403.slice(24,36)
		dataCD0403_18 = dataCD0403.slice(36,48)

		dataCD0403_19 = dataCD0403.slice(48,60)
		dataCD0403_20 = dataCD0403.slice(60,72)
		dataCD0403_21 = dataCD0403.slice(72,84)
		dataCD0403_22 = dataCD0403.slice(84,96)


		io.emit('dataCD0403_15', dataCD0403_15);
		io.emit('dataCD0403_16', dataCD0403_16);
		io.emit('dataCD0403_17', dataCD0403_17);
		io.emit('dataCD0403_18', dataCD0403_18);
		io.emit('dataCD0403_19', dataCD0403_19);
		io.emit('dataCD0403_20', dataCD0403_20);
		io.emit('dataCD0403_21', dataCD0403_21);
		io.emit('dataCD0403_22', dataCD0403_22);

}


if(topic === 'IOT/TopicCD0404'){
//Xử lý topic CD0404
console.log(' Day la topic CD0404----------------')
console.log(topic, message.toString())
console.log('my name is toan CD0404')
console.log('----------------')
	
		var dataCD0404;
		var dataCD0404_23;
		var dataCD0404_0;
		var dataCD0404_1;
		var dataCD0404_2;
		var dataCD0404_3;
		var dataCD0404_4;
		var dataCD0404_5;
		var dataCD0404_6;
		var dataCD0404_7;
		var dataCD0404_8;
		var dataCD0404_9;
		var dataCD0404_10;
		var dataCD0404_11;
		var dataCD0404_12;
		var dataCD0404_13;
		var dataCD0404_14;

		dataCD0404 = message.toString()
		dataCD0404_23 = dataCD0404.slice(0,12)
		dataCD0404_0 = dataCD0404.slice(12,24)
		dataCD0404_1 = dataCD0404.slice(24,36)
		dataCD0404_2 = dataCD0404.slice(36,48)

		dataCD0404_3 = dataCD0404.slice(48,60)
		dataCD0404_4 = dataCD0404.slice(60,72)
		dataCD0404_5 = dataCD0404.slice(72,84)
		dataCD0404_6 = dataCD0404.slice(84,96)

		dataCD0404_7 = dataCD0404.slice(96,108)
		dataCD0404_8 = dataCD0404.slice(108,120)
		dataCD0404_9 = dataCD0404.slice(120,132)
		dataCD0404_10 = dataCD0404.slice(132,144)

		dataCD0404_11 = dataCD0404.slice(144,156)
		dataCD0404_12 = dataCD0404.slice(156,168)
		dataCD0404_13 = dataCD0404.slice(168,180)
		dataCD0404_14 = dataCD0404.slice(180,192)

		io.emit('dataCD0404_23', dataCD0404_23);
		io.emit('dataCD0404_0', dataCD0404_1);
		io.emit('dataCD0404_1', dataCD0404_2);
		io.emit('dataCD0404_2', dataCD0404_3);
		io.emit('dataCD0404_3', dataCD0404_4);
		io.emit('dataCD0404_4', dataCD0404_5);
		io.emit('dataCD0404_5', dataCD0404_6);
		io.emit('dataCD0404_6', dataCD0404_7);
		io.emit('dataCD0404_7', dataCD0404_8);
		io.emit('dataCD0404_8', dataCD0404_9);
		io.emit('dataCD0404_9', dataCD0404_10);
		io.emit('dataCD0404_10', dataCD0404_11);
		io.emit('dataCD0404_11', dataCD0404_12);
		io.emit('dataCD0404_12', dataCD0404_13);
		io.emit('dataCD0404_13', dataCD0404_14);
		io.emit('dataCD0404_14', dataCD0404_14);

}

if(topic === 'IOT/TopicCD0405'){
//Xử lý topic CD0405
console.log(' Day la topic CD0405----------------')
console.log(topic, message.toString())
console.log('my name is toan CD0405')
console.log('----------------')
	
		var dataCD0405;
		var dataCD0405_15;
		var dataCD0405_16;
		var dataCD0405_17;
		var dataCD0405_18;
		var dataCD0405_19;
		var dataCD0405_20;
		var dataCD0405_21;
		var dataCD0405_22;


		dataCD0405 = message.toString()
		dataCD0405_15 = dataCD0405.slice(0,12)
		dataCD0405_16 = dataCD0405.slice(12,24)
		dataCD0405_17 = dataCD0405.slice(24,36)
		dataCD0405_18 = dataCD0405.slice(36,48)

		dataCD0405_19 = dataCD0405.slice(48,60)
		dataCD0405_20 = dataCD0405.slice(60,72)
		dataCD0405_21 = dataCD0405.slice(72,84)
		dataCD0405_22 = dataCD0405.slice(84,96)


		io.emit('dataCD0405_15', dataCD0405_15);
		io.emit('dataCD0405_16', dataCD0405_16);
		io.emit('dataCD0405_17', dataCD0405_17);
		io.emit('dataCD0405_18', dataCD0405_18);
		io.emit('dataCD0405_19', dataCD0405_19);
		io.emit('dataCD0405_20', dataCD0405_20);
		io.emit('dataCD0405_21', dataCD0405_21);
		io.emit('dataCD0405_22', dataCD0405_22);
}
	
})




/////////////////////////////////////////////

////////////////////////////////////////////


// PLC 02 Cam Đường: Điều khiển Van DN200, cấp bùn

client.on('connect', function (){
	client.subscribe('IOT/TopicCD11', function (err) {
	  if (!err) {
		client.publish('IOT/TopicCD11', 'Error Socket IO: IoT/TopicCD11')
	  }
	})
  
  })
  
  
  var count_to_save_databaseCD11 = 0;
  client.on('message', function (topic, message){
  if(topic === 'IOT/TopicCD11'){
	  //Xử lý topic CD11
	  console.log(' Day la topic CD11----------------')
	  console.log(topic, message.toString())
	  console.log('my name is toan CD11')
	  console.log('----------------')
	  
		  var dataCD11;
		  var dataCD11_1;
		  var dataCD11_2;
		  var dataCD11_3;
		  var dataCD11_4;
		  var dataCD11_5;
		  var dataCD11_6;
		  var dataCD11_7;
		  var dataCD11_8;
		  var dataCD11_9;
		  var dataCD11_10;
		  var dataCD11_11;
		  var dataCD11_12;
		  var dataCD11_13;
		  var dataCD11_14;
		  var dataCD11_15;
		  var dataCD11_16;
		  var dataCD11_17;
		  var dataCD11_18;
		  var dataCD11_19;
		  var dataCD11_20;
  
  
		  dataCD11 = message.toString()
		  dataCD11_1 = dataCD11.slice(0,12)
		  dataCD11_2 = dataCD11.slice(12,24)
		  dataCD11_3 = dataCD11.slice(24,36)
		  dataCD11_4 = dataCD11.slice(36,48)
  
		  dataCD11_5 = dataCD11.slice(48,60)
		  dataCD11_6 = dataCD11.slice(60,72)
		  dataCD11_7 = dataCD11.slice(72,84)
		  dataCD11_8 = dataCD11.slice(84,96)
  
		  dataCD11_9 = dataCD11.slice(96,108)
		  dataCD11_10 = dataCD11.slice(108,120)
		  dataCD11_11 = dataCD11.slice(120,132)
		  dataCD11_12 = dataCD11.slice(132,144)	
  
		  dataCD11_13 = dataCD11.slice(144,156)
		  dataCD11_14 = dataCD11.slice(156,168)
		  dataCD11_15 = dataCD11.slice(168,180)
  
		  dataCD11_16 = dataCD11.slice(180,192)
		  dataCD11_17 = dataCD11.slice(192,204)
		  dataCD11_18 = dataCD11.slice(204,216)
		  dataCD11_19 = dataCD11.slice(216,228)
		  dataCD11_20 = dataCD11.slice(228,240)
	  
		
	  
	  
	  
  
		  io.emit('dataCD11_1', dataCD11_1);
		  io.emit('dataCD11_2', dataCD11_2);
		  io.emit('dataCD11_3', dataCD11_3);
		  io.emit('dataCD11_4', dataCD11_4);
		  io.emit('dataCD11_5', dataCD11_5);
		  io.emit('dataCD11_6', dataCD11_6);
		  io.emit('dataCD11_7', dataCD11_7);
		  io.emit('dataCD11_8', dataCD11_8);
		  io.emit('dataCD11_9', dataCD11_9);
		  io.emit('dataCD11_10', dataCD11_10);
		  io.emit('dataCD11_11', dataCD11_11);
		  io.emit('dataCD11_12', dataCD11_12);
		  io.emit('dataCD11_13', dataCD11_13);
		  io.emit('dataCD11_14', dataCD11_14);
		  io.emit('dataCD11_15', dataCD11_15);
		  io.emit('dataCD11_16', dataCD11_16);
		  io.emit('dataCD11_17', dataCD11_17);
		  io.emit('dataCD11_18', dataCD11_18);
		  io.emit('dataCD11_19', dataCD11_19);
		  io.emit('dataCD11_20', dataCD11_20);	





		var StatusCD11_1;
		var StatusCD11_2;
		var StatusCD11_3;
		var StatusCD11_4;
	

	if(dataCD11_4 == 0){
		StatusCD11_1 = "STOP";
		}
		else if(dataCD11_4 == 1){
			StatusCD11_1 = "AUTO";
	   }
	   else if(dataCD11_4 == 2){
		StatusCD11_1 = "MAN";
   }
		else{
			StatusCD11_1 = "ERROR";           
		}
	
	if(dataCD11_5 == 1){
		StatusCD11_2 = "ERROR";
		}
		else{
			StatusCD11_2 = "NORMAL";           
		}
	if(dataCD11_6 == 1){
		StatusCD11_3 = "ON";
		}
		else{
			StatusCD11_3 = "OFF";           
		}
	if(dataCD11_7 == 1){
		StatusCD11_4 = "ON";
		}
		else{
			StatusCD11_4 = "OFF";           
		}
	
	io.emit('StatusCD11_1', StatusCD11_1);
	io.emit('StatusCD11_2', StatusCD11_2);
	io.emit('StatusCD11_3', StatusCD11_3);
	io.emit('StatusCD11_4', StatusCD11_4);


  }
    
  })
  
  
  /////////////////////////////////////////////

