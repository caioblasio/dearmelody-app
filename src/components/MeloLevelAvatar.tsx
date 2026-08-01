import { useId } from 'react'

import type { MeloLevel } from '@/lib/diary-streak'
import { cn } from '@/lib/utils'

type MeloLevelAvatarProps = {
  level: MeloLevel
  className?: string
}

function Headphones({ showDot }: { showDot: boolean }) {
  return (
    <g>
      <path
        d="M 44 84 V 60 A 66 58 0 0 1 176 60 V 84"
        fill="none"
        stroke="#FF7A59"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <rect x="37" y="60" width="20" height="34" rx="8" fill="#FF7A59" />
      <rect x="163" y="60" width="20" height="34" rx="8" fill="#FF7A59" />
      {showDot ? (
        <circle
          data-anim
          className="melo-level-band-dot"
          cx="110"
          cy="28"
          r="4"
          fill="#FFD66B"
        />
      ) : null}
    </g>
  )
}

function SmileFace() {
  return (
    <g>
      <path
        d="M 76 62 A 10 5 0 0 1 96 62"
        fill="none"
        stroke="#5B3B8C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 124 62 A 10 5 0 0 1 144 62"
        fill="none"
        stroke="#5B3B8C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <ellipse cx="87" cy="88" rx="13" ry="14" fill="#FFFFFF" />
      <ellipse cx="133" cy="88" rx="13" ry="14" fill="#FFFFFF" />
      <ellipse cx="87.5" cy="89.5" rx="6.5" ry="7.5" fill="#5B3B8C" />
      <ellipse cx="133.5" cy="89.5" rx="6.5" ry="7.5" fill="#5B3B8C" />
      <ellipse cx="86" cy="86" rx="2" ry="2" fill="#FFFFFF" />
      <ellipse cx="132" cy="86" rx="2" ry="2" fill="#FFFFFF" />
      <ellipse cx="73" cy="104" rx="7" ry="4" fill="#FFA98F" opacity="0.6" />
      <ellipse cx="147" cy="104" rx="7" ry="4" fill="#FFA98F" opacity="0.6" />
      <path
        d="M 100 112 A 10 10 0 0 0 120 112"
        fill="none"
        stroke="#5B3B8C"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  )
}

function WhistleFace({ withPuff }: { withPuff: boolean }) {
  return (
    <g>
      <path
        d="M 76 60 A 10 5 0 0 1 96 60"
        fill="none"
        stroke="#5B3B8C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 124 60 A 10 5 0 0 1 144 60"
        fill="none"
        stroke="#5B3B8C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 76 86 A 11 8 0 0 0 98 86"
        fill="none"
        stroke="#5B3B8C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 122 86 A 11 8 0 0 0 144 86"
        fill="none"
        stroke="#5B3B8C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <ellipse cx="73" cy="102" rx="8" ry="5" fill="#FFA98F" opacity="0.7" />
      <ellipse cx="147" cy="102" rx="8" ry="5" fill="#FFA98F" opacity="0.7" />
      <circle cx="110" cy="112" r="9" fill="#8A5A6E" stroke="#5B3B8C" strokeWidth="4" />
      {withPuff ? (
        <path
          data-anim
          className="melo-level-puff"
          d="M 124 100 Q 136 96 137 108"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ) : null}
    </g>
  )
}

function DrumsFace() {
  return (
    <g>
      <path
        d="M 76 58 L 98 62"
        fill="none"
        stroke="#5B3B8C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 124 62 L 144 58"
        fill="none"
        stroke="#5B3B8C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <ellipse cx="89" cy="84" rx="12" ry="13.5" fill="#FFFFFF" />
      <ellipse cx="89.5" cy="85" rx="7" ry="8" fill="#5B3B8C" />
      <ellipse cx="88" cy="83" rx="2" ry="2" fill="#FFFFFF" />
      <path
        d="M 119 82 A 14 10 0 0 0 144 82"
        fill="none"
        stroke="#5B3B8C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <ellipse cx="73" cy="104" rx="9" ry="5.5" fill="#FFA98F" opacity="0.85" />
      <ellipse cx="147" cy="104" rx="9" ry="5.5" fill="#FFA98F" opacity="0.85" />
      <path d="M 93 102 H 127 V 118 Q 110 128 93 118 Z" fill="#5B3B8C" />
      <path d="M 100 113 H 120 Q 110 122 100 113 Z" fill="#FF8E7A" />
    </g>
  )
}

function OperaFace() {
  return (
    <g>
      <path
        d="M 76 60 A 10 5 0 0 1 96 60"
        fill="none"
        stroke="#5B3B8C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 124 60 A 10 5 0 0 1 144 60"
        fill="none"
        stroke="#5B3B8C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <ellipse cx="88" cy="86" rx="12" ry="11.5" fill="#FFFFFF" />
      <ellipse cx="132" cy="86" rx="12" ry="11.5" fill="#FFFFFF" />
      <ellipse cx="88" cy="87" rx="6" ry="6.5" fill="#5B3B8C" />
      <ellipse cx="132" cy="87" rx="6" ry="6.5" fill="#5B3B8C" />
      <ellipse cx="87" cy="85" rx="2" ry="2" fill="#FFFFFF" />
      <ellipse cx="131" cy="85" rx="2" ry="2" fill="#FFFFFF" />
      {/* Glasses */}
      <rect
        x="71"
        y="71"
        width="33"
        height="31"
        rx="10"
        fill="rgba(255,255,255,0.22)"
        stroke="#2E2A45"
        strokeWidth="3"
      />
      <rect
        x="117"
        y="71"
        width="33"
        height="31"
        rx="10"
        fill="rgba(255,255,255,0.22)"
        stroke="#2E2A45"
        strokeWidth="3"
      />
      <rect x="104" y="82" width="13" height="3" rx="1.5" fill="#2E2A45" />
      <rect
        x="56"
        y="80"
        width="16"
        height="3"
        rx="1.5"
        fill="#2E2A45"
        transform="rotate(-6 64 81.5)"
      />
      <rect
        x="149"
        y="80"
        width="16"
        height="3"
        rx="1.5"
        fill="#2E2A45"
        transform="rotate(6 157 81.5)"
      />
      <ellipse cx="72" cy="108" rx="8" ry="5" fill="#FFA98F" opacity="0.7" />
      <ellipse cx="148" cy="108" rx="8" ry="5" fill="#FFA98F" opacity="0.7" />
      <circle cx="110" cy="118" r="9" fill="#8A5A6E" stroke="#5B3B8C" strokeWidth="4" />
    </g>
  )
}

function DrumKit({ ids }: { ids: { snareL: string; snareR: string; bass: string; cymbal: string } }) {
  return (
    <g>
      {/* Left snare */}
      <rect x="4" y="156" width="58" height="40" rx="3" fill={`url(#${ids.snareL})`} />
      <rect x="16" y="158" width="3" height="36" fill="rgba(255,255,255,0.45)" />
      <rect x="32" y="158" width="3" height="36" fill="rgba(255,255,255,0.45)" />
      <rect x="48" y="158" width="3" height="36" fill="rgba(255,255,255,0.45)" />
      <rect x="2" y="190" width="62" height="8" rx="4" fill="#D9CBBB" />
      <ellipse
        cx="33"
        cy="157"
        rx="33"
        ry="10"
        fill="#FBF4E8"
        stroke="#CFC0AE"
        strokeWidth="3"
      />

      {/* Right floor tom */}
      <rect x="158" y="156" width="58" height="40" rx="3" fill={`url(#${ids.snareR})`} />
      <rect x="170" y="158" width="3" height="36" fill="rgba(255,255,255,0.45)" />
      <rect x="186" y="158" width="3" height="36" fill="rgba(255,255,255,0.45)" />
      <rect x="202" y="158" width="3" height="36" fill="rgba(255,255,255,0.45)" />
      <rect x="156" y="190" width="62" height="8" rx="4" fill="#D9CBBB" />
      <ellipse
        cx="187"
        cy="157"
        rx="33"
        ry="10"
        fill="#FBF4E8"
        stroke="#CFC0AE"
        strokeWidth="3"
      />

      {/* Bass drum */}
      <circle cx="110" cy="183" r="45" fill="#CFC0AE" />
      <circle
        cx="110"
        cy="183"
        r="38"
        fill={`url(#${ids.bass})`}
        stroke="#E3D5C2"
        strokeWidth="2"
      />
      <circle cx="110" cy="183" r="9" fill="#E86B5A" opacity="0.85" />

      {/* Cymbals */}
      <rect x="30" y="116" width="3" height="82" rx="1.5" fill="#A99C86" />
      <rect x="186" y="116" width="3" height="82" rx="1.5" fill="#A99C86" />
      <ellipse
        cx="31"
        cy="111.5"
        rx="33"
        ry="7.5"
        fill={`url(#${ids.cymbal})`}
        transform="rotate(9 31 111.5)"
      />
      <ellipse cx="31" cy="110.5" rx="4" ry="2.5" fill="#D98F1E" transform="rotate(9 31 110.5)" />
      <ellipse
        cx="189"
        cy="111.5"
        rx="33"
        ry="7.5"
        fill={`url(#${ids.cymbal})`}
        transform="rotate(-9 189 111.5)"
      />
      <ellipse
        cx="189"
        cy="110.5"
        rx="4"
        ry="2.5"
        fill="#D98F1E"
        transform="rotate(-9 189 110.5)"
      />

      {/* Impact lines */}
      <rect
        data-anim
        className="melo-level-cymbal-line"
        x="194"
        y="88"
        width="12"
        height="3"
        rx="1.5"
        fill="#FF7A59"
        transform="rotate(-12 200 89.5)"
      />
      <rect
        data-anim
        className="melo-level-cymbal-line melo-level-cymbal-line-delay"
        x="198"
        y="96"
        width="9"
        height="3"
        rx="1.5"
        fill="#FF7A59"
        transform="rotate(-12 202.5 97.5)"
      />

      {/* Arms + sticks */}
      <g data-anim className="melo-arm-pump-l" style={{ transformOrigin: '73px 112px' }}>
        <rect x="66" y="112" width="14" height="44" rx="8" fill="#F2C29B" />
        <circle cx="73" cy="156" r="8.5" fill="#F2C29B" />
        <rect
          x="70"
          y="157"
          width="5"
          height="40"
          rx="2.5"
          fill="#C89B6A"
          transform="rotate(118 72.5 157)"
        />
      </g>
      <g data-anim className="melo-arm-pump-r" style={{ transformOrigin: '147px 112px' }}>
        <rect x="140" y="112" width="14" height="44" rx="8" fill="#F2C29B" />
        <circle cx="147" cy="156" r="8.5" fill="#F2C29B" />
        <rect
          x="148"
          y="155"
          width="5"
          height="40"
          rx="2.5"
          fill="#C89B6A"
          transform="rotate(-48 150.5 155)"
        />
      </g>
    </g>
  )
}

function OperaOutfit({ jacketId }: { jacketId: string }) {
  return (
    <g>
      <path
        d="M 42 132 H 178 Q 178 180 110 180 Q 42 180 42 132 Z"
        fill={`url(#${jacketId})`}
      />
      <path d="M 92 132 L 110 162 L 128 132 Z" fill="#FFFDF8" />
      <path d="M 78 132 L 100 132 L 92 166 Z" fill="#474168" />
      <path d="M 120 132 L 142 132 L 128 166 Z" fill="#474168" />
      <path d="M 96 145 L 110 158 L 96 158 Z" fill="#E0A800" />
      <path d="M 124 145 L 110 158 L 124 158 Z" fill="#E0A800" />
      <rect x="105" y="148" width="10" height="8" rx="3" fill="#FFD66B" />
      <rect
        x="53"
        y="146"
        width="15"
        height="7"
        rx="2"
        fill="#FFD66B"
        transform="rotate(-8 60.5 149.5)"
      />
    </g>
  )
}

function FaceForLevel({ level }: { level: MeloLevel }) {
  if (level >= 5) return <OperaFace />
  if (level >= 4) return <DrumsFace />
  if (level >= 3) return <WhistleFace withPuff />
  return <SmileFace />
}

export function MeloLevelAvatar({ level, className }: MeloLevelAvatarProps) {
  const reactId = useId().replace(/:/g, '')
  const ids = {
    snareL: `melo-snare-l-${reactId}`,
    snareR: `melo-snare-r-${reactId}`,
    bass: `melo-bass-${reactId}`,
    cymbal: `melo-cymbal-${reactId}`,
    jacket: `melo-jacket-${reactId}`,
  }

  const showHeadphones = level >= 2
  const showDrums = level === 4
  const showOpera = level >= 5
  const showCoralNote = level === 1 || level === 3
  const showGoldenNote = level >= 5

  return (
    <div className={cn('relative shrink-0', className)} aria-hidden>
      <svg
        viewBox="0 0 220 210"
        className="size-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={ids.snareL} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E8695A" />
            <stop offset="50%" stopColor="#F08B7C" />
            <stop offset="100%" stopColor="#D9564A" />
          </linearGradient>
          <linearGradient id={ids.snareR} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D9564A" />
            <stop offset="50%" stopColor="#F08B7C" />
            <stop offset="100%" stopColor="#E8695A" />
          </linearGradient>
          <radialGradient id={ids.bass} cx="42%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#FEF9EF" />
            <stop offset="100%" stopColor="#F3E7D3" />
          </radialGradient>
          <linearGradient id={ids.cymbal} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE7A6" />
            <stop offset="100%" stopColor="#EDA82A" />
          </linearGradient>
          <linearGradient id={ids.jacket} x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#3A3556" />
            <stop offset="100%" stopColor="#252139" />
          </linearGradient>
        </defs>

        {showCoralNote ? (
          <text
            data-anim
            className="melo-level-note-drift"
            x={level === 3 ? 150 : 158}
            y={level === 3 ? 112 : 78}
            fill="#FF7A59"
            fontSize="22"
            fontWeight="600"
            fontFamily="var(--font-heading)"
          >
            ♪
          </text>
        ) : null}

        {showGoldenNote ? (
          <text
            data-anim
            className="melo-level-sparkle"
            x="24"
            y="58"
            fill="#E0A800"
            fontSize="20"
            fontWeight="600"
            fontFamily="var(--font-heading)"
          >
            ♪
          </text>
        ) : null}

        {/* Legs */}
        <rect x="78" y="162" width="18" height="34" rx="9" fill="#F2C29B" />
        <path d="M 78 189 h 18 v 0 q 0 7 -9 7 h 0 q -9 0 -9 -7 z" fill="#E0A87C" />
        <rect x="124" y="162" width="18" height="34" rx="9" fill="#F2C29B" />
        <path d="M 124 189 h 18 v 0 q 0 7 -9 7 h 0 q -9 0 -9 -7 z" fill="#E0A87C" />

        <g data-anim className="melo-level-breathe">
          {/* Fluff + body */}
          <circle cx="72" cy="54" r="20" fill="#FFFDF8" />
          <circle cx="148" cy="54" r="20" fill="#FFFDF8" />
          <circle cx="110" cy="48" r="24" fill="#FFFDF8" />
          <circle cx="41" cy="103" r="17" fill="#FFFDF8" />
          <circle cx="179" cy="103" r="17" fill="#FFFDF8" />
          <ellipse cx="110" cy="106" rx="75" ry="70" fill="#FFFDF8" />

          {showHeadphones ? <Headphones showDot /> : null}

          <ellipse cx="110" cy="100" rx="48" ry="42" fill="#F2C29B" />

          <FaceForLevel level={level} />

          {showOpera ? <OperaOutfit jacketId={ids.jacket} /> : null}
        </g>

        {showDrums ? <DrumKit ids={ids} /> : null}
      </svg>
    </div>
  )
}
