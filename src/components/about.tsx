import Background from "./background";

export default function About() {
  return (
    <div className="flex min-h-screen justify-center items-center px-4 py-8">
      <Background />
      <div className="z-1 w-full lg:w-1/3">
        <div className="flex items-center gap-2 mb-6">
          <a href="/" className="px-2 py-2 rounded-lg bg-black/40 border-white/20 border text-gray-200 hover:border-white/50 transition-all text-2xl hoveranim">← Back</a>
          <h1 className="text-5xl text-white drop-shadow-black drop-shadow-xl">About</h1>
        </div>
        <div className="p-2 rounded-lg bg-black/40 border-white/20 border hover:border-white/50 transition-all">
          <p className="text-2xl text-white drop-shadow-black drop-shadow-xl leading-10">
            I'm a recently graduated Software Developer with a strong focus on <span className="skill">frontend development</span>.
            I'm proficient in <span className="skill">React (including Next.js)</span>, <span className="skill">CSS / TailwindCSS / SASS</span>,
            and my primary programming language is <span className="skill">TypeScript</span>. I’m also familiar with <span className="skill">RESTful APIs</span>, and backend technologies such as <span className="skill">MongoDB</span>.
            <br /> <br />
            For development workflow, I follow <span className="skill">SCRUM Methodology</span> and use the
            <span className="skill"> Atlassian Suite (Jira, Bitbucket, Confluence)</span> to support collaboration and project tracking.
          </p>
        </div>
      </div>
    </div>
  )
}
