import { motion } from "motion/react";

interface AboutProps {
  darkMode: boolean;
}

const focusAreas = [
  "Software Engineering",
  "Automation",
  "Robotics",
  "Internet of Things",
  "Embedded Systems",
];

const skillGroups = [
  {
    title: "Languages",
    skills: [
      "Python",
      "JavaScript",
      "TypeScript",
      "C#",
      "C / C++",
      "SQL",
      "PHP",
      "HTML/CSS",
      "Verilog",
    ],
  },
  {
    title: "Frameworks",
    skills: [
      "React",
      "Bootstrap",
      "Tailwind CSS",
      "Node.js",
      "Next.js",
      "Vue.js",
      "ROS2",
      "OpenCV",
      "PyTorch",
      "TensorFlow",
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      "Git",
      "GitHub",
      "MySQL",
      "SQLite",
      "Arduino",
      "PlatformIO",
      "Raspberry Pi",
      "VS Code",
      "Figma",
      "Vivado",
      "GNS3",
    ],
  },
  {
    title: "Technologies",
    skills: [
      "REST APIs",
      "Computer Vision",
      "Machine Learning",
      "Embedded Systems",
      "IoT",
      "Robotics",
      "Database Management",
      "MQTT",
    ],
  },
  {
    title: "Soft Skills",
    skills: [
      "Adaptable",
      "Self-Taught",
      "Interpersonal",
      "Critical Thinker",
      "Problem-Solving",
      "Project Management",
      "Collaboration",
      "Time Management",
    ],
  },
];

const education = [
  {
    period: "2022 - 2026",
    degree: "Bachelor of Science in Computer Engineering",
    institution: "Adamson University",
  },
];

const experience = [
  {
    period: "Jul - Sep 2025",
    role: "Intern - Project LODI",
    organization:
      "Department of Science and Technology - Information Technology Division",
    summary:
      "Supported software requirements analysis and designed Figma wireframes and interactive prototypes for management and administrative workflows.",
  },

  {
    period: "2018 - 2021",
    role: "Freelance Graphic Designer",
    organization: " ",
    summary:
      "Created visual markups and graphic designs, incorporating client feedback through each project iteration.",
  },
];

const About = ({ darkMode }: AboutProps) => {
  const surface = darkMode
    ? "bg-slate-950 text-slate-100"
    : "bg-slate-50 text-slate-900";
  const muted = darkMode ? "text-slate-400" : "text-slate-600";
  const line = darkMode ? "border-slate-800" : "border-slate-200";

  return (
    <div className={surface}>
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-end px-6 py-14 sm:px-10 lg:px-8 lg:py-20">
        <div className="max-w-4xl pb-8">
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
            Bringing visualizations to reality.
          </h1>
          <p className={`mt-8 max-w-2xl text-lg leading-8 sm:text-xl ${muted}`}>
            A growing practice in turning ideas into clear, practical, and
            human-centered systems.
          </p>
        </div>
      </section>

      <section className={`min-h-[calc(100vh-4rem)] border-t ${line}`}>
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center px-6 py-20 text-center sm:px-10 lg:px-8">
          <div className="max-w-5xl">
            <div
              className={`rounded-full p-4 w-fit m-auto ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}
            >
              <p
                className={`text-lg font-medium ${darkMode ? "text-slate-300" : "text-slate-700"}`}
              >
                My Inspiration:
              </p>
            </div>
            <h2 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              The Exhilaration of Developing Creative Solutions and Seeing Them
              Through
            </h2>
            <div
              className={`mx-auto mt-10 h-px w-20 ${darkMode ? "bg-slate-700" : "bg-slate-300"}`}
            />
            <p
              className={`mx-auto mt-10 max-w-3xl text-xl leading-8 sm:text-2xl sm:leading-9 ${muted}`}
            >
              That&apos;s what inspires me to explore. That&apos;s what keeps me
              building.
            </p>
          </div>
        </div>
      </section>

      <section className={`min-h-[calc(100vh-4rem)] border-t ${line}`}>
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-center px-6 py-20 sm:px-10 lg:px-8">
          <h2 className="text-5xl font-bold tracking-tight sm:text-5xl flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-graduation-cap w-10 h-10 text-primary"
              aria-hidden="true"
            >
              <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
              <path d="M22 10v6"></path>
              <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
            </svg>
            Education
          </h2>
          <div>
            {education.map((edu, index) => (
              <div key={index}>
                <h4
                  className={`mt-4 text-lg font-medium tracking-tight ${muted}`}
                >
                  {edu.period}
                </h4>
                <h3
                  className={`mt-6 text-3xl font-semibold tracking-tight ${muted}`}
                >
                  {edu.institution}
                </h3>
                <h4
                  className={`mt-2 text-xl font-medium tracking-tight ${muted}`}
                >
                  {edu.degree}
                </h4>
              </div>
            ))}
          </div>
          <ol
            className={`mt-12 grid border-t ${line} sm:grid-cols-2 lg:grid-cols-5`}
          >
            {focusAreas.map((area, index) => (
              <li
                key={area}
                className={`border-b py-6 pr-4 text-lg font-medium sm:pr-6 ${line}`}
              >
                <span className={`mr-3 text-sm tabular-nums ${muted}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {area}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`min-h-[calc(100vh-4rem)] border-t ${line}`}>
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-center px-6 py-20 sm:px-10 lg:px-8">
          <h2 className="text-5xl font-bold tracking-tight sm:text-5xl">
            Skills
          </h2>
          <div className={`mt-12 grid border-t ${line} lg:grid-cols-3`}>
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className={`border-b py-8 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 ${line}`}
              >
                <h3 className={`text-base font-semibold ${muted}`}>
                  {group.title}
                </h3>
                <ul className="mt-6 space-y-2 text-xl font-medium tracking-tight">
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`min-h-[calc(100vh-4rem)] border-t ${line}`}>
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 lg:px-8">
          <h2 className="text-5xl font-bold tracking-tight sm:text-5xl">
            Experience
          </h2>
          <div className={`mt-12 border-t ${line}`}>
            {experience.map((item, index) => (
              <motion.article
                key={`${item.role}-${item.period}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`grid gap-5 border-b py-8 sm:grid-cols-[9rem_1fr] sm:gap-10 lg:grid-cols-[11rem_minmax(0,1fr)_minmax(15rem,0.8fr)] ${line}`}
              >
                <p className={`text-sm font-medium tabular-nums ${muted}`}>
                  {item.period}
                </p>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {item.role}
                  </h3>
                  <p className={`mt-2 text-base ${muted}`}>
                    {item.organization}
                  </p>
                </div>
                <p className={`max-w-prose text-base leading-7 ${muted}`}>
                  {item.summary}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
