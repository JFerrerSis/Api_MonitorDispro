require("dotenv").config();
const { Pool } = require('pg');

const pool = new Pool({
    // Configuración usando las variables individuales de tu .env
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: 5432, 
    
    // Configuración de SSL (Obligatoria para Neon)
    ssl: {
        rejectUnauthorized: false, 
    },

    // --- LÍMITES DE POOL PARA ESTABILIDAD ---
    max: 20, 
    idleTimeoutMillis: 30000, 
    connectionTimeoutMillis: 5000, 
});

// Verificación de conexión inicial
pool.connect()
    .then(client => {
        console.log('✅ Conexión exitosa a Neon PostgreSQL.');
        return client.query('SELECT version()')
            .then(res => {
                console.log('🚀 DB Ready:', res.rows[0].version);
                client.release();
            });
    })
    .catch(err => {
        console.error('❌ Error de conexión:', err.message);
    });

module.exports = pool;