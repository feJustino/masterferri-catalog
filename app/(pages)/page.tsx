import Features from '../components/landing-page/features';
import Hero from '../components/landing-page/hero';
import About from '../components/landing-page/about';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Hero />
      <Features />
      <About />
    </div>
  );
}
