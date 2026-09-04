import {
  FaRobot,
  FaCode,
  FaPaintBrush,
  FaCloud,
  FaServer,
  FaDatabase,
} from "react-icons/fa";

function Categories() {
  const categories = [
    {
      icon: <FaRobot size={40} />,
      title: "AI & Machine Learning",
      courses: "25 Courses",
    },
    {
      icon: <FaCode size={40} />,
      title: "Web Development",
      courses: "40 Courses",
    },
    {
      icon: <FaPaintBrush size={40} />,
      title: "UI / UX Design",
      courses: "18 Courses",
    },
    {
      icon: <FaCloud size={40} />,
      title: "Cloud Computing",
      courses: "15 Courses",
    },
    {
      icon: <FaServer size={40} />,
      title: "DevOps",
      courses: "20 Courses",
    },
    {
      icon: <FaDatabase size={40} />,
      title: "Data Science",
      courses: "22 Courses",
    },
  ];

  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center text-gray-900">
          Popular Categories
        </h2>

        <p className="text-center text-gray-500 mt-4">
          Learn the most in-demand skills from industry experts.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-8 hover:-translate-y-2"
            >
              <div className="text-blue-600 mb-6">
                {category.icon}
              </div>

              <h3 className="text-2xl font-semibold">
                {category.title}
              </h3>

              <p className="text-gray-500 mt-3">
                {category.courses}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Categories;