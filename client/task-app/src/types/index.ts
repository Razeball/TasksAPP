

export interface User {
  id: number;
  email: string;
  username: string; 
}


export interface AuthPayload {
  email: string;
  password: string;
  username?: string; 
}

export interface Task {
  id: number;
  title: string;
  content: string;
  color: 'red' | 'blue' | 'green';
  due_date: string;
}

export interface TaskPayload {
  title: string;
  content: string;
  color: 'red' | 'blue' | 'green';
  due_date: string;
}