import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { InnovationSection } from './components/InnovationSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CredentialsSection } from './components/CredentialsSection';
import { ContactSection } from './components/ContactSection';

function App() {
  return (
    <div className="w-full min-h-screen bg-black text-[#E8DFD8] selection:bg-[#cbb59d] selection:text-black">
      <HeroSection />
      <AboutSection />
      <AchievementsSection />
      <ProjectsSection />
      <SkillsSection />
      <InnovationSection />
      <ExperienceSection />
      <CredentialsSection />
      <ContactSection />
    </div>
  );
}

export default App;
