function Conatct() {
  return (
    <div
      id="contact"
      class="min-h-screen bg-gray-100 flex items-center justify-center p-6"
    >
      <div class="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full border border-gray-200">
        <h2 class="text-3xl font-bold text-gray-900 mb-2 text-center">
          Contact Us
        </h2>
        <p class="text-gray-600 text-center mb-8">
          Have questions? We're here to help!
        </p>

        <form class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-gray-800"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-gray-800"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-gray-800"
              placeholder="Write your subject"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-gray-800 resize-none"
              placeholder="Type your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
export default Conatct;
