import { Video } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary text-primary-foreground">
              <Video className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold">VideoHub</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
