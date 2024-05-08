const express = require('express');
const path = require('path');
const app = express();

// Sirve los archivos estáticos desde la carpeta dist
app.use(express.static(path.join(__dirname, 'dist')));

// Ruta para todas las solicitudes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Puerto en el que el servidor escuchará
const port = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
