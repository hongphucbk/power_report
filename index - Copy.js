var express = require("express");
const excel = require('node-excel-export');
var moment = require('moment');
var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");

var server = require("http").Server(app);
var io = require('socket.io')(server);
app.listen(3000);

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

var data2Schema = new mongoose.Schema({
	timestamp: Date,
	station2: Number,
	nhietdo2: Number,
	pH2: Number,
	oxy2: Number,
	doman2: Number,
	note2: String,	
});
var DB_DATA2 = mongoose.model('DB_DATA2', data2Schema, 'data2');


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
			if(user.role == "admin11"){
				res.cookie('userId', user.id);
				res.redirect("/home02")	
		
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

//-------------------------------------------------------------------
//Socket IO
server.listen(3001, function(){
	console.log('Socket io listening on *:3001');

});

//=========================================================
var mqtt = require('mqtt')
var client  = mqtt.connect('http://27.71.231.45:1883')
 
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
var count_to_save_database2 = 0;





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
	
	 		 
	 
	 
//	console.log(data02_3);
//	console.log(data02_4);
//	console.log(data02_H1);
//	console.log(data02_H2);
//	console.log(data02_H3);
//	console.log(data02_H4);
//	console.log(data02_H5);
//	console.log(data02_H6);
//	console.log(data02_H7);
//	console.log(data02_H8);


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
	// 60s luu 1 lan
	if(count_to_save_database > 60 ){
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

		DB_DATA.insertMany(saveData, function(err) {
			if (err) return "Error";
		});
		count_to_save_database = 0;
	}

		count_to_save_database2 = count_to_save_database2 +1;
	// 30s luu 1 lan
	if(count_to_save_database2 > 30 ){
		var saveData = { 
			timestamp: new Date(),
			station2: 2,
			nhietdo2: parseFloat(data8),
			pH2: parseFloat(data9),
			oxy2: parseFloat(data10),
			doman2: parseFloat(data11)
		}
		//console.log('saveData: ', saveData);

		DB_DATA2.insertMany(saveData, function(err) {
			if (err) return "Error";
		});
		count_to_save_database2 = 0;
	}
	
	
	
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

io.on('connection', function(socket){
	console.log('a user connected');
	io.emit('data02', "Hello user: " + socket.id);
    
	socket.on("data02_31", function(data02_2){
	var s = data02_2;
	//socket.emit('s', data2);
	//console.log(data02_2);
	//console.log("s = " + s);
 //client.on('connect', function (){
 	client.publish('demo/write2', s)
   //});
	});
});




client.on('connect', function (){
  client.subscribe('IOT/Topic101', function (err) {
    if (!err) {
      client.publish('IOT/Topic101', 'Error Socket IO: IoT/Topic101')
    }
  })

})

client.on('message', function (topic, message){
if(topic === 'IOT/Topic101'){
	//Xử lý topic 101
 	console.log(' Day la topic 101----------------')
  	console.log(topic, message.toString())
	console.log('my name is toan')
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
	data101_3 = data101.slice(0,4)
	data101_4 = data101.slice(4,8)
	data101_5 = data101.slice(8,12)
	data101_6 = data101.slice(12,16)
	
	
	
	
  data101_7 = data101.slice(16,20)
  data101_8 = data101.slice(20,24)
  data101_9 = data101.slice(24,28)
  data101_10 = data101.slice(28,32)

	
  data101_11 = data101.slice(32,36)
  data101_12 = data101.slice(36,40)
  data101_13 = data101.slice(40,41)
  data101_14 = data101.slice(41,42)
	
	
	
	
  data101_15 = data101.slice(42,43)
  data101_16 = data101.slice(43,44)
  data101_17 = data101.slice(44,45)
  
  data101_18 = data101.slice(45,51)
  data101_19 = data101.slice(51,57)
  data101_20 = data101.slice(57,63)
  data101_21 = data101.slice(63,69)
  data101_22 = data101.slice(69,75)
	
	
	
	
		if(data101_13 == 1){
			 Status101_1 = "Rửa tự động";
		}
		else if(data101_13 == 2){
			 Status101_1 = "Rửa chế độ tay";
		}
		else if(data101_13 == 3){
			 Status101_1 = "Cấp Hóa Chất";
		}	
		else{
			 Status101_1 = "Dừng hoạt động";           
		}

		if(data101_14 == 1){
			 Status101_2 = "Rửa tự động";
		}
		else if(data101_14 == 2){
			 Status101_2 = "Rửa chế độ tay";
		}
		else if(data101_14 == 3){
			 Status101_2 = "Cấp Hóa Chất";
		}
		else{
			 Status101_2 = "Dừng hoạt động";           
		}

	
		if(data101_15 == 1){
			 Status101_3 = "Rửa tự động";
		}
		else if(data101_15 == 2){
			 Status101_3 = "Rửa chế độ tay";
		}
		else if(data101_15 == 3){
			 Status101_3 = "Cấp thuốc tuyển";
		}
		else{
			 Status101_3 = "Dừng hoạt động";           
		}

		if(data101_16 == 1){
			 Status101_4 = "Rửa tự động";
		}
		else if(data101_16 == 2){
			 Status101_4 = "Rửa chế độ tay";
		}
		else if(data101_16 == 3){
			 Status101_4 = "Cấp thuốc tuyển";
		}
		else{
			 Status101_4 = "Dừng hoạt động";           
		}

		if(data101_17 == 1){
			 Status101_5 = "Rửa tự động";
		}
		else if(data101_17 == 2){
			 Status101_5 = "Rửa chế độ tay";
		}
		else if(data101_17 == 3){
			 Status101_5 = "Cấp thuốc tuyển";
		}
		else{
			 Status101_5 = "Chế độ tay";           
		}
	
	
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
		
	
	io.emit('Status101_1', Status101_1);
	io.emit('Status101_2', Status101_2);
	io.emit('Status101_3', Status101_3);
	io.emit('Status101_4', Status101_4);
	io.emit('Status101_5', Status101_5);
 }
})



