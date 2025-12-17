const express = require('express');
const router = express.Router();
const VentasModel = require('../models/VentasModel');

// 1. Devuelve directamente el objeto con totales
// GET /api/ventas/total-rango
router.get('/total-rango', async (req, res) => {
    const { desde, hasta } = req.query;
    try {
        const data = await VentasModel.fetchVentaGeneralPorRango(desde, hasta);
        // Enviamos solo el objeto: { total_unidades: X, total_ingresos: Y }
        res.json(data); 
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 2. Devuelve directamente el arreglo de objetos detallados
// GET /api/ventas/sucursal-rango
router.get('/sucursal-rango', async (req, res) => {
    const { desde, hasta } = req.query;
    try {
        const data = await VentasModel.fetchResumenVentasPorRango(desde, hasta);
        // Enviamos solo el Array: [ {codigo: "..."}, {...} ]
        res.json(data); 
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 3. Devuelve directamente el arreglo de ventas por sucursal
// GET /api/ventas/resumen-por-sucursal
router.get('/resumen-por-sucursal', async (req, res) => {
    const { desde, hasta } = req.query;
    try {
        const data = await VentasModel.fetchVentaGeneralPorSucursal(desde, hasta);
        // Enviamos solo el Array de sucursales
        res.json(data); 
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;