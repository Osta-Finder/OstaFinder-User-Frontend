import WorkerCard from './WorkerCard';

export default function BestWorkers() {
    const workersData = [
    {
      id: 1,
      name: 'م. إبراهيم خليل',
      specialty: 'فني كهرباء',
      rating: 4.9,
      location: 'مدينة نصر، القاهرة',
      price: 150,
      isOnline: true,
      image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 2,
      name: 'عم حسن النجار',
      specialty: 'خبير سباكة',
      rating: 4.8,
      location: 'الدقي، الجيزة',
      price: 200,
      isOnline: false,
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 3,
      name: 'م. سامح فوزي',
      specialty: 'فني تكييف',
      rating: 5.0,
      location: 'التجمع الخامس، القاهرة',
      price: 250,
      isOnline: true,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    }
  ];
  return (
    <section className="my-10 w-full">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-right">
        أفضل الفنيين المتاحين حالياً
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {workersData.map((worker) => (
          <WorkerCard key={worker.id} worker={worker} />
        ))}
      </div>
    </section>
  )
}
