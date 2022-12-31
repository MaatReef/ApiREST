const { Router } = require("express");
const { AuthMiddleWare } = require("../middlewares");

module.exports = function({ CommentController }) {
  const router = Router();

  router.get("/:commentId/unique", CommentController.get);
  router.get("/:ideaId", CommentController.getIdeaComments);
  router.post("/:ideaId", AuthMiddleWare, CommentController.createComment);
  router.patch("/:commentId", AuthMiddleWare, CommentController.update);
  router.delete("/:commentId", AuthMiddleWare, CommentController.delete);

  return router;
};