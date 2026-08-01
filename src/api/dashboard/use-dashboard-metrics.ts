import { useQuery } from '@tanstack/react-query'

import { getDashboardMetrics } from './dashboard-metrics'
import { getToken } from '@/lib/auth'

export function useDashboardMetrics() {
  return useQuery({
    queryKey: ['dashboard', 'metrics'],
    queryFn: getDashboardMetrics,
    enabled: !!getToken(),
    retry: false,
    refetchOnWindowFocus: false,
  })
}
