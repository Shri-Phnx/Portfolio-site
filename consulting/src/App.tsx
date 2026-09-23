import { Hero } from './components/Hero';
import { About, Discovery, Footer, Insights, Method, Services, Testimonials, Work } from './components/Sections';

function App() {
  return (
    <div className="w-full min-h-screen bg-black selection:bg-[#cbb59d] selection:text-black">
      <Hero />
      <About />
      <Services />
      <Work />
      <Method />
      <Insights />
      <Testimonials />
      <Discovery />
      <Footer />
    </div>
  );
}

export default App;
