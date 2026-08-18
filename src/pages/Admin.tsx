import { Check, Copy } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { AdminInvite } from '@/api/admin/admin-invite'
import { useGetAdminInvites } from '@/api/admin/use-get-admin-invites'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

const INVITE_SIGNUP_BASE = 'https://app.dearmelody.app/signup'

function inviteSignupUrl(code: string): string {
  return `${INVITE_SIGNUP_BASE}?invite_code=${encodeURIComponent(code)}`
}

function parseUsedAt(usedAt: string): Date | null {
  const parsed = new Date(usedAt.replace(' ', 'T'))
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

function formatUsedAt(usedAt: string, locale: string): string {
  const parsed = parseUsedAt(usedAt)
  if (!parsed) return usedAt
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(parsed)
}

function StatusChip({ available }: { available: boolean }) {
  const { t } = useTranslation()

  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold',
        available ? 'bg-[#E4F2EB] text-[#2F7A5E]' : 'bg-chip-bg text-muted'
      )}
    >
      {available ? t('admin.available') : t('admin.redeemed')}
    </span>
  )
}

function CopyInviteButton({ code }: { code: string }) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeoutId = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timeoutId)
  }, [copied])

  async function onCopy() {
    if (!navigator.clipboard?.writeText) return
    try {
      await navigator.clipboard.writeText(inviteSignupUrl(code))
      setCopied(true)
    } catch {
      /* clipboard denied */
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="gap-1.5"
      onClick={() => void onCopy()}
    >
      {copied ? (
        <Check className="size-3.5" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
      {copied ? t('admin.copied') : t('admin.copyLink')}
    </Button>
  )
}

function InvitesTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-warm-border bg-card-bg">
      <div className="space-y-3 p-4">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-10 w-full" />
        ))}
      </div>
    </div>
  )
}

function isUnredeemed(invite: AdminInvite): boolean {
  return invite.email == null
}

type InviteFilter = 'all' | 'available' | 'redeemed'

const INVITE_FILTERS: InviteFilter[] = ['all', 'available', 'redeemed']

function InviteStatusFilter({
  value,
  onChange,
}: {
  value: InviteFilter
  onChange: (next: InviteFilter) => void
}) {
  const { t } = useTranslation()

  return (
    <div
      className="inline-flex rounded-full border border-warm-border bg-card-bg p-0.5"
      role="group"
      aria-label={t('admin.filterAria')}
    >
      {INVITE_FILTERS.map((option) => (
        <button
          key={option}
          type="button"
          className={cn(
            'rounded-full px-3 py-1 text-xs font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-coral/35',
            value === option ? 'bg-coral text-white' : 'text-muted hover:text-ink'
          )}
          aria-pressed={value === option}
          onClick={() => onChange(option)}
        >
          {option === 'all'
            ? t('admin.filterAll')
            : option === 'available'
              ? t('admin.available')
              : t('admin.redeemed')}
        </button>
      ))}
    </div>
  )
}

export function AdminPage() {
  const { t, i18n } = useTranslation()
  const invitesQuery = useGetAdminInvites()
  const [filter, setFilter] = useState<InviteFilter>('all')
  const invites = invitesQuery.data
  const unusedCount = useMemo(() => (invites ?? []).filter(isUnredeemed).length, [invites])
  const redeemedCount = (invites?.length ?? 0) - unusedCount
  const filteredInvites = useMemo(() => {
    const list = invites ?? []
    if (filter === 'available') return list.filter(isUnredeemed)
    if (filter === 'redeemed') return list.filter((invite) => !isUnredeemed(invite))
    return list
  }, [invites, filter])

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-heading text-[2.125rem] font-semibold text-ink sm:text-4xl">
          {t('admin.title')}
        </h1>
        <p className="text-muted">{t('admin.subtitle')}</p>
      </header>

      {invitesQuery.isLoading ? (
        <InvitesTableSkeleton />
      ) : invitesQuery.isError ? (
        <Alert variant="destructive">{t('admin.loadError')}</Alert>
      ) : !invites || invites.length === 0 ? (
        <p className="text-sm text-muted" role="status">
          {t('admin.empty')}
        </p>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#E4F2EB] px-3 py-1 text-xs font-semibold text-[#2F7A5E]">
                {t('admin.availableCount', { count: unusedCount })}
              </span>
              <span className="rounded-full bg-chip-bg px-3 py-1 text-xs font-semibold text-muted">
                {t('admin.redeemedCount', { count: redeemedCount })}
              </span>
            </div>
            <InviteStatusFilter value={filter} onChange={setFilter} />
          </div>

          {filteredInvites.length === 0 ? (
            <p className="text-sm text-muted" role="status">
              {t('admin.emptyFiltered')}
            </p>
          ) : (
            <div className="overflow-hidden rounded-lg border border-warm-border bg-card-bg">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>{t('admin.code')}</TableHead>
                    <TableHead>{t('admin.status')}</TableHead>
                    <TableHead>{t('admin.email')}</TableHead>
                    <TableHead>{t('admin.usedAt')}</TableHead>
                    <TableHead className="text-right">{t('admin.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvites.map((invite) => {
                    const available = isUnredeemed(invite)

                    return (
                      <TableRow key={invite.code}>
                        <TableCell className="font-mono text-xs font-semibold tracking-wide sm:text-sm">
                          {invite.code}
                        </TableCell>
                        <TableCell>
                          <StatusChip available={available} />
                        </TableCell>
                        <TableCell className="text-muted">
                          {invite.email ?? t('admin.emDash')}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-muted">
                          {invite.usedAt
                            ? formatUsedAt(invite.usedAt, i18n.language)
                            : t('admin.emDash')}
                        </TableCell>
                        <TableCell className="text-right">
                          {available ? <CopyInviteButton code={invite.code} /> : null}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
