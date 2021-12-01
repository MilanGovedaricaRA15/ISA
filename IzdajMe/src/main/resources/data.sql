delete from account_delete_requests where id!=0;
delete from cottage_reservations where id!=0;
delete from cottages_hot_offers where cottage_id!=0;
delete from hot_offers where id!=0;
delete from cottages where id!=0;


delete from users where id!=0;

insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified)
values (1, 'Ilije 1', 'Beograd', 'Srbija', 'rajkorajkoza@gmail.com', 'Milan', 'Govedarica', 123123123, 'aaaa', 'Izdaja vikendice', 0, TRUE);

insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified)
values (2, 'Banjalucka 2', 'Banjaluka', 'Bosna', 'popaljubav@gmail.com', 'Miodrag', 'Prod', 111222333, 'aaaa', null, 0, TRUE);

insert into users (id, address, city, country, email,first_name,last_name,mobile_number,password,reason,role,verified)
values (3, 'Focanska 2', 'Foca', 'Bosna', 'foca@gmail.com', 'Coa', 'Podunavac', 112123233, 'aaaa', null, 0, TRUE);

insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (1, 'Desivoje 1',DATE('2021-09-01'),DATE('2022-02-01'),'Na jezeru',null, 'Micova', 3, 3, 'Nisu dozvoljene zivotinje', null, 1, 50);

insert into cottages (id, address, available_from, available_till, description, images, name, num_of_beds, num_of_rooms, rules, services, owner_id, cost_per_night)
values (2, 'Desivoje 2',DATE('2021-08-22'),DATE('2021-10-01'),'Blizu jezera',null, 'Popici', 3, 3, 'Nisu dozvoljene zivotinje', null, 1, 30);

insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (1,DATE('2021-12-01'),DATE('2021-12-15'),50,TRUE,3,null);
insert into cottages_hot_offers(cottage_id,hot_offers_id) values (1,1);
insert into hot_offers (id, available_from, available_till, cost, free, num_of_people, services)
values (2,DATE('2021-12-15'),DATE('2021-12-20'),28,TRUE,4,null);
insert into cottages_hot_offers(cottage_id,hot_offers_id) values (1,2);


insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (1,DATE('2021-12-20'),DATE('2021-12-23'),233,2,1, null);

insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (2,DATE('2021-12-24'),DATE('2022-01-04'),150,3,1, null);

insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (3,DATE('2022-01-04'),DATE('2022-01-23'),500,2,1, null);
insert into cottage_reservations (id, available_from, available_till, cost, client_id, cottage_id, services)
values (4,DATE('2021-11-29'),DATE('2021-12-19'),500,2,1, null);