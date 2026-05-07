export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold mb-2">CollegeHub</h2>
          <p className="text-gray-400 text-sm">
            Helping students find the best colleges with real reviews and smart comparisons.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="text-gray-400 text-sm space-y-1">
            <li><a href="/colleges">Explore</a></li>
            <li><a href="/review">Write a Review</a></li>
            <li><a href="/saved">Saved</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-gray-400 text-sm">
            Email: support@collegehub.com
          </p>
          <p className="text-gray-400 text-sm">
            Made with love for students
          </p>
        </div>

      </div>

      <div className="text-center text-gray-500 text-sm pb-4">
        © {new Date().getFullYear()} CollegeHub. All rights reserved.
      </div>
    </footer>
  );
}