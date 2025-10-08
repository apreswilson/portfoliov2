import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Background from "./background";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare";

export default function Projects() {

  const projects: { img: string, name: string, description: string, code: string, site: string }[] = [
    { img: "/tabz.png", name: "Tabz", description: "A minimal business management platform that allows users to create and/or join organizations they are invited to.", code: "https://github.com/apreswilson/tabz", site: "https://tabz-alpha.vercel.app/" },

    { img: "/foodshop.png", name: "Foodshop", description: "Foodshop is an online grocery store where customers can purchase groceries and/or add savings all online.", code: "https://github.com/apreswilson/foodshop", site: "https://foodshop-weld.vercel.app/" },

    { img: "/calendar.png", name: "Calendar", description: "Calendar is a minimal calendar website that allows you to make an account, and add events to your calendar.", code: "https://github.com/apreswilson/calendar", site: "https://apreswilson.github.io/calendar/" },
  ]

  return (
    <div className="flex min-h-screen justify-center items-center px-4 py-8">
      <Background />

      <div className="z-1 w-full lg:w-3/4">

        <div className="flex items-center gap-2 mb-6">
          <a href="/" className="px-2 py-2 rounded-lg bg-black/40 border-white/20 border text-gray-200 hover:border-white/50 transition-all text-2xl hoveranim">← Back</a>
          <h1 className="text-5xl text-white drop-shadow-black drop-shadow-xl">Projects</h1>
        </div>

        <div className="flex flex-col md:flex-row flex-wrap gap-4">
          {projects.map((project) => (
            <div className="flex-1 max-w-full md:max-w-1/3 flex flex-col gap-4 p-4 rounded-lg bg-black/40 border-white/20 border text-gray-200 hover:border-white/50 transition-all text-2xl">
              <h2 className="drop-shadow-black drop-shadow-xl text-4xl">{project.name}</h2>
              <img src={project.img} className="w-full h-40 lg:h-64 rounded-lg" />
              <p className="drop-shadow-black drop-shadow-xl flex-1">{project.description}</p>

              <div className="flex gap-2 text-base">
                <a href={project.code} target="_blank" className="bg-black/50 text-gray-200 p-1 border border-white/20 rounded-lg hover:border-white/50 transition-all hoveranim">
                  <FontAwesomeIcon icon={faGithub} size="2x" className="cursor-pointer drop-shadow-xl drop-shadow-black" />
                </a>
                <a href={project.site} target="_blank" className="bg-black/50 text-gray-200 p-1 border border-white/20 rounded-lg hover:border-white/50 transition-all hoveranim">
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="2x" className="cursor-pointer drop-shadow-xl drop-shadow-black" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
