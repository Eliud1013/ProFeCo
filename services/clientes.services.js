const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = __dirname + "/.proto";

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
async function obtenerOfertas() {
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

module.exports = { obtenerOfertas };
