import teamAhmed from "../../../assets/images/team_ahmed.png";
import clientAvatar from "../../../assets/images/client_avatar.png";

export default function AboutTeam() {
  const team = [
    {
      name: "م. أحمد علي",
      role: "المؤسس والرئيس التنفيذي",
      bio: "خبرة 15 عاماً في إدارة المشاريع الهندسية والتحول الرقمي.",
      image: teamAhmed
    },
    {
      name: "أ. سارة حسن",
      role: "شريك مؤسس ومدير العمليات",
      bio: "خبير في تطوير سلاسل الإمداد وتحسين تجربة المستخدم في الأسواق المحلية.",
      image: clientAvatar
    },
    {
      name: "م. كريم يوسف",
      role: "المدير التقني",
      bio: "شغوف ببناء أنظمة الذكاء الاصطناعي التي تخدم احتياجات المستخدم اليومية.",
      image: clientAvatar
    },
    {
      name: "أ. رانيا منصور",
      role: "مديرة الموارد البشرية",
      bio: "خبرة في استقطاب وتدريب الكفاءات الفنية وبناء بيئات عمل محفزة لجميع الموظفين.",
      image: clientAvatar
    },
    {
      name: "م. يوسف محمود",
      role: "مهندس برمجيات أول",
      bio: "متخصص في تطوير تطبيقات الهواتف الذكية وتحسين أداء المنصات الرقمية لضمان تجربة سريعة.",
      image: clientAvatar
    },
    {
      name: "أ. خالد عبد الرحمن",
      role: "مدير الدعم الفني وخدمة العملاء",
      bio: "يسعى دائماً لتقديم أفضل تجربة دعم لعملائنا وشركائنا الفنيين على مدار الساعة.",
      image: clientAvatar
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            فريق القيادة
          </h2>
          <p className="text-lg text-gray-500 font-medium">
            العقول المبدعة وراء أوسطى فايندر
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {team.map((member, idx) => (
            <div 
              key={idx}
              className="flex flex-col items-center text-center p-6 bg-[#fbfbfc] rounded-3xl border border-gray-100 hover:shadow-md transition duration-300 ease-in-out"
            >
              {/* Profile Image with Ring Effect */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-[#fff1e6] rounded-full scale-105 border border-orange-100" />
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="relative z-10 w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm"
                />
              </div>

              {/* Member Name */}
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {member.name}
              </h3>

              {/* Member Role */}
              <span className="text-sm font-semibold text-[#eb6a2d] mb-4 block">
                {member.role}
              </span>

              {/* Member Bio */}
              <p className="text-sm md:text-base text-gray-500 leading-relaxed font-light">
                {member.bio}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
