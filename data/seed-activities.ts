import type { ActivityItem } from '@/types/crm'

export const seedActivities: ActivityItem[] = [
  {
    id: 'act-1',
    name: 'Olivia Martin',
    avatar: 'OM',
    avatarColor: 'bg-violet-100 text-violet-700',
    action: 'moved to Qualified',
    timeAgo: '2m',
  },
  {
    id: 'act-2',
    name: 'Jackson Kim',
    avatar: 'JK',
    avatarColor: 'bg-blue-100 text-blue-700',
    action: 'received a proposal',
    timeAgo: '18m',
  },
  {
    id: 'act-3',
    name: 'Sophia Williams',
    avatar: 'SW',
    avatarColor: 'bg-emerald-100 text-emerald-700',
    action: 'was added as a new lead',
    timeAgo: '1h',
  },
]
