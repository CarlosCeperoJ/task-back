# 🚀 Task Manager

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

Task Manager es una aplicación para gestionar tareas con una interfaz intuitiva y un backend robusto.

## 📚 Índice
- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Base de datos](#base-de-datos)
- [Uso del Backend](#uso-del-backend)
- [Capturas de Pantalla](#capturas-de-pantalla)
- [Rutas del Backend](#rutas-del-backend)
- [Manejo de Errores](#manejo-de-errores)
- [Repositorios](#repositorios)
- [Despliegue](#despliegue)

---

## 📄 Descripción
Task Manager permite a los usuarios gestionar sus tareas mediante un sistema seguro y fácil de usar. 🚀

Incluye un backend desarrollado con Node.js y Express, y un frontend atractivo utilizando React y Tailwind CSS. La base de datos está gestionada con MongoDB, y las APIs son documentadas con Swagger.

---

## 🎯 Características
- **CRUD para tareas** (Crear, Leer, Actualizar, Eliminar)
- **Gestión de usuarios**
- **Autenticación segura con JWT**
- **Frontend responsivo**
- **Documentación de API con Swagger**

---

## 💻 Tecnologías Utilizadas
| Tecnología   | Descripción                     |
|--------------|---------------------------------|
| Node.js      | Backend en JavaScript          |
| Express.js   | Framework para construir APIs  |
| React.js     | Librería para frontend         |
| Tailwind CSS | Estilos modernos y responsivos |
| MongoDB      | Base de datos NoSQL            |
| Swagger      | Documentación de APIs          |

---

## ⚙️ Instalación

### **Backend**
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/task-manager.git
   cd task-manager/backend

2. Instala las dependencias:
    npm install

3. Configura las variables de entorno creando un archivo .env en el backend:
    PORT=5000
    MONGO_URI=<tu-URI-de-MongoDB>
    JWT_SECRET=<tu-clave-secreta>

4. Inicia el servidor:
    npm reun dev

5. Documentación Swagger (en tu navegador):
   http://localhost:5000/api-docs

## **Frontend**

1. Instala las dependencias:
   npm install

2. Inicia la aplicación:
   npm run dev

## **Base de datos**

La base de datos utilizada es MongoDB Atlas para guardar los datos en la nube y asi poder desplegar nuestra aplicaion. La colección principal es tasks, y el esquema incluye los siguientes campos:

_id: Identificador único generado automáticamente.
title: Título de la tarea (obligatorio).
description: Descripción de la tarea (opcional).
completed: Estado de la tarea (booleano, por defecto false).
createdAt: Fecha de creación (generada automáticamente).

   
## 🔧 Uso del Backend
Puedes probar las rutas del backend utilizando herramientas como Postman o Thunder Client.
Ejemplo: Para registrar un usuario:

1. Realiza una solicitud POST a:
  https://task-backend-ueoa.onrender.com/api/auth/register
2. Envía un cuerpo JSON:
{
  "username": "testuser",
  "password": "password123"
}

## 🔗 Rutas del Backend

![image](https://github.com/user-attachments/assets/aa352b0d-437d-42ea-90f6-2b8bba9ec4bb)

## Manejo de Errores
El API responde con códigos claros para los errores:

400 Bad Request: Datos inválidos.
404 Not Found: Recurso no encontrado.
500 Internal Server Error: Error en el servidor.

## Repositorios

backden: https://github.com/CarlosCeperoJ/task-back/tree/master

frontend: https://github.com/CarlosCeperoJ/task-front/edit/main

## Despliegue 

backend: https://task-backend-ueoa.onrender.com

frontend: https://task-front-navy.vercel.app/login

swagger: [https://task-backend-ueoa.onrender.com/api-docs/#/default/delete_api_tasks_id](https://task-backend-ueoa.onrender.com/api-docs)


¡Gracias por visitar este proyecto!
💻 Con ❤️ Carlos Cepero.
