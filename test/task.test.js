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

// Configurar CORS antes de las rutas
app.use(cors());

// Swagger setup (si lo tienes)
setupSwagger(app);

// Middleware para JSON
app.use(express.json());

// Rutas
app.use('/api/tasks', tasksRoutes);
app.use('/api/auth', authRoutes.router);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

