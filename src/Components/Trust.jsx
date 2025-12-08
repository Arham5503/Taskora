import Section from "../UI/Section";
function Trust() {
  const items = [
    "Tech Innovators",
    "Creative Agencies",
    "Freelancers",
    "Product Teams",
    "Marketing Teams",
  ];
  return (
    <Section>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-semibold text-gray-900 mb-12">
          Trusted by professionals and teams everywhere
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 justify-center">
          {items.map((item) => {
            return (
              <div className="px-5 py-4 bg-gray-50 rounded-xl cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 border border-gray-200/60">
                <p className="font-medium text-indigo-600 ">{item}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
export default Trust;
