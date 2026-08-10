import type { ComponentType, CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'

export type MeloCardKind = 'mood' | 'genre' | 'official'

export type MeloMoodKey =
  | 'happy'
  | 'reflexive'
  | 'sad'
  | 'nostalgic'
  | 'dreamy'
  | 'cozy'
  | 'productive'
  | 'outgoing'
  | 'introspective'
  | 'relaxed'
  | 'inspiring'

export type MeloGenreKey =
  | 'pop'
  | 'rock'
  | 'metal'
  | 'hip-hop'
  | 'r&b'
  | 'folk'
  | 'electronic'
  | 'latin'
  | 'asian'
  | 'classic'
  | 'jazz'

type MeloPoseProps = {
  className?: string
  style?: CSSProperties
}

export type MeloCardMeta = {
  kind: MeloCardKind
  key: MeloMoodKey | MeloGenreKey | 'official'
  gradient: string
  eyebrowColor: string
  Pose: ComponentType<MeloPoseProps>
}

export function MeloMoodHappy({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div data-anim style={{ position: "absolute", left: "14px", top: "12px", font: "600 20px Fredoka, sans-serif", color: "#FF7A59", animation: "melo-sparkle 1.6s ease-in-out infinite" }}>
        {"\u2726"}
      </div>
      <div data-anim style={{ position: "absolute", left: "186px", top: "6px", font: "600 16px Fredoka, sans-serif", color: "#FFB000", animation: "melo-sparkle 1.6s ease-in-out infinite 0.5s" }}>
        {"\u2726"}
      </div>
      <div data-anim style={{ position: "absolute", left: "198px", top: "82px", font: "600 14px Fredoka, sans-serif", color: "#5B3B8C", animation: "melo-sparkle 1.6s ease-in-out infinite 0.9s" }}>
        {"\u2726"}
      </div>
      <div style={{ position: "absolute", left: "78px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div data-anim style={{ position: "absolute", inset: "0", transformOrigin: "110px 190px", animation: "melo-happy-bounce 1.1s ease-in-out infinite" }}>
        <div style={{ position: "absolute", left: "16px", top: "52px", width: "14px", height: "60px", background: "#F2C29B", borderRadius: "8px", transform: "rotate(-30deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "183px", top: "47px", width: "14px", height: "60px", background: "#F2C29B", borderRadius: "8px", transform: "rotate(30deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "52px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "86px", top: "24px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "24px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "162px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "35px", top: "36px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
        </div>
        <div style={{ position: "absolute", left: "44px", top: "26px", width: "132px", height: "58px", border: "9px solid #FF7A59", borderBottom: "none", borderRadius: "66px 66px 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "163px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "37px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "62px", top: "58px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
        </div>
        <div style={{ position: "absolute", left: "76px", top: "62px", width: "20px", height: "10px", borderTop: "4px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "124px", top: "62px", width: "20px", height: "10px", borderTop: "4px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "74px", top: "74px", width: "26px", height: "28px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "120px", top: "74px", width: "26px", height: "28px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "81px", top: "82px", width: "13px", height: "15px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "127px", top: "82px", width: "13px", height: "15px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "84px", top: "84px", width: "4px", height: "4px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "130px", top: "84px", width: "4px", height: "4px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "63px", top: "104px", width: "15px", height: "9px", background: "#FFA98F", borderRadius: "50%", opacity: "0.7" }}>
        </div>
        <div style={{ position: "absolute", left: "141px", top: "104px", width: "15px", height: "9px", background: "#FFA98F", borderRadius: "50%", opacity: "0.7" }}>
        </div>
        <div style={{ position: "absolute", left: "99px", top: "108px", width: "21px", height: "17px", background: "#5B3B8C", borderRadius: "42% 42% 60% 60%" }}>
        </div>
        <div style={{ position: "absolute", left: "103px", top: "117px", width: "13px", height: "7px", background: "#FF8E7A", borderRadius: "0 0 50% 50%" }}>
        </div>
      </div>
    </div>
  )
}

export function MeloMoodReflexive({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div data-anim style={{ position: "absolute", left: "172px", top: "20px", font: "700 20px Fredoka, sans-serif", color: "#8B5BB0", animation: "melo-dots 1.4s steps(1) infinite" }}>
        {"\u00b7"}
      </div>
      <div data-anim style={{ position: "absolute", left: "184px", top: "14px", font: "700 20px Fredoka, sans-serif", color: "#8B5BB0", animation: "melo-dots 1.4s steps(1) infinite 0.25s" }}>
        {"\u00b7"}
      </div>
      <div data-anim style={{ position: "absolute", left: "196px", top: "8px", font: "700 20px Fredoka, sans-serif", color: "#8B5BB0", animation: "melo-dots 1.4s steps(1) infinite 0.5s" }}>
        {"\u00b7"}
      </div>
      <div style={{ position: "absolute", left: "78px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div data-anim style={{ position: "absolute", inset: "0", transformOrigin: "110px 190px", animation: "melo-jazz-sway 2.4s ease-in-out infinite" }}>
        <div style={{ position: "absolute", left: "52px", top: "96px", width: "14px", height: "44px", background: "#F2C29B", borderRadius: "8px", transform: "rotate(6deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "138px", top: "70px", width: "13px", height: "46px", background: "#F2C29B", borderRadius: "7px", transformOrigin: "top center", transform: "rotate(50deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "112px", top: "100px", width: "18px", height: "15px", background: "#F2C29B", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "52px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "86px", top: "24px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "24px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "162px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "35px", top: "36px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
        </div>
        <div style={{ position: "absolute", left: "44px", top: "26px", width: "132px", height: "58px", border: "9px solid #FF7A59", borderBottom: "none", borderRadius: "66px 66px 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "163px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "37px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "62px", top: "58px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
        </div>
        <div style={{ position: "absolute", left: "78px", top: "68px", width: "16px", height: "3px", background: "#5B3B8C", borderRadius: "2px", transform: "rotate(-6deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "126px", top: "68px", width: "16px", height: "3px", background: "#5B3B8C", borderRadius: "2px", transform: "rotate(6deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "76px", top: "80px", width: "24px", height: "20px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "120px", top: "80px", width: "24px", height: "20px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "78px", top: "82px", width: "12px", height: "12px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "121px", top: "82px", width: "12px", height: "12px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "66px", top: "100px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "140px", top: "100px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "102px", top: "112px", width: "16px", height: "4px", background: "#5B3B8C", borderRadius: "2px" }}>
        </div>
      </div>
    </div>
  )
}

export function MeloMoodSad({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div style={{ position: "absolute", left: "68px", top: "-6px", width: "36px", height: "26px", background: "#A8B4CC", borderRadius: "50%" }}>
      </div>
      <div style={{ position: "absolute", left: "92px", top: "-12px", width: "44px", height: "32px", background: "#B7C2D8", borderRadius: "50%" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "-4px", width: "34px", height: "24px", background: "#A8B4CC", borderRadius: "50%" }}>
      </div>
      <div data-anim style={{ position: "absolute", left: "82px", top: "22px", width: "3px", height: "10px", background: "#8FB4E0", borderRadius: "2px", animation: "melo-rain-drop 1.6s ease-in infinite" }}>
      </div>
      <div data-anim style={{ position: "absolute", left: "104px", top: "22px", width: "3px", height: "10px", background: "#8FB4E0", borderRadius: "2px", animation: "melo-rain-drop 1.6s ease-in infinite 0.5s" }}>
      </div>
      <div data-anim style={{ position: "absolute", left: "126px", top: "22px", width: "3px", height: "10px", background: "#8FB4E0", borderRadius: "2px", animation: "melo-rain-drop 1.6s ease-in infinite 1s" }}>
      </div>
      <div style={{ position: "absolute", left: "78px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div data-anim style={{ position: "absolute", inset: "0", transformOrigin: "110px 190px", animation: "melo-sad-bob 3.2s ease-in-out infinite" }}>
        <div style={{ position: "absolute", left: "48px", top: "92px", width: "14px", height: "48px", background: "#F2C29B", borderRadius: "8px", transform: "rotate(8deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "158px", top: "92px", width: "14px", height: "48px", background: "#F2C29B", borderRadius: "8px", transform: "rotate(-8deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "52px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "86px", top: "24px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "24px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "162px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "35px", top: "36px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
        </div>
        <div style={{ position: "absolute", left: "44px", top: "26px", width: "132px", height: "58px", border: "9px solid #FF7A59", borderBottom: "none", borderRadius: "66px 66px 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "163px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "37px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "62px", top: "58px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
        </div>
        <div style={{ position: "absolute", left: "80px", top: "70px", width: "18px", height: "4px", background: "#5B3B8C", borderRadius: "2px", transform: "rotate(18deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "122px", top: "70px", width: "18px", height: "4px", background: "#5B3B8C", borderRadius: "2px", transform: "rotate(-18deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "76px", top: "82px", width: "24px", height: "20px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "120px", top: "82px", width: "24px", height: "20px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "84px", top: "90px", width: "12px", height: "12px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "90px", width: "12px", height: "12px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div data-anim style={{ position: "absolute", left: "88px", top: "100px", width: "6px", height: "9px", background: "#8FB4E0", borderRadius: "50% 50% 50% 0", animation: "melo-rain-drop 2.2s ease-in infinite" }}>
        </div>
        <div style={{ position: "absolute", left: "98px", top: "118px", width: "24px", height: "12px", borderTop: "4px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box" }}>
        </div>
      </div>
    </div>
  )
}

export function MeloMoodNostalgic({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div style={{ position: "absolute", left: "78px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div data-anim style={{ position: "absolute", inset: "0", transformOrigin: "110px 190px", animation: "melo-jazz-sway 2.6s ease-in-out infinite" }}>
        <div style={{ position: "absolute", left: "52px", top: "96px", width: "14px", height: "44px", background: "#F2C29B", borderRadius: "8px", transform: "rotate(8deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "130px", top: "96px", width: "13px", height: "36px", background: "#F2C29B", borderRadius: "7px", transform: "rotate(-25deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "118px", top: "120px", width: "17px", height: "15px", background: "#F2C29B", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "118px", top: "98px", width: "34px", height: "40px", background: "#FFFDF8", boxShadow: "0 3px 6px rgba(0,0,0,0.15)", borderRadius: "2px" }}>
          <div style={{ position: "absolute", left: "3px", top: "3px", width: "28px", height: "22px", background: "linear-gradient(135deg,#E8B978,#C97B4A)" }}>
          </div>
        </div>
        <div style={{ position: "absolute", left: "52px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "86px", top: "24px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "24px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "162px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "35px", top: "36px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
        </div>
        <div style={{ position: "absolute", left: "44px", top: "26px", width: "132px", height: "58px", border: "9px solid #FF7A59", borderBottom: "none", borderRadius: "66px 66px 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "163px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "37px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "62px", top: "58px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
        </div>
        <div style={{ position: "absolute", left: "78px", top: "64px", width: "18px", height: "8px", borderTop: "4px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "124px", top: "64px", width: "18px", height: "8px", borderTop: "4px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "76px", top: "76px", width: "24px", height: "24px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "120px", top: "76px", width: "24px", height: "24px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "83px", top: "83px", width: "12px", height: "13px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "127px", top: "83px", width: "12px", height: "13px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "66px", top: "100px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "140px", top: "100px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "100px", top: "108px", width: "20px", height: "10px", borderBottom: "4px solid #5B3B8C", borderRadius: "0 0 14px 14px", boxSizing: "border-box" }}>
        </div>
      </div>
    </div>
  )
}

export function MeloMoodDreamy({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div data-anim style={{ position: "absolute", left: "168px", top: "16px", fontSize: "26px", animation: "melo-sparkle 2s ease-in-out infinite" }}>
        {"\ud83c\udf19"}
      </div>
      <div data-anim style={{ position: "absolute", left: "16px", top: "20px", font: "600 16px Fredoka, sans-serif", color: "#FFFFFF", animation: "melo-sparkle 1.8s ease-in-out infinite 0.4s" }}>
        {"\u2726"}
      </div>
      <div style={{ position: "absolute", left: "60px", top: "186px", width: "60px", height: "20px", background: "#FFFFFF", borderRadius: "50%", opacity: "0.5" }}>
      </div>
      <div style={{ position: "absolute", left: "110px", top: "190px", width: "50px", height: "18px", background: "#FFFFFF", borderRadius: "50%", opacity: "0.4" }}>
      </div>
      <div data-anim style={{ position: "absolute", inset: "0", transformOrigin: "110px 190px", animation: "melo-lift 3.2s ease-in-out infinite" }}>
        <div style={{ position: "absolute", left: "78px", top: "150px", width: "18px", height: "26px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "124px", top: "150px", width: "18px", height: "26px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "50px", top: "88px", width: "14px", height: "44px", background: "#F2C29B", borderRadius: "8px", transform: "rotate(10deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "156px", top: "88px", width: "14px", height: "44px", background: "#F2C29B", borderRadius: "8px", transform: "rotate(-10deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "52px", top: "22px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "22px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "86px", top: "12px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "24px", top: "74px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "162px", top: "74px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "35px", top: "24px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
        </div>
        <div style={{ position: "absolute", left: "44px", top: "14px", width: "132px", height: "58px", border: "9px solid #FF7A59", borderBottom: "none", borderRadius: "66px 66px 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "163px", top: "48px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "37px", top: "48px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "62px", top: "46px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
        </div>
        <div style={{ position: "absolute", left: "76px", top: "62px", width: "22px", height: "10px", borderBottom: "4px solid #5B3B8C", borderRadius: "0 0 50% 50%", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "122px", top: "62px", width: "22px", height: "10px", borderBottom: "4px solid #5B3B8C", borderRadius: "0 0 50% 50%", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "66px", top: "76px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "140px", top: "76px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "104px", top: "88px", width: "12px", height: "8px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
      </div>
    </div>
  )
}

export function MeloMoodCozy({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div style={{ position: "absolute", left: "78px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div data-anim style={{ position: "absolute", inset: "0", transformOrigin: "110px 190px", animation: "melo-lift 3.6s ease-in-out infinite" }}>
        <div style={{ position: "absolute", left: "52px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "86px", top: "24px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "24px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "162px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "35px", top: "36px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
          <div style={{ position: "absolute", zIndex: "999", left: "92px", top: "81px", fontSize: "30px" }}>
            {"\u2615"}
            <div data-anim style={{ position: "absolute", left: "22px", top: "-4px", width: "3px", height: "12px", background: "rgba(255,255,255,0.5)", borderRadius: "2px", animation: "melo-note-float 2s ease-in-out infinite 0.5s" }}>
            </div>
            <div data-anim style={{ position: "absolute", left: "14px", top: "-8px", width: "3px", height: "12px", background: "rgba(255,255,255,0.65)", borderRadius: "2px", animation: "melo-note-float 2s ease-in-out infinite" }}>
            </div>
          </div>
          <div style={{ position: "absolute", left: "41px", top: "31px", width: "13px", height: "34px", background: "#F2C29B", borderRadius: "7px", transformOrigin: "top center", transform: "rotate(-50deg)" }}>
          </div>
        </div>
        <div style={{ position: "absolute", left: "44px", top: "26px", width: "132px", height: "58px", border: "9px solid #FF7A59", borderBottom: "none", borderRadius: "66px 66px 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "163px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "37px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "62px", top: "58px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
        </div>
        <div style={{ position: "absolute", left: "80px", top: "74px", width: "16px", height: "6px", borderTop: "3px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box", opacity: "0.55" }}>
        </div>
        <div style={{ position: "absolute", left: "126px", top: "74px", width: "16px", height: "6px", borderTop: "3px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box", opacity: "0.55" }}>
        </div>
        <div style={{ position: "absolute", left: "76px", top: "86px", width: "22px", height: "10px", borderBottom: "4px solid #5B3B8C", borderRadius: "0 0 50% 50%", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "122px", top: "86px", width: "22px", height: "10px", borderBottom: "4px solid #5B3B8C", borderRadius: "0 0 50% 50%", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "64px", top: "98px", width: "18px", height: "11px", background: "#FFA98F", borderRadius: "50%", opacity: "0.75" }}>
        </div>
        <div style={{ position: "absolute", left: "138px", top: "98px", width: "18px", height: "11px", background: "#FFA98F", borderRadius: "50%", opacity: "0.75" }}>
        </div>
        <div style={{ position: "absolute", left: "99px", top: "108px", width: "22px", height: "11px", borderBottom: "4px solid #5B3B8C", borderRadius: "0 0 16px 16px", boxSizing: "border-box" }}>
        </div>
      </div>
    </div>
  )
}

export function MeloMoodProductive({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div style={{ position: "absolute", left: "44px", top: "158px", width: "44px", height: "16px", background: "#F2C29B", borderRadius: "10px", transform: "rotate(14deg)" }}>
      </div>
      <div style={{ position: "absolute", left: "132px", top: "158px", width: "44px", height: "16px", background: "#F2C29B", borderRadius: "10px", transform: "rotate(-14deg)" }}>
      </div>
      <div data-anim style={{ position: "absolute", inset: "0", transformOrigin: "110px 190px", animation: "melo-lift 2.6s ease-in-out infinite" }}>
        <div style={{ position: "absolute", left: "52px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "86px", top: "24px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "24px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "162px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "35px", top: "36px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
        </div>
        <div style={{ position: "absolute", left: "44px", top: "26px", width: "132px", height: "58px", border: "9px solid #FF7A59", borderBottom: "none", borderRadius: "66px 66px 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "163px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "37px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "62px", top: "58px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
        </div>
        <div style={{ position: "absolute", left: "78px", top: "66px", width: "16px", height: "3px", background: "#5B3B8C", borderRadius: "2px" }}>
        </div>
        <div style={{ position: "absolute", left: "126px", top: "66px", width: "16px", height: "3px", background: "#5B3B8C", borderRadius: "2px" }}>
        </div>
        <div style={{ position: "absolute", left: "74px", top: "74px", width: "26px", height: "28px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "120px", top: "74px", width: "26px", height: "28px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "82px", top: "86px", width: "13px", height: "14px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "86px", width: "13px", height: "14px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "66px", top: "100px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "140px", top: "100px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "100px", top: "108px", width: "20px", height: "10px", borderBottom: "4px solid #5B3B8C", borderRadius: "0 0 14px 14px", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "78px", top: "132px", width: "64px", height: "78px", background: "#FFFDF8", border: "2px solid #C9BFA8", borderRadius: "6px", boxShadow: "0 3px 6px rgba(0,0,0,0.1)" }}>
          <div style={{ position: "absolute", zIndex: "999", left: "56px", top: "40px", width: "5px", height: "28px", background: "#5B3B8C", borderRadius: "3px", transform: "rotate(34deg)" }}>
          </div>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "96px", top: "128px", width: "28px", height: "9px", background: "#B8AE94", borderRadius: "4px" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "87px", top: "146px", width: "9px", height: "9px", border: "2px solid #2F9E76", borderRadius: "2px", boxSizing: "border-box" }}>
        </div>
        <div data-anim style={{ position: "absolute", zIndex: "999", left: "88px", top: "145px", font: "700 10px Fredoka, sans-serif", color: "#2F9E76", animation: "melo-sparkle 1.6s ease-in-out infinite" }}>
          {"\u2713"}
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "100px", top: "150px", width: "34px", height: "3px", background: "#D8CDBB", borderRadius: "2px" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "87px", top: "162px", width: "9px", height: "9px", border: "2px solid #C9BFA8", borderRadius: "2px", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "100px", top: "164px", width: "34px", height: "3px", background: "#D8CDBB", borderRadius: "2px" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "87px", top: "178px", width: "9px", height: "9px", border: "2px solid #C9BFA8", borderRadius: "2px", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "100px", top: "180px", width: "26px", height: "3px", background: "#D8CDBB", borderRadius: "2px" }}>
        </div>
      </div>
    </div>
  )
}

export function MeloMoodOutgoing({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div data-anim style={{ position: "absolute", left: "20px", top: "14px", fontSize: "22px", animation: "melo-sparkle 1.5s ease-in-out infinite" }}>
        {"\ud83c\udf89"}
      </div>
      <div style={{ position: "absolute", left: "78px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div data-anim style={{ position: "absolute", inset: "0", transformOrigin: "110px 190px", animation: "melo-happy-bounce 1s ease-in-out infinite" }}>
        <div style={{ position: "absolute", left: "10px", top: "60px", width: "14px", height: "60px", background: "#F2C29B", borderRadius: "8px", transformOrigin: "top center", transform: "rotate(-60deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "196px", top: "60px", width: "14px", height: "60px", background: "#F2C29B", borderRadius: "8px", transformOrigin: "top center", transform: "rotate(60deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "52px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "86px", top: "24px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "24px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "162px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "35px", top: "36px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
        </div>
        <div style={{ position: "absolute", left: "44px", top: "26px", width: "132px", height: "58px", border: "9px solid #FF7A59", borderBottom: "none", borderRadius: "66px 66px 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "163px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "37px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "62px", top: "58px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
        </div>
        <div style={{ position: "absolute", left: "76px", top: "62px", width: "20px", height: "10px", borderTop: "4px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "124px", top: "62px", width: "20px", height: "10px", borderTop: "4px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "74px", top: "74px", width: "26px", height: "28px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "120px", top: "74px", width: "26px", height: "28px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "81px", top: "82px", width: "13px", height: "15px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "127px", top: "82px", width: "13px", height: "15px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "66px", top: "104px", width: "15px", height: "9px", background: "#FFA98F", borderRadius: "50%", opacity: "0.7" }}>
        </div>
        <div style={{ position: "absolute", left: "140px", top: "104px", width: "15px", height: "9px", background: "#FFA98F", borderRadius: "50%", opacity: "0.7" }}>
        </div>
        <div style={{ position: "absolute", left: "99px", top: "108px", width: "21px", height: "17px", background: "#5B3B8C", borderRadius: "42% 42% 60% 60%" }}>
        </div>
        <div style={{ position: "absolute", left: "103px", top: "117px", width: "13px", height: "7px", background: "#FF8E7A", borderRadius: "0 0 50% 50%" }}>
        </div>
      </div>
    </div>
  )
}

export function MeloMoodIntrospective({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div style={{ position: "absolute", left: "174px", top: "36px", font: "600 16px Fredoka, sans-serif", color: "#8B5BB0", opacity: "0.5" }}>
        {"\u266a"}
      </div>
      <div style={{ position: "absolute", left: "78px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div data-anim style={{ position: "absolute", inset: "0", transformOrigin: "110px 190px", animation: "melo-sad-bob 4s ease-in-out infinite" }}>
        <div style={{ position: "absolute", left: "70px", top: "100px", width: "13px", height: "40px", background: "#F2C29B", borderRadius: "7px", transform: "rotate(30deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "138px", top: "100px", width: "13px", height: "40px", background: "#F2C29B", borderRadius: "7px", transform: "rotate(-30deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "52px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "86px", top: "24px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "24px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "162px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "35px", top: "36px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
        </div>
        <div style={{ position: "absolute", left: "44px", top: "26px", width: "132px", height: "58px", border: "9px solid #FF7A59", borderBottom: "none", borderRadius: "66px 66px 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "163px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "37px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "62px", top: "58px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
        </div>
        <div style={{ position: "absolute", left: "76px", top: "84px", width: "22px", height: "10px", borderBottom: "4px solid #5B3B8C", borderRadius: "0 0 50% 50%", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "122px", top: "84px", width: "22px", height: "10px", borderBottom: "4px solid #5B3B8C", borderRadius: "0 0 50% 50%", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "66px", top: "100px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.5" }}>
        </div>
        <div style={{ position: "absolute", left: "140px", top: "100px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.5" }}>
        </div>
        <div style={{ position: "absolute", left: "102px", top: "112px", width: "16px", height: "4px", background: "#5B3B8C", borderRadius: "2px" }}>
        </div>
      </div>
    </div>
  )
}

export function MeloMoodRelaxed({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div style={{ position: "absolute", left: "180px", top: "16px", fontSize: "24px" }}>
        {"\ud83c\udf34"}
      </div>
      <div style={{ position: "absolute", left: "78px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box", transform: "rotate(6deg)" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box", transform: "rotate(-6deg)" }}>
      </div>
      <div data-anim style={{ position: "absolute", inset: "0", transformOrigin: "110px 190px", animation: "melo-jazz-sway 3.4s ease-in-out infinite" }}>
        <div style={{ position: "absolute", left: "56px", top: "50px", width: "13px", height: "34px", background: "#F2C29B", borderRadius: "7px", transformOrigin: "top center", transform: "rotate(70deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "152px", top: "50px", width: "13px", height: "34px", background: "#F2C29B", borderRadius: "7px", transformOrigin: "top center", transform: "rotate(-70deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "52px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "86px", top: "24px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "24px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "162px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "35px", top: "36px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
        </div>
        <div style={{ position: "absolute", left: "44px", top: "26px", width: "132px", height: "58px", border: "9px solid #FF7A59", borderBottom: "none", borderRadius: "66px 66px 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "163px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "37px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "62px", top: "58px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "70px", top: "78px", width: "80px", height: "22px", background: "#6B4A2E", borderRadius: "11px", opacity: "0.9" }}>
        </div>
        <div style={{ position: "absolute", left: "100px", top: "108px", width: "20px", height: "10px", borderBottom: "4px solid #5B3B8C", borderRadius: "0 0 14px 14px", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "66px", top: "100px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "140px", top: "100px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
      </div>
    </div>
  )
}

export function MeloMoodInspiring({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div data-anim style={{ position: "absolute", left: "92px", top: "-8px", fontSize: "30px", animation: "melo-sparkle 1.6s ease-in-out infinite" }}>
        {"\ud83d\udca1"}
      </div>
      <div style={{ position: "absolute", left: "78px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div data-anim style={{ position: "absolute", inset: "0", transformOrigin: "110px 190px", animation: "melo-happy-bounce 1.1s ease-in-out infinite", top: "2px" }}>
        <div style={{ position: "absolute", left: "22px", top: "43px", width: "14px", height: "60px", background: "#F2C29B", borderRadius: "8px", transform: "rotate(-15deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "179px", top: "44px", width: "14px", height: "60px", background: "#F2C29B", borderRadius: "8px", transform: "rotate(15deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "52px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "86px", top: "24px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "24px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "162px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "35px", top: "36px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
        </div>
        <div style={{ position: "absolute", left: "44px", top: "26px", width: "132px", height: "58px", border: "9px solid #FF7A59", borderBottom: "none", borderRadius: "66px 66px 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "163px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "37px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "62px", top: "58px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
        </div>
        <div style={{ position: "absolute", left: "76px", top: "62px", width: "20px", height: "10px", borderTop: "4px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "124px", top: "62px", width: "20px", height: "10px", borderTop: "4px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "74px", top: "74px", width: "26px", height: "28px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "120px", top: "74px", width: "26px", height: "28px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "81px", top: "82px", width: "13px", height: "15px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "127px", top: "82px", width: "13px", height: "15px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "66px", top: "104px", width: "15px", height: "9px", background: "#FFA98F", borderRadius: "50%", opacity: "0.7" }}>
        </div>
        <div style={{ position: "absolute", left: "140px", top: "104px", width: "15px", height: "9px", background: "#FFA98F", borderRadius: "50%", opacity: "0.7" }}>
        </div>
        <div style={{ position: "absolute", left: "99px", top: "108px", width: "21px", height: "17px", background: "#5B3B8C", borderRadius: "42% 42% 60% 60%" }}>
        </div>
        <div style={{ position: "absolute", left: "103px", top: "117px", width: "13px", height: "7px", background: "#FF8E7A", borderRadius: "0 0 50% 50%" }}>
        </div>
      </div>
    </div>
  )
}

export function MeloGenrePop({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div data-anim style={{ position: "absolute", left: "26px", top: "16px", font: "600 18px Fredoka, sans-serif", color: "#FFFFFF", animation: "melo-sparkle 1.5s ease-in-out infinite" }}>
        {"\u2726"}
      </div>
      <div data-anim style={{ position: "absolute", left: "182px", top: "10px", font: "600 16px Fredoka, sans-serif", color: "#FFFFFF", animation: "melo-sparkle 1.5s ease-in-out infinite 0.5s" }}>
        {"\u2726"}
      </div>
      <div style={{ position: "absolute", left: "78px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div data-anim style={{ position: "absolute", inset: "0", transformOrigin: "110px 190px", animation: "melo-happy-bounce 1s ease-in-out infinite" }}>
        <div style={{ position: "absolute", left: "52px", top: "100px", width: "13px", height: "36px", background: "#F2C29B", borderRadius: "7px", transform: "rotate(20deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "130px", top: "80px", width: "13px", height: "36px", background: "#F2C29B", borderRadius: "7px", transform: "rotate(-35deg)" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "55px", top: "113px", fontSize: "38px" }}>
          {"\ud83c\udfa4"}
        </div>
        <div style={{ position: "absolute", left: "52px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "86px", top: "24px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "24px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "162px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "35px", top: "36px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
        </div>
        <div style={{ position: "absolute", left: "44px", top: "26px", width: "132px", height: "58px", border: "9px solid #FF7A59", borderBottom: "none", borderRadius: "66px 66px 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "163px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "37px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "62px", top: "58px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
        </div>
        <div style={{ position: "absolute", left: "76px", top: "62px", width: "20px", height: "10px", borderTop: "4px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "124px", top: "62px", width: "20px", height: "10px", borderTop: "4px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "74px", top: "74px", width: "26px", height: "28px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "120px", top: "74px", width: "26px", height: "28px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "81px", top: "82px", width: "13px", height: "15px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "127px", top: "82px", width: "13px", height: "15px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "66px", top: "104px", width: "15px", height: "9px", background: "#FFA98F", borderRadius: "50%", opacity: "0.7" }}>
        </div>
        <div style={{ position: "absolute", left: "140px", top: "104px", width: "15px", height: "9px", background: "#FFA98F", borderRadius: "50%", opacity: "0.7" }}>
        </div>
        <div style={{ position: "absolute", left: "99px", top: "108px", width: "21px", height: "17px", background: "#5B3B8C", borderRadius: "42% 42% 60% 60%" }}>
        </div>
        <div style={{ position: "absolute", left: "103px", top: "117px", width: "13px", height: "7px", background: "#FF8E7A", borderRadius: "0 0 50% 50%" }}>
        </div>
      </div>
    </div>
  )
}

export function MeloGenreRock({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div style={{ position: "absolute", left: "-10px", top: "60px", width: "20px", height: "4px", background: "#FF7A59", borderRadius: "2px", transform: "rotate(20deg)", opacity: "0.8" }}>
      </div>
      <div style={{ position: "absolute", left: "210px", top: "56px", width: "20px", height: "4px", background: "#FF7A59", borderRadius: "2px", transform: "rotate(-20deg)", opacity: "0.8" }}>
      </div>
      <div style={{ position: "absolute", left: "78px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div data-anim style={{ position: "absolute", inset: "0", transformOrigin: "110px 190px", animation: "melo-rock-headbang 0.5s ease-in-out infinite" }}>
        <div style={{ position: "absolute", left: "50px", top: "96px", width: "14px", height: "52px", background: "#F2C29B", borderRadius: "8px", transform: "rotate(8deg)" }}>
          <div style={{ position: "absolute", left: "-3px", top: "44px", width: "20px", height: "18px", background: "#F2C29B", borderRadius: "50%" }}>
          </div>
        </div>
        <div style={{ position: "absolute", left: "52px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "86px", top: "24px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "24px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "162px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "35px", top: "36px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
        </div>
        <div style={{ position: "absolute", left: "44px", top: "26px", width: "132px", height: "58px", border: "9px solid #FF7A59", borderBottom: "none", borderRadius: "66px 66px 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "163px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "37px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "62px", top: "58px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
        </div>
        <div style={{ position: "absolute", left: "72px", top: "78px", width: "76px", height: "22px", background: "#1B1420", borderRadius: "11px" }}>
        </div>
        <div style={{ position: "absolute", left: "80px", top: "83px", width: "8px", height: "6px", background: "rgba(255,255,255,0.5)", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "132px", top: "83px", width: "8px", height: "6px", background: "rgba(255,255,255,0.5)", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "66px", top: "104px", width: "15px", height: "9px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "140px", top: "104px", width: "15px", height: "9px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "95px", top: "108px", width: "30px", height: "18px", background: "#5B3B8C", borderRadius: "12% 12% 90% 90%" }}>
        </div>
        <div style={{ position: "absolute", left: "101px", top: "118px", width: "18px", height: "8px", background: "#FF8E7A", borderRadius: "0 0 60% 60%" }}>
        </div>
        <div style={{ position: "absolute", left: "9px", top: "119px", fontSize: "50px", lineHeight: "1", transform: "translate(0px, -3px) rotate(-15deg) scaleY(0.96)", zIndex: "999", width: "44px", height: "45px" }}>
          {"\ud83e\udd18"}
        </div>
      </div>
    </div>
  )
}

export function MeloGenreMetal({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div data-anim style={{ position: "absolute", left: "14px", top: "70px", fontSize: "20px", animation: "melo-sparkle 1.2s ease-in-out infinite" }}>
        {"\ud83d\udd25"}
      </div>
      <div data-anim style={{ position: "absolute", left: "190px", top: "64px", fontSize: "18px", animation: "melo-sparkle 1.2s ease-in-out infinite 0.4s" }}>
        {"\ud83d\udd25"}
      </div>
      <div style={{ position: "absolute", left: "78px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div data-anim style={{ position: "absolute", inset: "0", transformOrigin: "110px 190px", animation: "melo-rock-headbang 0.46s ease-in-out infinite" }}>
        <div style={{ position: "absolute", left: "52px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "86px", top: "24px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "24px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "162px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "35px", top: "36px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
        </div>
        <div style={{ position: "absolute", left: "44px", top: "26px", width: "132px", height: "58px", border: "9px solid #2A2233", borderBottom: "none", borderRadius: "66px 66px 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "163px", top: "60px", width: "20px", height: "34px", background: "#2A2233", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "37px", top: "60px", width: "20px", height: "34px", background: "#2A2233", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "62px", top: "58px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
        </div>
        <div style={{ position: "absolute", left: "78px", top: "68px", width: "20px", height: "4px", background: "#5B3B8C", borderRadius: "2px", transform: "rotate(-18deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "122px", top: "68px", width: "20px", height: "4px", background: "#5B3B8C", borderRadius: "2px", transform: "rotate(18deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "72px", top: "78px", width: "76px", height: "22px", background: "#1B1420", borderRadius: "11px" }}>
        </div>
        <div style={{ position: "absolute", left: "80px", top: "83px", width: "8px", height: "6px", background: "rgba(255,255,255,0.5)", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "132px", top: "83px", width: "8px", height: "6px", background: "rgba(255,255,255,0.5)", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "95px", top: "108px", width: "30px", height: "18px", background: "#5B3B8C", borderRadius: "12% 12% 90% 90%" }}>
        </div>
        <div style={{ position: "absolute", left: "101px", top: "118px", width: "18px", height: "8px", background: "#FF8E7A", borderRadius: "0 0 60% 60%" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "6px", top: "96px", fontSize: "40px", transform: "rotate(-12deg)" }}>
          {"\ud83e\udd18"}
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "174px", top: "96px", fontSize: "40px", transform: "rotate(12deg) scaleX(-1)" }}>
          {"\ud83e\udd18"}
        </div>
      </div>
    </div>
  )
}

export function MeloGenreHipHop({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div style={{ position: "absolute", left: "78px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div data-anim style={{ position: "absolute", inset: "0", transformOrigin: "110px 190px", animation: "melo-jazz-sway 1.4s ease-in-out infinite" }}>
        <div style={{ position: "absolute", left: "150px", top: "100px", width: "13px", height: "36px", background: "#F2C29B", borderRadius: "7px", transform: "rotate(-20deg)" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "128px", top: "124px", fontSize: "38px" }}>
          {"\ud83d\udcfb"}
        </div>
        <div style={{ position: "absolute", left: "52px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "86px", top: "24px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "24px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "162px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "35px", top: "36px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
        </div>
        <div style={{ position: "absolute", left: "62px", top: "58px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "90px", top: "94px", width: "40px", height: "14px", border: "4px solid #F0C468", borderRadius: "50%", borderTop: "none" }}>
        </div>
        <div style={{ position: "absolute", left: "76px", top: "74px", width: "24px", height: "24px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "120px", top: "74px", width: "24px", height: "24px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "83px", top: "81px", width: "12px", height: "13px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "127px", top: "81px", width: "12px", height: "13px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "66px", top: "100px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "140px", top: "100px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "97px", top: "108px", width: "26px", height: "12px", background: "#5B3B8C", borderRadius: "0 0 60% 60%" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "66px", top: "14px", width: "88px", height: "38px", background: "#2A2233", borderRadius: "44px 44px 0 0" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "60px", top: "44px", width: "64px", height: "12px", background: "#3A2E45", borderRadius: "0 0 30px 6px", transform: "rotate(-4deg)" }}>
        </div>
      </div>
    </div>
  )
}

export function MeloGenreRnB({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div style={{ position: "absolute", left: "22px", top: "30px", fontSize: "18px" }}>
        {"\ud83c\udf39"}
      </div>
      <div style={{ position: "absolute", left: "78px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div data-anim style={{ position: "absolute", inset: "0", transformOrigin: "110px 190px", animation: "melo-jazz-sway 2.2s ease-in-out infinite" }}>
        <div style={{ position: "absolute", left: "130px", top: "90px", width: "13px", height: "36px", background: "#F2C29B", borderRadius: "7px", transform: "rotate(-30deg)" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "63px", top: "116px", fontSize: "38px" }}>
          {"\ud83c\udfa4"}
        </div>
        <div style={{ position: "absolute", left: "52px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "86px", top: "24px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "24px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "162px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "35px", top: "36px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
        </div>
        <div style={{ position: "absolute", left: "44px", top: "26px", width: "132px", height: "58px", border: "9px solid #FF7A59", borderBottom: "none", borderRadius: "66px 66px 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "163px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "37px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "62px", top: "58px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
        </div>
        <div style={{ position: "absolute", left: "76px", top: "86px", width: "22px", height: "10px", borderBottom: "4px solid #5B3B8C", borderRadius: "0 0 50% 50%", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "122px", top: "86px", width: "22px", height: "10px", borderBottom: "4px solid #5B3B8C", borderRadius: "0 0 50% 50%", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "66px", top: "100px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "140px", top: "100px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "104px", top: "112px", width: "14px", height: "12px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
      </div>
    </div>
  )
}

export function MeloGenreFolk({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div style={{ position: "absolute", left: "66px", top: "16px", fontSize: "18px" }}>
        {"\ud83c\udf3c"}
      </div>
      <div style={{ position: "absolute", left: "78px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div data-anim style={{ position: "absolute", inset: "0", transformOrigin: "110px 190px", animation: "melo-jazz-sway 2.8s ease-in-out infinite" }}>
        <div style={{ position: "absolute", left: "56px", top: "98px", width: "13px", height: "44px", background: "#F2C29B", borderRadius: "7px", transform: "rotate(20deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "148px", top: "98px", width: "13px", height: "44px", background: "#F2C29B", borderRadius: "7px", transform: "rotate(-20deg)" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "66px", top: "140px", width: "52px", height: "38px", background: "linear-gradient(135deg,#D9A76A,#B77F42)", borderRadius: "50% 50% 40% 40%", transform: "rotate(-14deg)" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "100px", top: "96px", width: "12px", height: "52px", background: "#8A5E3A", borderRadius: "4px", transform: "rotate(-14deg)" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "118px", top: "150px", width: "22px", height: "2px", background: "#4A2E12", transform: "rotate(-14deg)", opacity: "0.7" }}>
        </div>
        <div style={{ position: "absolute", left: "52px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "86px", top: "24px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "24px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "162px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "35px", top: "36px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
        </div>
        <div style={{ position: "absolute", left: "62px", top: "58px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
        </div>
        <div style={{ position: "absolute", left: "76px", top: "62px", width: "20px", height: "10px", borderTop: "4px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "124px", top: "62px", width: "20px", height: "10px", borderTop: "4px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "74px", top: "74px", width: "26px", height: "28px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "120px", top: "74px", width: "26px", height: "28px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "81px", top: "82px", width: "13px", height: "15px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "127px", top: "82px", width: "13px", height: "15px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "66px", top: "100px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "140px", top: "100px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "100px", top: "108px", width: "20px", height: "10px", borderBottom: "4px solid #5B3B8C", borderRadius: "0 0 14px 14px", boxSizing: "border-box" }}>
        </div>
      </div>
    </div>
  )
}

export function MeloGenreElectronic({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div data-anim style={{ position: "absolute", left: "24px", top: "20px", font: "600 18px Fredoka, sans-serif", color: "#5EE7DF", animation: "melo-note-float 1.6s ease-in-out infinite" }}>
        {"\u266a"}
      </div>
      <div data-anim style={{ position: "absolute", left: "178px", top: "26px", font: "600 16px Fredoka, sans-serif", color: "#FF6EC7", animation: "melo-note-float 1.6s ease-in-out infinite 0.5s" }}>
        {"\u266b"}
      </div>
      <div style={{ position: "absolute", left: "78px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div data-anim style={{ position: "absolute", inset: "0", transformOrigin: "110px 190px", animation: "melo-lift 1.3s ease-in-out infinite" }}>
        <div style={{ position: "absolute", left: "56px", top: "100px", width: "13px", height: "40px", background: "#F2C29B", borderRadius: "7px", transform: "rotate(18deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "150px", top: "100px", width: "13px", height: "40px", background: "#F2C29B", borderRadius: "7px", transform: "rotate(-18deg)" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "84px", top: "150px", width: "52px", height: "30px", background: "#2A2450", border: "2px solid #5EE7DF", borderRadius: "6px", boxShadow: "0 0 12px rgba(94,231,223,0.6)" }}>
        </div>
        <div data-anim style={{ position: "absolute", zIndex: "999", left: "92px", top: "158px", width: "6px", height: "6px", background: "#FF6EC7", borderRadius: "2px", animation: "melo-sparkle 1s ease-in-out infinite" }}>
        </div>
        <div data-anim style={{ position: "absolute", zIndex: "999", left: "104px", top: "158px", width: "6px", height: "6px", background: "#5EE7DF", borderRadius: "2px", animation: "melo-sparkle 1s ease-in-out infinite 0.3s" }}>
        </div>
        <div data-anim style={{ position: "absolute", zIndex: "999", left: "116px", top: "158px", width: "6px", height: "6px", background: "#FFC46B", borderRadius: "2px", animation: "melo-sparkle 1s ease-in-out infinite 0.6s" }}>
        </div>
        <div style={{ position: "absolute", left: "52px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "86px", top: "24px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "24px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "162px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "35px", top: "36px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
        </div>
        <div style={{ position: "absolute", left: "44px", top: "26px", width: "132px", height: "58px", border: "9px solid #7C6CFF", borderBottom: "none", borderRadius: "66px 66px 0 0", boxSizing: "border-box", boxShadow: "0 0 14px rgba(124,108,255,0.6)" }}>
        </div>
        <div style={{ position: "absolute", left: "163px", top: "60px", width: "20px", height: "34px", background: "#7C6CFF", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "37px", top: "60px", width: "20px", height: "34px", background: "#7C6CFF", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "62px", top: "58px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
        </div>
        <div style={{ position: "absolute", left: "76px", top: "62px", width: "20px", height: "10px", borderTop: "4px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "124px", top: "62px", width: "20px", height: "10px", borderTop: "4px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "74px", top: "74px", width: "26px", height: "28px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "120px", top: "74px", width: "26px", height: "28px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "81px", top: "82px", width: "13px", height: "15px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "127px", top: "82px", width: "13px", height: "15px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "66px", top: "100px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "140px", top: "100px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "100px", top: "108px", width: "20px", height: "10px", borderBottom: "4px solid #5B3B8C", borderRadius: "0 0 14px 14px", boxSizing: "border-box" }}>
        </div>
      </div>
    </div>
  )
}

export function MeloGenreLatin({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div style={{ position: "absolute", left: "78px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box", transform: "rotate(-10deg)" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box", transform: "rotate(10deg)" }}>
      </div>
      <div data-anim style={{ position: "absolute", inset: "0", transformOrigin: "110px 190px", animation: "melo-jazz-sway 0.7s ease-in-out infinite" }}>
        <div data-anim style={{ position: "absolute", left: "40px", top: "88px", width: "13px", height: "46px", background: "#F2C29B", borderRadius: "7px", transformOrigin: "top center", transform: "rotate(-14deg)", animation: "melo-tapL 0.5s ease-in-out infinite" }}>
        </div>
        <div data-anim style={{ position: "absolute", left: "168px", top: "88px", width: "13px", height: "46px", background: "#F2C29B", borderRadius: "7px", transformOrigin: "top center", transform: "rotate(14deg)", animation: "melo-tapR 0.5s ease-in-out infinite 0.15s" }}>
        </div>
        <div style={{ position: "absolute", left: "52px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "86px", top: "24px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "24px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "162px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "35px", top: "36px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
        </div>
        <div style={{ position: "absolute", left: "44px", top: "26px", width: "132px", height: "58px", border: "9px solid #FF7A59", borderBottom: "none", borderRadius: "66px 66px 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "163px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "37px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "62px", top: "58px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
        </div>
        <div style={{ position: "absolute", left: "76px", top: "62px", width: "20px", height: "10px", borderTop: "4px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "124px", top: "62px", width: "20px", height: "10px", borderTop: "4px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "74px", top: "74px", width: "26px", height: "28px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "120px", top: "74px", width: "26px", height: "28px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "81px", top: "82px", width: "13px", height: "15px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "127px", top: "82px", width: "13px", height: "15px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "66px", top: "104px", width: "15px", height: "9px", background: "#FFA98F", borderRadius: "50%", opacity: "0.7" }}>
        </div>
        <div style={{ position: "absolute", left: "140px", top: "104px", width: "15px", height: "9px", background: "#FFA98F", borderRadius: "50%", opacity: "0.7" }}>
        </div>
        <div style={{ position: "absolute", left: "99px", top: "108px", width: "21px", height: "17px", background: "#5B3B8C", borderRadius: "42% 42% 60% 60%" }}>
        </div>
        <div style={{ position: "absolute", left: "103px", top: "117px", width: "13px", height: "7px", background: "#FF8E7A", borderRadius: "0 0 50% 50%" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "14px", top: "124px", width: "38px", height: "64px", background: "linear-gradient(90deg,#C9955C,#E8C48A 45%,#B87F3E)", borderRadius: "9px 9px 15px 15px" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "12px", top: "118px", width: "42px", height: "14px", background: "#2A2233", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "16px", top: "122px", width: "34px", height: "8px", background: "#EAD6AC", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "14px", top: "172px", width: "38px", height: "8px", background: "#2A2233", borderRadius: "4px" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "30px", top: "180px", width: "4px", height: "16px", background: "#2A2233", transform: "rotate(10deg)" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "168px", top: "130px", width: "42px", height: "56px", background: "linear-gradient(90deg,#D9A66B,#EFCB94 45%,#C48F4E)", borderRadius: "9px 9px 15px 15px" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "166px", top: "124px", width: "46px", height: "14px", background: "#1F1A24", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "171px", top: "128px", width: "36px", height: "8px", background: "#EFDBB2", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "168px", top: "170px", width: "42px", height: "8px", background: "#1F1A24", borderRadius: "4px" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "186px", top: "178px", width: "4px", height: "16px", background: "#1F1A24", transform: "rotate(-8deg)" }}>
        </div>
      </div>
    </div>
  )
}

export function MeloGenreAsian({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div data-anim style={{ position: "absolute", left: "24px", top: "18px", fontSize: "18px", animation: "melo-note-float 2s ease-in-out infinite" }}>
        {"\ud83c\udf38"}
      </div>
      <div data-anim style={{ position: "absolute", left: "184px", top: "30px", fontSize: "16px", animation: "melo-note-float 2s ease-in-out infinite 0.6s" }}>
        {"\ud83c\udf38"}
      </div>
      <div style={{ position: "absolute", left: "78px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div data-anim style={{ position: "absolute", inset: "0", transformOrigin: "110px 190px", animation: "melo-jazz-sway 2.6s ease-in-out infinite" }}>
        <div style={{ position: "absolute", left: "132px", top: "88px", width: "13px", height: "36px", background: "#F2C29B", borderRadius: "7px", transform: "rotate(-20deg)" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "165px", top: "114px", width: "36px", height: "50px", background: "linear-gradient(160deg,#FADCE3,#F2A8BC)", borderRadius: "0 60% 0 60%", transform: "rotate(-20deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "52px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "86px", top: "24px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "24px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "162px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "35px", top: "36px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
        </div>
        <div style={{ position: "absolute", left: "44px", top: "26px", width: "132px", height: "58px", border: "9px solid #FF7A59", borderBottom: "none", borderRadius: "66px 66px 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "163px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "37px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "62px", top: "58px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
        </div>
        <div style={{ position: "absolute", left: "92px", top: "96px", width: "36px", height: "28px", background: "#F2C29B", clipPath: "polygon(50% 100%, 0 0, 100% 0)" }}>
        </div>
        <div style={{ position: "absolute", left: "66px", top: "149px", width: "88px", height: "14px", background: "#C4536B", borderRadius: "4px" }}>
        </div>
        <div style={{ position: "absolute", left: "100px", top: "139px", width: "20px", height: "20px", background: "#C4536B", borderRadius: "4px", transform: "rotate(45deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "76px", top: "86px", width: "22px", height: "10px", borderBottom: "4px solid #5B3B8C", borderRadius: "0 0 50% 50%", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "122px", top: "86px", width: "22px", height: "10px", borderBottom: "4px solid #5B3B8C", borderRadius: "0 0 50% 50%", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "100px", top: "108px", width: "20px", height: "10px", borderBottom: "4px solid #5B3B8C", borderRadius: "0 0 14px 14px", boxSizing: "border-box" }}>
        </div>
      </div>
    </div>
  )
}

export function MeloGenreClassic({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div style={{ position: "absolute", left: "172px", top: "22px", font: "600 20px Fredoka, sans-serif", color: "#F0C468" }}>
        {"\u266a"}
      </div>
      <div style={{ position: "absolute", left: "78px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div data-anim style={{ position: "absolute", inset: "0", transformOrigin: "110px 190px", animation: "melo-jazz-sway 3s ease-in-out infinite" }}>
        <div style={{ position: "absolute", left: "140px", top: "64px", width: "13px", height: "60px", background: "#F2C29B", borderRadius: "7px", transformOrigin: "top center", transform: "rotate(-30deg)" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "11px", top: "66px", width: "6px", height: "66px", background: "linear-gradient(#E8CDA0,#C9955C)", borderRadius: "3px", transformOrigin: "top center", transform: "rotate(-30deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "52px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "86px", top: "24px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "24px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "162px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "35px", top: "36px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
        </div>
        <div style={{ position: "absolute", left: "44px", top: "26px", width: "132px", height: "58px", border: "9px solid #C4881F", borderBottom: "none", borderRadius: "66px 66px 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "163px", top: "60px", width: "20px", height: "34px", background: "#C4881F", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "37px", top: "60px", width: "20px", height: "34px", background: "#C4881F", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "62px", top: "58px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
        </div>
        <div style={{ position: "absolute", left: "76px", top: "62px", width: "20px", height: "10px", borderTop: "4px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "124px", top: "62px", width: "20px", height: "10px", borderTop: "4px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "74px", top: "74px", width: "26px", height: "28px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "120px", top: "74px", width: "26px", height: "28px", background: "#FFFFFF", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "81px", top: "82px", width: "13px", height: "15px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "127px", top: "82px", width: "13px", height: "15px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "66px", top: "100px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "140px", top: "100px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "100px", top: "108px", width: "20px", height: "10px", borderBottom: "4px solid #5B3B8C", borderRadius: "0 0 14px 14px", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "96px", top: "144px", width: "12px", height: "10px", background: "#C4881F", clipPath: "polygon(0 0,100% 50%,0 100%)" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "112px", top: "144px", width: "12px", height: "10px", background: "#C4881F", clipPath: "polygon(100% 0,0 50%,100% 100%)" }}>
        </div>
      </div>
    </div>
  )
}

export function MeloGenreJazz({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div data-anim style={{ position: "absolute", left: "158px", top: "26px", font: "600 20px Fredoka, sans-serif", color: "#F0C468", animation: "melo-note-float 1.8s ease-in-out infinite" }}>
        {"\u266a"}
      </div>
      <div data-anim style={{ position: "absolute", left: "20px", top: "44px", font: "600 16px Fredoka, sans-serif", color: "#F0C468", animation: "melo-note-float 1.8s ease-in-out infinite 0.6s" }}>
        {"\u266b"}
      </div>
      <div style={{ position: "absolute", left: "78px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div data-anim style={{ position: "absolute", inset: "0", transformOrigin: "110px 190px", animation: "melo-jazz-sway 1.8s ease-in-out infinite" }}>
        <div style={{ position: "absolute", left: "56px", top: "96px", width: "14px", height: "50px", background: "#F2C29B", borderRadius: "8px", transform: "rotate(18deg)" }}>
        </div>
        <div style={{ position: "absolute", left: "150px", top: "96px", width: "14px", height: "50px", background: "#F2C29B", borderRadius: "8px", transform: "rotate(-18deg)" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "96px", top: "100px", width: "16px", height: "70px", background: "linear-gradient(90deg,#D9A441,#F0C468 50%,#C4881F)", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "92px", top: "160px", width: "34px", height: "34px", background: "linear-gradient(135deg,#F0C468,#C4881F)", borderRadius: "0 0 50% 50%", transform: "rotate(6deg)" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "100px", top: "112px", width: "6px", height: "6px", background: "#8A5E13", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "100px", top: "124px", width: "6px", height: "6px", background: "#8A5E13", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", zIndex: "999", left: "100px", top: "136px", width: "6px", height: "6px", background: "#8A5E13", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "52px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "128px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "86px", top: "24px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "24px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "162px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
        </div>
        <div style={{ position: "absolute", left: "35px", top: "36px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
        </div>
        <div style={{ position: "absolute", left: "44px", top: "26px", width: "132px", height: "58px", border: "9px solid #FF7A59", borderBottom: "none", borderRadius: "66px 66px 0 0", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "163px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "37px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
        </div>
        <div style={{ position: "absolute", left: "62px", top: "58px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
        </div>
        <div style={{ position: "absolute", left: "76px", top: "86px", width: "22px", height: "10px", borderBottom: "4px solid #5B3B8C", borderRadius: "0 0 50% 50%", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "122px", top: "86px", width: "22px", height: "10px", borderBottom: "4px solid #5B3B8C", borderRadius: "0 0 50% 50%", boxSizing: "border-box" }}>
        </div>
        <div style={{ position: "absolute", left: "66px", top: "100px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "140px", top: "100px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
        </div>
        <div style={{ position: "absolute", left: "104px", top: "112px", width: "14px", height: "12px", background: "#5B3B8C", borderRadius: "50%" }}>
        </div>
      </div>
    </div>
  )
}

export function MeloOfficialPose({ className, style }: MeloPoseProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: 220, height: 210, ...style }}
      data-anim
    >
      <div style={{ position: "absolute", left: "78px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "162px", width: "18px", height: "34px", background: "#F2C29B", borderRadius: "9px 9px 10px 10px", borderBottom: "7px solid #E0A87C", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "52px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
      </div>
      <div style={{ position: "absolute", left: "128px", top: "34px", width: "40px", height: "40px", background: "#FFFDF8", borderRadius: "50%" }}>
      </div>
      <div style={{ position: "absolute", left: "86px", top: "24px", width: "48px", height: "48px", background: "#FFFDF8", borderRadius: "50%" }}>
      </div>
      <div style={{ position: "absolute", left: "24px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
      </div>
      <div style={{ position: "absolute", left: "162px", top: "86px", width: "34px", height: "34px", background: "#FFFDF8", borderRadius: "50%" }}>
      </div>
      <div style={{ position: "absolute", left: "35px", top: "36px", width: "150px", height: "140px", background: "#FFFDF8", borderRadius: "46% 46% 44% 44%" }}>
      </div>
      <div style={{ position: "absolute", left: "44px", top: "26px", width: "132px", height: "58px", border: "9px solid #FF7A59", borderBottom: "none", borderRadius: "66px 66px 0 0", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "163px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
      </div>
      <div style={{ position: "absolute", left: "37px", top: "60px", width: "20px", height: "34px", background: "#FF7A59", borderRadius: "8px" }}>
      </div>
      <div style={{ position: "absolute", left: "62px", top: "58px", width: "96px", height: "84px", background: "#F2C29B", borderRadius: "48%" }}>
      </div>
      <div style={{ position: "absolute", left: "76px", top: "62px", width: "20px", height: "10px", borderTop: "4px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "124px", top: "62px", width: "20px", height: "10px", borderTop: "4px solid #5B3B8C", borderRadius: "50% 50% 0 0", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "74px", top: "74px", width: "26px", height: "28px", background: "#FFFFFF", borderRadius: "50%" }}>
      </div>
      <div style={{ position: "absolute", left: "120px", top: "74px", width: "26px", height: "28px", background: "#FFFFFF", borderRadius: "50%" }}>
      </div>
      <div style={{ position: "absolute", left: "81px", top: "82px", width: "13px", height: "15px", background: "#5B3B8C", borderRadius: "50%" }}>
      </div>
      <div style={{ position: "absolute", left: "127px", top: "82px", width: "13px", height: "15px", background: "#5B3B8C", borderRadius: "50%" }}>
      </div>
      <div style={{ position: "absolute", left: "84px", top: "84px", width: "4px", height: "4px", background: "#FFFFFF", borderRadius: "50%" }}>
      </div>
      <div style={{ position: "absolute", left: "130px", top: "84px", width: "4px", height: "4px", background: "#FFFFFF", borderRadius: "50%" }}>
      </div>
      <div style={{ position: "absolute", left: "100px", top: "108px", width: "20px", height: "10px", borderBottom: "4px solid #5B3B8C", borderRadius: "0 0 14px 14px", boxSizing: "border-box" }}>
      </div>
      <div style={{ position: "absolute", left: "66px", top: "102px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
      </div>
      <div style={{ position: "absolute", left: "140px", top: "102px", width: "14px", height: "8px", background: "#FFA98F", borderRadius: "50%", opacity: "0.6" }}>
      </div>
      <div style={{ position: "absolute", left: "64px", top: "97px", width: "3px", height: "3px", background: "#E8A87E", borderRadius: "50%" }}>
      </div>
      <div style={{ position: "absolute", left: "71px", top: "94px", width: "3px", height: "3px", background: "#E8A87E", borderRadius: "50%" }}>
      </div>
      <div style={{ position: "absolute", left: "153px", top: "97px", width: "3px", height: "3px", background: "#E8A87E", borderRadius: "50%" }}>
      </div>
      <div style={{ position: "absolute", left: "146px", top: "94px", width: "3px", height: "3px", background: "#E8A87E", borderRadius: "50%" }}>
      </div>
    </div>
  )
}

export const MELO_MOOD_CARDS: Record<MeloMoodKey, MeloCardMeta> = {
  'happy': {
    kind: 'mood',
    key: 'happy',
    gradient: "linear-gradient(170deg,#FFF3D6,#FFD9B8)",
    eyebrowColor: "#C97B4A",
    Pose: MeloMoodHappy,
  },
  'reflexive': {
    kind: 'mood',
    key: 'reflexive',
    gradient: "linear-gradient(170deg,#EDE6F3,#DCCBEA)",
    eyebrowColor: "#7A5A9A",
    Pose: MeloMoodReflexive,
  },
  'sad': {
    kind: 'mood',
    key: 'sad',
    gradient: "linear-gradient(170deg,#E4E9F5,#CBD6EC)",
    eyebrowColor: "#5B6B8C",
    Pose: MeloMoodSad,
  },
  'nostalgic': {
    kind: 'mood',
    key: 'nostalgic',
    gradient: "linear-gradient(170deg,#F4E8D6,#E8CDA0)",
    eyebrowColor: "#8B6A3A",
    Pose: MeloMoodNostalgic,
  },
  'dreamy': {
    kind: 'mood',
    key: 'dreamy',
    gradient: "linear-gradient(170deg,#DCD6F0,#C3B8E8)",
    eyebrowColor: "#6B5B9A",
    Pose: MeloMoodDreamy,
  },
  'cozy': {
    kind: 'mood',
    key: 'cozy',
    gradient: "linear-gradient(170deg,#F5E3D0,#E8C7A0)",
    eyebrowColor: "#A07040",
    Pose: MeloMoodCozy,
  },
  'productive': {
    kind: 'mood',
    key: 'productive',
    gradient: "linear-gradient(170deg,#D8F0E4,#B8E4D0)",
    eyebrowColor: "#3A7A5A",
    Pose: MeloMoodProductive,
  },
  'outgoing': {
    kind: 'mood',
    key: 'outgoing',
    gradient: "linear-gradient(170deg,#FFE0C2,#FF9A6B)",
    eyebrowColor: "#C95A30",
    Pose: MeloMoodOutgoing,
  },
  'introspective': {
    kind: 'mood',
    key: 'introspective',
    gradient: "linear-gradient(170deg,#E6DCE8,#D0BFD6)",
    eyebrowColor: "#6A5070",
    Pose: MeloMoodIntrospective,
  },
  'relaxed': {
    kind: 'mood',
    key: 'relaxed',
    gradient: "linear-gradient(170deg,#DCEEE8,#C2E4D6)",
    eyebrowColor: "#3A7A6A",
    Pose: MeloMoodRelaxed,
  },
  'inspiring': {
    kind: 'mood',
    key: 'inspiring',
    gradient: "linear-gradient(170deg,#FFF0C4,#FFD27A)",
    eyebrowColor: "#B07A20",
    Pose: MeloMoodInspiring,
  },
}

export const MELO_GENRE_CARDS: Record<MeloGenreKey, MeloCardMeta> = {
  'pop': {
    kind: 'genre',
    key: 'pop',
    gradient: "linear-gradient(170deg,#FFD6EC,#FF8FCB)",
    eyebrowColor: "#C04080",
    Pose: MeloGenrePop,
  },
  'rock': {
    kind: 'genre',
    key: 'rock',
    gradient: "linear-gradient(160deg,#3A2530,#20141C)",
    eyebrowColor: "#E06060",
    Pose: MeloGenreRock,
  },
  'metal': {
    kind: 'genre',
    key: 'metal',
    gradient: "linear-gradient(160deg,#241417,#120A0C)",
    eyebrowColor: "#E08040",
    Pose: MeloGenreMetal,
  },
  'hip-hop': {
    kind: 'genre',
    key: 'hip-hop',
    gradient: "linear-gradient(170deg,#FFE9B0,#F0B84D)",
    eyebrowColor: "#A07020",
    Pose: MeloGenreHipHop,
  },
  'r&b': {
    kind: 'genre',
    key: 'r&b',
    gradient: "linear-gradient(170deg,#3D2A52,#5B3B7A)",
    eyebrowColor: "#C090D0",
    Pose: MeloGenreRnB,
  },
  'folk': {
    kind: 'genre',
    key: 'folk',
    gradient: "linear-gradient(170deg,#E8DCC0,#C9B98C)",
    eyebrowColor: "#7A6A40",
    Pose: MeloGenreFolk,
  },
  'electronic': {
    kind: 'genre',
    key: 'electronic',
    gradient: "linear-gradient(160deg,#1B1740,#241E52)",
    eyebrowColor: "#90A0FF",
    Pose: MeloGenreElectronic,
  },
  'latin': {
    kind: 'genre',
    key: 'latin',
    gradient: "linear-gradient(170deg,#FFD9A0,#FF8A5C)",
    eyebrowColor: "#C05030",
    Pose: MeloGenreLatin,
  },
  'asian': {
    kind: 'genre',
    key: 'asian',
    gradient: "linear-gradient(170deg,#FDE6EA,#F7B8C4)",
    eyebrowColor: "#C05070",
    Pose: MeloGenreAsian,
  },
  'classic': {
    kind: 'genre',
    key: 'classic',
    gradient: "linear-gradient(170deg,#2A2440,#3D3560)",
    eyebrowColor: "#D0B060",
    Pose: MeloGenreClassic,
  },
  'jazz': {
    kind: 'genre',
    key: 'jazz',
    gradient: "linear-gradient(170deg,#332757,#251C42)",
    eyebrowColor: "#C0A0E0",
    Pose: MeloGenreJazz,
  },
}

export const MELO_OFFICIAL_CARD: MeloCardMeta = {
  kind: 'official',
  key: 'official',
  gradient: "linear-gradient(170deg,#FFE9CF,#FFD9B8)",
  eyebrowColor: "#8A7E96",
  Pose: MeloOfficialPose,
}

export function getMeloCardMeta(
  kind: 'mood' | 'genre' | 'official',
  key?: string
): MeloCardMeta {
  if (kind === 'official' || !key) return MELO_OFFICIAL_CARD
  if (kind === 'mood' && key in MELO_MOOD_CARDS) {
    return MELO_MOOD_CARDS[key as MeloMoodKey]
  }
  if (kind === 'genre' && key in MELO_GENRE_CARDS) {
    return MELO_GENRE_CARDS[key as MeloGenreKey]
  }
  return MELO_OFFICIAL_CARD
}

type MeloMoodGenreCardProps = {
  meta: MeloCardMeta
  className?: string
  sayingOverride?: string
}

function meloCardCopyKey(meta: MeloCardMeta, field: 'title' | 'saying'): string {
  if (meta.kind === 'official') return `melo.official.${field}`
  if (meta.kind === 'mood') return `melo.moods.${meta.key}.${field}`
  return `melo.genres.${meta.key}.${field}`
}

export function MeloMoodGenreCard({ meta, className, sayingOverride }: MeloMoodGenreCardProps) {
  const { t } = useTranslation()
  const { Pose, gradient, eyebrowColor, kind } = meta
  const title = t(meloCardCopyKey(meta, 'title'))
  const saying = sayingOverride ?? t(meloCardCopyKey(meta, 'saying'))

  return (
    <div
      className={[
        'flex h-full w-full flex-col items-center justify-center gap-4 rounded-[28px] border border-warm-border bg-card-bg p-7 shadow-sm',
        className ?? '',
      ].join(' ')}
    >
      <div
        className="relative flex aspect-[290/274] w-full max-w-[200px] items-center justify-center overflow-hidden rounded-[24px]"
        style={{ background: gradient }}
      >
        <div className="origin-center scale-[0.55] sm:scale-[0.62] md:scale-[0.72]">
          <Pose />
        </div>
      </div>
      <div className="w-full text-center">
        {kind !== 'official' && (
          <p
            className="font-heading text-[0.6875rem] font-semibold uppercase tracking-[0.08em]"
            style={{ color: eyebrowColor }}
          >
            {kind === 'mood' ? t('melo.kind.mood') : t('melo.kind.genre')}
          </p>
        )}
        <p className="mt-0.5 font-heading text-lg font-semibold text-ink">{title}</p>
        <p className="mt-1 font-sans text-sm text-muted">{saying}</p>
      </div>
    </div>
  )
}
