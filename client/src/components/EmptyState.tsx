import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddClick?: () => void;
}

export default function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <Video className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="text-2xl font-semibold mb-2" data-testid="text-empty-title">
        No videos saved yet
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md" data-testid="text-empty-subtitle">
        Add your first YouTube or Vimeo video to start building your personal video library
      </p>
      {onAddClick && (
        <Button onClick={onAddClick} data-testid="button-add-first-video">
          Add Video
        </Button>
      )}
    </div>
  );
}
