import Rating from "../../../components/ui/Rating";

export default function MiniTestimonialDemo() {
  return (
    <div className="flex items-center divide-x divide-gray-300">
      <div className="flex -space-x-3 pr-3">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
          alt="image"
          className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-1"
        />
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
          alt="image"
          className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-[2]"
        />
        <img
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
          alt="image"
          className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-[3]"
        />
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="image"
          className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-[4]"
        />
      </div>
      <div className="pl-3">
        <div className="flex items-center">
          <Rating rating={5} size="sm"  />
        </div>
        <p className="text-sm text-gray-500">
          Trusted by <span className="font-medium text-gray-800">100,000+</span> users
        </p>
      </div>
    </div>
  );
}
