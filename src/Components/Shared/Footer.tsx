export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12 md:mt-24">
      <div className="container mx-auto px-4 xl:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Section 1 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              Our platform connects surplus food from individuals and
              organizations with local communities in need, reducing food waste
              and fighting hunger.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Foods
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Donations
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Get Food
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">
                  Email: 30109044@students.southwales.ac.uk
                </span>
              </li>
              <li>
                <span className="text-gray-400">Phone: +123 456 789</span>
              </li>
              <li>
                <span className="text-gray-400">
                  Address: 123 Your Street, City, Country
                </span>
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex flex-wrap space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
