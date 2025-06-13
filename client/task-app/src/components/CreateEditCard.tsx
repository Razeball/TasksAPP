import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  type Task,
  type TaskPayload,
  createTask,
  updateTask,
  deleteTask,
} from "../services/TaskService";
import { getTaskStyle } from "../utils/styleUtils";
import PopModal from "./PopModal";
import trash from "../assets/trash.svg";

interface CreateEditCardProps {
  onClose: () => void;
  onSave: () => void;
  taskToEdit?: Task;
}

const emptyTask: TaskPayload = {
  title: "",
  content: "",
  color: "red",
  due_date: "",
};

export default function CreateEditCard({
  onClose,
  onSave,
  taskToEdit,
}: CreateEditCardProps) {
  const [task, setTask] = useState<TaskPayload>(emptyTask);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Derived state is cleaner than a separate state variable
  const isEditMode = !!taskToEdit;

  useEffect(() => {
    if (taskToEdit) {
      const formattedDate = taskToEdit.due_date
        ? new Date(taskToEdit.due_date).toISOString().split("T")[0]
        : "";
      setTask({
        title: taskToEdit.title,
        content: taskToEdit.content,
        color: taskToEdit.color,
        due_date: formattedDate,
      });
    }
  }, [taskToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (color: TaskPayload["color"]) => {
    setTask((prev) => ({ ...prev, color }));
  };

  const handleSubmit = async () => {
    if (!task.title || !task.content || !task.due_date) {
      toast.error("Please fill all the fields.");
      return;
    }

    setIsSaving(true);
    try {
      if (isEditMode && taskToEdit) {
        await updateTask(taskToEdit.id, task);
        toast.success("Task updated successfully!");
      } else {
        await createTask(task);
        toast.success("Task created successfully!");
      }
      onSave();
      onClose();
    } catch (error) {
      console.error("Failed to save task:", error);
      toast.error("Failed to save the task. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!taskToEdit) return;

    setIsDeleting(true);
    try {
      await deleteTask(taskToEdit.id);
      toast.success("Task deleted.");
      onSave();
      onClose();
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete the task.");
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  const { cardBorder, cardHeaderBg } = getTaskStyle(task.color);

  return (
    <>
      <PopModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
      >
        <p>
          Are you sure you want to delete this task? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="btn"
            onClick={() => setIsDeleteModalOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            className="btn btn-error"
            onClick={handleDeleteConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </PopModal>

      <div
        className={`border rounded-2xl shadow-lg overflow-hidden ${cardBorder}`}
      >
        <div
          className={`p-4 flex justify-between items-center ${cardHeaderBg}`}
        >
          <h1 className="text-xl font-bold">
            {isEditMode ? "Edit Task" : "Create a New Task"}
          </h1>
          <div className="flex items-center gap-2">
            {isEditMode && (
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="btn btn-ghost btn-circle"
              >
                <img src={trash} alt="Delete Task" className="w-6 h-6" />
              </button>
            )}
            <button className="btn" onClick={onClose} disabled={isSaving}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
        <div className="bg-gray-800 p-4 space-y-4">
          {/* Form fields remain the same */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="input input-bordered w-full mt-1"
              value={task.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-300"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              className="textarea textarea-bordered w-full mt-1"
              rows={5}
              value={task.content}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="due_date"
              className="block text-sm font-medium text-gray-300"
            >
              Due Date
            </label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              className="input input-bordered w-full mt-1"
              value={task.due_date}
              onChange={handleChange}
            />
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-300">
              Color
            </span>
            <div className="flex flex-row justify-start gap-3 mt-2">
              {["red", "blue", "green"].map((color) => (
                <button
                  key={color}
                  onClick={() =>
                    handleColorChange(color as "red" | "blue" | "green")
                  }
                  className={`btn btn-circle size-10 bg-${color}-500/50 ${
                    task.color === color
                      ? "ring-2 ring-offset-2 ring-offset-gray-800 ring-white"
                      : ""
                  }`}
                  aria-label={`Select ${color} color`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
