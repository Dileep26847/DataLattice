import { FaStar } from "react-icons/fa";

function Testimonials() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Frontend Developer",
      review:
        "Data Lattice completely changed my career. The courses are practical and helped me land my first job.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Priya Reddy",
      role: "UI/UX Designer",
      review:
        "The mentors explained every concept clearly. I built a strong portfolio through the projects.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Arjun Kumar",
      role: "AI Engineer",
      review:
        "The AI courses were amazing. I learned machine learning from scratch and got internship opportunities.",
      image: "https://randomuser.me/api/portraits/men/65.jpg",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center">
          <h2 className="text-4xl font-bold">
            What Our Students Say
          </h2>

          <p className="mt-4 text-gray-500">
            Thousands of students trust Data Lattice to grow their careers.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {testimonials.map((student, index) => (

            <div
              key={index}
              className="bg-slate-50 rounded-3xl p-8 shadow-md hover:shadow-xl transition duration-300"
            >

              <div className="flex items-center gap-4">

                <img
                  src={student.image}
                  alt={student.name}
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div>

                  <h3 className="text-xl font-bold">
                    {student.name}
                  </h3>

                  <p className="text-gray-500">
                    {student.role}
                  </p>

                </div>

              </div>

              <div className="flex gap-1 mt-6 text-yellow-400">

                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />

              </div>

              <p className="mt-6 text-gray-600 leading-7">
                "{student.review}"
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;