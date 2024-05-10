const { v4: uuidv4 } = require("uuid");
const profecoDB = require("../store/profeco.db");

async function multarTienda(idTienda, multa, mensaje) {
  const multaId = uuidv4();
  const multado = await profecoDB.multar(multaId, idTienda, multa, mensaje);
  const ok = multado.affectedRows || 0;
  if (ok > 0) {
    return { multado: true, mensaje: "La multa ha sido aplicada" };
  } else {
    return { multado: false, mensaje: "La multa no ha sido aplicado" };
  }
}
async function obtenerInconsistencias() {
  return await profecoDB.getReports();
}
async function obtenerInconsistenciasM(mercadoId) {
  return await profecoDB.getMarketReports(mercadoId);
}

module.exports = {
  multarTienda,
  obtenerInconsistencias,
  obtenerInconsistenciasM,
};
