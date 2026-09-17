import { motion, useReducedMotion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.header
      className="section-heading"
      initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(7px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65 }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </motion.header>
  );
}
