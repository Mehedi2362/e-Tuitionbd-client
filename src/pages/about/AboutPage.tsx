import MissionSection from './components/MissionSection'
import StatsSection from './components/StatsSection'
import TeamSection from './components/TeamSection'

const About = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Banner */}
            <div className="bg-linear-to-br from-primary/10 via-background to-secondary/10 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Connecting students with qualified tutors across Bangladesh</p>
                </div>
            </div>

            {/* Main Content */}
            <MissionSection />
            <StatsSection />
            <TeamSection />
        </div>
    )
}

export default About
