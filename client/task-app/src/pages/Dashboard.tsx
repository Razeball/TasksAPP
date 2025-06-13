import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Header from "../components/Header";
import TaskCard from "../components/TaskCard";
import CreateEditCard from "../components/CreateEditCard";
import FocusModal from "../components/FocusModal";
import { useAuth } from "../context/AuthContext";
import { getTasks, searchTask, type Task } from "../services/TaskService";
import { useDebounce } from "../hooks/useDebounce";

type ModalState = {
  mode: "create" | "edit" | null;
  task?: Task;
};

export default function Dashboard() {
  const { loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [modalState, setModalState] = useState<ModalState>({ mode: null });
  const [searchQuery, setSearchQuery] = useState("");

  // Debounce the search query with a 500ms delay
  const debouncedQuery = useDebounce(searchQuery, 500);

  // Effect to fetch tasks based on the debounced search query or initial load
  useEffect(() => {
    // Don't fetch anything if the auth state is still loading
    if (authLoading) {
      return;
    }

    const loadTasks = async () => {
      setIsLoadingTasks(true);
      try {
        const fetchedTasks = debouncedQuery
          ? await searchTask(debouncedQuery)
          : await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        toast.error("Could not load tasks. Please try again later.");
      } finally {
        setIsLoadingTasks(false);
      }
    };

    loadTasks();
  }, [authLoading, debouncedQuery]); // Re-run only when auth is ready or search query changes

  const handleOpenCreateModal = () => setModalState({ mode: "create" });
  const handleOpenEditModal = (task: Task) =>
    setModalState({ mode: "edit", task });
  const handleCloseModal = () => setModalState({ mode: null });

  // This function is called from CreateEditCard on success.
  // It triggers a refetch by clearing the search and letting the useEffect run again
  const handleTaskSave = () => {
    // If user was searching, clear the search to show the updated/new task in the full list
    if (searchQuery) {
      setSearchQuery("");
    } else {
      // If not searching, manually trigger a refetch
      // by calling a non-debounced function
      const refetch = async () => {
        setIsLoadingTasks(true);
        try {
          const fetchedTasks = await getTasks();
          setTasks(fetchedTasks);
        } catch (error) {
          toast.error("Could not refresh tasks.");
        } finally {
          setIsLoadingTasks(false);
        }
      };
      refetch();
    }
  };

  const renderContent = () => {
    if (isLoadingTasks) {
      return (
        <div className="flex justify-center items-center mt-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      );
    }
    if (tasks.length === 0) {
      return (
        <div className="text-center mt-20">
          <h2 className="text-2xl">
            {debouncedQuery ? "No tasks match your search." : "No tasks yet!"}
          </h2>
          <p className="text-gray-400">
            {debouncedQuery
              ? "Try a different search term."
              : "Click 'Create Task' to get started."}
          </p>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => handleOpenEditModal(task)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Header
        openCreate={handleOpenCreateModal}
        onSearch={setSearchQuery} // Connects to header
      />
      <main className="p-4 md:p-8">{renderContent()}</main>

      <FocusModal isOpen={modalState.mode !== null} onClose={handleCloseModal}>
        <CreateEditCard
          onClose={handleCloseModal}
          onSave={handleTaskSave}
          taskToEdit={modalState.task}
        />
      </FocusModal>
    </div>
  );
}
