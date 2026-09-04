import {
  FaGoogle,
  FaMicrosoft,
  FaAmazon,
  FaApple,
  FaGithub,
} from "react-icons/fa";

function TrustedBrands() {
  const brands = [
    { icon: <FaGoogle />, name: "Google" },
    { icon: <FaMicrosoft />, name: "Microsoft" },
    { icon: <FaAmazon />, name: "Amazon" },
    { icon: <FaApple />, name: "Apple" },
    { icon: <FaGithub />, name: "GitHub" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        <p className="text-center text-gray-500 uppercase tracking-widest text-sm">
          Trusted by learners preparing for careers at
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mt-12">

          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 text-gray-400 hover:text-blue-600 transition duration-300"
            >
              <div className="text-5xl">
                {brand.icon}
              </div>

              <span className="font-medium">
                {brand.name}
              </span>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default TrustedBrands;