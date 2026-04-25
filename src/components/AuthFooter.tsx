export function AuthFooter() {
  return (
    <footer className="w-full border-t border-outline-variant bg-surface-container px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold italic text-primary">Melodiary</span>
          <span className="text-sm text-on-surface-variant">© 2026. Curated for your memories.</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          <a className="italic text-on-surface-variant transition-colors hover:text-primary" href="#">
            Privacy Policy
          </a>
          <a className="italic text-on-surface-variant transition-colors hover:text-primary" href="#">
            Terms of Use
          </a>
          <a className="italic text-on-surface-variant transition-colors hover:text-primary" href="#">
            Support
          </a>
        </nav>
      </div>
    </footer>
  )
}
