function Filter() {
  return (
    <button
      className="flex items-center h-8 gap-2 px-4 py-1 bg-(--white-colour)"
      type="button"
    >
      Filter
      <img src="/filter.svg" alt="Filter" className="h-4" />
    </button>
  );
}

export default Filter;
