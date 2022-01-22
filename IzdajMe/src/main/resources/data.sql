delete from account_delete_requests where id!=0;
delete from concurent_watcher where id!=0;
delete from cottage_reservations where id!=0;
delete from ship_reservations where id!=0;
delete from favor_reservations where id!=0;
delete from cottages_hot_offers where cottage_id!=0;
delete from ships_hot_offers where ship_id!=0;
delete from favors_hot_offers where instructors_favor_id!=0;
delete from cottages_price_list where cottage_id!=0;
delete from ships_price_list where ship_id!=0;
delete from favors_price_list where instructors_favor_id!=0;
delete from complaints where id!=0;
delete from hot_offers where id!=0;
delete from ship_hot_offers where id!=0;
delete from favor_hot_offers where id!=0;
delete from service_price where id!=0;
delete from ship_service_price where id!=0;
delete from favor_service_price where id!=0;
delete from ships_grades where ship_id!=0;
delete from cottages_grades where cottage_id!=0;
delete from favors_grades where instructors_favor_id!=0;
delete from users_grades where user_id!=0;
delete from grades where id!=0;
delete from cottages_subscribed_users where cottage_id!=0;
delete from ships_subscribed_users where ship_id!=0;
delete from users_subscribed_users where user_id!=0;
delete from cottages where id!=0;
delete from favors where id!=0;
delete from spring_session where primary_id!='0';
delete from spring_session_attributes where session_primary_id!='0';
delete from ships where id!=0;
delete from users where id!=0;
delete from reports where id!=0;
delete from penalties where id!=0;

insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, prepaid, type, points)
values (1, 'Ilije Bircanina 1', 'Beograd', 'Srbija', 'rajkorajkoza@gmail.com', 'Milan', 'Govedarica', 123123123, 'aaaa', 'Izdaja vikendice', 0, TRUE, TRUE, 0, 20);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, prepaid, type, points)
values (2, 'Balzakova 2', 'Banjaluka', 'Bosna', 'popaljubav@gmail.com', 'Miodrag', 'Prod', 111222333, 'aaaa', null, 0, TRUE, TRUE, 1, 50);
insert into users (id, address, city, country, email, first_name, last_name, mobile_number, password, reason, role, verified, prepaid, type, points)
values (3, 'Gogoljeva 2', 'Foca', 'Bosna', 'foca@gmail.com', 'Coa', 'Podunavac', 064456456, 'aaaa', 'reason', 1, TRUE, FALSE, 2, 200);
insert into users (id, address, city, country, email, first_name, last_name, mobile_number, password, reason, role, verified, prepaid, type, points)
values (4, 'Jevrejska 4', 'Sarajevo', 'FBiH', 'sar4@gmail.com', 'Dragan', 'Radic', 065189898, 'aaaa', null, 2, TRUE, TRUE, 0, 440);
insert into users (id, address, city, country, email, first_name, last_name, mobile_number, password, reason, role, verified, prepaid, type, points)
values (5, 'Jevrejska 5', 'Foca', 'RS', 'foca5@gmail.com', 'Zoran', 'Puric', 060124785, 'aaaa', null, 2, TRUE, FALSE, 1, 120);
insert into users (id, address, city, country, email, first_name, last_name, mobile_number, password, reason, role, verified, prepaid, type, points)
values (6, 'Jevrejska 6', 'Foca', 'RS', 'foca6@gmail.com', 'Goran', 'Kitic', 065741963, 'aaaa', null, 2, TRUE, TRUE, 2, 25);
insert into users (id, address, city, country, email, first_name, last_name, mobile_number, password, reason, role, verified, prepaid, type, points)
values (7, 'Jevrejska 7', 'Sarajevo', 'FBiH', 'sar7@gmail.com', 'Marko', 'Vojinovic', 064456456, 'aaaa', null, 2, TRUE, TRUE, 1, 34);
insert into users (id, address, city, country, email, first_name, last_name, mobile_number, password, reason, role, verified, prepaid, type, points)
values (8, 'Jevrejska 8', 'Foca', 'RS', 'foca8@gmail.com', 'Darko', 'Bodiroga', 066589001, 'aaaa', null, 2, TRUE, FALSE, 1, 1000);
insert into users (id, address, city, country, email, first_name, last_name, mobile_number, password, reason, role, verified, prepaid, type, points)
values (9, 'Bulevar Cara Lazara 9', 'Foca', 'RS', 'foca9@gmail.com', 'Luka', 'Lukovic', 058212546, 'aaaa', null, 4, TRUE, FALSE, 1, 100);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, prepaid, type, points)
values (10, 'Bulevar Cara Lazara 1', 'Subotica', 'Srbija', 'vrbica.vlado11@gmail.com', 'Vladimir', 'Vrbica', '123123123123', 'vrba', '', 3, TRUE, TRUE, 0, 1000);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, prepaid, type, points)
values (11, 'Bulevar Cara Lazara 2', 'Srbobran', 'Srbija', 'nikola.aleksic@gmail.com', 'Nikola', 'Aleksic', '22222222222', 'leksa', '', 4, TRUE, TRUE, 0, 500);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, prepaid, type, points)
values (12, 'Bulevar Kralja Petra 12', 'Becej', 'Srbija', 'milos.zivic@gmail.com', 'Milos', 'Zivic', '222222222222', 'zile', '', 5, TRUE, TRUE, 0, 77);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, prepaid, type, points)
values (13, 'Vozdovacka 12', 'Beograd', 'Srbija', 'vesnakundacina852@gmail.com', 'Vesna', 'Kundacina', 123123123, 'aaaa', 'Izdaja vikendice', 0, FALSE, TRUE, 0, 1);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, prepaid, type, points)
values (14, 'Kralja Aleksandra 12', 'Uzice', 'Srbija', 'peraperic@gmail.com', 'Pera', 'Peric', '222222222222', 'aaaa', '', 6, TRUE, TRUE, 0, 13);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, type, points)
values (15, 'Glavna 18', 'Beograd', 'Srbija', 'vlasnikvikendice1@gmail.com', 'Dragan', 'Simonovic', 060123456, 'aaaa', 'Izdaja vikendice', 0, TRUE, 0, 99);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, type, points)
values (16, 'Novosadska 20', 'Novi Sad', 'Srbija', 'vlasnikvikendice2@gmail.com', 'Milica', 'Mikic', 061123456, 'aaaa', null, 0, TRUE, 0, 888);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, type, points)
values (17, 'Beogradska 1', 'Beograd', 'Srbija', 'vlasnikvikendice3@gmail.com', 'Marija', 'Milanovic', 062123456, 'aaaa', 'Izdaja vikendice', 0, TRUE, 0, 11);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, type, points)
values (18, 'Hotelska 12', 'Nis', 'Srbija', 'vlasnikvikendice4@gmail.com', 'Zoran', 'Radovic', 063123456, 'aaaa', null, 0, TRUE, 0, 55);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, type, points)
values (19, 'Gogoljeva 5', 'Beograd', 'Srbija', 'vlasnikbroda1@gmail.com', 'Rada', 'Matovic', 066654321, 'aaaa', 'Izdaja broda', 1, TRUE, 1, 13);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, type, points)
values (20, 'Santiceva 14', 'Zrenjanin', 'Srbija', 'vlasnikbroda2@gmail.com', 'Mihajlo', 'Ruzic', 065654321, 'aaaa', null, 1, TRUE, 1, 200);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, type, points)
values (21, 'Tolstojeva 10', 'Novi Sad', 'Srbija', 'vlasnikbroda3@gmail.com', 'Dragica', 'Kis', 064654321, 'aaaa', 'Izdaja broda', 1, TRUE, 2, 300);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, type, points)
values (22, 'Kragujevacka 1', 'Kragujevac', 'Srbija', 'vlasnikbroda4@gmail.com', 'Vatroslav', 'Markovic', 063654321, 'aaaa', null, 1, TRUE, 1, 520);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, type, points)
values (23, 'Balzakova 11', 'Bor', 'Srbija', 'instruktor1@gmail.com', 'Marko', 'Mirkovic', 0667654321, 'aaaa', 'Instruktor', 2, TRUE, 1, 700);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, type, points)
values (24, 'Sekspirova 10', 'Subotica', 'Srbija', 'instruktor2@gmail.com', 'Zarko', 'Bratic', 0657654321, 'aaaa', null, 2, TRUE, 1, 98);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, type, points)
values (25, 'Cetnicka 14', 'Cacak', 'Srbija', 'instruktor3@gmail.com', 'Ana', 'Vidic', 0647654321, 'aaaa', 'Instruktor', 2, TRUE, 1, 35);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, type, points)
values (26, 'Partizanska 21', 'Uzice', 'Srbija', 'instruktor4@gmail.com', 'Tamara', 'Milic', 0637654321, 'aaaa', null, 2, TRUE, 1, 48);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, type, points)
values (27, 'Bulevar Oslobodjenja 10', 'Negotin', 'Srbija', 'klijent1@gmail.com', 'Mirko', 'Stankovic', 0660654321, 'aaaa', '', 6, TRUE, 2, 67);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, type, points)
values (28, 'Marsala Tita 100', 'Kikinda', 'Srbija', 'klijent2@gmail.com', 'Gorana', 'Davidovac', 0651654321, 'aaaa', null, 6, TRUE, 0, 80);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, type, points)
values (29, 'Stepe Stepanovica 20', 'Kraljevo', 'Srbija', 'klijent3@gmail.com', 'Andjela', 'Vreco', 0642654321, 'aaaa', '', 6, TRUE, 2, 190);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, type, points)
values (30, 'Cara Lazara 30', 'Krusevac', 'Srbija', 'klijent4@gmail.com', 'Dejan', 'Drakul', 0633654321, 'aaaa', null, 6, TRUE, 0, 379);
insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified, type, points)
values (31, 'Bulevar Despota Stefana 5', 'Novi Sad', 'Srbija', 'miodragprodanovic99@gmail.com', 'Miodrag', 'Prodanovic', '0647532684', 'aaaa', '', 6, TRUE, 1, 330);

insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (1, 'Dunavska 1', DATE('2021-09-01'), DATE('2022-02-01'), 'Beautiful cottage', null, 'Micova', 3, 3, 'Nisu dozvoljene zivotinje', null, 1, 50);
insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (2, 'Dunavska 2', DATE('2021-08-22'), DATE('2021-10-01'), 'Beautiful cottage', null, 'Popici', 3, 3, 'Nisu dozvoljene zivotinje', null, 1, 30);
insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (3, 'Bulevar Kralja Petra 32', DATE('2021-10-01'), DATE('2022-04-01'), 'Beautiful cottage', null, 'Vikendica 1', 20, 5, 'Nisu dozvoljene zivotinje', null, 2, 40);
insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (4, 'Dunavska 4', DATE('2021-11-11'), DATE('2022-03-05'), 'Beautiful cottage', null, 'Pofalicka', 12, 4, 'Nisu dozvoljene zivotinje', null, 16, 25);
insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (5, 'Fruskogorska 1', DATE('2021-07-01'), DATE('2021-12-01'), 'Beautiful cottage', null, 'Seoska', 3, 3, 'Nisu dozvoljene zivotinje', null, 15, 50);
insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (6, 'Dunavska 9', DATE('2021-08-01'), DATE('2022-10-01'), 'Beautiful cottage', null, 'Bungalov', 3, 3, 'Nisu dozvoljene zivotinje', null, 18, 30);
insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (7, 'Bulevar Cara Lazara 16', DATE('2021-09-01'), DATE('2022-04-01'), 'Beautiful cottage', null, 'Vikendica 2', 20, 5, 'Nisu dozvoljene zivotinje', null, 16, 40);
insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (8, 'Futoska 15', DATE('2021-10-01'), DATE('2022-03-05'), 'Beautiful cottage', null, 'Odmaraliste', 12, 4, 'Nisu dozvoljene zivotinje', null, 17, 25);
insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (9, 'Fruskogorska 19', DATE('2021-11-01'), DATE('2022-01-01'), 'Beautiful cottage', null, 'Jezerska', 3, 3, 'Nisu dozvoljene zivotinje', null, 15, 50);
insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (10, 'Dunavska 29', DATE('2021-12-01'), DATE('2022-02-28'), 'Beautiful cottage', null, 'Smjestaj kod Loja', 3, 3, 'Nisu dozvoljene zivotinje', null, 16, 30);
insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (11, 'Bulevar Cara Lazara 30', DATE('2021-10-15'), DATE('2022-04-01'), 'Cottage with a great view', null, 'Vikendica 3', 20, 5, 'Nisu dozvoljene zivotinje', null, 18, 40);
insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (12, 'Fruskogorska 40', DATE('2021-11-15'), DATE('2022-03-01'), 'Cottage with a great view', null, 'Vikendica kod Gazde', 12, 4, 'Nisu dozvoljene zivotinje', null, 18, 25);
insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (13, 'Futoska 10', DATE('2021-12-15'), DATE('2022-03-10'), 'Cottage with a great view', null, 'Skupa', 10, 6, 'Nisu dozvoljene zivotinje', null, 16, 200);
insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (14, 'Bulevar Kralja Petra 20', DATE('2022-01-15'), DATE('2022-04-10'), 'Cottage with a great view', null, 'Jeftina', 50, 10, 'Nisu dozvoljene zivotinje', null, 17, 5);
insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (15, 'Bulevar Cara Lazara 24', DATE('2021-10-10'), DATE('2022-03-12'), 'Cottage with a great view', null, 'Vikendica 4', 20, 5, 'Nisu dozvoljene zivotinje', null, 18, 40);
insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (16, 'Dunavska 17', DATE('2021-11-11'), DATE('2022-04-08'), 'Cottage with a great view', null, 'Radnicka', 12, 4, 'Nisu dozvoljene zivotinje', null, 15, 25);
insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (17, 'Dunavska 12', DATE('2021-12-12'), DATE('2022-06-01'), 'Cottage with a great view', null, 'Velika', 300, 80, 'Nisu dozvoljene zivotinje', null, 16, 50);
insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (18, 'Bulevar Kralja Petra 11', DATE('2022-01-01'), DATE('2022-02-17'), 'Great cottage', null, 'Mala', 2, 1, 'Nisu dozvoljene zivotinje', null, 15, 30);
insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (19, 'Fruskogorska 8', DATE('2022-01-02'), DATE('2022-04-15'), 'Great cottage', null, 'Vikendica 5', 20, 5, 'Nisu dozvoljene zivotinje', null, 17, 40);
insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (20, 'Dunavska 7', DATE('2022-01-03'), DATE('2022-03-15'), 'Great cottage', null, 'Pogled', 12, 4, 'Nisu dozvoljene zivotinje', null, 15, 25);

insert into ships(id, owner_id, available_from, available_till, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules,fishing_equipment,cancel_requirements,cost_per_night)
values (1, 3,DATE('2021-09-01'),DATE('2022-02-01'), 'Shipfirst', 'typeone', 72, '123a456', 157, 245, null, 'Gogoljeva 10', 'Beautiful ship', null, 20, 'pravila',null,'free',90);
insert into ships(id, owner_id, available_from, available_till, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules,fishing_equipment,cancel_requirements,cost_per_night)
values (2, 3,DATE('2021-09-01'),DATE('2022-02-01'), 'Shipsecond', 'typetwo', 49, '123b456', 164, 275, null, 'Bulevar Kralja Petra 4', 'Beautiful ship', null, 10, 'pravila',null,'free',80);
insert into ships(id, owner_id, available_from, available_till, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules,fishing_equipment,cancel_requirements,cost_per_night)
values (3, 3,DATE('2021-09-01'),DATE('2022-05-01'), 'Shipfifth', 'typethree', 67, '123c456', 130, 223, null, 'Bulevar Kralja Petra 1', 'Beautiful ship', null, 30, 'pravila',null,'free',70);
insert into ships(id, owner_id, available_from, available_till, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules,fishing_equipment,cancel_requirements,cost_per_night)
values (4, 3,DATE('2021-09-01'),DATE('2022-04-01'), 'Shipneki', 'typefourth', 113, '123d456', 172, 289, null, 'Dunavska 4', 'Beautiful ship', null, 25, 'pravila',null,'free',60);
insert into ships(id, owner_id, available_from, available_till, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules,fishing_equipment,cancel_requirements,cost_per_night)
values (5, 3,DATE('2021-09-01'),DATE('2022-05-01'), 'Ship', 'typefifth', 84, '123e456', 117, 200, null, 'Dunavska 5', 'Beautiful ship', null, 15, 'pravila',null,'free',50);
insert into ships(id, owner_id, available_from, available_till, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules,fishing_equipment,cancel_requirements,cost_per_night)
values (6, 19,DATE('2021-09-01'),DATE('2022-03-01'), 'Special', 'first', 72, '123a456', 157, 245, null, 'Andriceva 1', 'Great ship', null, 20, 'pravila',null,'free',90);
insert into ships(id, owner_id, available_from, available_till, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules,fishing_equipment,cancel_requirements,cost_per_night)
values (7, 21,DATE('2021-09-01'),DATE('2022-04-01'), 'Blender', 'second', 49, '123b456', 164, 275, null, 'Marka Kraljevica 2', 'Great ship', null, 10, 'pravila',null,'free',80);
insert into ships(id, owner_id, available_from, available_till, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules,fishing_equipment,cancel_requirements,cost_per_night)
values (8, 20,DATE('2021-09-01'),DATE('2022-05-01'), 'Rafting', 'third', 67, '123c456', 130, 223, null, 'Andriceva 13', 'Great ship', null, 30, 'pravila',null,'free',70);
insert into ships(id, owner_id, available_from, available_till, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules,fishing_equipment,cancel_requirements,cost_per_night)
values (9, 22,DATE('2021-09-01'),DATE('2022-06-01'), 'Long', 'fourth', 200, '123d456', 172, 289, null, 'Andriceva 40', 'Great ship', null, 25, 'pravila',null,'free',60);
insert into ships(id, owner_id, available_from, available_till, name, type, length, engine_number, engine_power, top_speed, navigation_equipment, address, description, images, capacity, rules,fishing_equipment,cancel_requirements,cost_per_night)
values (10, 20,DATE('2021-09-01'),DATE('2022-07-01'), 'Expensive', 'fifth', 84, '123e456', 117, 300, null, 'Nikole Tesle 6', 'Great ship', null, 15, 'pravila',null,'free',50);

insert into grades(id, user_id, value, comment, seen)
values (1, 3, 7 , 'Not too bad', true);
insert into grades(id, user_id, value, comment, seen)
values (2, 3, 7, 'Not too baaad', true);
insert into grades(id, user_id, value, comment, seen)
values (3, 3, 6, 'Bad', true);
insert into grades(id, user_id, value, comment, seen)
values (4, 3, 9, 'Very good', true);
insert into grades(id, user_id, value, comment, seen)
values (5, 3, 8, 'Good', true);
insert into grades(id, user_id, value, comment, seen)
values (6, 3, 7 , 'Not too bad', true);
insert into grades(id, user_id, value, comment, seen)
values (7, 3, 7, 'Not too baaad', true);
insert into grades(id, user_id, value, comment, seen)
values (8, 3, 6, 'Bad', true);
insert into grades(id, user_id, value, comment, seen)
values (9, 3, 9, 'Very good', true);
insert into grades(id, user_id, value, comment, seen)
values (10, 3, 8, 'Good', true);
insert into grades(id, user_id, value, comment, seen)
values (11, 27, 7 , 'Not too bad', true);
insert into grades(id, user_id, value, comment, seen)
values (12, 28, 7, 'Not too baaad', true);
insert into grades(id, user_id, value, comment, seen)
values (13, 29, 6, 'Bad', true);
insert into grades(id, user_id, value, comment, seen)
values (14, 30, 9, 'Very good', true);
insert into grades(id, user_id, value, comment, seen)
values (15, 30, 8, 'Good', true);
insert into grades(id, user_id, value, comment, seen)
values (16, 30, 7 , 'Not too bad', true);
insert into grades(id, user_id, value, comment, seen)
values (17, 30, 7, 'Not too baaad', true);
insert into grades(id, user_id, value, comment, seen)
values (18, 30, 6, 'Bad', true);
insert into grades(id, user_id, value, comment, seen)
values (19, 30, 9, 'Very good', true);
insert into grades(id, user_id, value, comment, seen)
values (20, 30, 8, 'Good', true);
insert into grades(id, user_id, value, comment, seen)
values (21, 30, 7 , 'Not too bad', true);
insert into grades(id, user_id, value, comment, seen)
values (22, 30, 7, 'Not too baaad', true);
insert into grades(id, user_id, value, comment, seen)
values (23, 30, 6, 'Bad', true);
insert into grades(id, user_id, value, comment, seen)
values (24, 30, 9, 'Very good', true);
insert into grades(id, user_id, value, comment, seen)
values (25, 30, 10, 'Great', true);
insert into grades(id, user_id, value, comment, seen)
values (26, 27, 7 , 'Not too bad', true);
insert into grades(id, user_id, value, comment, seen)
values (27, 27, 7, 'Not too baaad', true);
insert into grades(id, user_id, value, comment, seen)
values (28, 27, 6, 'Bad', true);
insert into grades(id, user_id, value, comment, seen)
values (29, 27, 9, 'Very good', true);
insert into grades(id, user_id, value, comment, seen)
values (30, 28, 8, 'Good', true);
insert into grades(id, user_id, value, comment, seen)
values (31, 28, 7 , 'Not too bad', true);
insert into grades(id, user_id, value, comment, seen)
values (32, 28, 7, 'Not too baaad', true);
insert into grades(id, user_id, value, comment, seen)
values (33, 28, 6, 'Bad', true);
insert into grades(id, user_id, value, comment, seen)
values (34, 28, 9, 'Very good', true);
insert into grades(id, user_id, value, comment, seen)
values (35, 28, 8, 'Good', true);
insert into grades(id, user_id, value, comment, seen)
values (36, 29, 10, 'Great', true);
insert into grades(id, user_id, value, comment, seen)
values (37, 29, 7, 'Not too baaad', true);
insert into grades(id, user_id, value, comment, seen)
values (38, 29, 6, 'Bad', true);
insert into grades(id, user_id, value, comment, seen)
values (39, 29, 9, 'Very good', true);
insert into grades(id, user_id, value, comment, seen)
values (40, 29, 8, 'Good', true);
insert into grades(id, user_id, value, comment, seen)
values (41, 29, 7, 'Not too bad', true);
insert into grades(id, user_id, value, comment, seen)
values (42, 29, 7, 'Not too baaad', true);
insert into grades(id, user_id, value, comment, seen)
values (43, 29, 6, 'Bad', true);
insert into grades(id, user_id, value, comment, seen)
values (44, 28, 10, 'Great', true);
insert into grades(id, user_id, value, comment, seen)
values (45, 28, 8, 'Good', true);
insert into grades(id, user_id, value, comment, seen)
values (46, 28, 7 , 'Not too bad', true);
insert into grades(id, user_id, value, comment, seen)
values (47, 28, 7, 'Not too baaad', true);
insert into grades(id, user_id, value, comment, seen)
values (48, 28, 6, 'Bad', true);
insert into grades(id, user_id, value, comment, seen)
values (49, 28, 9, 'Very good', true);
insert into grades(id, user_id, value, comment, seen)
values (50, 28, 8, 'Good', true);
insert into grades(id, user_id, value, comment, seen)
values (51, 27, 7 , 'Not too bad', true);
insert into grades(id, user_id, value, comment, seen)
values (52, 27, 7, 'Not too baaad', true);
insert into grades(id, user_id, value, comment, seen)
values (53, 27, 6, 'Bad', true);
insert into grades(id, user_id, value, comment, seen)
values (54, 27, 10, 'Great', true);
insert into grades(id, user_id, value, comment, seen)
values (55, 27, 8, 'Good', true);
insert into grades(id, user_id, value, comment, seen)
values (56, 30, 7 , 'Not too bad', true);
insert into grades(id, user_id, value, comment, seen)
values (57, 30, 7, 'Not too baaad', true);
insert into grades(id, user_id, value, comment, seen)
values (58, 30, 6, 'Bad', true);
insert into grades(id, user_id, value, comment, seen)
values (59, 29, 9, 'Very good', true);
insert into grades(id, user_id, value, comment, seen)
values (60, 29, 8, 'Good', true);
insert into grades(id, user_id, value, comment, seen)
values (61, 30, 7 , 'Not too bad', true);
insert into grades(id, user_id, value, comment, seen)
values (62, 30, 7, 'Not too baaad', true);
insert into grades(id, user_id, value, comment, seen)
values (63, 30, 6, 'Bad', true);
insert into grades(id, user_id, value, comment, seen)
values (64, 27, 9, 'Very good', true);
insert into grades(id, user_id, value, comment, seen)
values (65, 27, 10, 'Great', true);
insert into grades(id, user_id, value, comment, seen)
values (66, 27, 10, 'Great', true);
insert into grades(id, user_id, value, comment, seen)
values (67, 28, 7, 'Not too baaad', true);
insert into grades(id, user_id, value, comment, seen)
values (68, 28, 10, 'Great', true);
insert into grades(id, user_id, value, comment, seen)
values (69, 29, 9, 'Very good', true);
insert into grades(id, user_id, value, comment, seen)
values (70, 27, 8, 'Good', true);

insert into favors (id, instructor_id, name, address, description, images, num_of_persons, rules, services, cost, available_from, available_till, cancellation_condition)
values (1, 4, 'Cas pecanja', 'Dunavska 13', 'Pecanje pecaljkom', null, 4, 'Samo punoletni mogu', null, 1200, DATE('2022-01-01'), DATE('2022-03-17'), 'Free');
insert into favors (id, instructor_id, name, address, description, images, num_of_persons, rules, services, cost, available_from, available_till, cancellation_condition)
values (2, 4, 'Cas pecanja', 'Dunavska 3', 'Pecanje mrezom', null, 10, 'Samo punoletni mogu', null, 1000, DATE('2022-01-04'), DATE('2022-04-26'), '5%');
insert into favors (id, instructor_id, name, address, description, images, num_of_persons, rules, services, cost, available_from, available_till, cancellation_condition)
values (3, 4, 'Isplovljavanje', 'Nikole Tesle 1', 'Plovidba camcom i pecanje', null, 2, 'Samo punoletni mogu', null, 2000, DATE('2022-01-01'), DATE('2022-05-27'), '10%');
insert into favors (id, instructor_id, name, address, description, images, num_of_persons, rules, services, cost, available_from, available_till, cancellation_condition)
values (4, 4, 'Pravljenje mamca', 'Dunavska 33', 'Mamac', null, 3, 'Samo punoletni mogu', null, 500, DATE('2022-01-01'), DATE('2022-05-1'), '15%');
insert into favors (id, instructor_id, name, address, description, images, num_of_persons, rules, services, cost, available_from, available_till, cancellation_condition)
values (5, 23, 'Cas pecanja', 'Ribarsko ostrvo', 'Pecanje pecaljkom', null, 4, 'Samo punoletni mogu', null, 1200, DATE('2022-01-11'), DATE('2022-04-25'), 'Free');
insert into favors (id, instructor_id, name, address, description, images, num_of_persons, rules, services, cost, available_from, available_till, cancellation_condition)
values (6, 24, 'Cas pecanja', 'Ribarsko ostrvo', 'Pecanje mrezom', null, 10, 'Samo punoletni mogu', null, 1000, DATE('2022-01-08'), DATE('2022-03-20'), '5%');
insert into favors (id, instructor_id, name, address, description, images, num_of_persons, rules, services, cost, available_from, available_till, cancellation_condition)
values (7, 25, 'Isplovljavanje', 'Ribarsko ostrvo', 'Plovidba camcom i pecanje', null, 2, 'Samo punoletni mogu', null, 2000, DATE('2022-01-01'), DATE('2022-03-01'), '10%');
insert into favors (id, instructor_id, name, address, description, images, num_of_persons, rules, services, cost, available_from, available_till, cancellation_condition)
values (8, 26, 'Pravljenje mamca', 'Ribarsko ostrvo', 'Mamac', null, 3, 'Samo punoletni mogu', null, 500, DATE('2022-01-01'), DATE('2022-07-1'), '15%');

insert into complaints (id, text, author_id, complaint_user_id, complaint_cottage_id, complaint_ship_id, answer)
values (1, 'Nova zalba', 14, 1, null, null, '');
insert into complaints (id, text, author_id, complaint_user_id, complaint_cottage_id, complaint_ship_id, answer)
values (2, 'Nova zalbaaaaaa', 14, 2, null, null, '');
insert into complaints (id, text, author_id, complaint_user_id, complaint_cottage_id, complaint_ship_id, answer)
values (3, 'Zalba za vikendicu', 14, null, 1, null, '');
insert into complaints (id, text, author_id, complaint_user_id, complaint_cottage_id, complaint_ship_id, answer)
values (4, 'Zalba za brod', 14, null, null, 1, '');

insert into ships_grades(ship_id, grades_id) values (1, 1);
insert into ships_grades(ship_id, grades_id) values (1, 2);
insert into ships_grades(ship_id, grades_id) values (2, 3);
insert into ships_grades(ship_id, grades_id) values (10, 4);
insert into ships_grades(ship_id, grades_id) values (9, 5);
insert into ships_grades(ship_id, grades_id) values (2, 6);
insert into ships_grades(ship_id, grades_id) values (1, 7);
insert into ships_grades(ship_id, grades_id) values (10, 8);
insert into ships_grades(ship_id, grades_id) values (6, 9);
insert into ships_grades(ship_id, grades_id) values (2, 10);
insert into ships_grades(ship_id, grades_id) values (3, 11);
insert into ships_grades(ship_id, grades_id) values (6, 12);
insert into ships_grades(ship_id, grades_id) values (5, 13);
insert into ships_grades(ship_id, grades_id) values (5, 14);
insert into ships_grades(ship_id, grades_id) values (3, 15);
insert into ships_grades(ship_id, grades_id) values (4, 16);
insert into ships_grades(ship_id, grades_id) values (4, 17);
insert into ships_grades(ship_id, grades_id) values (3, 18);
insert into ships_grades(ship_id, grades_id) values (8, 19);
insert into ships_grades(ship_id, grades_id) values (7, 20);

insert into cottages_grades(cottage_id, grades_id) values (1, 21);
insert into cottages_grades(cottage_id, grades_id) values (2, 22);
insert into cottages_grades(cottage_id, grades_id) values (3, 23);
insert into cottages_grades(cottage_id, grades_id) values (4, 24);
insert into cottages_grades(cottage_id, grades_id) values (3, 25);
insert into cottages_grades(cottage_id, grades_id) values (1, 26);
insert into cottages_grades(cottage_id, grades_id) values (2, 27);
insert into cottages_grades(cottage_id, grades_id) values (5, 28);
insert into cottages_grades(cottage_id, grades_id) values (6, 29);
insert into cottages_grades(cottage_id, grades_id) values (7, 30);
insert into cottages_grades(cottage_id, grades_id) values (8, 31);
insert into cottages_grades(cottage_id, grades_id) values (9, 32);
insert into cottages_grades(cottage_id, grades_id) values (10, 33);
insert into cottages_grades(cottage_id, grades_id) values (11, 34);
insert into cottages_grades(cottage_id, grades_id) values (11, 35);
insert into cottages_grades(cottage_id, grades_id) values (11, 36);
insert into cottages_grades(cottage_id, grades_id) values (10, 37);
insert into cottages_grades(cottage_id, grades_id) values (12, 38);
insert into cottages_grades(cottage_id, grades_id) values (12, 39);
insert into cottages_grades(cottage_id, grades_id) values (9, 40);
insert into cottages_grades(cottage_id, grades_id) values (13, 41);
insert into cottages_grades(cottage_id, grades_id) values (15, 42);
insert into cottages_grades(cottage_id, grades_id) values (13, 43);
insert into cottages_grades(cottage_id, grades_id) values (8, 44);
insert into cottages_grades(cottage_id, grades_id) values (8, 45);
insert into cottages_grades(cottage_id, grades_id) values (8, 46);
insert into cottages_grades(cottage_id, grades_id) values (7, 47);
insert into cottages_grades(cottage_id, grades_id) values (7, 48);
insert into cottages_grades(cottage_id, grades_id) values (6, 49);
insert into cottages_grades(cottage_id, grades_id) values (14, 50);

insert into favors_grades(grades_id, instructors_favor_id) values (21, 1);
insert into favors_grades(grades_id, instructors_favor_id) values (22, 2);
insert into favors_grades(grades_id, instructors_favor_id) values (23, 3);
insert into favors_grades(grades_id, instructors_favor_id) values (24, 4);
insert into favors_grades(grades_id, instructors_favor_id) values (25, 3);
insert into favors_grades(grades_id, instructors_favor_id) values (26, 1);
insert into favors_grades(grades_id, instructors_favor_id) values (27, 2);
insert into favors_grades(grades_id, instructors_favor_id) values (28, 5);
insert into favors_grades(grades_id, instructors_favor_id) values (29, 6);
insert into favors_grades(grades_id, instructors_favor_id) values (30, 7);
insert into favors_grades(grades_id, instructors_favor_id) values (31, 8);
insert into favors_grades(grades_id, instructors_favor_id) values (32, 7);
insert into favors_grades(grades_id, instructors_favor_id) values (33, 8);
insert into favors_grades(grades_id, instructors_favor_id) values (34, 4);
insert into favors_grades(grades_id, instructors_favor_id) values (35, 3);
insert into favors_grades(grades_id, instructors_favor_id) values (36, 1);
insert into favors_grades(grades_id, instructors_favor_id) values (37, 2);
insert into favors_grades(grades_id, instructors_favor_id) values (38, 1);
insert into favors_grades(grades_id, instructors_favor_id) values (39, 4);
insert into favors_grades(grades_id, instructors_favor_id) values (40, 4);
insert into favors_grades(grades_id, instructors_favor_id) values (41, 3);
insert into favors_grades(grades_id, instructors_favor_id) values (42, 2);
insert into favors_grades(grades_id, instructors_favor_id) values (43, 2);
insert into favors_grades(grades_id, instructors_favor_id) values (44, 1);
insert into favors_grades(grades_id, instructors_favor_id) values (45, 1);
insert into favors_grades(grades_id, instructors_favor_id) values (46, 4);
insert into favors_grades(grades_id, instructors_favor_id) values (47, 7);
insert into favors_grades(grades_id, instructors_favor_id) values (48, 7);
insert into favors_grades(grades_id, instructors_favor_id) values (49, 6);
insert into favors_grades(grades_id, instructors_favor_id) values (50, 2);
insert into favors_grades(grades_id, instructors_favor_id) values (51, 8);

insert into users_grades(user_id, grades_id) values (1, 51);
insert into users_grades(user_id, grades_id) values (2, 52);
insert into users_grades(user_id, grades_id) values (3, 53);
insert into users_grades(user_id, grades_id) values (4, 54);
insert into users_grades(user_id, grades_id) values (5, 55);
insert into users_grades(user_id, grades_id) values (6, 56);
insert into users_grades(user_id, grades_id) values (7, 57);
insert into users_grades(user_id, grades_id) values (8, 58);
insert into users_grades(user_id, grades_id) values (1, 59);
insert into users_grades(user_id, grades_id) values (2, 60);
insert into users_grades(user_id, grades_id) values (3, 61);
insert into users_grades(user_id, grades_id) values (4, 62);
insert into users_grades(user_id, grades_id) values (5, 63);
insert into users_grades(user_id, grades_id) values (6, 64);
insert into users_grades(user_id, grades_id) values (7, 65);
insert into users_grades(user_id, grades_id) values (8, 66);
insert into users_grades(user_id, grades_id) values (1, 67);
insert into users_grades(user_id, grades_id) values (2, 68);
insert into users_grades(user_id, grades_id) values (3, 69);
insert into users_grades(user_id, grades_id) values (4, 70);

insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (1, DATE('2021-11-20'), DATE('2021-11-25'), 50, TRUE, 3, null);
insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (2, DATE('2021-12-16'), DATE('2021-12-19'), 28, TRUE, 4, null);
insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (3, DATE('2022-01-10'), DATE('2022-01-15'), 125, TRUE, 5, null);
insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (4, DATE('2022-02-11'), DATE('2022-02-14'), 73, TRUE, 6, null);
insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (5, DATE('2022-01-12'), DATE('2022-01-15'), 67, TRUE, 7, null);
insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (6, DATE('2022-02-13'), DATE('2022-02-15'), 52, TRUE, 6, null);
insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (7, DATE('2022-01-14'), DATE('2022-01-16'), 55, TRUE, 5, null);
insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (8, DATE('2022-02-15'), DATE('2022-02-17'), 45, TRUE, 4, null);
insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (9, DATE('2022-01-16'), DATE('2022-01-18'), 45, TRUE, 3, null);
insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (10, DATE('2022-02-17'), DATE('2022-02-19'), 40, TRUE, 4, null);
insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (11, DATE('2022-01-18'), DATE('2022-01-25'), 150, TRUE, 5, null);
insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (12, DATE('2022-02-19'), DATE('2022-02-22'), 60, TRUE, 6, null);
insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (13, DATE('2022-01-20'), DATE('2022-01-25'), 100, TRUE, 7, null);
insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (14, DATE('2022-02-16'), DATE('2022-02-19'), 80, TRUE, 8, null);
insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (15, DATE('2022-01-29'), DATE('2022-01-31'), 50, TRUE, 9, null);
insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (16, DATE('2022-02-08'), DATE('2022-02-11'), 65, TRUE, 8, null);
insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (17, DATE('2022-01-27'), DATE('2022-01-29'), 50, TRUE, 7, null);
insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (18, DATE('2022-02-06'), DATE('2022-02-09'), 70, TRUE, 6, null);
insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (19, DATE('2022-01-25'), DATE('2022-01-27'), 50, TRUE, 5, null);
insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (20, DATE('2022-02-04'), DATE('2022-02-08'), 90, TRUE, 4, null);
insert into cottages_hot_offers(cottage_id, hot_offers_id) values (1, 1);
insert into cottages_hot_offers(cottage_id, hot_offers_id) values (1, 2);
insert into cottages_hot_offers(cottage_id, hot_offers_id) values (15, 3);
insert into cottages_hot_offers(cottage_id, hot_offers_id) values (14, 4);
insert into cottages_hot_offers(cottage_id, hot_offers_id) values (13, 5);
insert into cottages_hot_offers(cottage_id, hot_offers_id) values (12, 6);
insert into cottages_hot_offers(cottage_id, hot_offers_id) values (11, 7);
insert into cottages_hot_offers(cottage_id, hot_offers_id) values (10, 8);
insert into cottages_hot_offers(cottage_id, hot_offers_id) values (10, 9);
insert into cottages_hot_offers(cottage_id, hot_offers_id) values (8, 10);
insert into cottages_hot_offers(cottage_id, hot_offers_id) values (7, 11);
insert into cottages_hot_offers(cottage_id, hot_offers_id) values (6, 12);
insert into cottages_hot_offers(cottage_id, hot_offers_id) values (6, 13);
insert into cottages_hot_offers(cottage_id, hot_offers_id) values (4, 14);
insert into cottages_hot_offers(cottage_id, hot_offers_id) values (3, 15);
insert into cottages_hot_offers(cottage_id, hot_offers_id) values (3, 16);
insert into cottages_hot_offers(cottage_id, hot_offers_id) values (13, 17);
insert into cottages_hot_offers(cottage_id, hot_offers_id) values (13, 18);
insert into cottages_hot_offers(cottage_id, hot_offers_id) values (11, 19);
insert into cottages_hot_offers(cottage_id, hot_offers_id) values (11, 20);

insert into ship_hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (1, DATE('2021-11-20'), DATE('2021-11-25'), 50, TRUE, 3, null);
insert into ship_hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (2, DATE('2021-12-16'), DATE('2021-12-19'), 28, TRUE, 4, null);
insert into ship_hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (3, DATE('2022-01-10'), DATE('2022-01-12'), 50, TRUE, 9, null);
insert into ship_hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (4, DATE('2022-01-11'), DATE('2022-01-13'), 55, TRUE, 8, null);
insert into ship_hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (5, DATE('2022-01-12'), DATE('2022-01-14'), 45, TRUE, 7, null);
insert into ship_hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (6, DATE('2022-01-13'), DATE('2022-01-15'), 40, TRUE, 6, null);
insert into ship_hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (7, DATE('2022-01-14'), DATE('2022-01-16'), 45, TRUE, 5, null);
insert into ship_hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (8, DATE('2022-01-15'), DATE('2022-01-18'), 60, TRUE, 4, null);
insert into ship_hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (9, DATE('2022-01-16'), DATE('2022-01-19'), 65, TRUE, 3, null);
insert into ship_hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (10, DATE('2022-01-17'), DATE('2022-01-20'), 70, TRUE, 4, null);
insert into ship_hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (11, DATE('2022-01-18'), DATE('2022-01-21'), 75, TRUE, 5, null);
insert into ship_hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (12, DATE('2022-02-01'), DATE('2022-02-03'), 35, TRUE, 6, null);
insert into ship_hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (13, DATE('2022-02-02'), DATE('2022-02-04'), 40, TRUE, 7, null);
insert into ship_hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (14, DATE('2022-02-03'), DATE('2022-02-05'), 45, TRUE, 8, null);
insert into ship_hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (15, DATE('2022-02-04'), DATE('2022-02-06'), 50, TRUE, 9, null);
insert into ship_hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (16, DATE('2022-02-05'), DATE('2022-02-07'), 55, TRUE, 8, null);
insert into ship_hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (17, DATE('2022-02-06'), DATE('2022-02-09'), 60, TRUE, 7, null);
insert into ship_hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (18, DATE('2022-02-07'), DATE('2022-02-10'), 65, TRUE, 6, null);
insert into ship_hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (19, DATE('2022-02-08'), DATE('2022-02-11'), 70, TRUE, 5, null);
insert into ship_hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (20, DATE('2022-02-09'), DATE('2022-02-12'), 75, TRUE, 4, null);
insert into ships_hot_offers(ship_id, hot_offers_id) values (1, 1);
insert into ships_hot_offers(ship_id, hot_offers_id) values (1, 2);
insert into ships_hot_offers(ship_id, hot_offers_id) values (8, 3);
insert into ships_hot_offers(ship_id, hot_offers_id) values (7, 4);
insert into ships_hot_offers(ship_id, hot_offers_id) values (6, 5);
insert into ships_hot_offers(ship_id, hot_offers_id) values (5, 6);
insert into ships_hot_offers(ship_id, hot_offers_id) values (4, 7);
insert into ships_hot_offers(ship_id, hot_offers_id) values (3, 8);
insert into ships_hot_offers(ship_id, hot_offers_id) values (8, 9);
insert into ships_hot_offers(ship_id, hot_offers_id) values (7, 10);
insert into ships_hot_offers(ship_id, hot_offers_id) values (6, 11);
insert into ships_hot_offers(ship_id, hot_offers_id) values (5, 12);
insert into ships_hot_offers(ship_id, hot_offers_id) values (4, 13);
insert into ships_hot_offers(ship_id, hot_offers_id) values (3, 14);
insert into ships_hot_offers(ship_id, hot_offers_id) values (8, 15);
insert into ships_hot_offers(ship_id, hot_offers_id) values (7, 16);
insert into ships_hot_offers(ship_id, hot_offers_id) values (6, 17);
insert into ships_hot_offers(ship_id, hot_offers_id) values (5, 18);
insert into ships_hot_offers(ship_id, hot_offers_id) values (4, 19);
insert into ships_hot_offers(ship_id, hot_offers_id) values (3, 20);

insert into favor_hot_offers (id, available_from, available_till, valid_until, num_of_persons, services, cost, free)
values (1, DATE('2022-01-17'), DATE('2022-01-19'), DATE('2022-01-12'), 5, null, 700, TRUE);
insert into favor_hot_offers (id, available_from, available_till, valid_until, num_of_persons, services, cost, free)
values (2, DATE('2022-02-20'), DATE('2022-02-22'), DATE('2022-03-26'), 4, null, 400, TRUE);
insert into favor_hot_offers (id, available_from, available_till, valid_until, num_of_persons, services, cost, free)
values (3, DATE('2022-01-23'), DATE('2022-01-25'), DATE('2022-02-20'), 7, null, 600, TRUE);
insert into favor_hot_offers (id, available_from, available_till, valid_until, num_of_persons, services, cost, free)
values (4, DATE('2022-01-26'), DATE('2022-01-27'), DATE('2022-05-01'), 8, null, 500, TRUE);
insert into favor_hot_offers (id, available_from, available_till, valid_until, num_of_persons, services, cost, free)
values (5, DATE('2022-01-24'), DATE('2022-01-28'), DATE('2022-04-06'), 7, null, 600, TRUE);
insert into favor_hot_offers (id, available_from, available_till, valid_until, num_of_persons, services, cost, free)
values (6, DATE('2022-01-26'), DATE('2022-01-30'), DATE('2022-03-29'), 8, null, 500, TRUE);
insert into favor_hot_offers (id, available_from, available_till, valid_until, num_of_persons, services, cost, free)
values (7, DATE('2022-01-28'), DATE('2022-02-01'), DATE('2022-02-06'), 7, null, 600, TRUE);
insert into favor_hot_offers (id, available_from, available_till, valid_until, num_of_persons, services, cost, free)
values (8, DATE('2022-01-30'), DATE('2022-02-03'), DATE('2022-04-16'), 8, null, 500, TRUE);
insert into favor_hot_offers (id, available_from, available_till, valid_until, num_of_persons, services, cost, free)
values (9, DATE('2022-02-01'), DATE('2022-02-05'), DATE('2022-02-13'), 7, null, 600, TRUE);
insert into favor_hot_offers (id, available_from, available_till, valid_until, num_of_persons, services, cost, free)
values (10, DATE('2022-02-06'), DATE('2022-02-08'), DATE('2022-01-14'), 8, null, 400, TRUE);
insert into favor_hot_offers (id, available_from, available_till, valid_until, num_of_persons, services, cost, free)
values (11, DATE('2022-02-05'), DATE('2022-02-09'), DATE('2022-01-28'), 7, null, 700, TRUE);
insert into favor_hot_offers (id, available_from, available_till, valid_until, num_of_persons, services, cost, free)
values (12, DATE('2022-02-07'), DATE('2022-02-10'), DATE('2022-02-12'), 8, null, 800, TRUE);
insert into favor_hot_offers (id, available_from, available_till, valid_until, num_of_persons, services, cost, free)
values (13, DATE('2022-02-09'), DATE('2022-02-12'), DATE('2022-02-28'), 7, null, 900, TRUE);
insert into favor_hot_offers (id, available_from, available_till, valid_until, num_of_persons, services, cost, free)
values (14, DATE('2022-02-11'), DATE('2022-02-14'), DATE('2022-02-21'), 8, null, 1000, TRUE);
insert into favor_hot_offers (id, available_from, available_till, valid_until, num_of_persons, services, cost, free)
values (15, DATE('2022-02-13'), DATE('2022-02-16'), DATE('2022-03-26'), 7, null, 1000, TRUE);
insert into favor_hot_offers (id, available_from, available_till, valid_until, num_of_persons, services, cost, free)
values (16, DATE('2022-02-17'), DATE('2022-02-21'), DATE('2022-01-16'), 8, null, 1000, TRUE);
insert into favor_hot_offers (id, available_from, available_till, valid_until, num_of_persons, services, cost, free)
values (17, DATE('2022-02-17'), DATE('2022-02-20'), DATE('2022-01-18'), 7, null, 1200, TRUE);
insert into favor_hot_offers (id, available_from, available_till, valid_until, num_of_persons, services, cost, free)
values (18, DATE('2022-02-19'), DATE('2022-02-22'), DATE('2022-02-12'), 8, null, 1100, TRUE);
insert into favor_hot_offers (id, available_from, available_till, valid_until, num_of_persons, services, cost, free)
values (19, DATE('2022-02-21'), DATE('2022-02-24'), DATE('2022-02-26'), 7, null, 1300, TRUE);
insert into favor_hot_offers (id, available_from, available_till, valid_until, num_of_persons, services, cost, free)
values (20, DATE('2022-02-23'), DATE('2022-02-26'), DATE('2022-02-22'), 8, null, 1200, TRUE);
insert into favors_hot_offers(instructors_favor_id, hot_offers_id) values (1, 1);
insert into favors_hot_offers(instructors_favor_id, hot_offers_id) values (1, 2);
insert into favors_hot_offers(instructors_favor_id, hot_offers_id) values (3, 3);
insert into favors_hot_offers(instructors_favor_id, hot_offers_id) values (4, 4);
insert into favors_hot_offers(instructors_favor_id, hot_offers_id) values (5, 5);
insert into favors_hot_offers(instructors_favor_id, hot_offers_id) values (6, 6);
insert into favors_hot_offers(instructors_favor_id, hot_offers_id) values (7, 7);
insert into favors_hot_offers(instructors_favor_id, hot_offers_id) values (8, 8);
insert into favors_hot_offers(instructors_favor_id, hot_offers_id) values (3, 9);
insert into favors_hot_offers(instructors_favor_id, hot_offers_id) values (4, 10);
insert into favors_hot_offers(instructors_favor_id, hot_offers_id) values (5, 11);
insert into favors_hot_offers(instructors_favor_id, hot_offers_id) values (6, 12);
insert into favors_hot_offers(instructors_favor_id, hot_offers_id) values (7, 13);
insert into favors_hot_offers(instructors_favor_id, hot_offers_id) values (8, 14);
insert into favors_hot_offers(instructors_favor_id, hot_offers_id) values (3, 15);
insert into favors_hot_offers(instructors_favor_id, hot_offers_id) values (4, 16);
insert into favors_hot_offers(instructors_favor_id, hot_offers_id) values (5, 17);
insert into favors_hot_offers(instructors_favor_id, hot_offers_id) values (6, 18);
insert into favors_hot_offers(instructors_favor_id, hot_offers_id) values (7, 19);
insert into favors_hot_offers(instructors_favor_id, hot_offers_id) values (8, 20);

insert into service_price (id, cost, service)
values(1, 100, 0);
insert into service_price (id, cost, service)
values(2, 150, 1);
insert into service_price (id, cost, service)
values(3, 200, 2);
insert into service_price (id, cost, service)
values(4, 60, 0);
insert into service_price (id, cost, service)
values(5, 120, 1);
insert into service_price (id, cost, service)
values(6, 80, 2);
insert into service_price (id, cost, service)
values(7, 50, 0);
insert into service_price (id, cost, service)
values(8, 40, 1);
insert into service_price (id, cost, service)
values(9, 90, 2);
insert into service_price (id, cost, service)
values(10, 110, 0);

insert into ship_service_price (id, cost, service)
values(1, 100, 0);
insert into ship_service_price (id, cost, service)
values(2, 150, 1);
insert into ship_service_price (id, cost, service)
values(3, 200, 2);
insert into ship_service_price (id, cost, service)
values(4, 60, 0);
insert into ship_service_price (id, cost, service)
values(5, 120, 1);
insert into ship_service_price (id, cost, service)
values(6, 50, 2);
insert into ship_service_price (id, cost, service)
values(7, 130, 0);
insert into ship_service_price (id, cost, service)
values(8, 170, 1);
insert into ship_service_price (id, cost, service)
values(9, 140, 2);
insert into ship_service_price (id, cost, service)
values(10, 80, 0);

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
insert into favor_service_price (id, cost, service)
values(6, 500, 1);
insert into favor_service_price (id, cost, service)
values(7, 1400, 0);
insert into favor_service_price (id, cost, service)
values(8, 2700, 1);
insert into favor_service_price (id, cost, service)
values(9, 3000, 0);
insert into favor_service_price (id, cost, service)
values(10, 850, 1);

insert into cottages_price_list (cottage_id, price_list_id)
values(1, 1);
insert into cottages_price_list (cottage_id, price_list_id)
values(1, 2);
insert into cottages_price_list (cottage_id, price_list_id)
values(1, 3);
insert into cottages_price_list (cottage_id, price_list_id)
values(2, 4);
insert into cottages_price_list (cottage_id, price_list_id)
values(2, 5);
insert into cottages_price_list (cottage_id, price_list_id)
values(11, 6);
insert into cottages_price_list (cottage_id, price_list_id)
values(14, 7);
insert into cottages_price_list (cottage_id, price_list_id)
values(16, 8);
insert into cottages_price_list (cottage_id, price_list_id)
values(20, 9);
insert into cottages_price_list (cottage_id, price_list_id)
values(20, 10);

insert into ships_price_list (ship_id, price_list_id)
values(1, 1);
insert into ships_price_list (ship_id, price_list_id)
values(1, 2);
insert into ships_price_list (ship_id, price_list_id)
values(1, 3);
insert into ships_price_list (ship_id, price_list_id)
values(2, 4);
insert into ships_price_list (ship_id, price_list_id)
values(2, 5);
insert into ships_price_list (ship_id, price_list_id)
values(5, 6);
insert into ships_price_list (ship_id, price_list_id)
values(5, 7);
insert into ships_price_list (ship_id, price_list_id)
values(6, 8);
insert into ships_price_list (ship_id, price_list_id)
values(7, 9);
insert into ships_price_list (ship_id, price_list_id)
values(8, 10);

insert into favors_price_list (instructors_favor_id, price_list_id)
values(4, 1);
insert into favors_price_list (instructors_favor_id, price_list_id)
values(4, 2);
insert into favors_price_list (instructors_favor_id, price_list_id)
values(1, 3);
insert into favors_price_list (instructors_favor_id, price_list_id)
values(2, 4);
insert into favors_price_list (instructors_favor_id, price_list_id)
values(3, 5);
insert into favors_price_list (instructors_favor_id, price_list_id)
values(5, 6);
insert into favors_price_list (instructors_favor_id, price_list_id)
values(6, 7);
insert into favors_price_list (instructors_favor_id, price_list_id)
values(7, 8);
insert into favors_price_list (instructors_favor_id, price_list_id)
values(7, 9);
insert into favors_price_list (instructors_favor_id, price_list_id)
values(8, 10);

insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (1, DATE('2021-12-20'), DATE('2021-12-23'), 233, 2, 1, null);
insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (2, DATE('2021-12-24'), DATE('2022-01-04'), 150, 3, 1, null);
insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (3, DATE('2022-01-05'), DATE('2022-01-23'), 500, 2, 1, null);
insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (4, DATE('2021-12-03'), DATE('2021-12-19'), 500, 2, 1, null);
insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (5, DATE('2022-01-23'), DATE('2022-01-25'), 500, 31, 10, null);
insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (6, DATE('2021-10-03'), DATE('2021-10-09'), 780, 14, 7, null);
insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (7, DATE('2022-02-01'), DATE('2022-02-03'), 150, 14, 8, null);
insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (8, DATE('2022-02-04'), DATE('2022-02-07'), 480, 14, 6, null);
insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (9, DATE('2022-02-11'), DATE('2022-02-13'), 250, 14, 7, null);
insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (10, DATE('2021-08-02'), DATE('2021-08-05'), 250, 14, 1, null);

insert into ship_reservations (id, available_from, available_till, cost, client_id, ship_id, services)
values (1, DATE('2021-12-20'), DATE('2021-12-23'), 233, 2, 1, null);
insert into ship_reservations (id, available_from, available_till, cost, client_id, ship_id, services)
values (2, DATE('2021-12-24'), DATE('2022-01-04'), 150, 3, 1, null);
insert into ship_reservations (id, available_from, available_till, cost, client_id, ship_id, services)
values (3, DATE('2022-01-04'), DATE('2022-01-23'), 500, 2, 1, null);
insert into ship_reservations (id, available_from, available_till, cost, client_id, ship_id, services)
values (4, DATE('2021-12-03'), DATE('2021-12-19'), 500, 2, 1, null);
insert into ship_reservations (id, available_from, available_till, cost, client_id, ship_id, services)
values (5, DATE('2022-01-17'), DATE('2022-01-19'), 500, 14, 10, null);
insert into ship_reservations (id, available_from, available_till, cost, client_id, ship_id, services)
values (6, DATE('2022-01-21'), DATE('2022-01-24'), 700, 14, 9, null);
insert into ship_reservations (id, available_from, available_till, cost, client_id, ship_id, services)
values (7, DATE('2022-01-29'), DATE('2022-01-31'), 500, 14, 8, null);
insert into ship_reservations (id, available_from, available_till, cost, client_id, ship_id, services)
values (8, DATE('2022-02-11'), DATE('2022-02-14'), 500, 14, 7, null);
insert into ship_reservations (id, available_from, available_till, cost, client_id, ship_id, services)
values (9, DATE('2021-11-01'), DATE('2021-11-04'), 450, 14, 9, null);
insert into ship_reservations (id, available_from, available_till, cost, client_id, ship_id, services)
values (10, DATE('2022-01-02'), DATE('2022-01-03'), 300, 14, 8, null);

insert into favor_reservations (id, available_from, available_till, cost, client_id, favor_id, services)
values (1, DATE('2021-12-24'), DATE('2021-12-25'), 500, 14, 1, null);
insert into favor_reservations (id, available_from, available_till, cost, client_id, favor_id, services)
values (2, DATE('2022-01-01'), DATE('2022-01-05'), 900, 14, 3, null);
insert into favor_reservations (id, available_from, available_till, cost, client_id, favor_id, services)
values (3, DATE('2022-01-17'), DATE('2022-02-06'), 600, 14, 2, null);
insert into favor_reservations (id, available_from, available_till, cost, client_id, favor_id, services)
values (4, DATE('2022-02-12'), DATE('2022-02-15'), 900, 14, 7, null);
insert into favor_reservations (id, available_from, available_till, cost, client_id, favor_id, services)
values (5, DATE('2022-01-23'), DATE('2022-01-25'), 900, 14, 8, null);
insert into favor_reservations (id, available_from, available_till, cost, client_id, favor_id, services)
values (6, DATE('2022-02-01'), DATE('2022-02-03'), 600, 14, 6, null);
insert into favor_reservations (id, available_from, available_till, cost, client_id, favor_id, services)
values (7, DATE('2022-01-02'), DATE('2022-01-12'), 1600, 14, 1, null);
insert into favor_reservations (id, available_from, available_till, cost, client_id, favor_id, services)
values (8, DATE('2022-01-17'), DATE('2022-01-25'), 1400, 14, 3, null);
insert into favor_reservations (id, available_from, available_till, cost, client_id, favor_id, services)
values (9, DATE('2022-01-01'), DATE('2022-01-06'), 800, 14, 2, null);
insert into favor_reservations (id, available_from, available_till, cost, client_id, favor_id, services)
values (10, DATE('2021-12-29'), DATE('2022-01-02'), 1000, 14, 4, null);
insert into favor_reservations (id, available_from, available_till, cost, client_id, favor_id, services)
values (11, DATE('2022-01-20'), DATE('2022-01-25'), 900, 14, 4, null);
insert into favor_reservations (id, available_from, available_till, cost, client_id, favor_id, services)
values (12, DATE('2022-03-01'), DATE('2022-03-03'), 600, 14, 4, null);

insert into concurent_watcher (id, table_name, is_writing) values (1, 'CottageReservation', false);
insert into concurent_watcher (id, table_name, is_writing) values (2, 'Cottage', false);
insert into concurent_watcher (id, table_name, is_writing) values (3, 'ShipReservation', false);
insert into concurent_watcher (id, table_name, is_writing) values (4, 'Ship', false);
insert into concurent_watcher (id, table_name, is_writing) values (5, 'ShipHotOffer', false);
insert into concurent_watcher (id, table_name, is_writing) values (6, 'CottageHotOffer', false);
insert into concurent_watcher (id, table_name, is_writing) values (7, 'FavorReservation', false);
insert into concurent_watcher (id, table_name, is_writing) values (8, 'Favor', false);
insert into concurent_watcher (id, table_name, is_writing) values (9, 'FavorHotOffer', false);
insert into concurent_watcher (id, table_name, is_writing) values (10, 'Grade', false);

insert into cottages_subscribed_users (cottage_id, subscribed_users_id) values (1, 14);
insert into cottages_subscribed_users (cottage_id, subscribed_users_id) values (1, 27);
insert into cottages_subscribed_users (cottage_id, subscribed_users_id) values (1, 28);

insert into ships_subscribed_users (ship_id, subscribed_users_id) values (1, 14);
insert into ships_subscribed_users (ship_id, subscribed_users_id) values (1, 29);
insert into ships_subscribed_users (ship_id, subscribed_users_id) values (1, 30);

insert into users_subscribed_users (user_id, subscribed_users_id) values (4, 14);
insert into users_subscribed_users (user_id, subscribed_users_id) values (5, 31);
insert into users_subscribed_users (user_id, subscribed_users_id) values (6, 14);