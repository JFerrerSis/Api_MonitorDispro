// routes/sucursales.js
const express = require('express');
const router = express.Router();
const SucursalModel = require('../models/SucursalModel');

// 1. ENDPOINT: LISTAR SUCURSALES (GET /api/sucursales)
router.get('/', async (req, res) => {
    try {
        const sucursales = await SucursalModel.getAll(); // Obtiene todos los datos
        res.json(sucursales);
    } catch (error) {
        // Manejo de errores 500
        console.error('Error en ruta /sucursales:', error);
        res.status(500).json({ message: "Error interno al obtener sucursales.", details: error.message });
    }

});

// 2. ENDPOINT: CREAR NUEVA SUCURSAL (POST /api/sucursales)
router.post('/', async (req, res) => {
    const sucursalData = req.body;

    // Validación básica
    if (!sucursalData.cod_suc || !sucursalData.name_suc || !sucursalData.rif_suc) {
        return res.status(400).json({ message: "Faltan campos obligatorios: cod_suc, name_suc, y rif_suc son requeridos." });
    }

    try {
        const nuevaSucursal = await SucursalModel.create(sucursalData);
        // Respuesta 201 Created y devuelve el objeto creado
        res.status(201).json({ 
            message: "Sucursal creada exitosamente.",
            sucursal: nuevaSucursal // Devuelve la sucursal insertada
        });
    } catch (error) {
        console.error('Error en ruta POST /sucursales:', error);
        // Usa 409 Conflict si hay error de clave única
        if (error.message.includes('unique')) {
             return res.status(409).json({ message: "El código de sucursal (cod_suc) o el RIF (rif_suc) ya existen." });
        }
        res.status(500).json({ message: "Error interno al crear sucursal.", details: error.message });
    }
});

module.exports = router;