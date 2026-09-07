import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Mail, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";

export default function JohnThompsonPhotography() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const photos = [
    "https://images.unsplash.com/photo-1504203700686-0f0fbb8b1f5b",
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba"
  ];

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [photos.length]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! John will contact you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % photos.length);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="text-center py-24 px-6 bg-gradient-to-b from-black to-neutral-900">
        <div className="flex justify-center mb-6">
          <Camera size={48} />
        </div>
        <h1 className="text-5xl font-bold mb-4">John Thompson Photography</h1>
        <p className="text-neutral-400 max-w-xl mx-auto">
          Capturing timeless moments through the lens. Portraits, landscapes,
          events, and creative photography.
        </p>
        <div className="mt-8">
          <Button className="rounded-2xl">Book a Session</Button>
        </div>
      </section>

      {/* Slideshow Gallery */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <ImageIcon />
          <h2 className="text-3xl font-semibold">Portfolio</h2>
        </div>

        {/* Main Slideshow */}
        <div className="relative w-full mb-8">
          <div className="relative overflow-hidden rounded-lg bg-neutral-900 aspect-video">
            <img
              src={`${photos[currentSlide]}?auto=format&fit=crop&w=1200&h=675&q=80`}
              alt={`Portfolio image ${currentSlide + 1}`}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 rounded-full p-2 transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 rounded-full p-2 transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {photos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide ? "bg-white w-6" : "bg-white/50 w-2"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {photos.map((src, i) => (
            <Card
              key={i}
              className={`overflow-hidden bg-neutral-900 border-none cursor-pointer transition-all ${
                i === currentSlide ? "ring-2 ring-white" : "hover:ring-2 hover:ring-neutral-700"
              }`}
              onClick={() => setCurrentSlide(i)}
            >
              <CardContent className="p-0">
                <img
                  src={`${src}?auto=format&fit=crop&w=800&q=80`}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform"
                  alt={`Thumbnail ${i + 1}`}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-8 text-neutral-400">
          Image {currentSlide + 1} of {photos.length}
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-6 bg-neutral-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">About John</h2>
          <p className="text-neutral-400 leading-relaxed">
            John Thompson is a professional photographer specializing in
            portraits, weddings, and landscape photography. With over a decade
            of experience behind the camera, he focuses on capturing authentic
            emotion, natural light, and powerful storytelling in every image.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <Mail />
          <h2 className="text-3xl font-semibold">Contact</h2>
        </div>
        <a
          href="tel:+16093155136"
          className="inline-block mb-8 text-neutral-400 hover:text-white"
        >
          609-315-5136
        </a>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Your Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            placeholder="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />

          <Textarea
            placeholder="Tell me about your project or event"
            name="message"
            value={form.message}
            onChange={handleChange}
          />

          <Button type="submit" className="w-full rounded-2xl">
            Send Message
          </Button>
        </form>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 border-t border-neutral-800 text-neutral-500">
        © {new Date().getFullYear()} John Thompson Photography. All rights
        reserved.
      </footer>
    </div>
  );
}
