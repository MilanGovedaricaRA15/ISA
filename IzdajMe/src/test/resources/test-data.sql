


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
values (2, 'Dunavska 2',DATE('2021-08-22'),DATE('2021-10-01'),'Blizu jezera', null, 'Popici', 3, 3, 'Nisu dozvoljene zivotinje', null, 1, 30);

insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (1,DATE('2021-12-20'),DATE('2021-12-23'),233,2,1, null);
insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (2,DATE('2021-12-24'),DATE('2022-01-04'),150,3,1, null);
insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (3,DATE('2022-01-04'),DATE('2022-01-23'),500,2,1, null);
insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (4,DATE('2021-12-03'),DATE('2021-12-19'),500,2,1, null);




