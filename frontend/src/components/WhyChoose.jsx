import {
  FaLaptopCode,
  FaCertificate,
  FaUserFriends,
  FaInfinity,
} from "react-icons/fa";

function WhyChoose() {
  const features = [
    {
      icon: <FaLaptopCode size={40} />,
      title: "Industry Projects",
      desc: "Work on real-world projects that strengthen your portfolio.",
    },
    {
      icon: <FaCertificate size={40} />,
      title: "Certification",
      desc: "Receive certificates after completing every course.",
    },
    {
      icon: <FaUserFriends size={40} />,
      title: "Expert Mentors",
      desc: "Learn directly from experienced industry professionals.",
    },
    {
      icon: <FaInfinity size={40} />,
      title: "Lifetime Access",
      desc: "Access your purchased courses anytime, anywhere.",
    },
  ];

  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center">

          <h2 className="text-4xl font-bold">
            Why Choose Data Lattice?
          </h2>

          <p className="mt-4 text-gray-500">
            Everything you need to become job-ready.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-md p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >

              <div className="text-blue-600 mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-500 leading-7">
                {feature.desc}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default WhyChoose;