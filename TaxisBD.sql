create database TaxisBdTeo
create table settlements(
id int primary key,
name varchar(250) Not null
)
create table status(
id  int identity Primary key,
name varchar(200)
)
create table streets(
id int primary key,
name varchar(250) Not null,
settlement int,
Foreign key (settlement) references settlements(id)
)

create table brands(
id int primary key,
name varchar(300)
)

create table models (
id int primary key,
name varchar(500),
idBrand int,
FOREIGN KEY (brand) REFERENCES brands(id),
)

Create table admins(
id int IDENTITY primary key,
name varchar(500) not null,
lm1 varchar(400) not null, 
lm2 varchar(400) not null, 
phone varchar(20) not null,
st1 int,
st2 int,
st3 int,
settlement int,
extNumber int,
birthDate date,
registerD datetime default(getdate()),
lastModDate DATETIME default(getdate()),
mail varchar(600),

FOREIGN KEY (st1) REFERENCES streets(id),
Foreign key (st2) references streets(id),
Foreign key (st3) references streets(id),
Foreign key (settlement) references settlements(id)
)

create table units(
	id int Identity primary key ,
	ecoNumber int,
	--quite brand por que al tenerlo en la otra tabla puedo acceder a ella
	model int,--
	yearModel int,
	color varchar(100),
	serie varchar(120),
	motor varchar(120),
	plate varchar(10),
	status int,
	registerDate date default(GETDATE()),
	lastModDate date default (GETDATE()),
	expInsurance date,
	admin int,
foreign key (admin) references admins(id),
foreign key (model) references models(id),
)

CREATE TABLE permissionaires (
id int Identity primary key,
name varchar(500) not null,
lm1 varchar(400) not null, 
lm2 varchar(400) not null, 
phone varchar(20) not null,
st1 int,
st2 int,
st3 int,
settlement int,
extNumber int,
registerD Datetime    default (getdate()),
lastModDate Datetime  default (getdate()),
birth Datetime,

Foreign key (st1) references streets(id),
Foreign key (st2) references streets(id),
Foreign key (st3) references streets(id),
Foreign key (settlement) references settlements(id)
)

create table relationship(
id int identity primary key,
name varchar(200)
)
create table contactsDrivers(
id int Identity primary key,
name varchar(500) NOT NULL,
lm1 varchar(400) NOT NULL,
lm2 varchar(400) NOT NULL,
phone varchar(20),
st1 int,
st2 int,
st3 int,
settlement int,
extNumber int,
relation int,
Foreign key (st1) references streets(id),
Foreign key (st2) references streets(id),
Foreign key (st3) references streets(id),
Foreign key (settlement) references settlements(id),
Foreign key (relation) references relationship(id),
)
CREATE TABLE drivers (
  id INT IDENTITY PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  lm1 VARCHAR(400) NOT NULL,
  lm2 VARCHAR(400) NOT NULL,
  phone VARCHAR(20),
  st1 INT,
  st2 INT,
  st3 INT,
  settlement INT,
  extNumber INT,
  birth DATE,
  hireDate DATETIME DEFAULT (getdate()),
  lastModD DATETIME DEFAULT (getdate()),
  password VARCHAR(400) NOT NULL,
  admin INT,
  licenseEx DATE,
  ingressPay INT NOT NULL, -- Cambiado a INT para permitir valores como 400 o 500
  status INT,
  contactDrivers INT, -- Nueva columna para la llave foránea contactDrivers

  FOREIGN KEY (st1) REFERENCES streets(id),
  FOREIGN KEY (st2) REFERENCES streets(id),
  FOREIGN KEY (st3) REFERENCES streets(id),
  FOREIGN KEY (settlement) REFERENCES settlements(id),
  FOREIGN KEY (admin) REFERENCES admins(id),
  FOREIGN KEY (status) REFERENCES status(id),
  FOREIGN KEY (contactDrivers) REFERENCES contactsDrivers(id) -- Nueva restricción de llave foránea para contactDrivers
);
create table sinistersTypes (
id int Identity primary key,
name varchar(300)
)
create table insurers(
id int Identity primary key,
name varchar(300)
)
create table sinisters(
id int Identity primary key,
idUnit int,
typeSinister int,
st1 int,
st2 int,
st3 int,
settlement int,
worl bit,
insurance int,
OBS text,
foreign Key (idUnit) references units(id),
foreign Key (st1) references streets(id),
foreign Key (st2) references streets(id),
foreign Key (st3) references streets(id),
foreign Key (settlement) references settlements(id),
foreign Key (insurance) references insurers(id),
foreign Key (typeSinister) references sinistersTypes(id),
)
select * from sinisters

--ya quedo pero esto alomejor no de momento
create table sites(
id int primary key,
name varchar(300),
extra text
)
create table permissions(
numberPermis int,
permissionaire int,
site int,
Foreign key (permissionaire) references permissionaires(id),
Foreign key (site) references sites(id),
)

create table reports(
unit int,
chofer int,
date datetime default(GetDate()),
---img image
)



--aseguradora sera una tabla?
-----los sitios llevaran una tabla?
--marca o brand sera una tabla que tendra
 --//modelos de carros sera otra tabla
--numero economico tambien podria ser una tabla

/*
	DATOS PARA LLENAR LAS TABLAS
*/
---settlement
select * from settlements
insert into settlements Values (1,'Los Angeles')
insert into settlements Values (2,'Los Naranjos')
insert into settlements Values (3,'Las Cerezas')
insert into settlements Values (4,'Los Portales')
insert into settlements Values (5,'Lombardo Toledano')
insert into settlements Values (6,'Las Canteras')
insert into settlements Values (666,'Calles limítrofe ')
insert into settlements Values (777,'Avenidas limítrofe ')
insert into settlements (id, name) values
	(40, 'Centro'),
	(41, 'Las Palmas'),
	(42, 'Los Olivos'),
	(43, 'San Francisco'),
	(44, 'El Dorado'),
	(45, 'Las Riberas'),
	(46, 'La Floresta'),
	(47, 'Las Brisas'),
	(48, 'Los Héroes');
select * from settlements

--STREETS
select * from streets
insert into streets Values(1,'Cerritos',1)
insert into streets Values(2,'Almendro',2)
insert into streets Values(3,'Calle America',3)
insert into streets Values(4,'Lombardo Toledano',4)
insert into streets Values(5,'Calle Emiliano Zapata',5)
insert into streets Values(6,'Avenida Batamote',3)
insert into streets Values(7,'Calle Francisco I. Madero',5)
insert into streets Values(8,'Calle las Canteras',6)
insert into streets Values(9,'Articulo 123',2)
insert into streets Values(10,'Huertos de villa',2)
insert into streets Values(11,'Villa de Azahares',2)
insert into streets Values(12,'Avenida Baynoro',3)
insert into streets Values(13,'Avenida Centenario',777)
insert into streets Values(14,'Avenida Gabriel Leyva Solano',777)
insert into streets Values(15,'Avenida Juan Pablo II',777)
insert into streets Values(16,'Calle Macario Gaxiola',666)
insert into streets (id, name, settlement) values
(40, 'Cerrada de Los Ángeles', 40),
(41, 'Calle Río Sinaloa', 40),
(42, 'Avenida Juárez', 40),
(43, 'Calle Morelos', 41),
(44, 'Calle Cristóbal Colón', 41),
(45, 'Calle Venustiano Carranza', 42),
(46, 'Avenida Francisco I. Madero', 42),
(47, 'Calle Ángel Flores', 43),
(48, 'Avenida Juan Pablo II', 43);
select st.*, c.name as colonia from streets as st INNER JOIN settlements as c ON st.settlement=c.id order by st.name ASC

--admins
insert into admins
	(id,name,lm1,lm2,phone,st1,st2,st3,settlement,extNumber,birthDate,registerD,lastModDate,mail) Values
	(1,'Rodrigo Perez','Sanchez','Valenzuela',668432393,9,10,11,2,5090,'1991-08-15',GETDATE(),GETDATE(),'RigoJefe@gmail.com')
insert into admins
	(id,name,lm1,lm2,phone,st1,st2,st3,settlement,extNumber,birthDate,registerD,lastModDate,mail) Values
	(2,'Kevin Antonio','Ibarra','Mondaca',6683227452,9,10,11,2,2089,'2003-08-15',GETDATE(),GETDATE(),'elkelvin@gmail.com')
insert into admins
	(id,name,lm1,lm2,phone,st1,st2,st3,settlement,extNumber,birthDate,registerD,lastModDate,mail) Values
	(3,'Naomi','Lopez','Perez',6683567832,9,10,11,2,1090,'2003-04-19',GETDATE(),GETDATE(),'naoLope@gmail.com')
insert into admins
	(id,name,lm1,lm2,phone,st1,st2,st3,settlement,extNumber,birthDate,registerD,lastModDate,mail) Values
	(40,'Juan Manuel','García','López',6683567833,40,41,42,40,1100,'2004-05-20',GETDATE(),GETDATE(),'juangar@gmail.com'),
	(41,'María Jose','Martínez','Pérez',6683567834,43,44,45,41,1110,'2005-06-21',GETDATE(),GETDATE(),'marimar@gmail.com'),
	(42,'Pedro Escobedo','Sánchez','Gómez',6683567835,46,47,48,42,1120,'2006-07-22',GETDATE(),GETDATE(),'pedrogo@gmail.com'),
	(43,'Ana Armas','Rodríguez','Hernández',6683567836,40,41,42,43,1130,'2007-08-23',GETDATE(),GETDATE(),'anarho@gmail.com'),
	(44,'José Maria','López','Martínez',6683567837,43,44,45,44,1140,'2008-09-24',GETDATE(),GETDATE(),'joselo@gmail.com');
select * from admins

--PERMISSIONAIRES
insert into permissionaires
	(name,lm1,lm2,phone,st1,st2,st3,settlement,extNumber,registerD,lastModDate,birth) Values
	('Brayan Alberto','Gonzales','Valdez',66845677452,9,10,11,2,0980,GETDATE(),GETDATE(),'1960-06-03')
insert into permissionaires
	(name,lm1,lm2,phone,st1,st2,st3,settlement,extNumber,registerD,lastModDate,birth) Values
	('Brayan Alberto','Gonzales','Valdez',66845677452,9,10,11,2,0980,GETDATE(),GETDATE(),'1960-06-03')
	select * from permissionaires

--DRIVERS
insert into drivers 
	(name,lm1,lm2,phone,st1,st2,st3,settlement,
	extNumber,birth,hireDate,lastModD,password,admin,licenseEx,ingressPay,status) 
	Values('Juan Rosales','Gonzales','Perez',6685445845,9,10,11,2,4567,'1999-02-06',GETDATE(),GetDate(),'PERRO',2,'2024-10-18',1,1)
insert into drivers
	(name,lm1,lm2,phone,st1,st2,st3,settlement,
	extNumber,birth,hireDate,lastModD,password,admin,licenseEx,ingressPay,status)
 Values
	('Pedro Sanchez','Rodriguez','Garcia',6665445845,40,42,44,42,7890,'1997-04-08',GETDATE(),GetDate(),'PERRO',1,'2027-12-27',1,1),
	('Ana Lopez','Martin','Sanchez',6655445845,40,41,42,43,1234,'1996-05-09',GETDATE(),GetDate(),'12354',1,'2025-01-25',2,1),
	('Luis Perez','Gonzalez','Martinez',6645445845,42,43,44,44,7890,'1995-06-10',GETDATE(),GetDate(),'laptop',3,'2025-02-26',1,1),
	('Sofia Gonzalez','Lopez','Rodriguez',6635445845,43,44,40,40,1234,'1994-07-11',GETDATE(),GetDate(),'PERRO',1,'2026-03-23',1,1),
	('David Martinez','Sanchez','Perez',6625445845,44,45,46,42,7890,'1993-08-12',GETDATE(),GetDate(),'telefono',3,'2028-04-24',2,1),
	('Camila Rodriguez','Perez','Gonzalez',6615445845,45,46,43,44,1234,'1992-09-13',GETDATE(),GetDate(),'arriba',1,'2025-05-25',1,1),
	('Fernando Perez','Lopez','Martinez',6605445845,46,47,41,42,7890,'1991-10-14',GETDATE(),GetDate(),'audifono',3,'2025-06-26',3,1);

	-- models
INSERT INTO models (id, name, idbrand)
VALUES (1, 'Versa', 1),
(2, 'Altima', 1),
(3, 'Frontier', 1),
(4, 'Rogue', 1),
(5, 'Titan', 1),
(6, 'Altima', 2),
(7, 'Kicks', 2),
(8, 'Pathfinder', 2),
(9, 'Corolla', 1),
(10, 'Camry', 1),
(11, 'Fiesta', 5),
(12, 'Focus', 5),
(13, 'Fusion', 5),
(14, 'Vento', 4),
(15, 'Explorer', 5),
(16, 'Golf', 2),
(17, 'Jetta', 2),
(18, 'Passat', 2),
(19, 'Tiguan', 2),
(20, 'Atlas', 2),
(21, 'Elantra', 3),
(22, 'Sonata', 3),
(23, 'Tucson', 3),
(24, 'Santa Fe', 3),
(25, 'Palisade', 3),
(26, 'Sentra', 4),
(27, 'Altima', 4),
(28, 'Maxima', 4),
(29, 'Rogue', 4),
(30, 'Pathfinder', 4);

-- Units
INSERT INTO units (/*id,*/ecoNumber,model,yearModel,color,serie,motor,plate,registerDate,lastModDate,expInsurance,admin)VALUES 
(/*1,*/1,20,2020,'#FFFFFF','MHKMF53E1HK011096','MR18923155H','6727TVC','2021-08-15',GETDATE(),'2025-01-20',3),
(/*2,*/2,4,2022,'#808080','KL8CM6CD3DC615559','GA16834425W','6720TVC','2023-03-10',GETDATE(),'2025-09-20',41),
(/*3,*/9,14,2023,'#FF0000','MEX5G260XJT107083','CLS638883','1021TVC','2022-10-05',GETDATE(),'2025-04-20',42);

INSERT INTO units (ecoNumber, model, yearModel, color, serie, motor, plate, registerDate, lastModDate, expInsurance, admin)
VALUES (4, 10, 2021, '#FFA500', 'XYZ123456', 'ABC987654', '1234ABC', '2021-09-01', GETDATE(), '2025-06-30', 43);

update units set ecoNumber=20, model=20,yearmodel=2024,
			color='#fffff',serie='WWWWF53E1HK011096' ,motor='WWWWWWW', plate='UTVNS',
			registerDate='2030-08-15', lastModDate='2030-08-15', expInsurance='2030-08-15',
             admin=3      where id=10;

-- Unidad con ecoNumber 7
INSERT INTO units (ecoNumber, model, yearModel, color, serie, motor, plate, registerDate, lastModDate, expInsurance, admin)
VALUES (7, 18, 2023, '#00FF00', 'LMN789012', 'DEF345678', '5678LMN', '2022-12-10', GETDATE(), '2025-08-10', 43);

-- Unidad con ecoNumber 12
INSERT INTO units (ecoNumber, model, yearModel, color, serie, motor, plate, registerDate, lastModDate, expInsurance, admin)
VALUES (12, 22, 2024, '#0000FF', 'PQR345678', 'GHI901234', '9012PQR', '2023-11-05', GETDATE(), '2025-12-01', 44);

insert into sinisters
(idUnit,typeSinister,st1,st2,st3,settlement,worl,insurance,OBS)
VALUES 
		( 9, 1, 9, 10, 11, 2 ,1,4,
	'Se dice que cuando sucedio el choque estuvo 
	muy feo todo y fue como ver una serie de 10 temporadas con chistes de pedos y risas pre-grabadas'),
		(12, 2, 9, 10, 11, 2 ,0,1,
	'Un choque sencillo la persona se distrajo de pronto y de un momento a otro sucedio el choque siguen
	sin entender muy bien por que sucedio o como solucionar lo que paso');

--contactDrivers
INSERT INTO contactsDrivers 
    (name, lm1, lm2, phone, st1, st2, st3, settlement, extNumber, relation) 
VALUES
    ('Pedro Martinez', 'Lopez', 'Gomez', 6685445846, 9, 10, 11, 2, 4568, 1),
    ('Maria Rodriguez', 'Sanchez', 'Ramirez', 6685445847, 9, 10, 11, 2, 6942, 2),
    ('Carlos Hernandez', 'Torres', 'Castillo', 6685445848, 9, 10, 11, 2, 2345, 3),
    ('Ana Perez', 'Gutierrez', 'Aguilar', 6685445849, 9, 10, 11, 2, 1635, 5),
    ('Luis Morales', 'Ortiz', 'Silva', 6685445850, 9, 10, 11, 2, 9634, 4),
	('Roberto Guzman', 'Diaz', 'Mendoza', 6685445851, 9, 10, 11, 2, 4573, 6),
    ('Patricia Juarez', 'Cortez', 'Rojas', 6685445852, 9, 10, 11, 2, 4574, 8),
    ('Ricardo Rios', 'Medina', 'Guerrero', 6685445853, 9, 10, 11, 2, 4575, 7),
    ('Sofia Alvarado', 'Romero', 'Peña', 6685445854, 9, 10, 11, 2, 4576, 10),
    ('Jorge Torres', 'Navarro', 'Solis', 6685445855, 9, 10, 11, 2, 4577, 9);
----CONTACTS DRIVERS
--consulta de todos los contactos de los conductores
select c.*,r.name as relationS,
(select s.name from streets as s where s.id = c.st1) as street1,
(select s.name from streets as s where s.id = c.st2) as street2,
(select s.name from streets as s where s.id = c.st3) as street3,
(select s.name from settlements as s where s.id = c.settlement) as settlementS
from contactsDrivers as c 
INNER JOIN relationship as r 
ON r.id= c.relation

--consulta de un solo contacto
select c.*,r.name as relationS,
(select s.name from streets as s where s.id = c.st1) as street1,
(select s.name from streets as s where s.id = c.st2) as street2,
(select s.name from streets as s where s.id = c.st3) as street3,
(select s.name from settlements as s where s.id = c.settlement) as settlementS
from contactsDrivers as c INNER JOIN relationship as r ON r.id= c.relation where c.id= 1
--UPDATE
update contactsDrivers set
				name='She',
				lm1='Hermosa',
				lm2='Miamor',
                phone=6683443212,
				st1=9,
				st2=10,
				st3=11,
				settlement=2,
				extNumber=4503,
                relation= 5
                where id=40
--Consultar Listado de relaciones
select * from status
--Streets
select a.*, (select s.name from streets as s where s.id = a.st1) as street1, 
	(select s.name from streets as s where s.id = a.st2) as street2,
	(select s.name from streets as s where s.id = a.st3) as street3,
	(select s.name from settlements as s where s.id = a.settlement) as settlementS
	from admins as a inner join streets as s on a.st1 = s.id where a.id = 1;
	update admins set 
                name='She',
				lm1='Hermosa',
				lm2='Miamor',
                phone=6683443212,
				st1=9,
				st2=10,
				st3=11,
				settlement=2,
				extNumber=4503,
                birthDate='2003-04-06',
				--registerD=GETDATE(),
				lastModDate=GETDATE(),
				mail='NaomiLove@gmail.com'
                where id=4
--permissionaires
select a.*, (select s.name from streets as s where s.id = a.st1) as street1, (select s.name from streets as s where s.id = a.st2) as street2, (select s.name from streets as s where s.id = a.st3) as street3, (select s.name from settlements as s where s.id = a.settlement) as settlementS  from permissionaires as a inner join streets as s on a.st1 = s.id where a.id = 1;
	select * from permissionaires
update permissionaires set 
                name='Pedro',
				lm1='Jimenez',
				lm2='Escobedo',
                phone=66833463212,
				st1=9,
				st2=10,
				st3=11,
				settlement=2,
				extNumber=6303,
				lastModDate=GETDATE(),                
				--registerD=GETDATE(),
				birth='1900-04-06'
				where id=2


--drivers selects

select * from admins
select * from admins where id=9
delete from drivers where admin=4
delete from admins where id>=40 and id<=44

				select a.*, 
                (select s.name from streets as s where s.id = a.st1) as street1, 
                (select s.name from streets as s where s.id = a.st2) as street2, 
                (select s.name from streets as s where s.id = a.st3) as street3, 
                (select s.name from settlements as s where s.id = a.settlement) as settlementS, 
                (select s.name from admins as s where s.id = a.admin) as adminName 
                from drivers as a;

				select a.*,
                  (select s.name from streets as s where s.id = a.st1) as street1,
                  (select s.name from streets as s where s.id = a.st2) as street2,
                  (select s.name from streets as s where s.id = a.st3) as street3,
                  (select s.name from settlements as s where s.id = a.settlement) as settlementS,
                  (select s.name from admins as s where s.id = a.admin) as adminName
                  from drivers as a where a.id = 1
				 
				 select a.*,
                (select s.name from streets as s where s.id = a.st1) as street1,
                (select s.name from streets as s where s.id = a.st2) as street2,
                (select s.name from streets as s where s.id = a.st3) as street3,
                (select s.name from settlements as s where s.id = a.settlement) as settlementS,
                (select s.name+' '+s.lm1+' '+s.lm2 from admins as s where s.id = a.admin) as adminName,
				(select s.name from status as s where s.id = a.status)as statusS
                from drivers as a where a.id = 2;


--select de un siniestro
					 select a.*,
				(select s.ecoNumber from units as s where s.id = a.idUnit) as ecoNumber,
				(select s.name from sinistersTypes as s where s.id = a.typeSinister) as sinisterType,
				(select s.name from insurers as s where s.id = a.insurance) as insurance,
                (select s.name from streets as s where s.id = a.st1) as street1,
                (select s.name from streets as s where s.id = a.st2) as street2,
                (select s.name from streets as s where s.id = a.st3) as street3,
                (select s.name from settlements as s where s.id = a.settlement) as settlementS
                from sinisters as a where a.id = 1;

-- la tabla units estara conectada a los permisos por el id de el permiso
--modificar todo eso en la API
-- brands
INSERT INTO brands (id, name)
VALUES (1, 'Ford'),
(2, 'Nissan'),
(3, 'Toyota'),
(4, 'Volkswagen'),
(5, 'Hyundai');

-- Consultar datos de la tabla brands
SELECT *
FROM brands;

-- Consultar datos de la tabla models
SELECT a.*,b.name as BrandName
FROM models as a Inner Join brands as b ON a.idBrand=b.id 
order by BrandName ASC;

-- Consultar datos de la tabla units
SELECT a.*,m.name as [modelName],b.name as [brandName],d.name+' '+ + d.lm1+ ' '+ d.lm2  as adminName
FROM units as a 
INNER JOIN models as m ON a.model= m.id  
INNER JOIN brands as b ON m.idBrand=b.id
INNER JOIN admins as d ON a.admin=d.id
where a.id=10;

SELECT a.*,m.name as [modelName],b.name as [brandName],d.name as adminName
                FROM units as a
               INNER JOIN models as m ON a.model= m.id  
                INNER JOIN brands as b ON m.idBrand=b.id 
                INNER JOIN admins as d ON a.admin=d.id;
select id,name+' '+lm1+' '+lm2 as nombre from admins
select * from brands
select m.id,m.name,m.idbrand,b.name as brand from models as m INNER JOIN brands as b on b.id=m.idBrand order by b.name

SELECT name, COUNT(*) 
FROM models 
GROUP BY name 
HAVING COUNT(*) > 1;

--no recuerdo funcion
WITH CTE AS(
   SELECT name, 
          ROW_NUMBER() OVER(PARTITION BY name ORDER BY id) AS RowNumber
   FROM models
)
DELETE FROM CTE WHERE RowNumber > 1

--borrar
		drop table drivers
		drop table admins
		drop table permissionaires

ALTER TABLE permissionaires
ALTER COLUMN phone bigInt;


select * from units

select a.*,b.name from models as a INNER JOIN brands as b ON a.idBrand= b.id

---Correcion de el identity
-- Copiar los datos existentes a la nueva tabla
INSERT INTO admins_new (name, lm1, lm2, phone, st1, st2, st3, settlement, extNumber, birthDate, registerD, lastModDate, mail)
SELECT name, lm1, lm2, phone, st1, st2, st3, settlement, extNumber, birthDate, registerD, lastModDate, mail FROM admins;
select * from admins;
select * from admins_new;
-- Encuentra los valores en 'admin' que no existen en 'admins'
SELECT admin FROM units
EXCEPT
SELECT id FROM admins;

-- Primero, eliminar la restricción de clave foránea en la tabla drivers
ALTER TABLE drivers DROP CONSTRAINT FK__drivers__admin__2FCF1A8A;
ALTER TABLE units DROP CONSTRAINT FK__units__admin__51300E55;
EXEC sp_help 'permissionaires';

-- Luego, crear una nueva restricción de clave foránea en drivers que haga referencia a admins_new
ALTER TABLE drivers ADD CONSTRAINT FK_drivers_admins_new FOREIGN KEY (admin) REFERENCES admins_new(id);
ALTER TABLE units ADD CONSTRAINT FK_units_admins FOREIGN KEY (admin) REFERENCES admins(id);
