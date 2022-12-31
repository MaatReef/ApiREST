// Este será el archivo principal de todas las rutas
const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const compression = require('compression');
require("express-async-errors");
const { NotFoundMiddleWare, ErrorMiddleWare } = require('../middlewares');

module.exports = function({HomeRoutes, UserRoutes, IdeaRoutes, CommentRoutes, AuthRoutes}) {
    const router = express.Router();
    const apiRoutes = express.Router();

    // Estos son los middlewares por defecto
    apiRoutes
        .use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression()); 

    apiRoutes.use("/home", HomeRoutes);
    apiRoutes.use("/user", UserRoutes);
    apiRoutes.use("/idea", IdeaRoutes);
    apiRoutes.use("/comment", CommentRoutes); 
    apiRoutes.use("/auth", AuthRoutes); 

    router.use("/v1/api", apiRoutes);

    router.use(NotFoundMiddleWare);
    router.use(ErrorMiddleWare);


    return router;

}