import { Router } from "express";
import { taskValidationRules } from "../validators/taskValidators.js";
import { handleValidation } from "../middlewares/handleValidations.js";
import {
  createTask,
  deleteTask,
  getTasks,
  searchTask,
  updateTask,
} from "../controllers/taskController.js";
import passport from "passport";
const router = Router();
//global midleware to all routes
router.use(passport.authenticate("jwt", { session: false }));
router.get("/", getTasks);
router.get("/search", searchTask);
router.post("/", taskValidationRules, handleValidation, createTask);
router.delete("/:id", deleteTask);
router.put("/:id", taskValidationRules, handleValidation, updateTask);

export default router;
