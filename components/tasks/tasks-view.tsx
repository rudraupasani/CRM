'use client'

import { useState } from 'react'
import {
  Plus,
  ClipboardCheck,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Kanban,
  List,
  Building2,
  User,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'
import type { RecordItem, PriorityLevel } from '@/types/crm'

interface TasksViewProps {
  records: RecordItem[]
  onAdd: () => void
  onEdit: (record: RecordItem) => void
  onUpdateTask: (task: RecordItem) => void
}

export function TasksView({ records, onAdd, onEdit, onUpdateTask }: TasksViewProps) {
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board')
  const [priorityFilter, setPriorityFilter] = useState('all')

  const tasks = records.filter((r) => {
    // If priority or taskCategory is set or due date is present
    const isTask = r.priority || r.taskCategory || r.dueDate || r.status === 'Open' || r.status === 'Complete' || r.status === 'To Do' || r.status === 'In Progress'
    const matchesPriority = priorityFilter === 'all' || (r.priority && r.priority.toLowerCase() === priorityFilter.toLowerCase())
    return isTask && matchesPriority
  })

  const stages = ['To Do', 'In Progress', 'Under Review', 'Completed']

  const advanceStage = (task: RecordItem) => {
    const currentIdx = stages.indexOf(task.status)
    const nextStage = stages[currentIdx + 1] || stages[0]
    onUpdateTask({ ...task, status: nextStage })
  }

  const getPriorityStyle = (priority?: PriorityLevel) => {
    switch (priority) {
      case 'Urgent':
        return { bg: '#fee2e2', text: '#b91c1c', border: '#fca5a5' }
      case 'High':
        return { bg: '#ffedd5', text: '#c2410c', border: '#fdba74' }
      case 'Medium':
        return { bg: '#e0e7ff', text: '#3730a3', border: '#c7d2fe' }
      default:
        return { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' }
    }
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Project Management & Engineering</p>
          <h1>Tasks & Milestone Action Items</h1>
          <p className="subheading">
            Track client discovery calls, architecture reviews, milestone deliverables, and code reviews.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ display: 'flex', background: '#e2e8f0', borderRadius: '8px', padding: '3px' }}>
            <button
              onClick={() => setViewMode('board')}
              style={{
                border: 'none',
                background: viewMode === 'board' ? '#fff' : 'transparent',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: viewMode === 'board' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              <Kanban size={14} /> Board
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                border: 'none',
                background: viewMode === 'list' ? '#fff' : 'transparent',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: viewMode === 'list' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              <List size={14} /> List
            </button>
          </div>

          <button className="primary-button" onClick={onAdd} style={{ background: '#f59e0b', color: '#000' }}>
            <Plus size={17} /> Create Task
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Filter Priority:</span>
          {['all', 'urgent', 'high', 'medium'].map((p) => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                border: priorityFilter === p ? '1px solid #7257e9' : '1px solid #cbd5e1',
                background: priorityFilter === p ? '#f5f3ff' : '#fff',
                color: priorityFilter === p ? '#7257e9' : '#475569',
              }}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>

        <span style={{ fontSize: '12px', color: '#64748b' }}>
          <strong>{tasks.length}</strong> active tasks
        </span>
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === 'board' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            alignItems: 'start',
          }}
        >
          {stages.map((stage) => {
            const columnTasks = tasks.filter((t) => t.status === stage)
            return (
              <div
                key={stage}
                style={{
                  background: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  padding: '14px',
                  minHeight: '400px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background:
                          stage === 'Completed'
                            ? '#16a34a'
                            : stage === 'In Progress'
                              ? '#2563eb'
                              : stage === 'Under Review'
                                ? '#9333ea'
                                : '#64748b',
                      }}
                    />
                    <strong style={{ fontSize: '13px', color: '#1e293b' }}>{stage}</strong>
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: '999px',
                      background: '#e2e8f0',
                      color: '#475569',
                    }}
                  >
                    {columnTasks.length}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {columnTasks.map((task) => {
                    const pStyle = getPriorityStyle(task.priority)
                    return (
                      <div
                        key={task.id}
                        className="panel"
                        onClick={() => onEdit(task)}
                        style={{
                          padding: '14px',
                          background: '#fff',
                          borderRadius: '10px',
                          border: '1px solid #e2e8f0',
                          cursor: 'pointer',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span
                            style={{
                              fontSize: '10px',
                              fontWeight: 700,
                              padding: '2px 6px',
                              borderRadius: '4px',
                              background: pStyle.bg,
                              color: pStyle.text,
                              border: `1px solid ${pStyle.border}`,
                            }}
                          >
                            {task.priority || 'Normal'}
                          </span>

                          <span style={{ fontSize: '10px', fontWeight: 600, color: '#7257e9' }}>
                            {task.taskCategory || 'General'}
                          </span>
                        </div>

                        <h4 style={{ margin: '0 0 6px', fontSize: '13px', fontWeight: 700, color: '#0f172a', lineHeight: 1.4 }}>
                          {task.name}
                        </h4>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', marginBottom: '10px' }}>
                          <Building2 size={12} />
                          <span>{task.company}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b' }}>
                            <Calendar size={12} />
                            <span>{task.dueDate || 'No due date'}</span>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              advanceStage(task)
                            }}
                            title="Move to next stage"
                            style={{
                              border: 'none',
                              background: '#f1f5f9',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '3px',
                              color: '#334155',
                            }}
                          >
                            Advance <ArrowRight size={11} />
                          </button>
                        </div>
                      </div>
                    )
                  })}

                  {columnTasks.length === 0 && (
                    <div style={{ padding: '24px 12px', textAlign: 'center', color: '#94a3b8', fontSize: '12px' }}>
                      No tasks in this stage
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* TABLE / LIST VIEW */
        <section className="panel records-panel">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Task Title</th>
                  <th>Client / Deal</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Assignee</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((t) => {
                  const pStyle = getPriorityStyle(t.priority)
                  return (
                    <tr key={t.id} className="clickable-row" onClick={() => onEdit(t)}>
                      <td>
                        <strong>{t.name}</strong>
                      </td>
                      <td>{t.company}</td>
                      <td>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#7257e9' }}>
                          {t.taskCategory || 'Task'}
                        </span>
                      </td>
                      <td>
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            padding: '3px 7px',
                            borderRadius: '4px',
                            background: pStyle.bg,
                            color: pStyle.text,
                            border: `1px solid ${pStyle.border}`,
                          }}
                        >
                          {t.priority || 'Normal'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
                          <Calendar size={12} color="#64748b" />
                          <span>{t.dueDate || '—'}</span>
                        </div>
                      </td>
                      <td>{t.owner}</td>
                      <td>
                        <span className="status-pill">{t.status}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                          <button
                            className="secondary-button"
                            style={{ padding: '4px 8px', fontSize: '11px' }}
                            onClick={(e) => {
                              e.stopPropagation()
                              advanceStage(t)
                            }}
                          >
                            Advance <ArrowRight size={11} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  )
}
