// models/ExistenciasModel.js
const db = require('../config'); // Asume que db es el Pool de conexión a PostgreSQL

class ExistenciasModel {
    
    /**
     * Obtiene todas las existencias registradas en todas las sucursales.
     * Devuelve el resultado envuelto en la clave 'existencias'.
     * Endpoint sugerido: GET /api/existencias
     */
    static async getAll() {
        const sql = `
            SELECT 
                maestro, 
                descripcion, 
                cod_suc, 
                existencia
            FROM 
                existencias
            ORDER BY 
                maestro, cod_suc ASC;
        `;
        try {
            const result = await db.query(sql);
            // Envuelve el array de filas en el objeto { existencias: [...] }
            return { existencias: result.rows }; 
        } catch (error) {
            console.error('Error al obtener todas las existencias:', error);
            throw new Error('Database query failed.');
        }
    }

    /**
     * Busca las existencias de un producto específico por su código 'maestro'.
     * Devuelve el resultado envuelto en la clave 'existencias'.
     * Endpoint sugerido: GET /api/existencias/:maestro
     * @param {string} maestro - El código del producto a buscar.
     */
    static async getByMaestro(maestro) {
        const sql = `
            SELECT 
                e.maestro, 
                e.descripcion, 
                e.cod_suc, 
                e.existencia 
            FROM 
                existencias e
            WHERE 
                e.maestro = $1
            ORDER BY 
                e.existencia desc;
        `;
        const values = [maestro];

        try {
            const result = await db.query(sql, values);
             // Envuelve el array de filas en el objeto { existencias: [...] }
            return { existencias: result.rows };
        } catch (error) {
            console.error(`Error al buscar existencias para el código maestro ${maestro}:`, error);
            throw new Error('Database query failed.');
        }
    }
    
    // --- FUNCIÓN getBySucursal ---

    /**
     * Obtiene todas las existencias (todos los productos) para una sucursal específica.
     * Devuelve el resultado envuelto en la clave 'existencias'.
     * Endpoint sugerido: GET /api/existencias/sucursal/:codSuc
     * @param {string} codSuc - El código de la sucursal a buscar.
     */
    static async getBySucursal(codSuc) {
        const sql = `
            SELECT 
                e.maestro, 
                e.descripcion, 
                e.cod_suc, 
                e.existencia 
            FROM 
                existencias e
            WHERE 
                e.cod_suc = $1
            ORDER BY 
                e.existencia desc;
        `;
        const values = [codSuc]; 

        try {
            const result = await db.query(sql, values);
            // Envuelve el array de filas en el objeto { existencias: [...] }
            return { existencias: result.rows };
        } catch (error) {
            console.error(`Error al buscar existencias por sucursal ${codSuc}:`, error);
            throw new Error('Database query failed.');
        }
    }
}

module.exports = ExistenciasModel;