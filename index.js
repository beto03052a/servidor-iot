const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

// 👉 Esto permite servir el archivo index.html
app.use(express.static(path.join(__dirname)));

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

// 🚀 Importante: Usar el puerto que asigna Railway o 3000 por defecto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
