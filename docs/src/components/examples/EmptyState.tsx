import EmptyState from '../EmptyState';

export default function EmptyStateExample() {
  const handleAddClick = () => {
    console.log('Add video clicked');
  };

  return (
    <div className="p-8">
      <EmptyState onAddClick={handleAddClick} />
    </div>
  );
}
