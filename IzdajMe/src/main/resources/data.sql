delete from account_delete_requests where id!=0;
delete from cottage_reservations where id!=0;
delete from ship_reservations where id!=0;
delete from favor_reservations where id!=0;
delete from cottages_hot_offers where cottage_id!=0;
delete from ships_hot_offers where ship_id!=0;
delete from favors_hot_offers where instructors_favor_id!=0;
delete from cottages_price_list where cottage_id!=0;
delete from ships_price_list where ship_id!=0;
delete from favors_price_list where instructors_favor_id!=0;
delete from hot_offers where id!=0;
delete from ship_hot_offers where id!=0;
delete from favor_hot_offers where id!=0;
delete from service_price where id!=0;
delete from ship_service_price where id!=0;
delete from favor_service_price where id!=0;
delete from ships_grades where ship_id!=0;
delete from cottages_grades where cottage_id!=0;
delete from grades where id!=0;
delete from cottages where id!=0;
delete from favors where id!=0;
delete from spring_session where primary_id!='0';
delete from spring_session_attributes where session_primary_id!='0';
delete from ships where id!=0;
delete from users where id!=0;
delete from reports where id!=0;
delete from penalties where id!=0;

insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified)
values (1, 'Ilije 1', 'Beograd', 'Srbija', 'rajkorajkoza@gmail.com', 'Milan', 'Govedarica', 123123123, 'aaaa', 'Izdaja vikendice', 0, TRUE);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified)
values (2, 'Banjalucka 2', 'Banjaluka', 'Bosna', 'popaljubav@gmail.com', 'Miodrag', 'Prod', 111222333, 'aaaa', null, 0, TRUE);
insert into users (id, address, city, country, email, first_name, last_name, mobile_number, password, reason, role, verified)
values (3, 'Focanska 2', 'Foca', 'Bosna', 'foca@gmail.com', 'Coa', 'Podunavac', 064456456, 'aaaa', 'reason', 1, TRUE);
insert into users (id, address, city, country, email, first_name, last_name, mobile_number, password, reason, role, verified)
values (4, 'Sarajevska 4', 'Sarajevo', 'FBiH', 'sar4@gmail.com', 'Dragan', 'Radic', 065189898, 'aaaa', null, 2, TRUE);
insert into users (id, address, city, country, email, first_name, last_name, mobile_number, password, reason, role, verified)
values (5, 'Focanska 5', 'Foca', 'RS', 'foca5@gmail.com', 'Zoran', 'Puric', 060124785, 'aaaa', null, 2, TRUE);
insert into users (id, address, city, country, email, first_name, last_name, mobile_number, password, reason, role, verified)
values (6, 'Focanska 6', 'Foca', 'RS', 'foca6@gmail.com', 'Goran', 'Kitic', 065741963, 'aaaa', null, 2, TRUE);
insert into users (id, address, city, country, email, first_name, last_name, mobile_number, password, reason, role, verified)
values (7, 'Sarajevska 7', 'Sarajevo', 'FBiH', 'sar7@gmail.com', 'Marko', 'Vojinovic', 064456456, 'aaaa', null, 2, TRUE);
insert into users (id, address, city, country, email, first_name, last_name, mobile_number, password, reason, role, verified)
values (8, 'Focanska 8', 'Foca', 'RS', 'foca8@gmail.com', 'Darko', 'Bodiroga', 066589001, 'aaaa', null, 2, TRUE);
insert into users (id, address, city, country, email, first_name, last_name, mobile_number, password, reason, role, verified)
values (9, 'Focanska 9', 'Foca', 'RS', 'foca9@gmail.com', 'Luka', 'Lukovic', 058212546, 'aaaa', null, 4, TRUE);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified)
values (10, 'Njegoseva 1', 'Subotica', 'Srbija', 'vrbica.vlado11@gmail.com', 'Vladimir', 'Vrbica', '123123123123', 'vrba', '', 3, TRUE);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified)
values (11, 'Nemanjina 2', 'Srbobran', 'Srbija', 'nikola.aleksic@gmail.com', 'Nikola', 'Aleksic', '22222222222', 'leksa', '', 4, TRUE);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified)
values (12, 'Kralja Petra 12a', 'Becej', 'Srbija', 'milos.zivic@gmail.com', 'Milos', 'Zivic', '222222222222', 'zile', '', 5, TRUE);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified)
values (13, 'Vozdovacka 12', 'Beograd', 'Srbija', 'vesnakundacina852@gmail.com', 'Vesna', 'Kundacina', 123123123, 'aaaa', 'Izdaja vikendice', 0, FALSE);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified)
values (14, 'Kralja Aleksandra 12a', 'Uzice', 'Srbija', 'peraperic@gmail.com', 'Pera', 'Peric', '222222222222', 'aaaa', '', 6, TRUE);

insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (1, 'Dunavska 1',DATE('2021-09-01'),DATE('2022-02-01'),'Na jezeru',null, 'Micova', 3, 3, 'Nisu dozvoljene zivotinje', null, 1, 50);
insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (2, 'Dunavska 2',DATE('2021-08-22'),DATE('2021-10-01'),'Blizu jezera',null, 'Popici', 3, 3, 'Nisu dozvoljene zivotinje', null, 1, 30);

insert into ships(id, owner_id, available_from, available_till, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules,fishing_equipment,cancel_requirements,cost_per_night)
values (1, 3,DATE('2021-09-01'),DATE('2022-02-01'), 'Shipfirst', 'typeone', 72, '123a456', 157, 245, null, 'Nikole Tesle 1', 'Description', null, 20, 'pravila',null,'free',90);
insert into ships(id, owner_id, available_from, available_till, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules,fishing_equipment,cancel_requirements,cost_per_night)
values (2, 3,DATE('2021-09-01'),DATE('2022-02-01'), 'Shipsecond', 'typetwo', 49, '123b456', 164, 275, null, 'Nikole Tesle 2', 'Description', null, 10, 'pravila',null,'free',80);
insert into ships(id, owner_id, available_from, available_till, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules,fishing_equipment,cancel_requirements,cost_per_night)
values (3, 3,DATE('2021-09-01'),DATE('2022-02-01'), 'Shipfifth', 'typethree', 67, '123c456', 130, 223, null, 'Nikole Tesle 3', 'Description', null, 30, 'pravila',null,'free',70);
insert into ships(id, owner_id, available_from, available_till, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules,fishing_equipment,cancel_requirements,cost_per_night)
values (4, 3,DATE('2021-09-01'),DATE('2022-02-01'), 'Shipneki', 'typefour', 113, '123d456', 172, 289, null, 'Nikole Tesle 4', 'Description', null, 25, 'pravila',null,'free',60);
insert into ships(id, owner_id, available_from, available_till, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules,fishing_equipment,cancel_requirements,cost_per_night)
values (5, 3,DATE('2021-09-01'),DATE('2022-02-01'), 'Ship', 'typefifth', 84, '123e456', 117, 200, null, 'Nikole Tesle 5', 'Description', null, 15, 'pravila',null,'free',50);

insert into grades(id, user_id, value, comment, seen)
values (1, 3, 7 , 'Not too bad', false);
insert into grades(id, user_id, value, comment, seen)
values (2, 3, 7, 'Not too baaad', false);
insert into grades(id, user_id, value, comment, seen)
values (3, 3, 6, 'Bad', false);
insert into grades(id, user_id, value, comment, seen)
values (4, 3, 9, 'Very good', false);
insert into grades(id, user_id, value, comment, seen)
values (5, 3, 8, 'Good', false);

insert into grades(id, user_id, value, comment, seen)
values (6, 3, 7 , 'Not too bad', false);
insert into grades(id, user_id, value, comment, seen)
values (7, 3, 7, 'Not too baaad', false);
insert into grades(id, user_id, value, comment, seen)
values (8, 3, 6, 'Bad', false);
insert into grades(id, user_id, value, comment, seen)
values (9, 3, 9, 'Very good', false);
insert into grades(id, user_id, value, comment, seen)
values (10, 3, 8, 'Good', false);

insert into favors (id, instructor_id, name, address, description, images, num_of_persons, rules, services, cost, available_from, available_till, cancellation_condition)
values (1, 4, 'Cas pecanja', 'Ribarac', 'Pecanje pecaljkom', null, 4, 'Samo punoletni mogu', null, 1200, DATE('2022-02-01'), DATE('2022-02-17'), 'Free');
insert into favors (id, instructor_id, name, address, description, images, num_of_persons, rules, services, cost, available_from, available_till, cancellation_condition)
values (2, 4, 'Cas pecanja', 'Ribarac', 'Pecanje mrezom', null, 10, 'Samo punoletni mogu', null, 1000, DATE('2022-01-04'), DATE('2022-01-26'), '5%');
insert into favors (id, instructor_id, name, address, description, images, num_of_persons, rules, services, cost, available_from, available_till, cancellation_condition)
values (3, 4, 'Isplovljavanje', 'Ribarac', 'Plovidba camcom i pecanje', null, 2, 'Samo punoletni mogu', null, 2000, DATE('2022-02-01'), DATE('2022-02-27'), '10%');
insert into favors (id, instructor_id, name, address, description, images, num_of_persons, rules, services, cost, available_from, available_till, cancellation_condition)
values (4, 4, 'Pravljenje mamca', 'Ribarac', 'Mamac', null, 3, 'Samo punoletni mogu', null, 500, DATE('2022-01-01'), DATE('2022-02-1'), '15%');

insert into ships_grades(ship_id, grades_id) values (1, 1);
insert into ships_grades(ship_id, grades_id) values (1, 2);
insert into ships_grades(ship_id, grades_id) values (1, 3);
insert into ships_grades(ship_id, grades_id) values (1, 4);
insert into ships_grades(ship_id, grades_id) values (1, 5);

insert into cottages_grades(cottage_id, grades_id) values (1, 6);
insert into cottages_grades(cottage_id, grades_id) values (1, 7);
insert into cottages_grades(cottage_id, grades_id) values (1, 8);
insert into cottages_grades(cottage_id, grades_id) values (1, 9);
insert into cottages_grades(cottage_id, grades_id) values (1, 10);

insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (1,DATE('2021-11-20'),DATE('2021-11-25'),50,TRUE,3,null);
insert into cottages_hot_offers(cottage_id,hot_offers_id) values (1,1);
insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (2,DATE('2021-12-16'),DATE('2021-12-19'),28,TRUE,4,null);
insert into cottages_hot_offers(cottage_id,hot_offers_id) values (1,2);

insert into ship_hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (1,DATE('2021-11-20'),DATE('2021-11-25'),50,TRUE,3,null);
insert into ships_hot_offers(ship_id,hot_offers_id) values (1,1);
insert into ship_hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (2,DATE('2021-12-16'),DATE('2021-12-19'),28,TRUE,4,null);
insert into ships_hot_offers(ship_id,hot_offers_id) values (1,2);

insert into favor_hot_offers (id, available_from, available_till, place, num_of_persons, services, cost, free)
values (1,DATE('2022-1-20'),DATE('2021-1-25'),'Ribarac',5,null,1000,TRUE);
insert into favors_hot_offers(instructors_favor_id, hot_offers_id) values (1,1);
insert into favor_hot_offers (id, available_from, available_till, place, num_of_persons, services, cost, free)
values (2,DATE('2022-2-2'),DATE('2021-2-12'),'Ribarac',4,null,900,TRUE);
insert into favors_hot_offers(instructors_favor_id, hot_offers_id) values (1,2);

insert into service_price (id, cost, service)
values(1,100,0);
insert into service_price (id, cost, service)
values(2,150,1);
insert into service_price (id, cost, service)
values(3,200,2);
insert into service_price (id, cost, service)
values(4,60,0);
insert into service_price (id, cost, service)
values(5,120,1);

insert into ship_service_price (id, cost, service)
values(1,100,0);
insert into ship_service_price (id, cost, service)
values(2,150,1);
insert into ship_service_price (id, cost, service)
values(3,200,2);
insert into ship_service_price (id, cost, service)
values(4,60,0);
insert into ship_service_price (id, cost, service)
values(5,120,1);

insert into favor_service_price (id, cost, service)
values(1, 800, 0);
insert into favor_service_price (id, cost, service)
values(2, 2000, 1);
insert into favor_service_price (id, cost, service)
values(3, 4200, 1);
insert into favor_service_price (id, cost, service)
values(4, 1500, 1);
insert into favor_service_price (id, cost, service)
values(5, 720, 0);

insert into ships_price_list (ship_id,price_list_id)
values(1,1);
insert into ships_price_list (ship_id,price_list_id)
values(1,2);
insert into ships_price_list (ship_id,price_list_id)
values(1,3);
insert into ships_price_list (ship_id,price_list_id)
values(2,4);
insert into ships_price_list (ship_id,price_list_id)
values(2,5);

insert into cottages_price_list (cottage_id,price_list_id)
values(1,1);
insert into cottages_price_list (cottage_id,price_list_id)
values(1,2);
insert into cottages_price_list (cottage_id,price_list_id)
values(1,3);
insert into cottages_price_list (cottage_id,price_list_id)
values(2,4);
insert into cottages_price_list (cottage_id,price_list_id)
values(2,5);

insert into favors_price_list (instructors_favor_id,price_list_id)
values(4,1);
insert into favors_price_list (instructors_favor_id,price_list_id)
values(4,2);
insert into favors_price_list (instructors_favor_id,price_list_id)
values(1,3);
insert into favors_price_list (instructors_favor_id,price_list_id)
values(2,4);
insert into favors_price_list (instructors_favor_id,price_list_id)
values(3,5);

insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (1,DATE('2021-12-20'),DATE('2021-12-23'),233,2,1, null);
insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (2,DATE('2021-12-24'),DATE('2022-01-04'),150,3,1, null);
insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (3,DATE('2022-01-04'),DATE('2022-01-23'),500,2,1, null);
insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (4,DATE('2021-12-03'),DATE('2021-12-19'),500,2,1, null);

insert into ship_reservations (id, available_from, available_till, cost, client_id, ship_id, services)
values (1,DATE('2021-12-20'),DATE('2021-12-23'),233,2,1, null);
insert into ship_reservations (id, available_from, available_till, cost, client_id, ship_id, services)
values (2,DATE('2021-12-24'),DATE('2022-01-04'),150,3,1, null);
insert into ship_reservations (id, available_from, available_till, cost, client_id, ship_id, services)
values (3,DATE('2022-01-04'),DATE('2022-01-23'),500,2,1, null);
insert into ship_reservations (id, available_from, available_till, cost, client_id, ship_id, services)
values (4,DATE('2021-12-03'),DATE('2021-12-19'),500,2,1, null);

insert into favor_reservations (id, available_from, available_till, cost, client_id, favor_id, services)
values (1, DATE('2021-12-24'), DATE('2021-12-24'), 500, 14, 1, null);
insert into favor_reservations (id, available_from, available_till, cost, client_id, favor_id, services)
values (2, DATE('2022-1-1'), DATE('2022-1-15'), 900, 14, 3, null);
insert into favor_reservations (id, available_from, available_till, cost, client_id, favor_id, services)
values (3, DATE('2022-2-24'), DATE('2022-2-24'), 600, 14, 2, null);