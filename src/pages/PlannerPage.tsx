import React, { useState, useEffect } from 'react';
import { PlannerTask } from '../types';
import { GATE_CSE_SUBJECTS } from '../data/syllabus';
import { Calendar, CheckCircle2, Circle, Plus, Trash2, Clock, Flame, BookOpen } from 'lucide-react';

export const PlannerPage: React.FC = () => {
  const [tasks, setTasks] = useState<PlannerTask[]>(() => {
    const saved = localStorage.getItem('gatehub_planner_tasks');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Solve 10 OS Paging & Virtual Memory PYQs', subjectId: 'os', date: new Date().toISOString().split('T')[0], completed: true, durationMinutes: 60, category: 'PYQ' },
      { id: '2', title: 'Revise Master Theorem cases in Algorithms', subjectId: 'algo', date: new Date().toISOString().split('T')[0], completed: false, durationMinutes: 45, category: 'Revision' },
      { id: '3', title: 'Practice 5 GATE 2025 CS-1 Questions', subjectId: 'em', date: new Date().toISOString().split('T')[0], completed: false, durationMinutes: 30, category: 'PYQ' }
    ];
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('os');
  const [newTaskCategory, setNewTaskCategory] = useState<'Learn' | 'PYQ' | 'Revision' | 'Mock'>('PYQ');
  const [newTaskDuration, setNewTaskDuration] = useState(45);

  useEffect(() => {
    localStorage.setItem('gatehub_planner_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: PlannerTask = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      subjectId: newTaskSubject,
      date: new Date().toISOString().split('T')[0],
      completed: false,
      durationMinutes: Number(newTaskDuration),
      category: newTaskCategory
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const totalMinutes = tasks.reduce((sum, t) => sum + t.durationMinutes, 0);
  const completedMinutes = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.durationMinutes, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/30 mb-2">
              <Calendar className="w-3.5 h-3.5" /> Daily Study Planner & Goals
            </div>
            <h1 className="text-3xl font-extrabold text-slate-100">GATE Preparation Planner</h1>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <div className="font-bold text-emerald-400 text-sm">{Math.round(completedMinutes / 60 * 10) / 10} hrs</div>
              <div className="text-slate-400">Completed Today</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <div className="font-bold text-amber-400 text-sm flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 fill-amber-400" /> 5 Days
              </div>
              <div className="text-slate-400">Study Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Task Form */}
      <form onSubmit={addTask} className="p-5 rounded-3xl glass-card border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Add New Study Goal / Task</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Goal description (e.g. 'Solve 10 Dijkstra PYQs')..."
            className="sm:col-span-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
          />

          <select
            value={newTaskSubject}
            onChange={(e) => setNewTaskSubject(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none"
          >
            {GATE_CSE_SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <select
            value={newTaskCategory}
            onChange={(e) => setNewTaskCategory(e.target.value as any)}
            className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none"
          >
            <option value="PYQ">PYQ Practice</option>
            <option value="Learn">Concept Learning</option>
            <option value="Revision">Formula Revision</option>
            <option value="Mock">Mock Test</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Goal to Planner
        </button>
      </form>

      {/* Task List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today's Planned Tasks ({tasks.length})</h3>
        <div className="space-y-2">
          {tasks.map((t) => (
            <div
              key={t.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                t.completed
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'glass-card border-slate-800 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={() => toggleTask(t.id)}>
                {t.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-500 shrink-0" />
                )}
                <div>
                  <div className={`font-semibold text-sm ${t.completed ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                    {t.title}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-indigo-400 border border-slate-800 font-mono">
                      {t.category}
                    </span>
                    <span>{t.durationMinutes} mins</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => deleteTask(t.id)}
                className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
