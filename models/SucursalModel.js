// models/SucursalModel.js
const db = require('../config'); // Asume que db es el Pool de conexión a PostgreSQL

class SucursalModel {
    
    /**
     * Obtiene la lista completa de sucursales y la devuelve dentro de un objeto
     * con la clave 'sucursales'.
     * Endpoint: GET /api/sucursales
     */
    static async getAll() {
        const sql = `
            SELECT 
                cod_suc, 
                name_suc, 
                rif_suc 
            FROM 
                sucursales
            ORDER BY 
                cod_suc ASC;
        `;
        try {
            const result = await db.query(sql);
            const sucursalesArray = result.rows; // Array de objetos: [{...}, {...}]

            // --- INICIO DEL ENVOLTORIO ---
            
            // Creamos un nuevo objeto que contiene la clave 'sucursales' y el array como valor.
            return { sucursales: sucursalesArray };
            
            // --- FIN DEL ENVOLTORIO ---
            
        } catch (error) {
            console.error('Error al obtener sucursales:', error);
            throw new Error('Database query failed.');
        }
    }


     
    static async create(sucursalData) {
        const { cod_suc, name_suc, rif_suc } = sucursalData;

        // NOTA: Se asume que 'id' es SERIAL y se autogenera.
        const sql = `
            INSERT INTO sucursales (cod_suc, name_suc, rif_suc)
            VALUES ($1, $2, $3)
            RETURNING cod_suc, name_suc, rif_suc;
        `;
        const values = [cod_suc, name_suc, rif_suc];

        try {
            // RETURNING devuelve la fila insertada.
            const result = await db.query(sql, values);
            return result.rows[0]; // Devuelve la sucursal creada
        } catch (error) {
            console.error('Error al crear una nueva sucursal:', error);
            // Si hay un error de clave duplicada (UNIQUE constraint), se captura aquí.
            throw new Error('Database insertion failed.');
        }
    }

 }
module.exports = SucursalModel;