import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import Header from "@/components/Header";
import AddVideoForm from "@/components/AddVideoForm";
import VideoGrid from "@/components/VideoGrid";
import VideoPlayer from "@/components/VideoPlayer";
import EmptyState from "@/components/EmptyState";
import { type Video } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const { data: videos = [], isLoading } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
  });

  const addVideoMutation = useMutation({
    mutationFn: async (url: string) => {
      return await apiRequest("POST", "/api/videos", { url });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
      toast({
        title: "Video added",
        description: "Video has been added to your library",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to add video",
        description: error.message,
      });
    },
  });

  const deleteVideoMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/videos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
      toast({
        title: "Video deleted",
        description: "Video has been removed from your library",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed to delete video",
        description: "Please try again",
      });
    },
  });

  const handleAddVideo = (url: string) => {
    addVideoMutation.mutate(url);
  };

  const handleDeleteVideo = (id: string) => {
    deleteVideoMutation.mutate(id);
  };

  const handlePlayVideo = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleBackToLibrary = () => {
    setSelectedVideo(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-16">
            <div className="text-muted-foreground">Loading videos...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedVideo ? (
          <>
            <div className="mb-12">
              <AddVideoForm onAdd={handleAddVideo} />
            </div>

            {videos.length > 0 ? (
              <VideoGrid
                videos={videos}
                onPlay={handlePlayVideo}
                onDelete={handleDeleteVideo}
              />
            ) : (
              <EmptyState />
            )}
          </>
        ) : (
          <VideoPlayer video={selectedVideo} onBack={handleBackToLibrary} />
        )}
      </main>
    </div>
  );
}
