import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dialog, DialogPanel } from '@headlessui/react';
import { SlidersHorizontal, X } from 'lucide-react';
import { useGetFilteredWorkersQuery } from '../../../services/workerApi';
import { useGetCategoriesQuery } from '../../../services/categoryApi';

import WorkerCard from '../components/homeComponents/WorkerCard';
import FiltersSidebar from '../components/categoriesComponents/FiltersSidebar';
import SearchBar from '../components/categoriesComponents/searchBar';
import Pagination from '../components/categoriesComponents/Pagination';

export default function WorkersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const currentKeyword = searchParams.get('keyword') || '';  
  const [searchInput, setSearchInput] = useState(currentKeyword);

  const queryString = searchParams.toString() ? `?${searchParams.toString()}` : '';
  const { data: workersResponse, isLoading: isLoadingWorkers } = useGetFilteredWorkersQuery(queryString);
  const { data: categoriesResponse, isLoading: isLoadingCategories } = useGetCategoriesQuery();

  const workers = workersResponse?.data || [];
  const categories = categoriesResponse?.data || [];
  const pagination = workersResponse?.pagination || { currentPage: 1, numberOfPages: 1 };
  const currentPage = Number(searchParams.get('page')) || 1;


  const handleFilterChange = (filterKey, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(filterKey, value);
    else newParams.delete(filterKey);
    newParams.set('page', 1);
    setSearchParams(newParams);
  };


  const handlePageChange = (pageNumber) => {
  const newParams = new URLSearchParams(searchParams);

  newParams.set('page', pageNumber);

  if (searchInput.trim()) {
    newParams.set('keyword', searchInput);
  } else {
    newParams.delete('keyword');
  }

  setSearchParams(newParams);
};

  useEffect(() => {
  const delayDebounce = setTimeout(() => {
    const newParams = new URLSearchParams(searchParams);

    if (searchInput.trim()) {
      newParams.set('keyword', searchInput);
    } else {
      newParams.delete('keyword');
    }

    newParams.set('page', 1);

    setSearchParams(newParams);
  }, 1000);

  return () => clearTimeout(delayDebounce);
}, [searchInput]);

  return (
    
    <div key={currentKeyword}  className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8" dir="rtl">
      <div className="md:hidden flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100">
        <button onClick={() => setIsMobileFiltersOpen(true)} className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-bold">
          <SlidersHorizontal size={16} /> تصفية النتائج
        </button>
        <span className="text-sm text-gray-500">{workers.length} نتيجة</span>
      </div>

      <aside className="hidden md:block w-1/4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit sticky top-24">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-3 flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-orange-500" /> تصفية النتائج
        </h3>
        <FiltersSidebar categories={categories} isLoadingCategories={isLoadingCategories} searchParams={searchParams} handleFilterChange={handleFilterChange} />
      </aside>

      <Dialog open={isMobileFiltersOpen} onClose={() => setIsMobileFiltersOpen(false)} className="relative z-50 md:hidden">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="fixed inset-0 flex justify-end">
          <DialogPanel className="w-full max-w-xs bg-white p-6 shadow-xl flex flex-col h-full justify-between overflow-y-auto">
            <div>
              <div className="flex justify-between items-center mb-6 border-b pb-3">
                <span className="text-lg font-bold text-gray-900">تصفية النتائج</span>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="text-gray-400"><X size={20} /></button>
              </div>
              <FiltersSidebar categories={categories} isLoadingCategories={isLoadingCategories} searchParams={searchParams} handleFilterChange={handleFilterChange} />
            </div>
            <button onClick={() => setIsMobileFiltersOpen(false)} className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold mt-6">
              عرض النتائج ({workers.length})
            </button>
          </DialogPanel>
        </div>
      </Dialog>

      <main className="w-full md:w-3/4 flex flex-col justify-between">
        <div>
          <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />

          {isLoadingWorkers ? (
            <div className="text-center py-20 text-gray-500">جاري البحث عن أفضل الفنيين...</div>
          ) : workers.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-500 text-lg">لم يتم العثور على نتائج.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {workers.map((worker) => <WorkerCard key={worker._id} worker={worker} />)}
            </div>
          )}
        </div>

        <Pagination pagination={pagination} currentPage={currentPage} onPageChange={handlePageChange} />
      </main>
    </div>
  );
}