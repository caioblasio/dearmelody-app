---
name: Melodic Reflection
colors:
  surface: '#fef7fe'
  surface-dim: '#dfd8df'
  surface-bright: '#fef7fe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f9f1f9'
  surface-container: '#f3ecf3'
  surface-container-high: '#ede6ed'
  surface-container-highest: '#e7e0e7'
  on-surface: '#1d1b20'
  on-surface-variant: '#48454f'
  inverse-surface: '#322f35'
  inverse-on-surface: '#f6eff6'
  outline: '#787580'
  outline-variant: '#c9c5d0'
  surface-tint: '#5e578f'
  primary: '#342d62'
  on-primary: '#ffffff'
  primary-container: '#4b447a'
  on-primary-container: '#bdb4f2'
  inverse-primary: '#c8bffe'
  secondary: '#695971'
  on-secondary: '#ffffff'
  secondary-container: '#f1dbf8'
  on-secondary-container: '#6f5f77'
  tertiary: '#353431'
  on-tertiary: '#ffffff'
  tertiary-container: '#4c4b48'
  on-tertiary-container: '#bebbb6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5deff'
  primary-fixed-dim: '#c8bffe'
  on-primary-fixed: '#1b1247'
  on-primary-fixed-variant: '#474075'
  secondary-fixed: '#f1dbf8'
  secondary-fixed-dim: '#d4c0dc'
  on-secondary-fixed: '#23172b'
  on-secondary-fixed-variant: '#504158'
  tertiary-fixed: '#e6e2dd'
  tertiary-fixed-dim: '#c9c6c1'
  on-tertiary-fixed: '#1c1c19'
  on-tertiary-fixed-variant: '#484743'
  background: '#fef7fe'
  on-background: '#1d1b20'
  surface-variant: '#e7e0e7'
typography:
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Noto Serif
    fontSize: 28px
    fontWeight: '500'
    lineHeight: '1.3'
  journal-entry:
    fontFamily: Noto Serif
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.8'
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-margin: 32px
  gutter: 24px
  section-gap: 48px
---

## Brand & Style

This design system centers on the intersection of auditory memory and personal reflection. The brand personality is intimate, expressive, and slightly whimsical, aiming to evoke the tactile feeling of a well-loved physical diary combined with the ethereal nature of music. 

The aesthetic is a blend of **Minimalism** and **Tactile Modernism**. It prioritizes heavy whitespace and a rhythmic layout to provide users with the mental "quiet" needed to listen and write. The emotional response should be one of safety and nostalgia—a private sanctuary where musical moments are preserved. Visual elements should feel "inked" or "pressed" onto the screen rather than digitally rendered.

## Colors

The color palette is inspired by twilight and parchment. The primary color is a deep, muted Indigo, used for grounding elements and core branding. The secondary color is a soft, dusty Lavender, used for expressive accents and musical highlights. 

The background relies on a warm Cream (Tertiary) rather than pure white, reducing eye strain and mimicking high-quality paper. Neutrals are tinted with warm undertones to maintain the "intimate" atmosphere. Use the primary indigo for high-emphasis text and the secondary lavender for interactive elements that require a softer touch.

## Typography

This design system utilizes a sophisticated typographic pairing to distinguish between the "Editor" (the user) and the "Interface" (the app). 

**Noto Serif** is reserved for headlines and journal entries. Its elegant, literary stems provide a sense of permanence and sophisticated storytelling. For journal entries, a generous line height (1.8) is mandated to allow the text to breathe, mimicking the spacing of a handwritten notebook.

**Be Vietnam Pro** is used for all UI-related tasks—labels, buttons, and navigation. Its friendly and contemporary letterforms ensure that the functional parts of the app remain approachable and clear, providing a soft contrast to the formal serif.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop and a generous **Fluid Grid** on mobile, emphasizing "Spaciousness" as a core feature. The rhythm is based on an 8px incremental scale, but margins are intentionally wider than standard apps (32px minimum) to create a frame-like effect for the content.

Content should never feel crowded. Section gaps are intentionally large (48px+) to allow users to transition mentally between different entries or musical moods. Components are centered or offset in a way that suggests a scrapbook layout rather than a rigid corporate dashboard.

## Elevation & Depth

Depth in this design system is achieved through **Ambient Shadows** and **Tonal Layering**. Avoid harsh, black shadows. Instead, use extra-diffused shadows tinted with the Primary Indigo color at very low opacities (5-8%). This creates a "floating paper" effect.

Surfaces use subtle tonal shifts; for instance, a card might be a slightly lighter shade of the cream background rather than a different color. Interaction is signaled by "lifting" an element—increasing the shadow spread—rather than changing the background color to a darker grey. This maintains the soft, reflective atmosphere of the system.

## Shapes

The shape language is defined by **Rounded** geometry. With a base roundedness of 0.5rem (8px), the UI avoids sharp, aggressive corners. This softness reinforces the "intimate" brand personality. 

Larger containers, such as journal entry cards or song player modules, should use `rounded-xl` (1.5rem/24px) to feel like smooth, organic objects. Decorative elements, like music genre tags, may occasionally use pill-shapes to add a touch of whimsy and playfulness to the otherwise structured layout.

## Components

**Buttons:** Primary buttons use a solid Indigo fill with Noto Serif text in white for a "stamped" look. Secondary buttons use a delicate 1px border in Lavender with no fill.

**Journal Cards:** These are the heart of the system. They feature a generous 24px padding, a soft ambient shadow, and a "deckled edge" visual treatment if possible. The title uses Noto Serif, and the date is a small Be Vietnam Pro label in all caps.

**Input Fields:** Ghost-style inputs with only a bottom border are preferred for journaling to mimic lined paper. On focus, the bottom border transitions from a light grey to the secondary lavender.

**Song Chips:** A custom component representing a track. It includes a small, circular album art thumbnail, the track name in Be Vietnam Pro, and a subtle "play" icon that appears on hover.

**Mood Sliders:** Whimsical, rounded sliders used to track emotional resonance. The slider thumb is larger than standard (24px) to feel tactile and "squishy."

**Lists:** Clean, borderless lists with 16px of vertical spacing between items, separated only by subtle whitespace or a very light cream divider.