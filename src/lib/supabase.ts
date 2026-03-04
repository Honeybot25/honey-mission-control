import { createClient } from '@supabase/supabase-js';
import { Task, Project, Area, Agent, Activity, Goal, DailyNote } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Tasks API
export const tasksApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Task[];
  },
  
  getToday: async () => {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('status', 'todo')
      .or(`due_date.eq.${today},due_date.is.null`)
      .order('priority', { ascending: false })
      .limit(5);
    if (error) throw error;
    return data as Task[];
  },
  
  create: async (task: Partial<Task>) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert(task)
      .select()
      .single();
    if (error) throw error;
    return data as Task;
  },
  
  update: async (id: string, updates: Partial<Task>) => {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Task;
  },
  
  delete: async (id: string) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) throw error;
  },
};

// Projects API
export const projectsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Project[];
  },
  
  getActive: async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Project[];
  },
  
  create: async (project: Partial<Project>) => {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();
    if (error) throw error;
    return data as Project;
  },
};

// Agents API
export const agentsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .order('name');
    if (error) throw error;
    return data as Agent[];
  },
  
  updateStatus: async (id: string, status: Agent['status'], lastAction?: string) => {
    const { data, error } = await supabase
      .from('agents')
      .update({ 
        status, 
        last_action: lastAction,
        last_action_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Agent;
  },
};

// Activities API
export const activitiesApi = {
  getAll: async (limit = 50) => {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data as Activity[];
  },
  
  getByType: async (type: string, limit = 20) => {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('type', type)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data as Activity[];
  },
  
  create: async (activity: Partial<Activity>) => {
    const { data, error } = await supabase
      .from('activities')
      .insert(activity)
      .select()
      .single();
    if (error) throw error;
    return data as Activity;
  },
};

// Goals API
export const goalsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Goal[];
  },
  
  updateProgress: async (id: string, currentValue: number) => {
    const { data, error } = await supabase
      .from('goals')
      .update({ current_value: currentValue })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Goal;
  },
};

// Daily Notes API
export const dailyNotesApi = {
  getToday: async () => {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('daily_notes')
      .select('*')
      .eq('date', today)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data as DailyNote | null;
  },
  
  createOrUpdate: async (date: string, content: string) => {
    const { data, error } = await supabase
      .from('daily_notes')
      .upsert({ date, content })
      .select()
      .single();
    if (error) throw error;
    return data as DailyNote;
  },
};

// Areas API
export const areasApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('areas')
      .select('*')
      .order('name');
    if (error) throw error;
    return data as Area[];
  },
};
