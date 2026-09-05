import { motion } from "motion/react";
import WordCarousel from "../WordCarousel";

interface AboutProps {
  darkMode: boolean;
}

const focusAreas = [
  "Software Engineering",
  "Automation",
  "Robotics",
  "Internet of Things",
  "Embedded Systems",
  "Computer Vision",
  "Machine Learning",
  "Database Design and Management",
  "Web Development",
  "UI/UX Design",
  "Hardware Design",
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
];

const softSkills = [
  "Adaptable",
  "Self-Taught",
  "Interpersonal",
  "Critical Thinker",
  "Problem-Solving",
  "Project Management",
  "Collaboration",
  "Time Management",
];

const allSkillGroups = [
  ...skillGroups,
  { title: "Soft Skills", skills: softSkills },
];

const education = [
  {
    period: "2022 - 2026",
    degree: "Bachelor of Science in Computer Engineering",
    institution: "Adamson University",
    honors: ["Academic Merit Awardee", "DOST Scholar"],
  },
];

const experience = [
  {
    period: "Jul - Sep 2025",
    role: "Intern - Project LODI",
    organization:
      "Department of Science and Technology - Information Technology Division",
    roles: [
      {
        title: "QA Tester",
        period: "Jul - Aug 2025",
        bullets: [
          "Executed functional and system testing on internal software applications, validating inputs, workflows, forms, and system functionality against technical specifications.",
          "Developed and executed test cases and scenarios for multiple system modules, documenting results and identifying functional issues.",
          "Performed validation checks for data entry, error handling, submissions, and update functionalities to ensure system reliability.",
        ],
      },
      {
        title: "Systems Analyst",
        period: "Aug - Sep 2025",
        bullets: [
          "Studied software requirements and system specifications to understand workflows, functional scope, and user requirements.",
          "Designed wireframes and interactive prototypes in Figma for user management, task tracking, reporting, and administrative system functions.",
          "Developed interactive prototype flows including modal interactions, search functionality, dynamic results, and dashboard layouts to communicate system behavior and improve usability.",
        ],
      },
    ],
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
            {/* <div
              className={`mx-auto mt-10 h-px w-20 ${darkMode ? "bg-slate-700" : "bg-slate-300"}`}
            />
            <p
              className={`mx-auto mt-10 max-w-3xl text-xl leading-8 sm:text-2xl sm:leading-9 ${muted}`}
            >
              That&apos;s what inspires me to explore. That&apos;s what keeps me
              building.
            </p> */}
          </div>
        </div>
      </section>

      <section className={`border-t ${line}`}>
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-center px-6 py-20 sm:px-10 lg:px-8 lg:py-24">
          <h2 className="text-5xl font-bold tracking-tight sm:text-5xl">
            Education
          </h2>
          <div
            className={`mt-12 grid gap-12 border-t pt-12 ${line} lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-16`}
          >
            <div>
              {education.map((edu, index) => (
                <div key={index}>
                  <h4 className={`text-lg font-medium tracking-tight ${muted}`}>
                    {edu.period}
                  </h4>
                  <h3
                    className={`mt-2 text-3xl font-semibold tracking-tight ${muted}`}
                  >
                    {edu.institution}
                  </h3>
                  <h4
                    className={`mt-2 text-xl font-medium tracking-tight ${muted}`}
                  >
                    {edu.degree}
                  </h4>
                  {edu.honors && edu.honors.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                      {edu.honors.map((honor) => (
                        <li
                          key={honor}
                          className={`text-sm font-medium tracking-tight ${muted}`}
                        >
                          {honor}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <div
              className={`border-t pt-10 lg:border-t-0 lg:border-l lg:pl-16 lg:pt-0 ${line}`}
            >
              <WordCarousel words={focusAreas} darkMode={darkMode} />
            </div>
          </div>
        </div>
      </section>

      <section className={`border-t ${line}`}>
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 lg:px-8 lg:py-24">
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
                className={`flex flex-col gap-6 border-b py-10 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.8fr)] lg:items-start lg:gap-10 ${line}`}
              >
                <div className="lg:pr-4">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {item.role}
                  </h3>
                  <p className={`mt-3 text-base leading-7 ${muted}`}>
                    {item.organization}
                  </p>
                  <p
                    className={`mt-3 text-sm font-medium tabular-nums ${muted}`}
                  >
                    {item.period}
                  </p>
                </div>
                {item.roles ? (
                  <div className="flex max-w-3xl flex-col gap-8">
                    {item.roles.map((role) => (
                      <div key={role.title} className="space-y-3">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                          <h4 className="text-base font-semibold tracking-tight">
                            {role.title}
                          </h4>
                          <span
                            className={`text-xs font-medium tabular-nums ${muted}`}
                          >
                            {role.period}
                          </span>
                        </div>
                        <ul
                          className={`list-disc space-y-2.5 pl-5 text-base leading-7 ${muted}`}
                        >
                          {role.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={`max-w-prose text-base leading-7 ${muted}`}>
                    {item.summary}
                  </p>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className={`border-t ${line}`}>
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-center px-6 py-20 sm:px-10 lg:px-8 lg:py-24">
          <h2 className="text-5xl font-bold tracking-tight sm:text-5xl">
            Skills
          </h2>
          <div className="mt-12">
            <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6">
              {allSkillGroups.map((group) => (
                <div
                  key={group.title}
                  className={`flex h-full w-70 shrink-0 snap-start flex-col border p-6 sm:w-80 ${line}`}
                >
                  <h3 className={`text-base font-semibold ${muted}`}>
                    {group.title}
                  </h3>
                  <ul className="mt-6 flex flex-1 flex-wrap content-start gap-x-3 gap-y-2 text-xl font-medium tracking-tight">
                    {group.skills.map((skill, index) => (
                      <li key={skill} className="flex items-center gap-3">
                        {skill}
                        {index < group.skills.length - 1 && (
                          <span
                            aria-hidden="true"
                            className={`text-sm ${muted}`}
                          >
                            &middot;
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <p
                    className={`mt-8 text-xs font-medium uppercase tracking-wide ${muted}`}
                  >
                    {group.skills.length} {group.title}
                  </p>
                </div>
              ))}
            </div>
            <p
              className={`mt-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide ${muted}`}
            >
              <span aria-hidden="true">&bull;</span>
              Scroll to explore
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
