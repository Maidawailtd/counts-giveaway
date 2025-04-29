import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const builds = [
  {
    title: "Custom Motorcycles",
    description: "One-of-a-kind choppers and classic bike restorations",
    image: "/bikes.jpg"
  },
  {
    title: "Classic Cars",
    description: "Vintage automobile restorations and custom builds",
    image: "/cars.jpg"
  },
  {
    title: "Hot Rods",
    description: "High-performance custom hot rod builds",
    image: "/hotrods.jpg"
  }
];

export default function PrizeShowcase() {
  return (
    <section id="showcase" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bebasNeue text-counts-gold text-center mb-16">
          FEATURED BUILDS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {builds.map((build, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="bg-black border border-counts-gold/20 overflow-hidden">
                <CardContent className="p-0">
                  <img src={build.image} alt={build.title} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h3 className="text-2xl font-bebasNeue text-counts-gold mb-2">{build.title}</h3>
                    <p className="text-gray-400">{build.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}