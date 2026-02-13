import PageTitle from "@/components/PageTitle";
import Button from "@/components/Button";

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      <PageTitle title="ABOUT US" />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tagline Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Celebrating Black Culture Through Art & Media
          </h1>
        </div>

        {/* Lorem Ipsum Text */}
        <div className="text-center mb-16">
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mt-6">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
          </p>
        </div>

        {/* Mission Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-6">OUR MISSION</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            At BLK, we are committed to amplifying Black voices and stories through innovative media and cultural exploration. Our platform serves as a digital sanctuary where creativity meets consciousness, fostering meaningful dialogue and celebrating the rich tapestry of Black excellence across film, television, literature, and culture.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mt-6">
            Through curated content, thoughtful analysis, and community engagement, we strive to create spaces where Black narratives are not just told, but celebrated, critiqued, and elevated to their rightful place in the cultural zeitgeist.
          </p>
        </div>

        {/* Contact Us Button */}
        <div className="text-center">
          <Button variant="primary" size="lg">
            CONTACT US
          </Button>
        </div>
      </div>
    </main>
  );
}
