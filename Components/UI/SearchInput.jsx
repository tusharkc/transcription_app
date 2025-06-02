import { Search } from "lucide-react";

const SearchInput = () => {
  return (
    <form className="max-w-md">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search color="#AEAEB2" />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-3 ps-14 text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#EBEEF4] focus:ring-0 focus:border-0"
          placeholder="Search for anything here..."
          required
        />
      </div>
    </form>
  );
};

export default SearchInput;
