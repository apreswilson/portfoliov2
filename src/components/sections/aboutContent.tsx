type AboutContentProps = {
  view: string;
};

export default function AboutContent({ view }: Readonly<AboutContentProps>) {
  if (view === "Tech") {
    return (
      <div className="flex flex-col gap-6">
        <p>
          I'm a front-end developer specializing in <span className="text-red-500">Next.js</span> and{" "}
          <span className="text-red-500">TypeScript</span> for enterprise applications. I can work with any CSS
          approach, including <span className="text-red-500">vanilla CSS</span>,{" "}
          <span className="text-red-500">TailwindCSS</span>, and <span className="text-red-500">Sass</span>.
        </p>
        <p>
          I’m also familiar with <span className="text-red-500">Jira</span>,{" "}
          <span className="text-red-500">MongoDB</span>, and <span className="text-red-500">RESTful API's</span>.
        </p>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-6">
        <p>
          I'm a big UFC fan. I’ve attended two events in person and regularly keep up with the latest news and updates
          from the organization.
        </p>
        <p>I enjoy playing videogames, as they have been a part of my life since childhood.</p>
      </div>
    );
  }
}
