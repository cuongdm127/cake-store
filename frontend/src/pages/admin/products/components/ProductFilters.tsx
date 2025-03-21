type ProductFiltersProps = {
    search: string;
    setSearch: (value: string) => void;
  };
  
  const ProductFilters = ({ search, setSearch }: ProductFiltersProps) => (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-4 py-2 rounded w-full md:w-1/3"
      />
    </div>
  );
  
  export default ProductFilters;
  