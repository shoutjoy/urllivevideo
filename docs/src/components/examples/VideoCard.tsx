import VideoCard from '../VideoCard';

export default function VideoCardExample() {
  const sampleVideo = {
    id: '1',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Amazing Nature Documentary - The Beauty of Our Planet',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop',
    platform: 'youtube' as const,
    duration: '12:34'
  };

  const handlePlay = (video: any) => {
    console.log('Playing video:', video);
  };

  const handleDelete = (id: string) => {
    console.log('Deleting video:', id);
  };

  return (
    <div className="p-8 max-w-sm">
      <VideoCard video={sampleVideo} onPlay={handlePlay} onDelete={handleDelete} />
    </div>
  );
}
