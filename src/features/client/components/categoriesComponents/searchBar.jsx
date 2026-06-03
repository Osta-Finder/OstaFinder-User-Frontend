import { Search } from 'lucide-react';

export default function SearchBar({ searchInput, setSearchInput, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="mb-6 relative w-full flex gap-2">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="ابحث عن اسم الفني، الخدمة، أو المهارة..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 shadow-sm transition"
        />
        <Search className="absolute right-3 top-3.5 text-gray-400" size={18} />
      </div>
      <button 
        type="submit" 
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 rounded-xl transition shadow-sm text-sm"
      >
        بحث
      </button>
    </form>
  );
}