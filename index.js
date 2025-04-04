const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// 👉 Servir archivos estáticos si tienes frontend
app.use(express.static(path.join(__dirname, 'public')));

// 👉 Ruta GET para obtener datos
let ultimosDatos = { temperatura: null, humedad: null };

app.post('/api/datos', (req, res) => {
    const { temperatura, humedad } = req.body;
    ultimosDatos = { temperatura, humedad };
    console.log("📥 Datos recibidos:", ultimosDatos);
    res.send('Datos recibidos correctamente');
});

app.get('/api/ultimos-datos', (req, res) => {
    res.json(ultimosDatos);
});

// ⚙️ Escuchar en el puerto asignado por Railway o 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

