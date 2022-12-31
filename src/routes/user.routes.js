const { Router } = require ("express");
// El de abajo lo usamo como método de protección de ruta, si son varios middlewares se ponen entre []
const { AuthMiddleWare, ParseIntMiddleWare, CacheMiddleWare } = require("../middlewares");
const { CACHE_TIME } = require("../helpers");

module.exports = function({ UserController }){
    const router = Router();

    router.get("", [AuthMiddleWare, ParseIntMiddleWare, CacheMiddleWare(CACHE_TIME.ONE_HOUR)], UserController.getAll);
    router.get("/:userId", UserController.get);
    router.patch("/:userId", UserController.update);
    router.delete("/:userId", UserController.delete);

    return router;
};