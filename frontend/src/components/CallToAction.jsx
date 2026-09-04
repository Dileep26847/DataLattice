import { FaArrowRight } from "react-icons/fa";

function CallToAction() {
  return (
    <section className="py-24 bg-blue-600">
      <div className="max-w-5xl mx-auto text-center px-8">

        <h2 className="text-5xl font-bold text-white">
          Ready to Start Your Learning Journey?
        </h2>

        <p className="text-blue-100 mt-6 text-xl">
          Join thousands of students already learning with Data Lattice.
        </p>

        <button className="mt-10 bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 mx-auto hover:scale-105 transition">

          Get Started

          <FaArrowRight />

        </button>

      </div>
    </section>
  );
}

export default CallToAction;