import Gallery from '../components/Gallery';
import NewsAndEvents from '../components/NewsAndEvents';
import Testimonials from '../components/Testimonials';
import QuickApply from '../components/QuickApply';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Our School</h1>
      <QuickApply />
      <Gallery />
      <NewsAndEvents />
      <Testimonials />
    </div>
  );
}
