import VideoCard from "./VideoCard";
import { type Video } from "@shared/schema";

interface VideoGridProps {
  videos: Video[];
  onPlay: (video: Video) => void;
  onDelete: (id: string) => void;
}

export default function VideoGrid({ videos, onPlay, onDelete }: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          onPlay={onPlay}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
