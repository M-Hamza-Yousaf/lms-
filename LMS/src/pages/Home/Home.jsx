import { Link } from "react-router-dom";

function Home() {
  const features = [
    {
      icon: "📚",
      title: "Quality Courses",
      desc: "Access to hundreds of courses across multiple subjects",
    },
    {
      icon: "👨‍🏫",
      title: "Expert Teachers",
      desc: "Learn from qualified and experienced instructors",
    },
    {
      icon: "📊",
      title: "Track Progress",
      desc: "Monitor your learning with detailed analytics",
    },
    {
      icon: "📝",
      title: "Assignments & Quizzes",
      desc: "Test your knowledge with interactive assessments",
    },
    {
      icon: "🎓",
      title: "Certificates",
      desc: "Earn certificates on course completion",
    },
    {
      icon: "💬",
      title: "24/7 Support",
      desc: "Get help anytime from our support team",
    },
  ];

  return (
    <div className="bg-bg">
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 md:py-24 px-5 text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Learn Without Limits
          </h1>
          <p className="text-base md:text-xl mb-8 opacity-95">
            Best LMS platform for students, teachers, and institutions
          </p>
          <Link
            to="/signup"
            className="inline-block bg-secondary text-white px-8 py-3 md:px-9 md:py-4 rounded-md font-medium text-base md:text-lg hover:bg-orange-600 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-12 md:py-20 px-5 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-textDark">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-textDark">
                {feature.title}
              </h3>
              <p className="text-textLight">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bg py-12 md:py-20 px-5 text-center border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-textDark">
            Ready to Start Learning?
          </h2>
          <p className="text-base md:text-lg text-textLight mb-8">
            Join thousands of students already learning with us
          </p>
          <Link
            to="/signup"
            className="inline-block bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-primary-dark transition"
          >
            Sign Up Free
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
