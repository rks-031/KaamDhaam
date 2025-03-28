const TodoFilter = ({ filter, setFilter }) => {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <div className="d-flex justify-content-center mb-4">
      <div className="btn-group shadow-sm">
        {filters.map(({ value, label }) => (
          <button 
            key={value}
            className={`btn ${filter === value ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TodoFilter;