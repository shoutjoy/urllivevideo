import VideoPlayer from '../VideoPlayer';

export default function VideoPlayerExample() {
  const sampleVideo = {
    id: '1',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Amazing Nature Documentary - The Beauty of Our Planet',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop',
    platform: 'youtube' as const,
    duration: '12:34'
  };

  const handleBack = () => {
    console.log('Back to library clicked');
  };

  return (
    <div className="p-8">
      <VideoPlayer video={sampleVideo} onBack={handleBack} />
    </div>
  );
}
