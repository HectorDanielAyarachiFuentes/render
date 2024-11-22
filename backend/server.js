const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

// Configura la conexión a PostgreSQL con tu URL
const pool = new Pool({
  connectionString: 'postgresql://ramoncito_user:tEXfECCHKvspT2QRnZupUujUuyKJbwjb@dpg-ct09pkt6l47c7387qqi0-a.oregon-postgres.render.com/ramoncito', // Usa tu URL aquí
});

// Middleware para poder recibir datos en formato JSON
app.use(express.json());

// Ruta para guardar los datos en la base de datos
app.post('/guardar', async (req, res) => {
  const { nombre, email, telefono } = req.body;
  try {
    await pool.query('INSERT INTO registros (nombre, email, telefono) VALUES ($1, $2, $3)', [nombre, email, telefono]);
    res.status(200).json({ mensaje: 'Datos guardados correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al guardar los datos' });
  }
});

// Ruta para obtener los datos de la base de datos
app.get('/datos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM registros');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener los datos' });
  }
});

// Arrancar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
