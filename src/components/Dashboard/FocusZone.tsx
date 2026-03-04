'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  CheckCircle2, 
  Circle, 
  Clock,
  Target,
  AlertCircle
} from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardStore';
import { tasksApi, activitiesApi } from '@/lib/supabase';
import { Task } from '@/types';

export default function FocusZone() {
  const { tasks, setTasks, addTask, updateTask, dailyNote, focusMode } = useDashboardStore();
  const [newTask, setNewTask] = useState('');
  const [currentFocus, setCurrentFocus] = useState<string | null>(null);
  const [focusTime, setFocusTime] = useState(0);
  const [isFocusing, setIsFocusing] = useState(false);

  // Load today's tasks
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const todayTasks = await tasksApi.getToday();
        setTasks(todayTasks);
      } catch (error) {
        console.error('Failed to load tasks:', error);
      }
    };
    loadTasks();
  }, [setTasks]);

  // Focus timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isFocusing) {
      interval = setInterval(() => {
        setFocusTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isFocusing]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const task = await tasksApi.create({
        title: newTask,
        status: 'todo',
        priority: 'medium',
      });
      addTask(task);
      
      // Log activity
      await activitiesApi.create({
        type: 'task',
        title: 'New task captured',
        description: newTask,
        severity: 'info',
      });
      
      setNewTask('');
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleToggleTask = async (task: Task) => {
    const newStatus = task.status === 'done' ? 'todo' : 'done';
    try {
      await tasksApi.update(task.id, { 
        status: newStatus,
        completed_at: newStatus === 'done' ? new Date().toISOString() : null
      });
      updateTask(task.id, { 
        status: newStatus,
        completed_at: newStatus === 'done' ? new Date().toISOString() : null
      });
      
      if (newStatus === 'done') {
        await activitiesApi.create({
          type: 'task',
          title: 'Task completed',
          description: task.title,
          severity: 'success',
        });
      }
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const topTasks = tasks.filter(t => t.status !== 'done').slice(0, 3);
  const completedCount = tasks.filter(t => t.status === 'done').length;
  const totalCount = tasks.length;

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-500" />
            Today / Focus
          </h2>
          <div className="flex items-center space-x-2">
            {isFocusing && (
              <div className="flex items-center space-x-2 text-sm text-blue-400">
                <Clock className="w-4 h-4 animate-pulse" />
                <span className="font-mono">{formatTime(focusTime)}</span>
              </div>
            )}
            <button
              onClick={() => setIsFocusing(!isFocusing)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                isFocusing 
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                  : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
              }`}
            >
              {isFocusing ? 'Stop Focus' : 'Start Focus'}
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Progress */}
        {totalCount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">
              {completedCount} of {totalCount} tasks completed
            </span>
            <span className="text-gray-400">
              {Math.round((completedCount / totalCount) * 100)}%
            </span>
          </div>
        )}

        {/* Quick Capture */}
        <form onSubmit={handleAddTask} className="flex items-center space-x-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Quick capture task or note..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </form>

        {/* Top 3 Priorities */}
        <div className="space-y-2">
          {topTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">All caught up! Add a new task to get started.</p>
            </div>
          ) : (
            topTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg group hover:bg-gray-750 transition-colors"
              >
                <button
                  onClick={() => handleToggleTask(task)}
                  className="flex-shrink-0"
                >
                  <Circle className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{task.title}</p>
                  {task.project_id && (
                    <p className="text-xs text-gray-500">Linked to project</p>
                  )}
                </div>
                {task.priority === 'urgent' && (
                  <AlertCircle className="w-4 h-4 text-red-400" />
                )}
              </div>
            ))
          )}
        </div>

        {/* Next Event */}
        <div className="pt-4 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Next</span>
            <span className="text-xs text-gray-400">No upcoming events</span>
          </div>
        </div>
      </div>
    </div>
  );
}
