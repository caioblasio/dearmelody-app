import { MilestonesCard } from '@/components/MilestonesCard'
import { StreakProgressCard } from '@/components/StreakProgressCard'

type DashboardProgressSectionProps = {
  userName: string
}

export function DashboardProgressSection({ userName }: DashboardProgressSectionProps) {
  return (
    <section className="flex flex-col gap-6 md:flex-row md:items-stretch md:gap-8">
      <MilestonesCard className="order-2 min-w-0 md:order-1 md:w-1/2" />
      <StreakProgressCard userName={userName} className="order-1 min-w-0 md:order-2 md:w-1/2" />
    </section>
  )
}
