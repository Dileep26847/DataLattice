import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    q: "Do I need coding experience?",
    a: "No. Our beginner-friendly courses start from the fundamentals and gradually move to advanced concepts.",
  },
  {
    q: "Will I receive a certificate?",
    a: "Yes. Every completed course comes with a verified DataWave certificate.",
  },
  {
    q: "Do you provide placement support?",
    a: "Yes. We provide resume reviews, mock interviews, career guidance and placement assistance.",
  },
  {
    q: "Can I learn at my own pace?",
    a: "Absolutely. Most courses are self-paced with lifetime access.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-24 bg-slate-50">

      <div className="max-w-4xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="uppercase text-indigo-600 font-semibold">
            FAQ
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Frequently Asked Questions
          </h2>

        </div>

        {faqs.map((faq, index) => (

          <div
            key={index}
            className="mb-5 rounded-2xl bg-white shadow-lg overflow-hidden"
          >

            <button
              onClick={() => setOpen(open === index ? -1 : index)}
              className="w-full flex justify-between items-center p-6 text-left"
            >

              <h3 className="font-semibold text-lg">

                {faq.q}

              </h3>

              <FaChevronDown
                className={`transition ${
                  open === index ? "rotate-180" : ""
                }`}
              />

            </button>

            {open === index && (

              <div className="px-6 pb-6 text-slate-600">

                {faq.a}

              </div>

            )}

          </div>

        ))}

      </div>

    </section>
  );
}