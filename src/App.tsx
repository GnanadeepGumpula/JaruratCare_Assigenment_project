import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import SupportForm from './components/SupportForm';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Header />
      <HeroSection />
      <ServicesSection />
      <SupportForm />
      <Footer />
      <AIChatbot />
    </div>
  );
}

export default App;
