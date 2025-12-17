const db = require('../config');

const mapToVentaExtendida = (row) => ({
    codigo: row.maestro,
    producto: row.descripcion,
    ventas: parseFloat(row.ventas) || 0,
    total: parseFloat(row.total) || 0,
    fecha: row.fecha ? new Date(row.fecha).toISOString().split('T')[0] : null,
    cod_suc: String(row.cod_suc).trim(),
    descripcion_suc: row.descripcion_suc || 'Sin nombre',
});

const VentasModel = {
    // Endpoint 1: Objeto Resumen General
    fetchVentaGeneralPorRango: async (desde, hasta) => {
        const query = `SELECT SUM(ventas) as unidades, SUM(total) as ingresos 
                       FROM disprocar WHERE fecha::date BETWEEN $1 AND $2`;
        const { rows } = await db.query(query, [desde, hasta]);
        return {
            total_unidades: parseFloat(rows[0].unidades) || 0,
            total_ingresos: parseFloat(rows[0].ingresos) || 0
        };
    },

    // Endpoint 2: Array de Objetos Detallados (JOIN Corregido)
    fetchResumenVentasPorRango: async (desde, hasta) => {
        const query = `
            SELECT d.*, s.name_suc AS descripcion_suc
            FROM disprocar d
            INNER JOIN sucursales s ON d.cod_suc::text = s.cod_suc::text
            WHERE d.fecha::date BETWEEN $1 AND $2
            ORDER BY d.fecha DESC`;
        const { rows } = await db.query(query, [desde, hasta]);
        return rows.map(mapToVentaExtendida);
    },

    // Endpoint 3: Array de Objetos por Sucursal
    fetchVentaGeneralPorSucursal: async (desde, hasta) => {
        const query = `
            SELECT cod_suc, SUM(ventas) as unidades, SUM(total) as ingresos
            FROM disprocar
            WHERE fecha::date BETWEEN $1 AND $2
            GROUP BY cod_suc`;
        const { rows } = await db.query(query, [desde, hasta]);
        return rows.map(r => ({
            cod_suc: String(r.cod_suc).trim(),
            unidades: parseFloat(r.unidades) || 0,
            ingresos: parseFloat(r.ingresos) || 0
        }));
    }
};

module.exports = VentasModel;