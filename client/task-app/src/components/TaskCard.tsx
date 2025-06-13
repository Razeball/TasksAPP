import { type Task } from "../services/TaskService";
import { getTaskStyle } from "../utils/styleUtils";

//props for this task
interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  const { title, content, color } = task;
  const { cardBorder, cardHeaderBg } = getTaskStyle(color);

  return (
    <div
      onClick={onClick}
      className={`border ${cardBorder} rounded-2xl transform transition-transform duration-200 hover:scale-105 hover:border-2 shadow overflow-hidden m-4 cursor-pointer`}
    >
      <div className={`h-1/4 ${cardHeaderBg} p-4 flex items-center`}>
        <h1 className="font-bold truncate">{title}</h1>
      </div>
      <div className="h-3/4 bg-gray-800 p-4">
        <p className="text-gray-300 line-clamp-3">{content}</p>
      </div>
    </div>
  );
}
