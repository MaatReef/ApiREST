const { Router } = require ("express");
const { ParseIntMiddleWare, AuthMiddleWare} = require("../middlewares");

module.exports = function({ IdeaController }){
    const router = Router();

    router.get("", [ParseIntMiddleWare], IdeaController.getAll);
    router.get("/:ideaId", IdeaController.get);
    router.get("/:userId/all", IdeaController.getUserIdeas);
    router.post("", IdeaController.create);
    router.patch("/:ideaId", AuthMiddleWare, IdeaController.update);
    router.delete("/:ideaId", AuthMiddleWare, IdeaController.delete);
    router.post("/:ideaId/upvote", AuthMiddleWare, IdeaController.upvoteIdea);
    router.post("/:ideaId/downvote", AuthMiddleWare, IdeaController.downvoteIdea);

    return router;
};

