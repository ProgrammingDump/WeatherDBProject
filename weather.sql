drop database IF EXISTS Weather;

create database Weather;

USE Weather;

create table Cities(City_ID int primary key not null auto_increment,
					City_Name varchar(45) not null,
                    Province varchar(45) not null,
                    Country varchar(45) not null);
                    
create table Stations(Station_ID int primary key not null,
						Latitude decimal(9,7) not null,
                        Longitude decimal(9,7) not null,
                        Altitude decimal(6,2) not null,
                        City_ID int not null,
                        
                        FOREIGN KEY (City_ID) REFERENCES Cities(City_ID)
                        ON UPDATE CASCADE ON DELETE CASCADE);
                        
create table WeatherConditions(Condition_ID int primary key not null auto_increment,
								Cond_Name varchar(45) not null);
                        
create table Measurements(Measurement_ID int primary key not null,
							Temperature decimal(4,1) not null,
                            Humidity decimal(5,2) not null,
                            Precipitation decimal(5,2) not null,
                            Wind_Speed decimal(5,2) not null,
                            Condition_ID int not null,
                            
                            FOREIGN KEY (Condition_ID) REFERENCES WeatherConditions(Condition_ID)
							ON UPDATE CASCADE ON DELETE CASCADE);
                        
create table WeatherData(Weather_ID int primary key not null auto_increment,
						Dates date not null,
                        Station_ID int not null,
                        Measurement_ID int not null,
                        
                        FOREIGN KEY (Station_ID) REFERENCES Stations(Station_ID)
						ON UPDATE CASCADE ON DELETE CASCADE,
                        FOREIGN KEY (Measurement_ID) REFERENCES Measurements(Measurement_ID)
						ON UPDATE CASCADE ON DELETE CASCADE);
                        
create table Alerts(Alert_ID int primary key not null auto_increment,
					Alert_Name varchar(45) not null);
                    
create table Forecasts(Forecast_ID int primary key not null,
						Date date not null,
                        Alert_ID int,
                        Measurement_ID int not null,
                        City_ID int not null,
                        
                        FOREIGN KEY (Alert_ID) REFERENCES Alerts(Alert_ID)
						ON UPDATE CASCADE ON DELETE CASCADE,
                        FOREIGN KEY (Measurement_ID) REFERENCES Measurements(Measurement_ID)
						ON UPDATE CASCADE ON DELETE CASCADE,
                        FOREIGN KEY (City_ID) REFERENCES Cities(City_ID)
						ON UPDATE CASCADE ON DELETE CASCADE);
                        

insert into cities(City_Name, Province, Country)
values ('Lahore', 'Punjab', 'Pakistan'),
		('Karachi', 'Sindh', 'Pakistan'),
        ('Islamabad', 'Federal', 'Pakistan');
        
insert into Stations
values	(11, 31.60009, 74.41830, 214.2, 1),
		(12, 31.42030, 74.43443, 208.3, 1),
        (13, 31.44256, 74.21333, 206.0, 1),
        (21, 24.78033, 67.07634, 3.5, 2),
        (22, 24.92612, 67.23152, 42.5, 2),
        (23, 24.91740, 66.97472, 59.4, 2),
        (31, 33.74488, 73.09213, 621.7, 3),
        (32, 33.71404, 73.02480, 569.8, 3),
        (33, 33.65688, 72.99608, 559.9, 3);
        
insert into WeatherConditions (Cond_Name)
values	('Sunny'),
		('Cloudy'),
        ('Rain'),
        ('Snow'),
        ('Storm');
        
insert into Measurements
values	(1001, 35.2, 0.66, 0.1, 11, 2),
		(1002, 37.5, 0.27, 0, 18, 1),
		(1003, 38.1, 0.24, 0, 21, 1),
        (1004, 33.6, 0.79, 0.3, 29, 2),
        (1005, 33.4, 0.51, 0.1, 26, 2),
        (1006, 33.1, 0.52, 0.1, 27, 2),
        (1007, 34.2, 0.27, 0, 18, 1),
        (1008, 34.9, 0.24, 0, 19, 1),
        (1009, 36.0, 0.22, 0, 16, 1),
        (2001, 29.1, 0.61, 0.84, 27, 5),
        (2002, 35.6, 0.55, 0.91, 31, 1),
        (2003, 25.9, 0.63, 0.89, 32, 2);
        
insert into WeatherData (Dates, Station_ID, Measurement_ID)
values	('2023-01-01', 11, 1001),
		('2023-01-01', 12, 1002),
        ('2023-01-01', 13, 1003),
        ('2023-01-01', 21, 1004),
        ('2023-01-01', 22, 1005),
        ('2023-01-01', 23, 1006),
        ('2023-01-01', 31, 1007),
        ('2023-01-01', 32, 1008),
        ('2023-01-01', 33, 1009);
        
insert into Alerts (Alert_Name)
values	('Blizzard'),
		('Tornado'),
        ('Hail Storm'),
        ('Dust Storm');
        
insert into Forecasts
values	(11, '2023-01-04', 3, 2001, 1),
		(21, '2023-01-04', NULL, 2002, 2),
        (31, '2023-01-04', NULL, 2003, 3);


create table loginuser(user_id int not null auto_increment primary key,
						user_name varchar(45),
                        user_email varchar(45),
                        user_pass varchar(45),
                        admin boolean);
                        
insert into loginuser (user_name, user_email, user_pass, admin)
values	('aa','aa@gmail.com', 'pass', true),
		('bb','bb@gmail.com', 'pass', false);
