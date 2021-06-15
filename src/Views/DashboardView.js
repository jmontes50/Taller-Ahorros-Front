import React, { Fragment, useState, useEffect, useContext } from "react";
import {
  obtenerTransacciones,
  hacerMovimiento,
  obtenerBalance,
} from "../services/ahorroService";
import Navtop from "../components/Navtop";
import ZeroTransactions from "../components/ZeroTransactions";
import { UserContext } from "../context/UserContext";
import { Modal, Button } from "react-bootstrap";
import { Pie } from "react-chartjs-2";

function DashboardView() {
  const [fecha, setFecha] = useState("2021-06-15");
  const [transacciones, setTransacciones] = useState([]);
  const [show, setShow] = useState(false);
  const [movimiento, setMovimiento] = useState({
    nombre: "",
    monto: 0,
    tipo: "ingreso",
    fecha: new Date().toISOString().substring(0, 10)
  });
  const [balance, setBalance] = useState([0, 0]);
  const [mostrarMovimientos, setMostrarMovimientos] = useState(true);

  const movimientoInitial = {
    nombre: "",
    monto: 0,
    tipo: "ingreso",
    fecha: new Date().toISOString().substring(0, 10)
  }

  const balanceToState = async () => {
    let rango = {
      fecha_inicio: "2021-01-01",
      fecha_fin: "2021-31-12",
    };
    let { ingresos, egresos } = await obtenerBalance(rango, user);
    setBalance([ingresos, egresos]);
  };

  const handleMovimiento = (e) => {
    setMovimiento({
      ...movimiento,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ingresarMovimiento = async () => {
    let rpta = await hacerMovimiento(movimiento, user);
    handleClose();
    transaccionesToState();
    balanceToState();
    setMovimiento({...movimientoInitial})
  };

  const handleFecha = (e) => {
    setFecha(e.target.value);
    setMostrarMovimientos(false);
  };

  const { user } = useContext(UserContext);

  const transaccionesToState = async () => {
    let transaccionesObtenidas = await obtenerTransacciones(user);
    console.log({ transaccionesObtenidas });
    setTransacciones(transaccionesObtenidas);
  };

  const pieData = {
    labels: ["Ingresos", "Egresos"],
    datasets: [
      {
        data: [...balance],
        backgroundColor: ["#36A2EB", "rgba(255,0,0, 1)"],
      },
    ],
  };

  useEffect(() => {
    transaccionesToState();
    balanceToState();
  }, []);

  return (
    <Fragment>
      <Navtop />
      <div className="container bg-white py-3 min-vh-100">
        <div className="row">
          <div className="col-12 col-lg-8">
            <div className="d-flex justify-content-between py-2">
              <h1>Transacciones Diarias</h1>
              <button
                className="btn btn-dark btn-lg rounded"
                onClick={handleShow}
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>

            <div className="row">
              <div className="col-12 col-md-6 col-lg-8">
                <input
                  type="date"
                  value={fecha}
                  onChange={handleFecha}
                  className="form-control mt-2"
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <button
                  className="btn btn-outline-dark btn-block mt-2"
                  onClick={() => {
                    setMostrarMovimientos(true);
                  }}
                >
                  Ver Todo
                </button>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <div className="px-2">
                <small className="text-secondary">Total Ingresos</small>
                <p className="font-weight-bold">S/ {balance[0]}</p>
              </div>
              <div className="px-2">
                <small className="text-secondary">Total Egresos</small>
                <p className="font-weight-bold">S/ {balance[1]}</p>
              </div>
              <div className="px-2">
                <small className="text-secondary">Total Neto</small>
                <p className="font-weight-bold">S/ {balance[0] - balance[1]}</p>
              </div>
            </div>
            <hr />
            {transacciones.length === 0 ? (
              <ZeroTransactions />
            ) : (
              <div className="list-group">
                {mostrarMovimientos ? (
                  <div>
                    {transacciones.map((mov, i) => (
                      <div
                        className="list-group-item list-group-item-action"
                        key={i}
                      >
                        {/* el back me devuelve como moviemiento */}
                        <div
                          className={`${
                            mov.moviemientoTipo === "ingreso"
                              ? "text-ingreso"
                              : "text-egreso"
                          } d-flex w-100 justify-content-between`}
                        >
                          <h5 className="mb-1">{mov.movimientoNombre}</h5>
                          <h5 className="font-weight-bold">
                            S/ {mov.movimientoMonto}
                          </h5>
                        </div>
                        <p className="mb-1">
                          <i className="fas fa-calendar-check mr-1"></i>
                          {mov.movimientoFecha}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    {transacciones
                      .filter((mov) => {
                        return mov.movimientoFecha === fecha;
                      })
                      .map((mov, i) => (
                        <div
                          className="list-group-item list-group-item-action"
                          key={i}
                        >
                          {/* el back me devuelve como moviemiento */}
                          <div
                            className={`${
                              mov.moviemientoTipo === "ingreso"
                                ? "text-ingreso"
                                : "text-egreso"
                            } d-flex w-100 justify-content-between`}
                          >
                            <h5 className="mb-1">{mov.movimientoNombre}</h5>
                            <h5 className="font-weight-bold">
                              S/ {mov.movimientoMonto}
                            </h5>
                          </div>
                          <p className="mb-1">
                            <i className="fas fa-calendar-check mr-1"></i>
                            {mov.movimientoFecha}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="col-12 col-lg-4 py-2">
            <h3>Balance</h3>
            <div>
              <Pie data={pieData} />
            </div>
          </div>
        </div>

        {/* MODAL */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Registrar Movimiento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div class="form-group">
                <label>Nombre Movimiento</label>
                <input
                  type="text"
                  class="form-control"
                  name="nombre"
                  value={movimiento.nombre}
                  onChange={handleMovimiento}
                  placeholder="Ej. Sueldo ó Pago Disney+"
                />
              </div>
              <div class="form-group">
                <label>Monto Movimiento</label>
                <input
                  type="number"
                  class="form-control"
                  name="monto"
                  value={movimiento.monto}
                  onChange={handleMovimiento}
                  placeholder="Ej. 100"
                />
              </div>
              <div className="form-group">
                <label>Monto Movimiento</label>
                <select
                  value={movimiento.tipo}
                  onChange={handleMovimiento}
                  name="tipo"
                  class="form-control"
                >
                  <option value="ingreso">Ingreso</option>
                  <option value="egreso">Egreso</option>
                </select>
              </div>
              <div className="form-group">
                <label>Monto Fecha</label>
                <input
                  type="date"
                  className="form-control"
                  value={movimiento.fecha}
                  name="fecha"
                  onChange={handleMovimiento}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={ingresarMovimiento}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Fragment>
  );
}

export default DashboardView;
