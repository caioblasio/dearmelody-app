import { ChevronDown, ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useUserInfo } from '@/api/user/use-user-info'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from '@/components/ui/item'
import { setAppLocale } from '@/i18n/config'
import { isAdminEmail } from '@/lib/admin'
import { normalizeLocale, SUPPORTED_LOCALES, type AppLocale } from '@/lib/locale'
import { SUPPORT_WHATSAPP_URL } from '@/lib/support'
import { cn } from '@/lib/utils'

const AVATAR_SIZE_CLASS = 'size-14'

function ProfileFieldLabel({ children }: { children: ReactNode }) {
  return <span className="label-caps text-sand">{children}</span>
}

function ProfileFieldValue({ children }: { children: ReactNode }) {
  return <ItemTitle className="text-[1.0625rem] font-semibold text-ink">{children}</ItemTitle>
}

export function ProfilePage() {
  const { t, i18n } = useTranslation()
  const { data: user } = useUserInfo()

  const firstName = user?.first_name?.trim() || '—'
  const lastName = user?.last_name?.trim() || '—'
  const email = user?.email?.trim() || '—'
  const initial = (user?.first_name?.[0] ?? '?').toUpperCase()

  const locale: AppLocale = normalizeLocale(i18n.language) ?? 'en'
  const showAdmin = isAdminEmail(user?.email)

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-heading text-[2.125rem] font-semibold text-ink sm:text-4xl">
          {t('settings.title')}
        </h1>
        <p className="text-muted">{t('settings.subtitle')}</p>
      </header>

      <div className="flex flex-col gap-8">
        <section className="overflow-hidden rounded-lg border border-warm-border bg-card-bg">
          <p className="label-caps px-6 pb-1 pt-5 text-sand">{t('settings.profile')}</p>
          <ItemGroup>
            <Item className="items-center gap-4 px-6 py-5" size="default">
              <ItemMedia
                className={cn(
                  AVATAR_SIZE_CLASS,
                  'rounded-full bg-gradient-to-br from-butter to-coral-light text-lg font-semibold text-ink'
                )}
              >
                {initial}
              </ItemMedia>
              <ItemContent className="gap-0.5">
                <ProfileFieldLabel>{t('settings.firstName')}</ProfileFieldLabel>
                <ProfileFieldValue>{firstName}</ProfileFieldValue>
              </ItemContent>
            </Item>

            <ItemSeparator className="mx-6 w-auto bg-warm-border" />

            <Item className="items-center gap-4 px-6 py-5">
              <div className={cn(AVATAR_SIZE_CLASS, 'shrink-0')} aria-hidden />
              <ItemContent className="gap-0.5">
                <ProfileFieldLabel>{t('settings.lastName')}</ProfileFieldLabel>
                <ProfileFieldValue>{lastName}</ProfileFieldValue>
              </ItemContent>
            </Item>

            <ItemSeparator className="mx-6 w-auto bg-warm-border" />

            <Item className="items-center gap-4 px-6 py-5">
              <div className={cn(AVATAR_SIZE_CLASS, 'shrink-0')} aria-hidden />
              <ItemContent className="gap-0.5">
                <ProfileFieldLabel>{t('settings.email')}</ProfileFieldLabel>
                <div className="flex flex-wrap items-center gap-2">
                  <ProfileFieldValue>{email}</ProfileFieldValue>
                  <span className="rounded-full bg-[#E4F2EB] px-2.5 py-0.5 text-xs font-semibold text-[#2F7A5E]">
                    {t('settings.verified')}
                  </span>
                </div>
              </ItemContent>
              <ItemActions>
                <a
                  href={SUPPORT_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-right text-xs leading-snug text-coral transition-colors hover:text-[#E0603F] hover:underline"
                >
                  {t('settings.contactSupportToChange')}
                </a>
              </ItemActions>
            </Item>
          </ItemGroup>
        </section>

        <section className="overflow-hidden rounded-lg border border-warm-border bg-card-bg">
          <p className="label-caps px-6 pb-1 pt-5 text-sand">{t('settings.preferences')}</p>
          <ItemGroup>
            <Item className="items-center gap-4 px-6 py-5">
              <ItemContent className="gap-1">
                <ItemTitle className="text-[1.0625rem] font-semibold text-ink">
                  {t('settings.language')}
                </ItemTitle>
                <ItemDescription>{t('settings.languageHelp')}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={cn(
                      'inline-flex h-11 min-w-[9.5rem] items-center justify-between gap-2 rounded-[14px] border border-warm-border bg-surface px-3.5 text-sm font-medium text-ink outline-none transition-colors',
                      'hover:border-peach focus-visible:ring-2 focus-visible:ring-coral/30'
                    )}
                  >
                    {t(`settings.locales.${locale}`)}
                    <ChevronDown className="size-4 shrink-0 text-muted" aria-hidden />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[9.5rem]">
                    <DropdownMenuRadioGroup
                      value={locale}
                      onValueChange={(value) => {
                        void setAppLocale(value)
                      }}
                    >
                      {SUPPORTED_LOCALES.map((code) => (
                        <DropdownMenuRadioItem key={code} value={code}>
                          {t(`settings.locales.${code}`)}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ItemActions>
            </Item>
          </ItemGroup>
        </section>

        <section className="overflow-hidden rounded-lg border border-warm-border bg-card-bg">
          <ItemGroup>
            <Item asChild className="items-center gap-4 px-6 py-5">
              <a href={SUPPORT_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <ItemContent>
                  <ItemTitle className="text-[1.0625rem] font-semibold text-ink">
                    {t('settings.contactSupport')}
                  </ItemTitle>
                </ItemContent>
                <ItemActions>
                  <ChevronRight className="size-4 text-muted" aria-hidden />
                </ItemActions>
              </a>
            </Item>

            <ItemSeparator className="mx-6 w-auto bg-warm-border" />

            <Item asChild className="items-center gap-4 px-6 py-5">
              <Link to="/feedback">
                <ItemContent>
                  <ItemTitle className="text-[1.0625rem] font-semibold text-ink">
                    {t('settings.sendFeedback')}
                  </ItemTitle>
                </ItemContent>
                <ItemActions>
                  <ChevronRight className="size-4 text-muted" aria-hidden />
                </ItemActions>
              </Link>
            </Item>

            {showAdmin ? (
              <>
                <ItemSeparator className="mx-6 w-auto bg-warm-border md:hidden" />
                <Item asChild className="items-center gap-4 px-6 py-5 md:hidden">
                  <Link to="/admin">
                    <ItemContent>
                      <ItemTitle className="text-[1.0625rem] font-semibold text-ink">
                        {t('settings.admin')}
                      </ItemTitle>
                    </ItemContent>
                    <ItemActions>
                      <ChevronRight className="size-4 text-muted" aria-hidden />
                    </ItemActions>
                  </Link>
                </Item>
              </>
            ) : null}
          </ItemGroup>
        </section>
      </div>
    </section>
  )
}
