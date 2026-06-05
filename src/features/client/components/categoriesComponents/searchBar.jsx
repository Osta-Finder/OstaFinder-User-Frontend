import { Search } from 'lucide-react';

export default function SearchBar({ searchInput, setSearchInput }) {
  return (
    <div className="mb-6 relative w-full ">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="ابحث عن اسم الفني، الخدمة، أو المهارة..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 shadow-sm transition"
        />
        <Search className="absolute right-3 top-3.5 text-gray-400" size={18} />
      </div>
     
    </div>
  );
}