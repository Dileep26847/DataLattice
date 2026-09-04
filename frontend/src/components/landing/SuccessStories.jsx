import { motion } from "framer-motion";
import { FaStar, FaPlayCircle } from "react-icons/fa";

const students = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    company: "Infosys",
    salary: "₹8 LPA",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Sneha Reddy",
    role: "Frontend Developer",
    company: "TCS",
    salary: "₹7.2 LPA",
    image: "https://i.pravatar.cc/150?img=25",
  },
  {
    name: "Vikram Kumar",
    role: "Data Analyst",
    company: "Accenture",
    salary: "₹9 LPA",
    image: "https://i.pravatar.cc/150?img=15",
  },
];

export default function SuccessStories() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="text-indigo-600 uppercase font-semibold">
            Success Stories
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Our Students Are Getting Hired
          </h2>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {students.map((student, index) => (

            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="rounded-3xl overflow-hidden bg-slate-50 shadow-xl"
            >

              <div className="relative">

                <img
                  src={student.image}
                  className="w-full h-72 object-cover"
                  alt={student.name}
                />

                <FaPlayCircle
                  className="absolute inset-0 m-auto text-white text-6xl"
                />

              </div>

              <div className="p-8">

                <div className="flex text-yellow-500 mb-4">

                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />

                </div>

                <h3 className="text-2xl font-bold">

                  {student.name}

                </h3>

                <p className="text-slate-500 mt-2">

                  {student.role}

                </p>

                <div className="mt-6 flex justify-between">

                  <span className="font-semibold">

                    {student.company}

                  </span>

                  <span className="text-green-600 font-bold">

                    {student.salary}

                  </span>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}