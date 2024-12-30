const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const tasksRoutes = require('./routes/tasks');
const setupSwagger = require('./config/swagger');
const authRoutes = require('./routes/auth');
const cors = require('cors');

// Configuración de variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

// Inicializar la aplicación
const app = express();

// Configura CORS para permitir solicitudes desde múltiples orígenes
const allowedOrigins = ['http://localhost:5173', 'https://tu-dominio-en-produccion.com'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

setupSwagger(app);


app.use(express.json());

// Rutas
app.use('/api/tasks', tasksRoutes);
app.use('/api/auth', authRoutes.router);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});