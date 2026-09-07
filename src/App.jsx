import { useEffect, useState } from "react";

const photos = [
  "https://images.unsplash.com/photo-1504203700686-0f0fbb8b1f5b",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setCurrentSlide((slide) => (slide + 1) % photos.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, []);

  const selectSlide = (index) => setCurrentSlide(index);
  const previousSlide = () =>
    setCurrentSlide((slide) => (slide - 1 + photos.length) % photos.length);
  const nextSlide = () =>
    setCurrentSlide((slide) => (slide + 1) % photos.length);

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">John Thompson Photography</p>
        <h1>Timeless moments, honestly captured.</h1>
        <p className="intro">Portraits, landscapes, events, and creative photography.</p>
        <a className="button" href="mailto:jtphotos1@mac.com?subject=Photography%20session">
          Book a session
        </a>
      </section>

      <section className="portfolio" aria-labelledby="portfolio-heading">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2 id="portfolio-heading">Portfolio</h2>
        </div>
        <div className="slideshow" aria-roledescription="carousel" aria-label="Photography portfolio">
          <img
            className="slide-image"
            src={`${photos[currentSlide]}?auto=format&fit=crop&w=1600&h=1000&q=85`}
            alt={`Portfolio photograph ${currentSlide + 1} of ${photos.length}`}
          />
          <button className="arrow previous" type="button" onClick={previousSlide} aria-label="Previous photograph">‹</button>
          <button className="arrow next" type="button" onClick={nextSlide} aria-label="Next photograph">›</button>
          <div className="indicators" aria-label="Choose photograph">
            {photos.map((_, index) => (
              <button
                key={index}
                className={index === currentSlide ? "indicator active" : "indicator"}
                type="button"
                onClick={() => selectSlide(index)}
                aria-label={`Show photograph ${index + 1}`}
                aria-current={index === currentSlide ? "true" : undefined}
              />
            ))}
          </div>
        </div>
        <p className="counter" aria-live="polite">Photograph {currentSlide + 1} of {photos.length}</p>
        <div className="thumbnails">
          {photos.map((photo, index) => (
            <button key={photo} className={index === currentSlide ? "thumbnail selected" : "thumbnail"} type="button" onClick={() => selectSlide(index)} aria-label={`Show photograph ${index + 1}`}>
              <img src={`${photo}?auto=format&fit=crop&w=400&h=280&q=75`} alt="" />
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
