import express  from "express";
import { getComments,addComment,deleteComment, getCommentsByTripId} from "../controllers/comments.js";

const router = express.Router()


router.get("/",getComments)
router.delete('/:id/:id',deleteComment)
router.post("/:id", addComment);
router.get("/:id", getCommentsByTripId);



export default router