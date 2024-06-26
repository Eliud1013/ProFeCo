

    DROP DATABASE IF EXISTS Profeco;
    CREATE DATABASE Profeco;
    USE Profeco;


    CREATE TABLE Clientes(
        clienteId VARCHAR(52) PRIMARY KEY NOT NULL UNIQUE,
        name VARCHAR(52) NOT NULL,
        username VARCHAR(52) NOT NULL,
        email VARCHAR(52) NOT NULL UNIQUE,
        password VARCHAR(128) NOT NULL,
        genre ENUM('H','M') NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP

    );


    CREATE TABLE Mercados(
        mercadoId VARCHAR(52) PRIMARY KEY NOT NULL,
        mercado VARCHAR(52) NOT NULL,
        adminUser VARCHAR(52) NOT NULL,
        password VARCHAR(128) NOT NULL,
        email VARCHAR(52) NOT NULL UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP

    );

    CREATE TABLE ProfecoUsuarios(
        profecoUsuarioId VARCHAR(52) PRIMARY KEY NOT NULL UNIQUE,
        name VARCHAR(52) NOT NULL,
        username VARCHAR(52) NOT NULL,
        email VARCHAR(52) NOT NULL UNIQUE,
        password VARCHAR(128) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    INSERT INTO ProfecoUsuarios(profecoUsuarioId,name,username,email,password)VALUES(1,'Adrian Herrera','Admin','Adrian@mail.com','$2a$12$oOLzyT9yQgstweiUqmJZ6OKHrGNCeW7nrcw/TuJwlLrZz18MFs1he');

    CREATE TABLE ProfecoUsuario(
        profecoUserId VARCHAR(52) PRIMARY KEY NOT NULL UNIQUE,
        username VARCHAR(52) NOT NULL UNIQUE,
        password VARCHAR(52) NOT NULL,
        email VARCHAR(52) NOT NULL UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE Productos (
        productoId VARCHAR(52) PRIMARY KEY NOT NULL UNIQUE,
        mercadoId VARCHAR(52) NOT NULL,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT,
        precio DECIMAL(10, 2) NOT NULL,
        imagenUrl TEXT,
        FOREIGN KEY(mercadoId) REFERENCES Mercados(mercadoId)
    );

    CREATE TABLE Ofertas(
        ofertaId VARCHAR(52) PRIMARY KEY NOT NULL UNIQUE,
        mercadoId VARCHAR(52) NOT NULL,
        productoId VARCHAR(52),
        precioOferta INT NOT NULL,
        FOREIGN KEY (mercadoId) REFERENCES Mercados(mercadoId),
        FOREIGN KEY (productoId) REFERENCES Productos(productoId)
    );

    CREATE TABLE Inconsistencias(
        inconsistenciaId VARCHAR(52) PRIMARY KEY NOT NULL UNIQUE,
        ofertaId VARCHAR(52) NOT NULL,
        clienteId VARCHAR(52) NOT NULL,
        mensaje TEXT NOT NULL,
        FOREIGN KEY(ofertaId) REFERENCES Ofertas(ofertaId),
        FOREIGN KEY(clienteId) REFERENCES Clientes(clienteId)
    );


    CREATE TABLE Calificaciones(
        calificacionId VARCHAR(52) PRIMARY KEY NOT NULL UNIQUE,
        clienteId VARCHAR(52) NOT NULL,
        mercadoId VARCHAR(52) NOT NULL,
        calificacion FLOAT(2,1) NOT NULL,
        comentario TEXT NOT NULL,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE Multas(
        multaId VARCHAR(52) PRIMARY KEY NOT NULL UNIQUE,
        tiendaId VARCHAR(52) NOT NULL,
        multa INT NOT NULL,
        mensaje TEXT DEFAULT "Sin mensaje",
        estado ENUM("PAGADA", "NO PAGADA") DEFAULT "NO PAGADA",
        fecha_multa DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE Ofertas(
        ofertaId VARCHAR(52) PRIMARY KEY NOT NULL,
        mercadoId VARCHAR(52) NOT NULL,
        productoId VARCHAR(52) NOT NULL,
        precioOferta INT NOT NULL,
        FOREIGN KEY (mercadoId) REFERENCES Mercados(mercadoId),
        FOREIGN KEY (productoId) REFERENCES Productos(productoId)
    );

    INSERT INTO Clientes(clienteId,name,username,email,password,genre) VALUES('1','Eliud','eliud101','eliud@mail.com','12345','H');
    INSERT INTO Mercados(mercadoId,mercado ,adminUser,password,email)VALUES('1','ley','juan','12345','juan@ley.com');
    INSERT INTO ProfecoUsuario(profecoUserId,username,password,email)VALUES('1','Admin','12345','admin@profeco.com');
    INSERT INTO Productos (productoId,mercadoId, nombre, descripcion, precio) VALUES
    ('PROD002','1', 'Smartphone Samsung', 'Smartphone Samsung Galaxy con pantalla AMOLED y cámara de 64MP.', 800.00),
    ('PROD003','1', 'Tablet Apple', 'Tablet Apple iPad Pro con pantalla retina y Apple Pencil.', 1000.00),
    ('PROD004','1', 'Smart TV Sony', 'Smart TV Sony de 55 pulgadas con resolución 4K y sistema operativo Android TV.', 1500.00),
    ('PROD005','1', 'Cámara Canon', 'Cámara Canon EOS Rebel con sensor APS-C y grabación de video Full HD.', 600.00),
    ('PROD006','1', 'Auriculares Sony', 'Auriculares Sony WH-1000XM4 con cancelación de ruido y Bluetooth.', 300.00),
    ('PROD007','1', 'Impresora HP', 'Impresora HP OfficeJet Pro con impresión a doble cara y conectividad Wi-Fi.', 250.00),
    ('PROD008','1', 'Monitor LG', 'Monitor LG UltraWide de 34 pulgadas con resolución QHD y tecnología FreeSync.', 700.00),
    ('PROD009','1', 'Teclado Logitech', 'Teclado Logitech G Pro con switches mecánicos y retroiluminación RGB.', 150.00),
    ('PROD010','1', 'Mouse Razer', 'Mouse Razer DeathAdder Elite con sensor óptico 16000 DPI y 7 botones programables.', 80.00);



