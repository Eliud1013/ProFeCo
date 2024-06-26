const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = __dirname + "/.proto";
const { v4: uuidv4 } = require("uuid");
const clientesDB = require("../store/clientes.db");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const NewsService =
  grpc.loadPackageDefinition(packageDefinition).ProfecoServices;

const client = new NewsService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);
async function obtenerOfertas(idProducto, idMercado) {
  const ofertas = await new Promise((resolve, reject) => {
    client.obtenerOfertas({}, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
  return ofertas.ofertas;
}

// Verificar si la oferta existe antes de reportar una inconsistencia
async function ofertaExiste(req, res, next) {
  const ofertaId = { id: req.params.ofertaId };
  const existe = await new Promise((resolve, reject) => {
    client.ofertaExiste(ofertaId, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });

  if (existe.count > 0) {
    next();
  } else {
    console.log(existe);
    res
      .status(400)
      .send("No se ha encontrado una oferta con el id proporcionado");
  }
}

async function reportarInconsistencia(ofertaId, clienteId, mensaje) {
  const inconsistenciaId = uuidv4();
  const reported = await clientesDB.reportarInconsistencia(
    inconsistenciaId,
    ofertaId,
    clienteId,
    mensaje
  );

  if (reported.affectedRows > 0) {
    return { reported: true, message: "El reporte ha sido enviado" };
  }
}
async function calificarMercado(
  clienteId,
  mercadoId,
  calificacion,
  comentario
) {
  const calificacionId = uuidv4();
  const calificado = await clientesDB.calificarMercado(
    calificacionId,
    clienteId,
    mercadoId,
    calificacion,
    comentario
  );
  if (calificado.affectedRows > 0) {
    return { calificado: true, status: 201 };
  } else {
    return { calificado: false, status: 500 };
  }
}
async function getMarkets() {
  return await clientesDB.listarMercados();
}
//calificarMercado
module.exports = {
  obtenerOfertas,
  reportarInconsistencia,
  ofertaExiste,
  calificarMercado,
  getMarkets,
};
