const grpc = require("@grpc/grpc-js");
const PROTO_PATH = __dirname + "/.proto";
var protoLoader = require("@grpc/proto-loader");
const db = require("../store/grpc.db");
const colors = require("colors");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const ProfecoServices = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(ProfecoServices.ProfecoServices.service, {
  obtenerOfertas: async (_, callback) => {
    const ofertas = await db.obtenerOfertas();

    callback(null, ofertas);
  },
});

function startGrpcServer() {
  server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      console.log("[+] ".green + "Grpc server running: 127.0.0.1:50051");
    }
  );
}

module.exports = startGrpcServer;
