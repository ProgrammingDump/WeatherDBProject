var con = require('./connection');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(session({
    key: "userId",
    secret:"abc", 
    resave: false, 
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    },

}));
app.use(cookieParser());
app.use("/assets", express.static(__dirname + "/weather"));

app.get('/', function(req,res)
{
    req.session.user = null;
    res.sendFile(__dirname + '/login.html')
});
app.use(express.static('assets'));

app.post("/", function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    con.query("select * from loginuser where user_name = ? and user_pass = ?",[username,password],function(error,results,fields){
        if (results.length > 0) {
            req.session.user = results;
            console.log(req.session.user);
            res.redirect("/Home");
        } 
        else {
            res.redirect("/");
        }
        res.end();
    })
})


app.get("/register",function(req,res){
    res.sendFile(__dirname + "/register.html")
})

app.post('/register', function(req,res)
{
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    con.connect(function(error)
    {
    if(error) throw error;

    con.query("select * from loginuser where user_name = ?",[username],function(error,results,fields){
        if (results.length > 0){
            console.log("Username Already exists")
            res.redirect("/register");
        }
        else {

            con.query("select * from loginuser where user_email = ?",[email],function(error,results,fields){
                if (results.length > 0){
                    console.log("Email Already exists")
                    res.redirect("/register");
                }
                else {
                    var sql = "insert into loginuser (user_name, user_email, user_pass, admin) values('"+username+"','"+email+"','"+password+"','0')";
            
                    con.query(sql, function(error,result){
                        if(error) throw error;
                        res.redirect("/");
                    })
                }
            })

            
        }
    })
    
    

   });
});

app.get("/Home",function(req,res){
    if(!req.session.user) {
        res.redirect("/");
    }
    else {
        var userIn = req.session.user;

        res.render(__dirname + "/assets/Home", {
            users: userIn
        });
    }
    
})

app.get('/lahore', function(req,res){
    if(!req.session.user) {
        res.redirect("/");
    }
    else{
        con.connect(function(error)
        {
        if(error) throw error;
        
        var sql = "select ROUND(Avg(Temperature), 0) AS Temperature, ROUND((Avg(Humidity)*100), 1) AS Humidity, ROUND((Avg(Precipitation)*100), 1) AS Precipitation, ROUND(Avg(Wind_Speed), 1) AS Wind_Speed from measurements natural join weatherdata natural join stations natural join cities natural join weatherconditions where City_ID = 1;";
        var sql2 = "select Cond_Name, City_Name from measurements natural join weatherconditions natural join stations natural join weatherdata natural join cities where city_ID = 1;";
        var sql3 = "select * from measurements natural join forecasts natural join weatherconditions left join alerts on forecasts.Alert_ID = alerts.Alert_ID where City_ID = 1";
        var sql4 = "select ROUND(Avg(Temperature), 0) AS Temperature, ROUND(Avg(Humidity), 0) AS Humidity, ROUND(Avg(Precipitation), 0) AS Precipitation, ROUND(Avg(Wind_Speed), 0) AS Wind_Speed from measurements natural join forecasts natural join weatherconditions left join alerts on forecasts.Alert_ID = alerts.Alert_ID where City_ID = 1;";
        var userIn = req.session.user;
        //console.log(userIn);

        con.query(sql, function(error,result){
            if(error) throw error;

            con.query(sql2, function(error2,result2){
                if(error2) throw error2;

                con.query(sql3, function(error3,result3){
                    if(error3) throw error3;
                    
                    con.query(sql4, function(error4,result4){
                        if(error4) throw error4;

                        res.render(__dirname + '/assets/weather', {
                            weather: result,
                            weather2: result2,
                            forecast: result3,
                            forecast2: result4,
                            users: userIn
                        });
                    })
                    
                });
                
            });
        });
        });
    }
    
});

app.get('/karachi', function(req,res){
    if(!req.session.user) {
        res.redirect("/");
    }
    else{
        con.connect(function(error)
        {
        if(error) throw error;
        
        var sql = "select ROUND(Avg(Temperature), 0) AS Temperature, ROUND((Avg(Humidity)*100), 1) AS Humidity, ROUND((Avg(Precipitation)*100), 1) AS Precipitation, ROUND(Avg(Wind_Speed), 1) AS Wind_Speed from measurements natural join weatherdata natural join stations natural join cities natural join weatherconditions where City_ID = 2;";
        var sql2 = "select Cond_Name, City_Name from measurements natural join weatherconditions natural join stations natural join weatherdata natural join cities where city_ID = 2;";
        var sql3 = "select * from measurements natural join forecasts natural join weatherconditions left join alerts on forecasts.Alert_ID = alerts.Alert_ID where City_ID = 2";
        var sql4 = "select ROUND(Avg(Temperature), 0) AS Temperature, ROUND(Avg(Humidity), 0) AS Humidity, ROUND(Avg(Precipitation), 0) AS Precipitation, ROUND(Avg(Wind_Speed), 0) AS Wind_Speed from measurements natural join forecasts natural join weatherconditions left join alerts on forecasts.Alert_ID = alerts.Alert_ID where City_ID = 2;";
        var userIn = req.session.user;
        //console.log(userIn);

        con.query(sql, function(error,result){
            if(error) throw error;

            con.query(sql2, function(error2,result2){
                if(error2) throw error2;

                con.query(sql3, function(error3,result3){
                    if(error3) throw error3;
                    
                    con.query(sql4, function(error4,result4){
                        if(error4) throw error4;

                        res.render(__dirname + '/assets/weather', {
                            weather: result,
                            weather2: result2,
                            forecast: result3,
                            forecast2: result4,
                            users: userIn
                        });
                    })
                    
                });
                
            });
        });
        });
    }
    
});

app.get('/islamabad', function(req,res){
    if(!req.session.user) {
        res.redirect("/");
    }
    else{
        con.connect(function(error)
        {
        if(error) throw error;
        
        var sql = "select ROUND(Avg(Temperature), 0) AS Temperature, ROUND((Avg(Humidity)*100), 1) AS Humidity, ROUND((Avg(Precipitation)*100), 1) AS Precipitation, ROUND(Avg(Wind_Speed), 1) AS Wind_Speed from measurements natural join weatherdata natural join stations natural join cities natural join weatherconditions where City_ID = 3;";
        var sql2 = "select Cond_Name, City_Name from measurements natural join weatherconditions natural join stations natural join weatherdata natural join cities where city_ID = 3;";
        var sql3 = "select * from measurements natural join forecasts natural join weatherconditions left join alerts on forecasts.Alert_ID = alerts.Alert_ID where City_ID = 3";
        var sql4 = "select ROUND(Avg(Temperature), 0) AS Temperature, ROUND(Avg(Humidity), 0) AS Humidity, ROUND(Avg(Precipitation), 0) AS Precipitation, ROUND(Avg(Wind_Speed), 0) AS Wind_Speed from measurements natural join forecasts natural join weatherconditions left join alerts on forecasts.Alert_ID = alerts.Alert_ID where City_ID = 3;";
        var userIn = req.session.user;
        //console.log(userIn);

        con.query(sql, function(error,result){
            if(error) throw error;

            con.query(sql2, function(error2,result2){
                if(error2) throw error2;

                con.query(sql3, function(error3,result3){
                    if(error3) throw error3;
                    
                    con.query(sql4, function(error4,result4){
                        if(error4) throw error4;

                        res.render(__dirname + '/assets/weather', {
                            weather: result,
                            weather2: result2,
                            forecast: result3,
                            forecast2: result4,
                            users: userIn
                        });
                    })
                    
                });
                
            });
        });
        });
    }
    
});

app.get("/DataEntry",function(req,res){
    if(!req.session.user) {
        res.redirect("/");
    }
    else {
        var userIn2 = req.session.user;

        res.render(__dirname + '/assets/DataEntry', {
            users: userIn2
        });
        
        
    }
})

app.get("/ForecastEntry",function(req,res){
    if(!req.session.user) {
        res.redirect("/");
    }
    else {
        var userIn2 = req.session.user;

        res.render(__dirname + '/assets/ForecastEntry', {
            users: userIn2
        });
        
        
    }
})

app.post('/Entry', function(req,res)
{
    var StationID = req.body.StationID;
    var WeatherDataID = req.body.WeatherDataID;
    var Date = req.body.Date;
    var MeasurementID = req.body.MeasurementID;
    var Temperature = req.body.Temperature;
    var Humidity = req.body.Humidity;
    var Precipitation = req.body.Precipitation;
    var WindSpeed = req.body.WindSpeed;
    var ConditionID = req.body.ConditionID;

    con.connect(function(error)
    {
        if(error) throw error;

        var sql = "insert into Measurements values('"+MeasurementID+"','"+Temperature+"','"+Humidity+"','"+Precipitation+"','"+WindSpeed+"','"+ConditionID+"')";
        var sql2 = "insert into WeatherData values('"+WeatherDataID+"','"+Date+"','"+StationID+"','"+MeasurementID+"')"
            
        con.query(sql, function(error,result){
            if(error) throw error;

            con.query(sql2, function(error,result){
                if(error) throw error;
                res.redirect("/Home");
            })
        
        })
    
    

   });
});

app.post('/Entry2', function(req,res)
{
    var CityID = req.body.CityID;
    var ForecastID = req.body.ForecastID;
    var Date = req.body.Date;
    var MeasurementID = req.body.MeasurementID;
    var Temperature = req.body.Temperature;
    var Humidity = req.body.Humidity;
    var Precipitation = req.body.Precipitation;
    var WindSpeed = req.body.WindSpeed;
    var ConditionID = req.body.ConditionID;
    var AlertID = req.body.AlertID;

    if(!AlertID || AlertID == '')
    {
        AlertID = null;
    }

    con.connect(function(error)
    {
        if(error) throw error;

        var sql = "insert into Measurements values('"+MeasurementID+"','"+Temperature+"','"+Humidity+"','"+Precipitation+"','"+WindSpeed+"','"+ConditionID+"')";

        if(!AlertID || AlertID == ''){
            var sql2 = "insert into forecasts(Forecast_ID, Date, Measurement_ID, City_ID) values('"+ForecastID+"','"+Date+"','"+MeasurementID+"','"+CityID+"')"
        }
        else
        {
            var sql2 = "insert into forecasts values('"+ForecastID+"','"+Date+"','"+AlertID+"','"+MeasurementID+"','"+CityID+"')"
        }
        
            
        con.query(sql, function(error,result){
            if(error) throw error;

            con.query(sql2, function(error,result){
                if(error) throw error;
                res.redirect("/Home");
            })
        
        })
    
    

   });
});

app.listen(7500);