export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done' | 'blocked' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  project_id?: string;
  area_id?: string;
  assigned_to?: string;
  due_date?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  parent_task_id?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'archived' | 'paused';
  goal?: string;
  deadline?: string;
  area_id?: string;
  created_at: string;
  updated_at: string;
  metrics?: Record<string, any>;
}

export interface Area {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  created_at: string;
  updated_at: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'idle' | 'paused' | 'error';
  last_action?: string;
  last_action_at?: string;
  metrics?: Record<string, any>;
  config?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Activity {
  id: string;
  type: 'trade' | 'deployment' | 'content' | 'task' | 'system' | 'agent' | 'note';
  agent?: string;
  title: string;
  description?: string;
  severity: 'info' | 'success' | 'warning' | 'error' | 'critical';
  metadata?: Record<string, any>;
  project_id?: string;
  task_id?: string;
  created_at: string;
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  type: 'financial' | 'product' | 'content' | 'trading' | 'personal';
  target_value: number;
  current_value: number;
  unit: string;
  deadline?: string;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  area_id?: string;
  created_at: string;
  updated_at: string;
}

export interface DailyNote {
  id: string;
  date: string;
  content?: string;
  highlights?: string[];
  tasks_completed: number;
  tasks_total: number;
  mood?: string;
  energy?: number;
  created_at: string;
  updated_at: string;
}

export interface Resource {
  id: string;
  title: string;
  content?: string;
  type: 'note' | 'link' | 'file' | 'reference';
  tags?: string[];
  project_id?: string;
  area_id?: string;
  created_at: string;
  updated_at: string;
}
