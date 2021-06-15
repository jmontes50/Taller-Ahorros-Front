import axios from "axios";

const URL = "https://taller-ahorros.herokuapp.com";

const obtenerTransacciones = async (token) => {
  try {
    const configuracion = {
      headers: { Authorization: `Bearer ${token}` },
    };
    let { data } = await axios.get(`${URL}/transactions`, configuracion);
    return data.content;
  } catch (error) {
    throw error;
  }
};

const hacerMovimiento = async (movimiento, token) => {
  try {
    const configuracion = {
      headers: { Authorization: `Bearer ${token}` },
    };
    let { data } = await axios.post(`${URL}/transactions`,movimiento, configuracion);
    return data
  } catch (error) {
    throw error;
  }
};

const obtenerBalance = async (rango,token) => {
  try {
    const configuracion = {
      headers: { Authorization: `Bearer ${token}` },
    };
    let { data } = await axios.post(`${URL}/balance`,rango ,configuracion);
    return data.content
  } catch (error) {
    throw error
  }
}

export { obtenerTransacciones, hacerMovimiento, obtenerBalance };
