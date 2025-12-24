/**
 * HomePage - Main landing page for eTuitionBd
 * Modular structure with separate sections
 */

import { CTASection } from './components/CTASection'
import { FeaturesSection } from './components/FeaturesSection'
import { HeroSection } from './components/HeroSection'
import { HowItWorksSection } from './components/HowItWorksSection'
import { TestimonialsSection } from './components/TestimonialsSection'

const HomePage = () => {
    return (
        <main>
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <TestimonialsSection />
            <CTASection />
        </main>
    )
}

export default HomePage
