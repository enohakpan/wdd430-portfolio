import AboutHero from '@/components/AboutHero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About',
    description: 'Learn more about Enoh Akpan, software engineering background, and professional goals.',
};

export default function About() {
    return (
    <div>
        <AboutHero 
            name="Enoh Akpan" 
            role="Software Engineer" 
            intro="I am a software engineer with a passion for building web applications and mobile applications." 
        />
        <main className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-lg text-gray-700">
                This about page shares more information about my background and work.
            </p>
        </main>
      </div>
    );
}
