import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  Cpu,
  Database,
  ExternalLink,
  Github,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Network,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { experiences, projects, skillGroups, type Project } from "./data";
import { Navbar } from "./Navbar";
import { ProjectVisual } from "./ProjectVisual";
import { SectionHeading } from "./SectionHeading";

const HeroScene = lazy(() =>
  import("./HeroScene").then((module) => ({ default: module.HeroScene })),
);

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28, filter: "blur(7px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay }}
    >
      {children}
    </motion.div>
  );
}

function MagneticLink({
  href,
  children,
  variant = "primary",
  download,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  download?: string;
}) {
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const move = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setOffset({
      x: (event.clientX - rect.left - rect.width / 2) * 0.12,
      y: (event.clientY - rect.top - rect.height / 2) * 0.18,
    });
  };
  return (
    <motion.a
      href={href}
      download={download}
      target={href.startsWith("#") || download ? undefined : "_blank"}
      rel={href.startsWith("#") || download ? undefined : "noreferrer"}
      className={`magnetic-link magnetic-${variant}`}
      onMouseMove={move}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={offset}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      {children}
      <ArrowUpRight />
    </motion.a>
  );
}

function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const move = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <div
      className="cursor-glow"
      style={{ transform: `translate3d(${position.x - 180}px, ${position.y - 180}px, 0)` }}
      aria-hidden="true"
    />
  );
}

function HeroDepthAccents({ heroRef }: { heroRef: React.RefObject<HTMLElement | null> }) {
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 45, damping: 22 });
  const y = useSpring(pointerY, { stiffness: 45, damping: 22 });
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const driftDown = useTransform(scrollYProgress, [0, 1], [0, 42]);
  const driftUp = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const orbitX = useTransform(x, (value) => value * -18);
  const orbitRotate = useTransform(x, (value) => value * -5);
  const nodesX = useTransform(x, (value) => value * 22);
  const nodesRotate = useTransform(y, (value) => value * 4);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  return (
    <div
      className="hero-depth"
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <motion.div
        className="depth-orbit"
        style={reduced ? {} : { x: orbitX, y: driftDown, rotate: orbitRotate }}
      >
        <i />
        <span />
      </motion.div>
      <motion.div
        className="depth-nodes"
        style={reduced ? {} : { x: nodesX, y: driftUp, rotate: nodesRotate }}
      >
        <i />
        <i />
        <i />
        <span />
        <span />
      </motion.div>
    </div>
  );
}

function Hero({ resumeUrl }: { resumeUrl: string }) {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  return (
    <section ref={heroRef} id="home" className="hero section-anchor">
      <motion.div
        className="hero-grid"
        aria-hidden="true"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55 }}
      />
      <HeroDepthAccents heroRef={heroRef} />
      <div className="hero-copy">
        <motion.h1
          className="hero-name"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
        >
          Shreya Shukla
        </motion.h1>
        <motion.p
          className="hero-role"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.36 }}
        >
          Full-Stack Developer
        </motion.p>
        <motion.h2
          className="hero-statement"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.48 }}
        >
          Building digital experiences that <em>actually work.</em>
        </motion.h2>
        <motion.p
          className="hero-summary"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.66 }}
        >
          Full-Stack Developer building scalable web applications, APIs, real-time systems and
          AI-powered solutions.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.82 }}
        >
          <MagneticLink href="#projects">View my work</MagneticLink>
          <MagneticLink href={resumeUrl} download="Shreya_Shukla_Resume.pdf" variant="secondary">
            Download resume
          </MagneticLink>
        </motion.div>
        <motion.a
          className="connect-link"
          href="#contact"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.96 }}
        >
          Let&apos;s connect <ArrowRight />
        </motion.a>
      </div>
      <motion.div
        className="hero-scene"
        initial={reduced ? false : { opacity: 0, x: 30, scale: 0.96 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Suspense fallback={<div className="scene-fallback" aria-hidden="true" />}>
          <HeroScene />
        </Suspense>
        <div className="scene-index">
          <span>SYSTEM / 01</span>
          <span>CONNECTED ARCHITECTURE</span>
        </div>
      </motion.div>
      <a href="#about" className="scroll-cue" aria-label="Scroll to about">
        <span>Explore</span>
        <ArrowDown />
      </a>
    </section>
  );
}

const capabilityIcons = [Layers3, Network, Sparkles];
const capabilities = [
  [
    "Full-Stack Development",
    "React frontends, Node/Express APIs, and SQL or NoSQL databases shaped around the problem.",
  ],
  [
    "API & System Engineering",
    "REST APIs, third-party services, real-time communication, and reliable data access.",
  ],
  [
    "AI & Data-Driven Applications",
    "Machine learning pipelines, LLMs, AI integrations, and tools that turn data into action.",
  ],
] as const;

function About() {
  return (
    <section id="about" className="section section-anchor">
      <div className="container">
        <SectionHeading eyebrow="01 / About" title="Engineering with purpose." />
        <div className="about-editorial">
          <Reveal className="about-lead">
            <p>
              Experienced full-stack developer building APIs and internal tools using
              JavaScript/TypeScript, React and Node.js.
            </p>
          </Reveal>
          <Reveal className="about-body" delay={0.1}>
            <p>
              Shreya turns business problems into working solutions across React frontends,
              Node/Express APIs, and databases selected for the data they hold. Her work spans
              third-party services and internal systems that help teams access what they need with
              less manual effort.
            </p>
            <p>
              She takes ownership from requirements review through production deployment, applying
              data structures, algorithms, and object-oriented principles to day-to-day engineering
              and architecture decisions.
            </p>
          </Reveal>
        </div>
        <div className="capability-grid">
          {capabilities.map(([title, text], index) => {
            const Icon = capabilityIcons[index] ?? Braces;
            return (
              <Reveal key={title} delay={index * 0.08}>
                <article className="capability-card">
                  <span className="card-number">0{index + 1}</span>
                  <Icon />
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <i />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const icons = [Braces, Database, Workflow, Network, Cpu];
  return (
    <section id="skills" className="section section-skills section-anchor">
      <div className="container">
        <SectionHeading
          eyebrow="02 / Toolkit"
          title="A stack built for the whole system."
          intro="From interface to infrastructure, every layer connects."
        />
        <div className="skill-grid">
          {skillGroups.map((group, index) => {
            const Icon = icons[index] ?? Braces;
            return (
              <Reveal key={group.title} delay={index * 0.055}>
                <article className="skill-group">
                  <header>
                    <span>
                      <Icon />
                    </span>
                    <h3>{group.title}</h3>
                  </header>
                  <div>
                    {group.skills.map((skill) => (
                      <span className="skill-pill" key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section section-anchor">
      <div className="container">
        <SectionHeading
          eyebrow="03 / Experience"
          title="Built in real teams, for real constraints."
        />
        <div className="timeline">
          <div className="timeline-line" aria-hidden="true" />
          {experiences.map((item, index) => (
            <Reveal key={item.company} className="timeline-item" delay={index * 0.08}>
              <div className="timeline-marker">
                <span />
              </div>
              <article>
                <div className="timeline-meta">
                  <span>{item.period}</span>
                  <span>
                    <MapPin />
                    {item.location}
                  </span>
                </div>
                <h3>{item.role}</h3>
                <h4>{item.company}</h4>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>
                      <Check />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      className="project-card"
      initial={reduced ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={reduced ? {} : { y: -6 }}
      transition={{ duration: 0.55 }}
    >
      <button
        className="project-button"
        onClick={onOpen}
        aria-label={`View details for ${project.name}`}
      >
        <div className="project-content">
          <div className="project-top">
            <span>{project.index}</span>
            <ArrowUpRight />
          </div>
          <p>{project.category}</p>
          <h3>{project.name}</h3>
          <p className="project-description">{project.description}</p>
          <div className="project-tech">
            {project.tech.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <span className="project-action">
            Explore project <ArrowRight />
          </span>
        </div>
        <ProjectVisual type={project.visual} />
      </button>
      <a
        className="project-live-link"
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => event.stopPropagation()}
        aria-label={`Open ${project.name} live demo in a new tab`}
      >
        Live Demo <ExternalLink />
      </a>
    </motion.article>
  );
}

function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  return (
    <section id="projects" className="section section-projects section-anchor">
      <div className="container">
        <SectionHeading
          eyebrow="04 / Selected work"
          title="Systems designed to move."
          intro="Three products where interface, data, and infrastructure work as one."
        />
        <div className="project-list">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={() => setSelected(project)} />
          ))}
        </div>
        <Dialog
          open={Boolean(selected)}
          onOpenChange={(open) => {
            if (!open) setSelected(null);
          }}
        >
          <DialogContent className="project-dialog">
            {selected ? (
              <>
                <DialogHeader>
                  <span className="eyebrow">PROJECT / {selected.index}</span>
                  <DialogTitle>{selected.name}</DialogTitle>
                  <DialogDescription>{selected.category}</DialogDescription>
                </DialogHeader>
                <p className="dialog-copy">{selected.description}</p>
                <div className="dialog-grid">
                  <div>
                    <span className="dialog-label">Technology</span>
                    <div className="project-tech">
                      {selected.tech.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="dialog-label">Key functionality</span>
                    <ul>
                      {selected.features.map((feature) => (
                        <li key={feature}>
                          <Check />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <a
                  className="dialog-live-link"
                  href={selected.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo <ExternalLink />
                </a>
              </>
            ) : null}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

const achievements = [
  {
    overline: "Industrial Ideathon 2025",
    headline: "Finalist",
    detail: "Top 40 of 650+ Teams",
    number: "40",
    suffix: "/ 650+",
  },
  {
    overline: "National Ranking",
    headline: "Top 50",
    detail: "From 200,000+ registrations",
    number: "50",
    suffix: "/ 200K+",
  },
  {
    overline: "EY Techathon 2025",
    headline: "Shortlisted",
    detail: "",
    number: "EY",
    suffix: "2025",
  },
  {
    overline: "Smart India Hackathon 2025",
    headline: "Internal Round Shortlisted",
    detail: "Top 45 Teams",
    number: "45",
    suffix: "TEAMS",
  },
] as const;

function Achievements() {
  return (
    <section id="achievements" className="section section-achievements section-anchor">
      <div className="container">
        <SectionHeading eyebrow="05 / Recognition" title="Measured by the rooms that mattered." />
        <div className="achievement-grid">
          {achievements.map((item, index) => (
            <Reveal key={item.overline} delay={index * 0.07}>
              <article className="achievement-card">
                <span className="achievement-overline">{item.overline}</span>
                <div className="achievement-number">
                  {item.number}
                  <small>{item.suffix}</small>
                </div>
                <h3>{item.headline}</h3>
                {item.detail ? <p>{item.detail}</p> : null}
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="certification">
          <span>
            <Sparkles />
          </span>
          <div>
            <p>Certification</p>
            <h3>Large Language Models — Google Skills</h3>
          </div>
          <time>May 2025</time>
        </Reveal>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="section section-education">
      <div className="container">
        <SectionHeading eyebrow="06 / Education" title="The foundation beneath the work." />
        <Reveal>
          <article className="education-card">
            <div className="education-date">
              AUG 2024 <span /> JUN 2028 <small>EXPECTED</small>
            </div>
            <div className="education-main">
              <p>Bachelor of Technology</p>
              <h3>Electronics &amp; Communication Engineering</h3>
              <h4>Bhagwan Parshuram Institute of Technology · GGSIPU</h4>
              <span>
                <MapPin /> Delhi, India
              </span>
            </div>
            <div className="education-score">
              <span>CGPA</span>
              <strong>
                9.1<small>/10</small>
              </strong>
              <p>90%</p>
            </div>
            <div className="coursework">
              <span>Relevant coursework</span>
              {["Data Structures", "Algorithms", "Database Management"].map((course) => (
                <p key={course}>{course}</p>
              ))}
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function Contact({ resumeUrl }: { resumeUrl: string }) {
  return (
    <section id="contact" className="section contact section-anchor">
      <div className="container">
        <Reveal>
          <span className="eyebrow">07 / Contact</span>
          <h2>
            Let&apos;s build something
            <br />
            <em>meaningful.</em>
          </h2>
          <p>Have an opportunity, a difficult problem, or a product worth building?</p>
        </Reveal>
        <Reveal className="contact-links" delay={0.1}>
          <a href="mailto:shreya34shukla@gmail.com">
            <Mail />
            <span>
              <small>Email me</small>shreya34shukla@gmail.com
            </span>
            <ArrowUpRight />
          </a>
          <a href="https://linkedin.com/in/shreya-shukla-" target="_blank" rel="noreferrer">
            <Linkedin />
            <span>
              <small>LinkedIn</small>shreya-shukla
            </span>
            <ArrowUpRight />
          </a>
          <a href="https://github.com/shreya-shukla01" target="_blank" rel="noreferrer">
            <Github />
            <span>
              <small>GitHub</small>shreya-shukla01
            </span>
            <ArrowUpRight />
          </a>
        </Reveal>
        <Reveal className="contact-resume">
          <MagneticLink href={resumeUrl} download="Shreya_Shukla_Resume.pdf">
            Download resume
          </MagneticLink>
        </Reveal>
      </div>
    </section>
  );
}

export function Portfolio({ resumeUrl }: { resumeUrl: string }) {
  return (
    <div className="portfolio">
      <CursorGlow />
      <Navbar resumeUrl={resumeUrl} />
      <main>
        <Hero resumeUrl={resumeUrl} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Education />
        <Contact resumeUrl={resumeUrl} />
      </main>
      <footer>
        <span>© 2026 Shreya Shukla</span>
        <span>Built with React · TypeScript · Motion</span>
        <a href="#home">
          Back to top <ArrowUpRight />
        </a>
      </footer>
    </div>
  );
}
