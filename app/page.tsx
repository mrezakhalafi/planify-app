import HeroSection from '@/components/hero-section';
import DetailsSection from '@/components/details-section';
import EventsSection from '@/components/events-section';
import StorySection from '@/components/story-section';
import GallerySection from '@/components/gallery-section';
import CountdownSection from '@/components/countdown-section';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <DetailsSection />
      <EventsSection />
      <StorySection />
      <GallerySection />
      <CountdownSection />
    </main>
  );
}