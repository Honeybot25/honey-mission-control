import { create } from 'zustand';
import { Task, Project, Area, Agent, Activity, Goal, DailyNote } from '@/types';

interface DashboardState {
  // Data
  tasks: Task[];
  projects: Project[];
  areas: Area[];
  agents: Agent[];
  activities: Activity[];
  goals: Goal[];
  dailyNote: DailyNote | null;
  
  // UI State
  focusMode: boolean;
  selectedProject: string | null;
  selectedAgent: string | null;
  activityFilter: string;
  searchQuery: string;
  commandBarOpen: boolean;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setTasks: (tasks: Task[]) => void;
  setProjects: (projects: Project[]) => void;
  setAreas: (areas: Area[]) => void;
  setAgents: (agents: Agent[]) => void;
  setActivities: (activities: Activity[]) => void;
  setGoals: (goals: Goal[]) => void;
  setDailyNote: (note: DailyNote | null) => void;
  
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  
  addActivity: (activity: Activity) => void;
  
  toggleFocusMode: () => void;
  setSelectedProject: (id: string | null) => void;
  setSelectedAgent: (id: string | null) => void;
  setActivityFilter: (filter: string) => void;
  setSearchQuery: (query: string) => void;
  toggleCommandBar: () => void;
  
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  // Initial data
  tasks: [],
  projects: [],
  areas: [],
  agents: [],
  activities: [],
  goals: [],
  dailyNote: null,
  
  // UI State
  focusMode: false,
  selectedProject: null,
  selectedAgent: null,
  activityFilter: 'all',
  searchQuery: '',
  commandBarOpen: false,
  
  // Loading
  isLoading: false,
  error: null,
  
  // Actions
  setTasks: (tasks) => set({ tasks }),
  setProjects: (projects) => set({ projects }),
  setAreas: (areas) => set({ areas }),
  setAgents: (agents) => set({ agents }),
  setActivities: (activities) => set({ activities }),
  setGoals: (goals) => set({ goals }),
  setDailyNote: (dailyNote) => set({ dailyNote }),
  
  addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map((t) => t.id === id ? { ...t, ...updates } : t)
  })),
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((t) => t.id !== id)
  })),
  
  addActivity: (activity) => set((state) => ({ 
    activities: [activity, ...state.activities] 
  })),
  
  toggleFocusMode: () => set((state) => ({ focusMode: !state.focusMode })),
  setSelectedProject: (id) => set({ selectedProject: id }),
  setSelectedAgent: (id) => set({ selectedAgent: id }),
  setActivityFilter: (filter) => set({ activityFilter: filter }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleCommandBar: () => set((state) => ({ commandBarOpen: !state.commandBarOpen })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
