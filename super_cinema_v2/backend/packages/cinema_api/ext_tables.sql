CREATE TABLE tx_cinemaapi_domain_model_movie (
    uid int(11) NOT NULL auto_increment,
    pid int(11) DEFAULT '0' NOT NULL,

    title varchar(255) DEFAULT '' NOT NULL,
    description text,
    image int(11) unsigned DEFAULT '0' NOT NULL,
    release_date int(11) DEFAULT '0' NOT NULL,
    rating double(11,2) DEFAULT '0.00' NOT NULL,

    PRIMARY KEY (uid),
    KEY parent (pid)
);

CREATE TABLE tx_cinemaapi_domain_model_snack (
    uid int(11) NOT NULL auto_increment,
    pid int(11) DEFAULT '0' NOT NULL,

    title varchar(255) DEFAULT '' NOT NULL,
    description text,
    price double(11,2) DEFAULT '0.00' NOT NULL,
    image int(11) unsigned DEFAULT '0' NOT NULL,
    category varchar(255) DEFAULT '' NOT NULL,

    PRIMARY KEY (uid),
    KEY parent (pid)
);

CREATE TABLE tx_cinemaapi_domain_model_screening (
    uid int(11) NOT NULL auto_increment,
    pid int(11) DEFAULT '0' NOT NULL,

    movie int(11) unsigned DEFAULT '0' NOT NULL,
    start_time int(11) DEFAULT '0' NOT NULL,
    room varchar(255) DEFAULT '' NOT NULL,

    PRIMARY KEY (uid),
    KEY parent (pid)
);
