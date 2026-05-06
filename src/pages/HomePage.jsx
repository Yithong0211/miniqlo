import HeroSection from '../components/HeroSection';
import ProductGrid from '../components/ProductGrid';
import NewArrivals from '../components/NewArrivals';
import BestSellers from '../components/BestSellers';
import SaleBanner from '../components/SaleBanner';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <NewArrivals />
      <ProductGrid />
      <BestSellers />
      <SaleBanner />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
