import { Button } from "./ui/button"

export function AuthHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <span className="font-serif text-xl font-bold italic text-primary">Melodiary</span>
          <nav className="hidden items-center gap-6 md:flex">
            <a className="font-medium text-on-surface-variant transition-colors duration-200 hover:text-primary" href="#">
              About
            </a>
            <a className="font-medium text-on-surface-variant transition-colors duration-200 hover:text-primary" href="#">
              Journaling Guide
            </a>
          </nav>
        </div>
        <Button variant="ghost" size="sm" className="px-4 py-2">
          Sign Up
        </Button>
      </div>
    </header>
  )
}
