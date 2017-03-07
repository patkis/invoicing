
/*********************************************************************

  database setup for application Invoicing 

  created by Patrik Kiss

*********************************************************************/

/* create database */
create database invoicing character set utf8 collate utf8_general_ci;

/* delete database */
drop database invoicing;

/*********************************************************************/

/* table for storing clients */
create table clients(
id INT NOT NULL AUTO_INCREMENT,
company VARCHAR(100) NOT NULL,
fname VARCHAR(100) NOT NULL,
lname VARCHAR(100) NOT NULL,
email VARCHAR(255) NOT NULL,
street VARCHAR(100) NOT NULL,
city VARCHAR(100) NOT NULL,
zip VARCHAR(50) NOT NULL,    
country VARCHAR(100) NOT NULL,
ico INT(8) NULL,
dic INT(10) NULL,
icdph VARCHAR(12) NULL,
is_valid TINYINT(1) DEFAULT 1,
sys_inserted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id)
);

/* delete table clients */
drop table clients;

/* insert some test clients */
insert into clients
(fname,lname,email,street,city,zip,country,ico,dic,icdph) values 
('Ján','Malý','janmaly@mail.sk','Hviezdna 111','Bratislava','91234','SK',12345678,1122334455,'SK1122334455');
insert into clients
(fname,lname,email,street,city,zip,country,ico,dic,icdph) values 
('Ladislav','Veľký','ladvelky@mail.sk','Dierova 222','Bratislava','91234','SK',12341234,334455112233,'334455112233');
insert into clients
(fname,lname,email,street,city,zip,country,ico,dic,icdph) values 
('IVA','Krásna','ivakrasna@mail.sk','Hlavna 88','Košice','98012','SK',98765432,8877665544,'8877665544');

/* delete from clients */
delete from clients;

/*********************************************************************/

/* table for storing invoices */
create table invoice(
id INT NOT NULL AUTO_INCREMENT,
id_client INT(10) NOT NULL,
var_sym INT(10) NOT NULL,
created DATE NOT NULL,
expired DATE NOT NULL,
sys_inserted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id)
)

/* insert some test invoice */
insert into invoice
(id_client,var_sym,created,expired) values 
(1,123456,'2017-02-21','2017-03-21');

/* delete table invoice */
drop table invoice;

/* delete from invoice */
delete from invoice;

/*********************************************************************/

/* table for invoice items */
create table invoice_item(
id INT NOT NULL AUTO_INCREMENT,
id_invoice INT(10) NOT NULL,
item_descr VARCHAR(255) NOT NULL,
quantity INT(10) NOT NULL,
price DECIMAL(19,2) NOT NULL,
sys_inserted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id)
)

/* delete table invoice_item */
drop table invoice_item;

/* delete from invoice item */
delete from invoice_item;

/*********************************************************************/

/* table for supplier account */
create table account(
company VARCHAR(100) NULL,
fname VARCHAR(100) NULL,
lname VARCHAR(100) NULL,
email VARCHAR(255) NULL,
street VARCHAR(100)NULL,
city VARCHAR(100) NULL,
zip VARCHAR(50) NULL,    
country VARCHAR(100) NULL,
ico INT(8) NULL,
dic INT(10) NULL,
icdph VARCHAR(12) NULL
)

/* delete table account */
drop table account;

/* delete from account */
delete from account;

