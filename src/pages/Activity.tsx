import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui-custom/Section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArtworkCard } from "@/components/ui-custom/ArtworkCard";
import { artworks } from "@/lib/data";
import { useState } from "react";

// Mock data - replace with actual user activity data
const userActivity = {
  recentlyViewed: [
    {
      id: "1",
      title: "Renaissance Masters",
      description: "A curated collection of 15th-century Italian paintings",
      type: "Collection",
      imageUrl: "/src/assets/images/download (22).jpg"
    },
    {
      id: "2",
      title: "Summer Garden",
      description: "A stunning piece by Maria Gonzalez",
      type: "Artwork",
      imageUrl: "/src/assets/images/cloth piece.jpg"
    }
  ],
  invites: [
    {
      id: "1",
      title: "Your Invitation",
      description: "Join us for an exclusive art experience",
      date: "June 15, 2024",
      time: "6:00 PM",
      location: "Gallery One",
      imageUrl: "/src/assets/images/Bluey Moon.jpg"
    }
  ],
  boughtPieces: []
};

export default function Activity() {
  const [activeTab, setActiveTab] = useState("recently-viewed");

  return (
    <Layout>
      <div className="page-transition">
        <Section className="section-padding py-24 bg-[#FFFFFF]">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-7xl font-bold tracking-tight mb-16">Activity</h1>

            {/* Tabs */}
            <div className="flex gap-8 mb-12">
              {["recently-viewed", "invites", "bought-pieces"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-lg font-medium transition-colors ${
                    activeTab === tab
                      ? "text-black border-b-2 border-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {tab.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="space-y-16">
              {/* Recently Viewed */}
              {activeTab === "recently-viewed" && (
                <div className="grid grid-cols-2 gap-8">
                  {userActivity.recentlyViewed.map((item) => (
                    <div key={item.id} className="group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer">
                      <img 
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-start justify-end p-8">
                        <h3 className="font-medium text-2xl text-white mb-2">{item.title}</h3>
                        <p className="text-lg text-white/90 mb-4">{item.description}</p>
                        <span className="text-sm text-white/80">{item.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Invites */}
              {activeTab === "invites" && (
                <div className="w-full max-w-2xl mx-auto">
                  {userActivity.invites.map((event) => (
                    <div key={event.id} className="group relative w-full h-[150px] rounded-lg overflow-hidden cursor-pointer">
                      <img 
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-start justify-end p-6">
                        <h3 className="font-medium text-xl text-white mb-2">{event.title}</h3>
                        <p className="text-base text-white/90 mb-3">{event.description}</p>
                        <span className="text-sm text-white/80">{event.date} at {event.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Bought Pieces */}
              {activeTab === "bought-pieces" && (
                <div className="w-full">
                  {userActivity.boughtPieces.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {userActivity.boughtPieces.map((piece) => (
                        <div key={piece.id} className="group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer">
                          <img 
                            src={piece.imageUrl}
                            alt={piece.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-start justify-end p-8">
                            <h3 className="font-medium text-2xl text-white mb-2">{piece.title}</h3>
                            <p className="text-lg text-white/90 mb-2">by {piece.artist}</p>
                            <p className="text-lg text-white/90 mb-4">{piece.description}</p>
                            <div className="flex justify-between items-center w-full">
                              <span className="text-sm text-white/80">{piece.price}</span>
                              <span className="text-sm text-white/80">Purchased: {piece.purchaseDate}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-lg text-gray-500">No items have been bought yet</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Section>
      </div>
    </Layout>
  );
} 