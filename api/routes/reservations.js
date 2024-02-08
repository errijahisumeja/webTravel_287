import express  from "express";
import { getReservations,addReservation, deleteReservation} from "../controllers/reservations.js";

const router = express.Router()


router.get("/:id",getReservations)
router.post("/:id", addReservation);

export default router