import { Button } from "./ui/button"

export function SocialLoginButtons() {
  return (
    <div className="grid grid-cols-1">
      <Button variant="outline" className="h-auto gap-2 px-4 py-3 active:scale-95">
        <img
          alt="Google"
          className="h-5 w-5 opacity-80"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuACNMKUxDDkh9CU4KObawZnTog2AqUYA3dNcuZpw7cnRZrDGJmUCLWj-0dkjpZaRljq77IZxu8lzPguQbniFAoUweJGlvaBSlTwi7roOmhZ0ctWEh26KeO3BzqMXWlpcDiypoFggn2IfnhRCRp1g5ncW4GrsVlcLquwtFDgAPTzkiZ55HhEm1NaX0IqQ5KjXZLDJUmPbhWPYcEJnECpFuD_a6R5ngWrWTCzc4Kxv6g6p9uA61T5aKGFC8ODDEAmuxYYEdTBdDhW3Oo"
        />
        <span className="text-sm font-medium text-on-surface">Google</span>
      </Button>
    </div>
  )
}
