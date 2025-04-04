const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

// 👉 Servir archivos estáticos (como index.html)
app.use(express.static(path.join(__dirname)));

// Variable para almacenar los últimos datos
let ultimosDatos = { temperatura: null, humedad: null };

// Ruta para recibir datos del ESP32
app.post('/api/datos', (req, res) => {
    const { temperatura, humedad } = req.body;
    ultimosDatos = { temperatura, humedad };
    console.log(`📥 Datos recibidos -> Temperatura: ${temperatura} °C | Humedad: ${humedad} %`);
    res.send('✅ Datos recibidos correctamente');
});

// Ruta para enviar los últimos datos a la web
app.get('/api/ultimos-datos', (req, res) => {
    res.json(ultimosDatos);
});

// 🚀 Puerto dinámico para Railway
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`🌐 Servidor corriendo en http://localhost:${port}`);
});
