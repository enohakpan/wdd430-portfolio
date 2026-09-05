interface AboutHeroProps {
    name: string;
    role: string;
    intro: string;
}

export default function AboutHero({ name, role, intro }: AboutHeroProps) {
    return (
        <section className="bg-[#26d9a3] px-6 py-12 text-white shadow-md w-full">
            <div className="container mx-auto px-4">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-100">{role}</p>
                <h1 className="text-4xl font-bold mb-4">{name}</h1>
                <p className="text-blue-100 text-lg max-w-3xl">{intro}</p>
                <div className="mt-8">
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded hover:bg-gray-100 transition-colors">
                        Download Resume
                    </a>
                </div>
            </div>
        </section>
    );
} 