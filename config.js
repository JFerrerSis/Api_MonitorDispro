// config.js

require("dotenv").config(); // Cargar variables de entorno

// 1. IMPORTAR el Pool de conexión del cliente PG
const { Pool } = require('pg');

// 2. CREAR el Pool de conexión
const pool = new Pool({
    // Usar la misma URL de conexión que tienes en tu archivo .env
    connectionString: process.env.DATABASE_URL, 
});

// Opcional: Prueba de conexión y registro de la versión (como en tu código original)
pool.connect()
    .then(client => {
        console.log('Conexión a PostgreSQL establecida con éxito.');
        // Puedes ejecutar la consulta de versión aquí para confirmar
        client.query('SELECT version()')
            .then(res => console.log('Versión DB:', res.rows[0].version))
            .catch(err => console.error('Error al obtener versión:', err))
            .finally(() => client.release()); // Liberar el cliente después de la prueba
    })
    .catch(err => console.error('Error de conexión a PostgreSQL:', err));


// 3. EXPORTAR el Pool de conexión para que los modelos lo usen (const db = pool)
module.exports = pool;