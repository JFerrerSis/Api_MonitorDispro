// server.js (Versión con CORS añadido)
const express = require('express');
const cors = require('cors'); // <-- 1. Importar la librería CORS

// Importar los archivos de rutas
const sucursalesRoutes = require('./routes/sucursales.routes');
const existenciasRoutes = require('./routes/existencias.routes');

const app = express();
const PORT = 3000;

// --- CONFIGURACIÓN DE MIDDLEWARE ---

// 2. Usar el middleware CORS para permitir peticiones de cualquier origen (*)
// Es la forma más sencilla para el desarrollo.
app.use(cors()); 

app.use(express.json()); // Middleware para parsear JSON


// --- CONFIGURACIÓN DE RUTAS ---

// Montar el router de Sucursales en la ruta base /api/sucursales
app.use('/api/sucursales', sucursalesRoutes);

// Montar el router de Existencias en la ruta base /api/existencias
app.use('/api/existencias', existenciasRoutes);


// Inicio del servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express escuchando en http://localhost:${PORT}`);
});