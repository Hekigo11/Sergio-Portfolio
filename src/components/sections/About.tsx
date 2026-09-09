import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import WordCarousel from "../WordCarousel";
import { useHorizontalScrollConsumer } from "../../scroll/useHorizontalScrollConsumer";
import { useSnapCarousel } from "../../scroll/useSnapCarousel";
import MetaLabel from "../ui/MetaLabel";
import SectionHeading from "../ui/SectionHeading";
import Tag from "../ui/Tag";
import { DecorField, MaskedArt } from "../decor";
import cloudTwo from "../../assets/cloud-2.svg";
import cloudThree from "../../assets/cloud-3.svg";
import lineartOne from "../../assets/lineart-1.svg";
import lineartThree from "../../assets/lineart-3.svg";
import starsOne from "../../assets/stars-1.svg";
import starsThree from "../../assets/stars-3.svg";

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
  const shouldReduceMotion = useReducedMotion();
  const skillsSectionRef = useRef<HTMLElement>(null);
  const skillsScrollRef = useRef<HTMLDivElement>(null);
  useHorizontalScrollConsumer(
    "about",
    useSnapCarousel(skillsScrollRef, { gateRef: skillsSectionRef }),
  );

  return (
    <div className="text-ink">
      <section className="relative mx-auto flex min-h-(--app-height) w-full max-w-6xl items-end px-6 py-14 sm:px-10 lg:px-8 lg:py-20">
        <DecorField className="hidden sm:block">
          <MaskedArt
            src={cloudTwo}
            className="absolute top-[14%] right-[7%] w-56 text-ink-faint opacity-45 aspect-744/214 lg:w-72"
          />
          <MaskedArt
            src={lineartOne}
            className="absolute top-[22%] left-[4%] w-32 text-ink-faint opacity-30 aspect-665/722 dark:hidden lg:w-40"
          />
          <MaskedArt
            src={starsOne}
            className="absolute top-[20%] left-[4%] hidden w-28 text-ink-faint opacity-40 aspect-685/750 lg:w-36 dark:block"
          />
        </DecorField>
        <div className="max-w-4xl pb-8">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Bringing visualizations to reality.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-ink-muted sm:text-xl">
            {/* A growing practice in turning ideas into clear, practical, and
            human-centered systems. */}
          </p>
        </div>
      </section>

      <section className="relative min-h-(--app-height) border-t border-border">
        <DecorField className="hidden sm:block">
          <MaskedArt
            src={cloudThree}
            className="absolute top-[11%] right-[6%] w-52 text-ink-faint opacity-35 aspect-714/234 lg:w-64"
          />
          <MaskedArt
            src={lineartThree}
            className="absolute bottom-[9%] left-[7%] w-40 text-ink-faint opacity-40 aspect-714/478 dark:hidden lg:w-52"
          />
          <MaskedArt
            src={starsThree}
            className="absolute bottom-[8%] left-[8%] hidden w-24 text-ink-faint opacity-45 aspect-582/750 lg:w-32 dark:block"
          />
        </DecorField>
        <div className="mx-auto flex min-h-(--app-height) w-full max-w-6xl items-center justify-center px-6 py-20 text-center sm:px-10 lg:px-8">
          <div className="max-w-5xl">
            <MetaLabel size="sm" as="p">
              My Inspiration:
            </MetaLabel>
            <h2 className="mt-10 font-display text-4xl leading-[1.08] font-bold tracking-tight sm:text-6xl lg:text-7xl">
              The Exhilaration of Developing Creative Solutions and Seeing Them
              Through
            </h2>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-center px-6 pt-24 pb-20 sm:px-10 lg:px-8 lg:pt-28 lg:pb-24">
          <SectionHeading size="lg">Education</SectionHeading>
          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <div className="flex flex-col gap-10">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="grid gap-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-8"
                >
                  <MetaLabel
                    size="custom"
                    className="text-xs tracking-[0.12em] tabular-nums sm:pt-3 sm:text-right"
                  >
                    {edu.period}
                  </MetaLabel>
                  <div>
                    <h3 className="font-display text-3xl font-bold tracking-tight text-ink">
                      {edu.institution}
                    </h3>
                    <p className="mt-2 text-lg leading-7 text-ink-muted">
                      {edu.degree}
                    </p>
                    {edu.honors && edu.honors.length > 0 && (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {edu.honors.map((honor) => (
                          <li key={honor}>
                            <Tag>{honor}</Tag>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
              <WordCarousel words={focusAreas} darkMode={darkMode} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-20 sm:px-10 lg:px-8 lg:pt-28 lg:pb-24">
          <SectionHeading size="lg">Experience</SectionHeading>
          <div className="mt-12">
            {experience.map((item, index) => (
              <motion.article
                key={`${item.role}-${item.period}`}
                // Reduced motion keeps the entrance — an entry still arrives
                // rather than being there all along — and drops the travel.
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="grid gap-4 border-b border-border py-12 first:pt-0 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-8 lg:gap-12"
              >
                <MetaLabel
                  size="custom"
                  className="text-xs tracking-[0.12em] tabular-nums sm:pt-3 sm:text-right"
                >
                  {item.period}
                </MetaLabel>

                <div className="max-w-3xl">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    {item.role}
                  </h3>
                  {item.organization.trim() && (
                    <p className="mt-2 text-base leading-7 text-ink-muted">
                      {item.organization}
                    </p>
                  )}

                  {item.roles ? (
                    <div className="mt-8 flex flex-col gap-8 border-l border-border pl-6">
                      {item.roles.map((role) => (
                        <div key={role.title}>
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                            <h4 className="text-base font-semibold tracking-tight text-ink">
                              {role.title}
                            </h4>
                            <MetaLabel className="shrink-0 tabular-nums">
                              {role.period}
                            </MetaLabel>
                          </div>
                          <ul className="mt-3 list-disc space-y-2.5 pl-5 text-base leading-7 text-ink-muted marker:text-ink-faint">
                            {role.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 max-w-prose text-base leading-7 text-ink-muted">
                      {item.summary}
                    </p>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section ref={skillsSectionRef} className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-center px-6 pt-24 pb-20 sm:px-10 lg:px-8 lg:pt-28 lg:pb-24">
          <SectionHeading size="lg">Skills</SectionHeading>
          <div className="mt-12">
            <div
              ref={skillsScrollRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6"
            >
              {allSkillGroups.map((group) => (
                <div
                  key={group.title}
                  className="flex w-70 shrink-0 snap-start flex-col rounded-lg border border-border bg-surface p-6 sm:w-80"
                >
                  <MetaLabel as="h3">{group.title}</MetaLabel>
                  <div className="mt-4 h-px w-full bg-border" />
                  <ul className="mt-5 flex flex-1 flex-wrap content-start gap-x-3 gap-y-2 text-lg font-medium tracking-tight text-ink">
                    {group.skills.map((skill, index) => (
                      <li key={skill} className="flex items-center gap-3">
                        {skill}
                        {index < group.skills.length - 1 && (
                          <span
                            aria-hidden="true"
                            className="text-sm text-ink-faint"
                          >
                            &middot;
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 h-px w-full bg-border" />
                  <MetaLabel className="mt-4 tabular-nums">
                    {group.skills.length} {group.title}
                  </MetaLabel>
                </div>
              ))}
            </div>
            <MetaLabel className="mt-4 flex items-center gap-2">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
              Scroll to explore
            </MetaLabel>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
