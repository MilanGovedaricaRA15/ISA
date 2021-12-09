delete from account_delete_requests where id!=0;
delete from cottage_reservations where id!=0;
delete from cottages_hot_offers where cottage_id!=0;
delete from hot_offers where id!=0;
delete from ships_grades where ship_id!=0;
delete from grades where id!=0;
delete from cottages where id!=0;
delete from spring_session where primary_id!='0';
delete from spring_session_attributes where session_primary_id!='0';
delete from ships where id!=0;
delete from users where id!=0;

insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified)
values (1, 'Ilije 1', 'Beograd', 'Srbija', 'rajkorajkoza@gmail.com', 'Milan', 'Govedarica', 123123123, 'aaaa', 'Izdaja vikendice', 0, TRUE);

insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified)
values (2, 'Banjalucka 2', 'Banjaluka', 'Bosna', 'popaljubav@gmail.com', 'Miodrag', 'Prod', 111222333, 'aaaa', null, 0, TRUE);

insert into users (id, address, city, country, email, first_name, last_name, mobile_number, password, reason, role, verified)
values (3, 'Focanska 2', 'Foca', 'Bosna', 'foca@gmail.com', 'Coa', 'Podunavac', 064456456, 'aaaa', null, 1, TRUE);

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

insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (1, 'Desivoje 1',DATE('2021-09-01'),DATE('2022-02-01'),'Na jezeru',null, 'Micova', 3, 3, 'Nisu dozvoljene zivotinje', null, 1, 50);

insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (2, 'Desivoje 2',DATE('2021-08-22'),DATE('2021-10-01'),'Blizu jezera',null, 'Popici', 3, 3, 'Nisu dozvoljene zivotinje', null, 1, 30);

insert into ships(id, owner_id, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules)
values (1, 3, 'ship1', 'type1', 7.2, '123a456', 15.7, 24.5, 0, 'Undefined street 1', 'Description 1', null, 20, null);

insert into ships(id, owner_id, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules)
values (2, 3, 'ship2', 'type2', 4.9, '123b456', 16.4, 27.5, 3, 'Undefined street 2', 'Description 2', null, 10, null);

insert into ships(id, owner_id, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules)
values (3, 3, 'ship3', 'type3', 6.7, '123c456', 13.0, 22.3, 1, 'Undefined street 3', 'Description 3', null, 30, null);

insert into ships(id, owner_id, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules)
values (4, 3, 'ship4', 'type4', 11.3, '123d456', 17.2, 28.9, 2, 'Undefined street 4', 'Description 4', null, 25, null);

insert into ships(id, owner_id, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules)
values (5, 3, 'ship5', 'type5', 8.4, '123e456', 11.7, 20.0, 0, 'Undefined street 5', 'Description 5', null, 15, null);

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

insert into ships_grades(ship_id, grades_id) values (1, 1);
insert into ships_grades(ship_id, grades_id) values (1, 2);
insert into ships_grades(ship_id, grades_id) values (1, 3);
insert into ships_grades(ship_id, grades_id) values (1, 4);
insert into ships_grades(ship_id, grades_id) values (1, 5);


insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (1,DATE('2021-11-20'),DATE('2021-11-25'),50,TRUE,3,null);
insert into cottages_hot_offers(cottage_id,hot_offers_id) values (1,1);
insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (2,DATE('2021-12-16'),DATE('2021-12-19'),28,TRUE,4,null);
insert into cottages_hot_offers(cottage_id,hot_offers_id) values (1,2);


insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (1,DATE('2021-12-20'),DATE('2021-12-23'),233,2,1, null);

insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (2,DATE('2021-12-24'),DATE('2022-01-04'),150,3,1, null);

insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (3,DATE('2022-01-04'),DATE('2022-01-23'),500,2,1, null);
insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (4,DATE('2021-12-03'),DATE('2021-12-15'),500,2,1, null);