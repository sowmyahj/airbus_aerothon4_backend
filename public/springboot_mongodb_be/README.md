# springboot_be_mysql

Import project in ecplipse as existing maven project;
Right click on project->run as -> maven build .. -> goals -> clean install
Right click on SpringrestApplication.java -> run as java application;


Run commands in mysql local terminal;
CREATE TABLE `login` (
  `username` varchar(40) NOT NULL,
  `password` varchar(40)  NULL,
  PRIMARY KEY (`username`)
)

INSERT INTO springboot.login
(username, password)
VALUES('admin', 'admin');

And configure accordingly in application.properties.

Create database springboot;
Use springbok;
CREATE TABLE `login` (
  `username` varchar(40) NOT NULL,
  `password` varchar(40)  NULL,
  PRIMARY KEY (`username`)
)

INSERT INTO springboot.login
(username, password)
VALUES('admin', 'admin');
