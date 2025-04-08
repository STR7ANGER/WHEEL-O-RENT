import { useState } from "react";

const FAQSection = () => {
  const faqs = [
    {
      question: "Is Driver's Licence Required?",
      answer:
        "Yes, a valid driver's license is mandatory for renting any vehicle. International renters may need an International Driving Permit (IDP) along with their home country license.",
    },
    {
      question: "Type of Vehicles Available",
      answer:
        "We offer a variety of vehicles including sedans, SUVs, and luxury cars.",
    },
    {
      question: "What are the rental charges?",
      answer:
        "Rental charges depend on the vehicle type and duration of the rental.",
    },
    {
      question: "Are there any hidden fees?",
      answer: "No, we maintain transparency, and there are no hidden charges.",
    },
    {
      question: "How long can I rent a car?",
      answer:
        "Yes, we offer flexible rental durations, including hourly rentals.",
    },
    {
      question: "Document Verification policy",
      answer:
        "You need a valid driver's license and an ID proof for verification.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-black py-16 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 tracking-tight">
          <span className="text-white">Frequently Asked</span>{" "}
          <span className="text-amber-500">Questions</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-black bg-opacity-70 rounded-lg shadow-md overflow-hidden transition-all duration-300 border border-gray-800"
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-medium text-white">
                  {faq.question}
                </h3>
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white">
                  <span
                    className="text-xl font-bold transition-transform duration-300"
                    style={{
                      transform:
                        openIndex === index ? "rotate(45deg)" : "rotate(0deg)",
                      display: "inline-block",
                    }}
                  >
                    +
                  </span>
                </div>
              </button>
              <div
                className={`px-5 transition-all duration-300 overflow-hidden ${
                  openIndex === index ? "max-h-64 pb-5" : "max-h-0"
                }`}
              >
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
