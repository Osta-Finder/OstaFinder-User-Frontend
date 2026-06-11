import Rating from "../../../components/ui/Rating";

export default function MiniTestimonialDemo() {
  return (
    <div className="flex items-center gap-3 sm:gap-4 bg-black/30 border border-white/10 rounded-full px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-md w-fit shadow-xl">
      <div className="flex items-center">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
          alt="مستخدم"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-800 hover:-translate-y-1 transition relative z-40"
        />
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
          alt="مستخدم"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-800 hover:-translate-y-1 transition relative z-30 -mr-3 sm:-mr-4"
        />
        <img
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
          alt="مستخدم"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-800 hover:-translate-y-1 transition relative z-20 -mr-3 sm:-mr-4"
        />
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="مستخدم"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-800 hover:-translate-y-1 transition relative z-10 -mr-3 sm:-mr-4"
        />
      </div>
      <div className="flex flex-col items-start border-r border-white/20 pr-3 sm:pr-4">
        <div className="flex items-center mb-0.5">
          <Rating rating={5} size="sm" />
        </div>
        <p className="text-xs sm:text-sm text-gray-300 font-medium tracking-wide">
          أكثر من <span className="font-bold text-amber-400">100,000</span> عميل بيثقوا فينا
        </p>
      </div>
    </div>
  );
}
