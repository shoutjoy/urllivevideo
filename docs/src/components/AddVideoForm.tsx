import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Youtube, Film } from "lucide-react";
import { SiVimeo } from "react-icons/si";

interface AddVideoFormProps {
  onAdd: (url: string) => void;
}

export default function AddVideoForm({ onAdd }: AddVideoFormProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const validateUrl = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    const vimeoRegex = /^(https?:\/\/)?(www\.)?vimeo\.com\/.+/;
    return youtubeRegex.test(url) || vimeoRegex.test(url);
  };

  const getPlatform = (url: string): "youtube" | "vimeo" | null => {
    if (/youtube\.com|youtu\.be/.test(url)) return "youtube";
    if (/vimeo\.com/.test(url)) return "vimeo";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter a video URL");
      return;
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid YouTube or Vimeo URL");
      return;
    }

    onAdd(url);
    setUrl("");
  };

  const platform = url ? getPlatform(url) : null;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="url"
            placeholder="Paste YouTube or Vimeo URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="h-12 pr-24 text-base"
            data-testid="input-video-url"
          />
          {platform && (
            <div className="absolute right-14 top-1/2 -translate-y-1/2 text-muted-foreground">
              {platform === "youtube" && <Youtube className="w-5 h-5" />}
              {platform === "vimeo" && <SiVimeo className="w-5 h-5" />}
            </div>
          )}
          <Button
            type="submit"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            data-testid="button-add-video"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
        {error && (
          <p className="text-sm text-destructive" data-testid="text-error">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
