import user from "../models/userModel.js";
import task from "../models/taskModel.js";
import passport from "passport";
import { sequelize } from "../database/database.js";

//use the id from the token and the find all the task related to the user id
export const getTasks = async (req, res) => {
  const { id } = req.user;
  try {
    const tasks = await task.findAll({ where: { user_id: id } });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Get a single task by checking if the task is owned by the user and if it exists
export const getSingleTask = async (req, res) => {
  const { id } = req.params;
  try {
    const taskToFind = await task.findOne({ where: { id } });
    if (!taskToFind) return res.sendStatus(404);
    if (taskToFind.user_id !== req.user.id)
      return res
        .status(403)
        .json({ message: "You are not allowed to get this task!!" });
    res.status(200).json(taskToFind);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//get the user token, get the field from the body, create the task using the fields
//and assign the foreign key to the id of the user
export const createTask = async (req, res) => {
  const { id } = req.user;
  const { title, content, due_date, color } = req.body;
  try {
    const newTask = await task.create({
      title,
      content,
      due_date,
      color,
      user_id: id,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get the user id from params, then find the task to delete, check if the task exist and then check if task belongs to the user and then destroy it
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const taskToDelete = await task.findOne({ where: { id } });
    if (!taskToDelete) return res.sendStatus(404);
    if (taskToDelete.user_id !== req.user.id)
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this task!!" });

    await taskToDelete.destroy();
    return res.sendStatus(204);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//This will search a task in the database using a fuzzy search, it will receibe the tile from the query
//that would be title in case it don't exist return a error
export const searchTask = async (req, res) => {
  const { title } = req.query;
  try {
    if (title === "") return getTasks(req, res);
    const result = await sequelize.query(
      `SELECT * FROM tasks WHERE similarity(title, :search) > 0.3 ORDER BY similarity(title, :search) DESC`,
      {
        replacements: { search: title },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (result <= 0) return res.status(404).json({ message: "Task not found" });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//get the id from the params, search for the task, check if the task belongs to the user
//then update the task using the field from the body
export const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTask = await task.findOne({
      where: { id },
    });
    if (updatedTask.user_id !== req.user.id)
      return res
        .status(403)
        .json({ message: "You are not allowed to edit this task!!" });
    updatedTask.set(req.body);
    await updatedTask.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
