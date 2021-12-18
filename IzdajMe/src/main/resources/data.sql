delete from account_delete_requests where id!=0;
delete from cottage_reservations where id!=0;
delete from ship_reservations where id!=0;
delete from cottages_hot_offers where cottage_id!=0;
delete from ships_hot_offers where ship_id!=0;
delete from cottages_price_list where cottage_id!=0;
delete from ships_price_list where ship_id!=0;
delete from hot_offers where id!=0;
delete from ship_hot_offers where id!=0;
delete from service_price where id!=0;
delete from ship_service_price where id!=0;
delete from ships_grades where ship_id!=0;
delete from cottages_grades where cottage_id!=0;
delete from grades where id!=0;
delete from cottages where id!=0;
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

insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (1, 'Desivoje 1',DATE('2021-09-01'),DATE('2022-02-01'),'Na jezeru',null, 'Micova', 3, 3, 'Nisu dozvoljene zivotinje', null, 1, 50);
insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (2, 'Desivoje 2',DATE('2021-08-22'),DATE('2021-10-01'),'Blizu jezera',null, 'Popici', 3, 3, 'Nisu dozvoljene zivotinje', null, 1, 30);

insert into ships(id, owner_id, available_from, available_till, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules,fishing_equipment,cancel_requirements,cost_per_night)
values (1, 3,DATE('2021-09-01'),DATE('2022-02-01'), 'Shipfirst', 'typeone', 72, '123a456', 157, 245, null, 'Undefined Street 1', 'Description', null, 20, 'pravila',null,'free',90);
insert into ships(id, owner_id, available_from, available_till, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules,fishing_equipment,cancel_requirements,cost_per_night)
values (2, 3,DATE('2021-09-01'),DATE('2022-02-01'), 'Shipsecond', 'typetwo', 49, '123b456', 164, 275, null, 'Undefined Street 2', 'Description', null, 10, 'pravila',null,'free',80);
insert into ships(id, owner_id, available_from, available_till, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules,fishing_equipment,cancel_requirements,cost_per_night)
values (3, 3,DATE('2021-09-01'),DATE('2022-02-01'), 'Shipfifth', 'typethree', 67, '123c456', 130, 223, null, 'Undefined Street 3', 'Description', null, 30, 'pravila',null,'free',70);
insert into ships(id, owner_id, available_from, available_till, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules,fishing_equipment,cancel_requirements,cost_per_night)
values (4, 3,DATE('2021-09-01'),DATE('2022-02-01'), 'Shipneki', 'typefour', 113, '123d456', 172, 289, null, 'Undefined Street 4', 'Description', null, 25, 'pravila',null,'free',60);
insert into ships(id, owner_id, available_from, available_till, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules,fishing_equipment,cancel_requirements,cost_per_night)
values (5, 3,DATE('2021-09-01'),DATE('2022-02-01'), 'Ship', 'typefifth', 84, '123e456', 117, 200, null, 'Undefined Street 5', 'Description', null, 15, 'pravila',null,'free',50);

insert into grades(id, user_id, value, comment)
values (1, 3, 7 , 'Not too bad');
insert into grades(id, user_id, value, comment)
values (2, 3, 7, 'Not too baaad');
insert into grades(id, user_id, value, comment)
values (3, 3, 6, 'Bad');
insert into grades(id, user_id, value, comment)
values (4, 3, 9, 'Very good');
insert into grades(id, user_id, value, comment)
values (5, 3, 8, 'Good');

insert into grades(id, user_id, value, comment)
values (6, 3, 7 , 'Not too bad');
insert into grades(id, user_id, value, comment)
values (7, 3, 7, 'Not too baaad');
insert into grades(id, user_id, value, comment)
values (8, 3, 6, 'Bad');
insert into grades(id, user_id, value, comment)
values (9, 3, 9, 'Very good');
insert into grades(id, user_id, value, comment)
values (10, 3, 8, 'Good');

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