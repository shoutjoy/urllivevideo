import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { type Video } from "@shared/schema";

interface VideoPlayerProps {
  video: Video;
  onBack: () => void;
}

export default function VideoPlayer({ video, onBack }: VideoPlayerProps) {
  const getEmbedUrl = (url: string, platform: "youtube" | "vimeo"): string => {
    if (platform === "youtube") {
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)?.[1];
      return `https://www.youtube.com/embed/${videoId}`;
    } else {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      return `https://player.vimeo.com/video/${videoId}`;
    }
  };

  const embedUrl = getEmbedUrl(video.url, video.platform as "youtube" | "vimeo");

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-2"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Library
        </Button>
      </div>

      <div className="space-y-4">
        <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            data-testid="video-player"
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold" data-testid="text-video-title">
            {video.title}
          </h2>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono"
            data-testid="link-original-url"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {video.url}
          </a>
        </div>
      </div>
    </div>
  );
}
