const express = require('express');
const app = express();
const port = 3000;

let ultimosDatos = {
  temperatura: null,
  humedad: null,
};

app.use(express.json());
app.use(express.static('public')); // sirve index.html automáticamente

app.post('/api/datos', (req, res) => {
  const { temperatura, humedad } = req.body;
  ultimosDatos = { temperatura, humedad };
  console.log(`Datos recibidos -> Temperatura: ${temperatura} °C | Humedad: ${humedad} %`);
  res.send('Datos recibidos correctamente');
});

app.get('/api/ultimos-datos', (req, res) => {
  res.json(ultimosDatos);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
