import VideoGrid from '../VideoGrid';

export default function VideoGridExample() {
  const sampleVideos = [
    {
      id: '1',
      url: 'https://www.youtube.com/watch?v=1',
      title: 'Beautiful Landscapes in 4K',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop',
      platform: 'youtube' as const,
      duration: '10:23'
    },
    {
      id: '2',
      url: 'https://vimeo.com/123456',
      title: 'Creative Short Film',
      thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=450&fit=crop',
      platform: 'vimeo' as const,
      duration: '5:41'
    },
    {
      id: '3',
      url: 'https://www.youtube.com/watch?v=3',
      title: 'Coding Tutorial: Advanced React Patterns',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop',
      platform: 'youtube' as const,
      duration: '25:15'
    },
    {
      id: '4',
      url: 'https://www.youtube.com/watch?v=4',
      title: 'Relaxing Music Mix',
      thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=450&fit=crop',
      platform: 'youtube' as const,
      duration: '1:30:00'
    }
  ];

  const handlePlay = (video: any) => {
    console.log('Playing video:', video);
  };

  const handleDelete = (id: string) => {
    console.log('Deleting video:', id);
  };

  return (
    <div className="p-8">
      <VideoGrid videos={sampleVideos} onPlay={handlePlay} onDelete={handleDelete} />
    </div>
  );
}
