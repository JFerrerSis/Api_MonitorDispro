// routes/existencias.js
const express = require('express');
const router = express.Router();
const ExistenciasModel = require('../models/ExistenciasModel');

// 1. ENDPOINT: LISTAR TODAS LAS EXISTENCIAS (GET /api/existencias)
router.get('/', async (req, res) => {
    try {
        const existencias = await ExistenciasModel.getAll();
        res.json(existencias);
    } catch (error) {
        console.error('Error en ruta /existencias:', error);
        res.status(500).json({ message: "Error interno al obtener existencias.", details: error.message });
    }
});

// 2. ENDPOINT: BUSCAR EXISTENCIAS POR CÓDIGO MAESTRO (GET /api/existencias/:maestro)
router.get('/:maestro', async (req, res) => {
    const { maestro } = req.params;

    try {
        const existenciasMaestro = await ExistenciasModel.getByMaestro(maestro);

        if (existenciasMaestro.length === 0) {
            return res.status(404).json({ message: `No se encontraron existencias para el código maestro: ${maestro}` });
        }
        
        res.json(existenciasMaestro);
    } catch (error) {
        console.error('Error en ruta /existencias/:maestro:', error);
        res.status(500).json({ message: "Error interno al buscar existencias por maestro.", details: error.message });
    }
});

// NUEVA RUTA: 3. ENDPOINT: LISTAR EXISTENCIAS POR SUCURSAL (GET /api/existencias/sucursal/:codSuc)
router.get('/sucursal/:codSuc', async (req, res) => {
    const { codSuc } = req.params;

    if (!codSuc) {
        return res.status(400).json({ message: "Falta el parámetro 'codSuc' para la búsqueda." });
    }

    try {
        const existencias = await ExistenciasModel.getBySucursal(codSuc);

        if (existencias.length === 0) {
            return res.status(404).json({ message: `No se encontraron existencias para la sucursal: ${codSuc}` });
        }

        res.json(existencias);
    } catch (error) {
        console.error('Error en ruta /existencias/sucursal/:codSuc:', error);
        res.status(500).json({ message: "Error interno durante la búsqueda de existencias por sucursal.", details: error.message });
    }
});

module.exports = router;