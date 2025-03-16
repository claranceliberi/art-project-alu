
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui-custom/Section";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function About() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="page-transition">
        {/* Hero section with Rwandan-inspired pattern */}
        <div className="relative overflow-hidden bg-accent py-24 md:py-32">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1590598016834-a0286dde4d7d?auto=format&fit=crop&w=1200&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'contrast(1.2) brightness(0.8)'
            }} />
          </div>
          <div className="container px-6 mx-auto relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Celebrating Rwanda's Artistic Heritage
              </h1>
              <p className="text-lg md:text-xl mb-8 text-muted-foreground">
                Discover the beauty of traditional and contemporary Rwandan art through our curated marketplace.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium mb-4">
                Our Story
              </span>
              <h2 className="text-3xl font-semibold mb-6">
                Bridging Tradition and Innovation
              </h2>
              <p className="text-muted-foreground mb-6">
                Founded in Kigali, our marketplace is dedicated to showcasing Rwanda's rich artistic heritage to the world. We collaborate with local artists who blend traditional techniques with contemporary expressions, creating a platform where culture and creativity thrive.
              </p>
              <p className="text-muted-foreground mb-6">
                Our mission is to support Rwanda's creative economy while preserving cultural practices that have been passed down through generations. By connecting artists directly with art enthusiasts globally, we ensure fair compensation and recognition for their exceptional talent.
              </p>
              <Button asChild className="rounded-full">
                <Link to="/artists">Meet Our Artists</Link>
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-elevated">
              <img 
                src="https://images.unsplash.com/photo-1598880513786-a15e77e2d1df" 
                alt="Artists in Rwanda"
                className="w-full h-auto"
              />
            </div>
          </div>
        </Section>

        {/* Imigongo Art Feature */}
        <Section className="bg-[#FEF7CD] py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden shadow-elevated">
                  <img 
                    src="https://images.unsplash.com/photo-1584611292848-2e7caa362ec5" 
                    alt="Imigongo Art Detail"
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-elevated mt-6">
                  <img 
                    src="https://images.unsplash.com/photo-1589459399575-9c2c1d7fb0e7" 
                    alt="Traditional Rwandan Art"
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-elevated col-span-2">
                  <img 
                    src="https://images.unsplash.com/photo-1575374903640-10b3f7ce7e15" 
                    alt="Imigongo Art Collection"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="inline-block px-3 py-1 bg-[#FEC6A1] text-accent-foreground rounded-full text-xs font-medium mb-4">
                Imigongo Art
              </span>
              <h2 className="text-3xl font-semibold mb-6">
                The Geometric Masterpieces of Rwanda
              </h2>
              <p className="text-muted-foreground mb-4">
                Imigongo is a distinctive art form unique to Rwanda, characterized by bold geometric patterns traditionally made from cow dung mixed with natural pigments. Dating back to the 18th century, this art form combines mathematical precision with cultural storytelling.
              </p>
              <p className="text-muted-foreground mb-4">
                The striking black, white, and earthy red patterns symbolize unity, prosperity, and Rwanda's deep connection to nature. Today, contemporary artists continue to innovate while honoring this cultural heritage.
              </p>
              <p className="text-muted-foreground mb-6">
                Each Imigongo piece in our collection represents both a preservation of tradition and a celebration of Rwanda's artistic evolution.
              </p>
              <Button asChild variant="outline" className="rounded-full border-[#FEC6A1] hover:bg-[#FEC6A1]/10">
                <Link to="/categories/painting">Explore Imigongo Art</Link>
              </Button>
            </div>
          </div>
        </Section>

        {/* Our Values */}
        <Section>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium mb-4">
              Our Values
            </span>
            <h2 className="text-3xl font-semibold mb-6">
              Cultural Preservation Through Art
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              We believe in the power of art to preserve culture, tell stories, and build bridges across communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary p-8 rounded-lg shadow-subtle">
              <div className="w-12 h-12 bg-[#FEC6A1] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Global Reach</h3>
              <p className="text-muted-foreground">
                We connect Rwandan artists with a global audience, bringing the beauty of Rwandan art to collectors worldwide while ensuring artists receive fair compensation.
              </p>
            </div>

            <div className="bg-secondary p-8 rounded-lg shadow-subtle">
              <div className="w-12 h-12 bg-[#FEC6A1] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Artistic Innovation</h3>
              <p className="text-muted-foreground">
                We support artists who honor traditional techniques while embracing contemporary expressions, fostering innovation in Rwanda's artistic landscape.
              </p>
            </div>

            <div className="bg-secondary p-8 rounded-lg shadow-subtle">
              <div className="w-12 h-12 bg-[#FEC6A1] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Community Empowerment</h3>
              <p className="text-muted-foreground">
                We invest in educational initiatives that empower the next generation of Rwandan artists, ensuring cultural techniques and knowledge continue to flourish.
              </p>
            </div>
          </div>
        </Section>

        {/* Team */}
        <Section className="bg-foreground text-background py-24">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-[#FEC6A1] text-accent-foreground rounded-full text-xs font-medium mb-4">
              Our Team
            </span>
            <h2 className="text-3xl font-semibold mb-6 text-background">
              The People Behind Our Marketplace
            </h2>
            <p className="text-background/80 max-w-3xl mx-auto">
              Our team combines expertise in art curation, technology, and cultural preservation to create a platform that celebrates Rwanda's artistic heritage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Mutoni Gakuba",
                role: "Founder & Creative Director",
                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
              },
              {
                name: "Jean-Pierre Habimana",
                role: "Art Curator",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
              },
              {
                name: "Claire Mugabo",
                role: "Technology Lead",
                image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&q=80"
              },
              {
                name: "David Nkusi",
                role: "Artisan Relations",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium mb-2 text-background">{member.name}</h3>
                <p className="text-background/70">{member.role}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Visit Us */}
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium mb-4">
                Visit Our Gallery
              </span>
              <h2 className="text-3xl font-semibold mb-6">
                Experience Rwandan Art in Person
              </h2>
              <p className="text-muted-foreground mb-6">
                Our physical gallery in Kigali showcases rotating exhibitions from Rwanda's most talented artists. Visit us to experience the texture, color, and emotion of these works in person.
              </p>
              <div className="mb-6">
                <p className="font-medium">Kigali Creative Hub</p>
                <p className="text-muted-foreground">KN 14 Ave, Kigali, Rwanda</p>
                <p className="text-muted-foreground">Open Tuesday-Sunday, 10am-6pm</p>
              </div>
              <Button asChild className="rounded-full">
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                  Get Directions
                </a>
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-elevated h-80">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5077923156365!2d30.05881851470285!3d-1.9435884370982855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca42841e72f05%3A0x4e4c7539fd0e59e9!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1626791754050!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy"
                title="Map of Kigali, Rwanda"
              ></iframe>
            </div>
          </div>
        </Section>

        {/* Call to Action */}
        <Section 
          className="bg-gradient-to-r from-[#FEC6A1] to-[#FEF7CD] py-24"
          contentClassName="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Join Our Community of Art Enthusiasts
          </h2>
          <p className="text-lg mb-8 text-muted-foreground">
            Support Rwandan artists while bringing unique, culturally rich artwork into your home or collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/browse">Browse Artwork</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/register">Join as an Artist</Link>
            </Button>
          </div>
        </Section>
      </div>
    </Layout>
  );
}
