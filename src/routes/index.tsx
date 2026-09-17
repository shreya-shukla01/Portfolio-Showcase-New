import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio/Portfolio";

const resumeUrl = "/assets/resume.pdf";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Shreya Shukla — Full-Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Shreya Shukla, a full-stack developer working with React, Node.js, TypeScript, APIs, databases, real-time systems and AI technologies.",
      },
      { property: "og:title", content: "Shreya Shukla — Full-Stack Developer" },
      {
        property: "og:description",
        content:
          "Portfolio of Shreya Shukla, a full-stack developer working with React, Node.js, TypeScript, APIs, databases, real-time systems and AI technologies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Portfolio resumeUrl={resumeUrl} />;
}
