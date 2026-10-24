"use client";

import React, { useState, useEffect } from "react";
import {
  CheckSquare,
  Plus,
  Trash2,
  Check,
  Calendar,
  Layers,
  Clock,
  AlertCircle,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { dataStore } from "@/lib/store";
import { CampaignTask, Campaign } from "@/types/database";

export default function TasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<CampaignTask[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [formError, setFormError] = useState("");

  const refresh = () => {
    setTasks(dataStore.getTasks(user?.id));
    const camps = dataStore.getCampaigns(user?.id);
    setCampaigns(camps);
    if (camps.length > 0 && !campaignId) {
      setCampaignId(camps[0].id);
    }
  };

  useEffect(() => {
    refresh();
  }, [user]);

  const handleToggle = (id: string) => {
    dataStore.toggleTaskStatus(id);
    refresh();
  };

  const handleDelete = (id: string) => {
    dataStore.deleteTask(id);
    refresh();
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError("Please enter a task title.");
      return;
    }
    if (!campaignId) {
      setFormError("Please select a target campaign.");
      return;
    }

    dataStore.saveTask({
      user_id: user?.id || "cf-user-001-demo",
      campaign_id: campaignId,
      title: title.trim(),
      status: "pending",
      due_date: dueDate || null,
    });

    setIsModalOpen(false);
    setTitle("");
    setDueDate("");
    setFormError("");
    refresh();
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "pending") return t.status === "pending";
    if (filter === "completed") return t.status === "completed";
    return true;
  });

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2.5">
            <CheckSquare className="w-6 h-6 text-primary" /> Campaign Action Items
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Keep your launch deadlines and creative milestones organized per campaign.
          </p>
        </div>

        <button
          onClick={() => {
            setFormError("");
            setIsModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:bg-primary-600 transition-colors shadow-md shadow-primary/20 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Action Item
        </button>
      </div>

      {/* Progress Card */}
      <div className="p-6 rounded-2xl border border-border bg-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Overall Completion Rate
          </div>
          <div className="text-2xl font-black text-foreground">
            {completedCount} of {tasks.length} tasks completed ({progressPercent}%)
          </div>
        </div>

        <div className="w-full sm:w-64 h-3 rounded-full bg-secondary overflow-hidden border border-border">
          <div
            className="h-full bg-gradient-to-r from-violet-600 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl border border-border bg-card w-fit">
        {(["all", "pending", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
              filter === f
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="py-20 text-center rounded-2xl border border-dashed border-border bg-card/40 space-y-3">
          <CheckSquare className="w-10 h-10 text-muted-foreground/60 mx-auto" />
          <h3 className="text-base font-bold text-foreground">No tasks found</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            {filter !== "all"
              ? `You have no ${filter} tasks.`
              : "Keep campaigns on track by scheduling tasks with due dates."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((t) => {
            const camp = campaigns.find((c) => c.id === t.campaign_id);
            const isDone = t.status === "completed";

            return (
              <div
                key={t.id}
                className="p-4 sm:p-5 rounded-2xl border border-border bg-card hover:border-primary/40 transition-colors flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <button
                    onClick={() => handleToggle(t.id)}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                      isDone
                        ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                        : "border-border hover:border-primary bg-secondary/40"
                    }`}
                    aria-label={isDone ? "Mark as pending" : "Mark as completed"}
                  >
                    {isDone && <Check className="w-4 h-4 stroke-[2.5]" />}
                  </button>

                  <div className="min-w-0">
                    <p
                      className={`text-sm ${
                        isDone
                          ? "line-through text-muted-foreground font-normal"
                          : "text-foreground font-semibold"
                      }`}
                    >
                      {t.title}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-muted-foreground">
                      {camp && (
                        <span className="flex items-center gap-1 font-medium text-primary">
                          <Layers className="w-3 h-3" /> {camp.name}
                        </span>
                      )}
                      {t.due_date && (
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" /> Due {t.due_date}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-2 rounded-lg border border-border/80 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0 opacity-0 group-hover:opacity-100"
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative z-50 w-full max-w-md bg-card rounded-2xl border border-border p-6 shadow-2xl animate-fade-in space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-primary" /> New Action Item
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:bg-secondary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Schedule LinkedIn announcement post"
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Associated Campaign
                </label>
                <select
                  value={campaignId}
                  onChange={(e) => setCampaignId(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  {campaigns.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Due Date (Optional)
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-foreground hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-600 shadow-md shadow-primary/20"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
