import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

const faqs = [
  {
    question: "What is Taskora?",
    answer:
      "Taskora is a smart task and project management platform designed to help individuals and teams stay organized, focused, and productive.",
  },
  {
    question: "Can I use Taskora for free?",
    answer:
      "Yes! Taskora offers a free plan with core features. You can upgrade anytime for advanced tools and analytics.",
  },
  {
    question: "Does Taskora support teams?",
    answer:
      "Absolutely! Taskora is built for both individuals and teams, allowing collaboration, shared projects, and progress tracking.",
  },
  {
    question: "Can I switch between light and dark mode?",
    answer:
      "Yes! Taskora supports customizable themes so you can work in light or dark mode depending on your preference.",
  },
  {
    question: "Does Taskora send reminders?",
    answer:
      "Yes, Taskora provides smart reminders, notifications, and recurring tasks to help you stay on track.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-heading font-semibold text-gray-900 text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left text-gray-800 font-medium focus:outline-none"
              >
                {faq.question}
                <ChevronDownIcon
                  className={`w-5 h-5 text-indigo-600 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
