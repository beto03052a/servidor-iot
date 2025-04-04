const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

// ✅ Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// 👉 Redirigir '/' a 'index.html'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let ultimosDatos = { temperatura: null, humedad: null };

app.post('/api/datos', (req, res) => {
  const { temperatura, humedad } = req.body;
  ultimosDatos = { temperatura, humedad };
  console.log(`Datos recibidos -> Temperatura: ${temperatura} °C | Humedad: ${humedad} %`);
  res.send('Datos recibidos correctamente');
});

app.get('/api/ultimos-datos', (req, res) => {
  res.json(ultimosDatos);
});

// 🚀 Puerto dinámico compatible con Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
