type Props = {
    search: string;
    setSearch: (value: string) => void;
  };
  
  const UserFilters = ({ search, setSearch }: Props) => {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    };
  
    return (
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={handleSearchChange}
          className="border border-gray-300 px-4 py-2 rounded shadow w-full md:w-1/3"
        />
      </div>
    );
  };
  
  export default UserFilters;
  