import AddVideoForm from '../AddVideoForm';

export default function AddVideoFormExample() {
  const handleAdd = (url: string) => {
    console.log('Video added:', url);
  };

  return (
    <div className="p-8">
      <AddVideoForm onAdd={handleAdd} />
    </div>
  );
}
