'use client'

import { seedActivities } from '@/data/seed-activities'
import type { ActivityItem } from '@/types/crm'

interface RecentActivityProps {
  activities?: ActivityItem[]
}

export function RecentActivity({ activities = seedActivities }: RecentActivityProps) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Recent activity</h2>
          <p>Latest workspace updates.</p>
        </div>
      </div>
      <div className="activity-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-row">
            <span className={`activity-avatar ${activity.avatarColor}`}>
              {activity.avatar}
            </span>
            <div>
              <strong>{activity.name}</strong>
              <p>{activity.action}</p>
            </div>
            <small>{activity.timeAgo}</small>
          </div>
        ))}
      </div>
    </section>
  )
}
