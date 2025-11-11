import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Youtube } from "lucide-react";
import { SiVimeo } from "react-icons/si";
import { type Video } from "@shared/schema";

interface VideoCardProps {
  video: Video;
  onPlay: (video: Video) => void;
  onDelete: (id: string) => void;
}

export default function VideoCard({ video, onPlay, onDelete }: VideoCardProps) {
  return (
    <Card className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-200" data-testid={`card-video-${video.id}`}>
      <div className="relative">
        <button
          onClick={() => onPlay(video)}
          className="w-full aspect-video overflow-hidden bg-muted cursor-pointer"
          data-testid={`button-play-${video.id}`}
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
          {video.duration && (
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
              {video.duration}
            </div>
          )}
        </button>
        <Button
          size="icon"
          variant="destructive"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(video.id);
          }}
          data-testid={`button-delete-${video.id}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg line-clamp-2 mb-2" data-testid={`text-title-${video.id}`}>
          {video.title}
        </h3>
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
          {video.platform === "youtube" && (
            <>
              <Youtube className="w-4 h-4" />
              <span>YouTube</span>
            </>
          )}
          {video.platform === "vimeo" && (
            <>
              <SiVimeo className="w-4 h-4" />
              <span>Vimeo</span>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
