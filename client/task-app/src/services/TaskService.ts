

import api from "./api"; 

// The definitive Task type, received from the API
export interface Task {
  id: number;
  title: string;
  content: string;
  is_completed: boolean;
  due_date: string; 
  color: 'red' | 'blue' | 'green';
}

// The type for data we send to the API 
export type TaskPayload = Omit<Task, 'id' | 'is_completed'>;

//The function to get all the tasks from the api, the promise should return
//an array of task objects
export async function getTasks(): Promise<Task[]> {
  const res = await api.get<Task[]>(`/tasks/`);
  return res.data;
}

//Here it will need the id of the task we are going to get and it will
//return the task that have that id
export async function getSingleTask(id: number): Promise<Task> {
  const res = await api.get<Task>(`/tasks/${id}`);
  return res.data;
}

//This would use the payload template to create a task and would return that
//created task
export async function createTask(task: TaskPayload): Promise<Task> {
  const res = await api.post<Task>(`/tasks/`, task);
  return res.data;
}

//This would search a task by a title and return an array of task
export async function searchTask(title: string): Promise<Task[]>{
  const res = await api.get<Task[]>(`/tasks/search/?title=${title}`)
  return res.data;
}

//this just delete a task by it's id and return nothing
export async function deleteTask(id: number): Promise<void> {

  await api.delete(`/tasks/${id}`);
}


//this would need the id of the task, the information that is going to update from the 
//the task and use partials so all the field are optionals and then it return the 
//modified task
export async function updateTask(id: number, task: Partial<TaskPayload>): Promise<Task> {
  const res = await api.put<Task>(`/tasks/${id}`, task);
  return res.data; 
}