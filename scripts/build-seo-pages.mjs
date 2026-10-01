// Generates the crawlable standalone pages, sitemap.xml and the homepage's
// JSON-LD + footer from scripts/site-data.mjs.
//
//   node scripts/build-seo-pages.mjs
//
// No dependencies. Output is plain static HTML inside the Vercel root
// (portfoliyo-G/vcard-personal-portfolio), so the deployment itself has no
// build step. Re-run after editing site-data.mjs and commit the output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  SITE, PERSON_ID, WEBSITE_ID, person, aboutParagraphs, experience, education,
  skillGroups, projects, keyProjectSlugs, resumeSummary, spokenLanguages,
} from "./site-data.mjs";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "portfoliyo-G", "vcard-personal-portfolio");
const TODAY = new Date().toISOString().slice(0, 10);
// schema.org dateModified must be a full ISO 8601 DateTime (Search Console
// flags a bare date); midnight India Standard Time on the build date
const MODIFIED = `${TODAY}T00:00:00+05:30`;
const YEAR = new Date().getFullYear();

const esc = (s) => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const abs = (path) => SITE + path;
const projectUrl = (p) => `/projects/${p.slug}`;
const bySlug = (slug) => projects.find((p) => p.slug === slug);
const ext = (url, text, cls = "") =>
  `<a href="${esc(url)}"${cls ? ` class="${cls}"` : ""} target="_blank" rel="noopener noreferrer">${text}</a>`;



// ---------------------------------------------------------------- structured data

const personNode = () => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: person.name,
  url: `${SITE}/`,
  image: abs(person.image),
  jobTitle: person.jobTitle,
  description: person.tagline,
  email: `mailto:${person.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: person.locality,
    addressRegion: person.region,
    addressCountry: person.countryCode,
  },
  alumniOf: { "@type": "CollegeOrUniversity", name: person.alumniOf },
  worksFor: { "@type": "Organization", name: person.worksFor },
  knowsLanguage: person.knowsLanguage,
  knowsAbout: person.knowsAbout,
  sameAs: [person.github, person.linkedin],
});

const personRef = { "@id": PERSON_ID };
const websiteRef = { "@id": WEBSITE_ID };

const breadcrumbNode = (url, trail) => ({
  "@type": "BreadcrumbList",
  "@id": `${abs(url)}#breadcrumb`,
  itemListElement: trail.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: abs(path === "/" ? "/" : path),
  })),
});

const webPageNode = (type, url, title, description, extra = {}) => ({
  "@type": type,
  "@id": `${abs(url)}#webpage`,
  url: abs(url),
  name: title,
  description,
  inLanguage: "en",
  isPartOf: websiteRef,
  breadcrumb: { "@id": `${abs(url)}#breadcrumb` },
  ...extra,
});

const jsonLd = (graph) =>
  `<script type="application/ld+json">\n${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2)
    .replace(/<\//g, "<\\/")}\n  </script>`;



// ---------------------------------------------------------------- layout pieces

const head = ({ url, title, description, ogType = "website", noindex = false, graph }) => `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
${noindex ? `  <meta name="robots" content="noindex, follow">\n` : `  <meta name="robots" content="index, follow">\n  <link rel="canonical" href="${abs(url)}">\n`}  <meta name="author" content="${person.name}">
  <meta name="theme-color" content="#121212">

  <meta property="og:site_name" content="${person.name}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="${ogType}">
${noindex ? "" : `  <meta property="og:url" content="${abs(url)}">\n`}  <meta property="og:image" content="${abs(person.ogImage)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${person.name} — ${person.jobTitle}">
  <meta property="og:locale" content="en_IN">
${ogType === "profile" ? `  <meta property="profile:first_name" content="Utsav">\n  <meta property="profile:last_name" content="Kalathiya">\n` : ""}  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${abs(person.ogImage)}">

  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png">
  <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png">

  <link rel="stylesheet" href="/assets/css/style.css">
  <link rel="stylesheet" href="/assets/css/pages.css?v=2">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
${graph ? `\n  ${jsonLd(graph)}\n` : ""}
</head>`;

const sidebar = () => `
    <aside class="sidebar" data-sidebar>

      <div class="sidebar-info">

        <figure class="avatar-box">
          <img src="${person.image}" alt="${person.imageAlt}" width="80" height="78">
        </figure>

        <div class="info-content">
          <p class="name" title="${person.name}"><a href="/" style="color: inherit;">${person.name}</a></p>

          <p class="title">${person.jobTitle}</p>
        </div>

        <button class="info_more-btn" data-sidebar-btn aria-expanded="false" aria-label="Show contacts">
          <span>Show Contacts</span>

          <ion-icon name="chevron-down" aria-hidden="true"></ion-icon>
        </button>

      </div>

      <div class="sidebar-info_more">

        <div class="separator"></div>

        <ul class="contacts-list">

          <li class="contact-item">
            <div class="icon-box"><ion-icon name="mail-outline" aria-hidden="true"></ion-icon></div>
            <div class="contact-info">
              <p class="contact-title">Email</p>
              <a href="mailto:${person.email}" class="contact-link">${person.email}</a>
            </div>
          </li>

          <li class="contact-item">
            <div class="icon-box"><ion-icon name="location-outline" aria-hidden="true"></ion-icon></div>
            <div class="contact-info">
              <p class="contact-title">Location</p>
              <address>${person.location}</address>
            </div>
          </li>

          <li class="contact-item">
            <div class="icon-box"><ion-icon name="logo-github" aria-hidden="true"></ion-icon></div>
            <div class="contact-info">
              <p class="contact-title">GitHub</p>
              ${ext(person.github, "github.com/utsavkalathiya1602", "contact-link")}
            </div>
          </li>

          <li class="contact-item">
            <div class="icon-box"><ion-icon name="logo-linkedin" aria-hidden="true"></ion-icon></div>
            <div class="contact-info">
              <p class="contact-title">LinkedIn</p>
              ${ext(person.linkedin, "linkedin.com/in/utsavkalathiya1602", "contact-link")}
            </div>
          </li>

        </ul>

      </div>

    </aside>`;

// same labels and order as the homepage tabs, so the menu never changes;
// Blog only exists as a homepage tab, which /#blog opens
const NAV = [
  ["About", "/about"],
  ["Resume", "/resume"],
  ["Portfolio", "/projects"],
  ["Blog", "/#blog"],
  ["Contact", "/contact"],
];

const navbar = (active) => `
      <nav class="navbar" aria-label="Main">

        <ul class="navbar-list">
${NAV.map(([label, href]) => `          <li class="navbar-item">
            <a href="${href}" class="navbar-link${label === active ? " active" : ""}"${label === active ? ' aria-current="page"' : ""}>${label}</a>
          </li>`).join("\n")}
        </ul>

      </nav>`;

export const footer = (indent = "      ") => `<footer class="site-footer">

  <div class="site-footer-brand">
    <p class="site-footer-name">${person.name}</p>
    <p>${person.jobTitle} · ${person.location}</p>
  </div>

  <nav class="site-footer-nav" aria-label="Footer">
    <ul class="site-footer-links">
      <li><a href="/about">About</a></li>
      <li><a href="/experience">Experience</a></li>
      <li><a href="/skills">Skills</a></li>
      <li><a href="/projects">Projects</a></li>
      <li><a href="/resume">Resume</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>

  <ul class="site-footer-social">
    <li>${ext(person.github, '<ion-icon name="logo-github" aria-hidden="true"></ion-icon>GitHub')}</li>
    <li>${ext(person.linkedin, '<ion-icon name="logo-linkedin" aria-hidden="true"></ion-icon>LinkedIn')}</li>
    <li><a href="mailto:${person.email}"><ion-icon name="mail-outline" aria-hidden="true"></ion-icon>Email</a></li>
    <li><a href="/"><ion-icon name="globe-outline" aria-hidden="true"></ion-icon>Portfolio</a></li>
  </ul>

  <p class="site-footer-copy">&copy; <span data-year>${YEAR}</span> ${person.name}. All rights reserved.</p>

</footer>`.split("\n").map((l) => (l ? indent + l : l)).join("\n");

const scripts = (extra = "") => `
  <script src="/assets/js/script.js?v=3"></script>
${extra}
  <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
  <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>`;

const breadcrumbHtml = (trail) => `
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <ol>
${trail.map(([name, path], i) => i === trail.length - 1
    ? `            <li><span aria-current="page">${esc(name)}</span></li>`
    : `            <li><a href="${path}">${esc(name)}</a></li>`).join("\n")}
          </ol>
        </nav>`;

const page = ({ url, title, description, ogType, noindex, graph, active, trail, h1, body, extraScripts }) => `${head({ url, title, description, ogType, noindex, graph })}

<body>

  <a class="skip-link" href="#content">Skip to content</a>

  <main>
${sidebar()}

    <div class="main-content">
${navbar(active)}

      <article class="active" id="content">
${trail ? breadcrumbHtml(trail) : ""}

        <header>
          <h1 class="h2 article-title">${h1}</h1>
        </header>
${body}
      </article>

${footer()}

    </div>

  </main>
${scripts(extraScripts)}

</body>

</html>
`;

function write(relPath, html) {
  const file = join(OUT, relPath);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log("wrote", relPath);
}



// ---------------------------------------------------------------- shared fragments

const tags = (items) => `<ul class="tag-list">${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;

const experienceTimeline = (headingTag = "h3") => `
          <ol class="timeline-list">
${experience.map((e) => `
            <li class="timeline-item">
              <${headingTag} class="h4 timeline-item-title">${esc(e.role)} – ${esc(e.company)}</${headingTag}>
              <span>${esc(e.dates)}${e.companyNote ? ` · ${esc(e.companyNote)}` : ""}</span>
              <div class="timeline-text">
                <ul class="bullet-list">
${e.items.map((it) => `                  <li>${it.title ? `<strong>${esc(it.title)}:</strong> ` : ""}${esc(it.text)}</li>`).join("\n")}
                </ul>
${e.relatedProject ? `                <p>Related project: <a class="text-link" href="${projectUrl(bySlug(e.relatedProject))}">${esc(bySlug(e.relatedProject).name)}</a></p>` : ""}
              </div>
            </li>`).join("\n")}
          </ol>`;

const educationTimeline = (headingTag = "h3") => `
          <ol class="timeline-list">
${education.map((e) => `
            <li class="timeline-item">
              <${headingTag} class="h4 timeline-item-title">${esc(e.title)}</${headingTag}>
              <span>${esc(e.dates)} · ${esc(e.school)}</span>
              <p class="timeline-text">${esc(e.text)}</p>
            </li>`).join("\n")}
          </ol>`;

const projectLinks = (p) => {
  const links = [];
  if (p.live) links.push(`<li>${ext(p.live, '<ion-icon name="open-outline" aria-hidden="true"></ion-icon>Live demo')}</li>`);
  for (const r of p.repos) links.push(`<li>${ext(r.url, `<ion-icon name="logo-github" aria-hidden="true"></ion-icon>${esc(r.label)}`)}</li>`);
  return links.length ? `<ul class="project-links">${links.join("")}</ul>` : "";
};

const projectCard = (p, headingTag = "h2") => {
  const href = p.page ? projectUrl(p) : p.live;
  const external = !p.page;
  const img = p.image
    ? `<img src="${p.image}" alt="${esc(p.imageAlt)}" width="960" height="600" loading="lazy" decoding="async">`
    : `<div class="project-img-placeholder">${esc(p.name)}</div>`;
  return `
            <li class="project-item active">
              <a href="${esc(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>
                <figure class="project-img">
                  <div class="project-item-icon-box"><ion-icon name="eye-outline" aria-hidden="true"></ion-icon></div>
                  ${img}
                </figure>
                <${headingTag} class="project-title">${esc(p.name)}</${headingTag}>
                <p class="project-category">${esc(p.category)}</p>
              </a>
              <p class="project-summary">${esc(p.summary)}</p>
              ${projectLinks(p)}
            </li>`;
};



// ---------------------------------------------------------------- pages

function aboutPage() {
  const url = "/about";
  const title = "About Utsav Kalathiya | Full Stack Developer from Surat, India";
  const description =
    "Utsav Kalathiya is a Full Stack Developer from Surat, Gujarat, India, currently at Elpiora, who builds web and mobile apps with React.js, Node.js, Express.js and MongoDB.";
  const trail = [["Home", "/"], ["About", url]];
  const graph = [
    webPageNode("ProfilePage", url, title, description, {
      mainEntity: personRef,
      about: personRef,
      primaryImageOfPage: { "@type": "ImageObject", url: abs(person.image) },
      dateModified: MODIFIED,
    }),
    personNode(),
    breadcrumbNode(url, trail),
  ];
  const built = projects.filter((p) => p.page);

  const body = `
        <section class="about-text content-section">
          <p class="intro-lead">I'm ${person.name}, a ${person.jobTitle} based in ${person.location}, currently working remotely at ${person.worksFor}. I build web applications with React.js, Node.js, Express.js and MongoDB.</p>
${aboutParagraphs.map((p) => `          <p>${esc(p)}</p>`).join("\n")}
        </section>

        <section class="content-section">
          <h2 class="h3">Quick facts</h2>
          <dl class="fact-list">
            <div><dt>Name</dt><dd>${person.name}</dd></div>
            <div><dt>Role</dt><dd>${person.jobTitle}</dd></div>
            <div><dt>Currently</dt><dd>${esc(experience.find((e) => e.current).role)} at ${person.worksFor}</dd></div>
            <div><dt>Based in</dt><dd>${person.location}</dd></div>
            <div><dt>Core stack</dt><dd>${person.coreStack.join(", ")}</dd></div>
            <div><dt>Also works with</dt><dd>Angular, React Native, MySQL, Tailwind CSS</dd></div>
            <div><dt>Languages</dt><dd>${spokenLanguages.map(([l]) => l).join(", ")}</dd></div>
            <div><dt>Official website</dt><dd><a class="text-link" href="/">utsavkalathiya.vercel.app</a></dd></div>
            <div><dt>GitHub</dt><dd>${ext(person.github, "github.com/utsavkalathiya1602", "text-link")}</dd></div>
            <div><dt>LinkedIn</dt><dd>${ext(person.linkedin, "linkedin.com/in/utsavkalathiya1602", "text-link")}</dd></div>
          </dl>
        </section>

        <section class="content-section">
          <h2 class="h3">What I build</h2>
          <p>Most of my work is full-stack JavaScript: a React.js frontend talking to a REST API built with Node.js and Express.js, backed by MongoDB. Projects I've built include:</p>
          <ul class="bullet-list">
${built.map((p) => `            <li><a class="text-link" href="${projectUrl(p)}">${esc(p.name)}</a> — ${esc(p.summary)}</li>`).join("\n")}
          </ul>
          <p>See all of them on the <a class="text-link" href="/projects">projects page</a>.</p>
        </section>

        <section class="content-section">
          <h2 class="h3">Experience</h2>
          <ul class="bullet-list">
${experience.map((e) => `            <li><strong>${esc(e.role)}</strong>, ${esc(e.company)} (${esc(e.dates)})</li>`).join("\n")}
          </ul>
          <p>Details are on the <a class="text-link" href="/experience">experience page</a>, and the full list of technologies is on the <a class="text-link" href="/skills">skills page</a>.</p>
        </section>

        <section class="content-section">
          <h2 class="h3">Education</h2>
          <ul class="bullet-list">
${education.slice(0, 2).map((e) => `            <li><strong>${esc(e.title)}</strong>, ${esc(e.school)} (${esc(e.dates)})</li>`).join("\n")}
          </ul>
        </section>

        <section class="content-section">
          <h2 class="h3">Find me online</h2>
          <ul class="link-list">
            <li><a href="/resume"><ion-icon name="document-text-outline" aria-hidden="true"></ion-icon>Resume</a></li>
            <li>${ext(person.github, '<ion-icon name="logo-github" aria-hidden="true"></ion-icon>GitHub — utsavkalathiya1602')}</li>
            <li>${ext(person.linkedin, '<ion-icon name="logo-linkedin" aria-hidden="true"></ion-icon>LinkedIn — utsavkalathiya1602')}</li>
            <li><a href="mailto:${person.email}"><ion-icon name="mail-outline" aria-hidden="true"></ion-icon>${person.email}</a></li>
          </ul>
        </section>
`;
  write("about.html", page({ url, title, description, ogType: "profile", graph, active: "About", trail, h1: "About Utsav Kalathiya", body }));
}

function experiencePage() {
  const url = "/experience";
  const title = "Experience | Utsav Kalathiya, Full Stack Developer";
  const description =
    "Work experience of Utsav Kalathiya: remote Full Stack Developer at Elpiora, Full Stack Developer at WRT InfoTech (Angular, React.js, React Native) and intern at NIQOX (MERN stack).";
  const trail = [["Home", "/"], ["Experience", url]];
  const graph = [
    webPageNode("WebPage", url, title, description, { about: personRef, dateModified: MODIFIED }),
    breadcrumbNode(url, trail),
  ];
  const body = `
        <section class="timeline">
          <div class="title-wrapper">
            <div class="icon-box"><ion-icon name="briefcase-outline" aria-hidden="true"></ion-icon></div>
            <h2 class="h3">Work experience</h2>
          </div>
${experienceTimeline("h3")}
        </section>

        <section class="timeline">
          <div class="title-wrapper">
            <div class="icon-box"><ion-icon name="book-outline" aria-hidden="true"></ion-icon></div>
            <h2 class="h3">Education</h2>
          </div>
${educationTimeline("h3")}
        </section>

        <section class="content-section">
          <p>See the <a class="text-link" href="/projects">projects</a> and <a class="text-link" href="/skills">skills</a> pages, or the full <a class="text-link" href="/resume">resume</a>.</p>
        </section>
`;
  write("experience.html", page({ url, title, description, graph, active: "Resume", trail, h1: "Utsav Kalathiya — Experience", body }));
}

function skillsPage() {
  const url = "/skills";
  const title = "Skills | Utsav Kalathiya, Full Stack Developer";
  const description =
    "Technologies Utsav Kalathiya works with: React.js, Angular, Node.js, Express.js, MongoDB, MySQL, PostgreSQL, React Native, JavaScript and TypeScript.";
  const trail = [["Home", "/"], ["Skills", url]];
  const graph = [
    webPageNode("WebPage", url, title, description, { about: personRef, dateModified: MODIFIED }),
    breadcrumbNode(url, trail),
  ];
  const body = `
        <section class="content-section">
          <p>These are the technologies I use in my work and in the projects on this site. Each group notes where it's used.</p>
        </section>

        <section class="content-section">
${skillGroups.map((g) => `          <div class="skill-group">
            <h2 class="h4">${esc(g.name)}</h2>
            ${tags(g.skills)}
            <p class="skill-note">${esc(g.note)}</p>
          </div>`).join("\n\n")}

          <div class="skill-group">
            <h2 class="h4">Spoken languages</h2>
            ${tags(spokenLanguages.map(([l, level]) => `${l} — ${level.toLowerCase()}`))}
          </div>
        </section>

        <section class="content-section">
          <p>See these technologies in use on the <a class="text-link" href="/projects">projects page</a>, or read about my <a class="text-link" href="/experience">experience</a>.</p>
        </section>
`;
  write("skills.html", page({ url, title, description, graph, active: "Resume", trail, h1: "Utsav Kalathiya — Skills", body }));
}

function projectsIndexPage() {
  const url = "/projects";
  const title = "Projects | Utsav Kalathiya, Full Stack Developer";
  const description =
    "Projects by Utsav Kalathiya, including a real estate marketplace, a job portal, a farmer e-commerce platform and a React Native bill-splitting app.";
  const trail = [["Home", "/"], ["Projects", url]];
  const graph = [
    webPageNode("CollectionPage", url, title, description, {
      about: personRef,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: projects.filter((p) => p.page).map((p, i) => ({
          "@type": "ListItem", position: i + 1, url: abs(projectUrl(p)), name: p.name,
        })),
      },
      dateModified: MODIFIED,
    }),
    breadcrumbNode(url, trail),
  ];
  const full = projects.filter((p) => p.page);
  const more = projects.filter((p) => !p.page);
  const body = `
        <section class="content-section">
          <p>Web and mobile applications I've built, mostly with React.js, Node.js, Express.js and MongoDB. Select a project to see its features, tech stack and links.</p>
        </section>

        <section class="projects content-section">
          <h2 class="h3 section-title">Full-stack projects</h2>
          <ul class="project-list">
${full.map((p) => projectCard(p, "h3")).join("\n")}
          </ul>
        </section>

        <section class="projects content-section">
          <h2 class="h3 section-title">More projects &amp; UI work</h2>
          <ul class="project-list">
${more.map((p) => projectCard(p, "h3")).join("\n")}
          </ul>
        </section>

        <section class="content-section">
          <p>More code is on ${ext(person.github, "GitHub", "text-link")}. See also my <a class="text-link" href="/skills">skills</a> and <a class="text-link" href="/about">about page</a>.</p>
        </section>
`;
  write("projects/index.html", page({ url, title, description, graph, active: "Portfolio", trail, h1: "Projects by Utsav Kalathiya", body }));
}

function projectPage(p) {
  const url = projectUrl(p);
  const title = `${p.name} | Project by Utsav Kalathiya`;
  const description = `${p.summary} Built by Utsav Kalathiya.`;
  const trail = [["Home", "/"], ["Projects", "/projects"], [p.name, url]];
  const repo = p.repos[0];
  const work = {
    "@type": repo ? "SoftwareSourceCode" : "CreativeWork",
    "@id": `${abs(url)}#project`,
    name: p.name,
    description: p.summary,
    url: abs(url),
    author: personRef,
    creator: personRef,
    keywords: [...new Set([...(p.frontend || []), ...(p.backend || [])])].join(", "),
    ...(repo ? { codeRepository: repo.url, programmingLanguage: p.languages } : {}),
    ...(p.image ? { image: abs(p.image) } : {}),
    ...(p.live ? { sameAs: [p.live] } : {}),
  };
  const graph = [
    webPageNode("WebPage", url, title, description, { mainEntity: { "@id": work["@id"] }, author: personRef, dateModified: MODIFIED }),
    work,
    breadcrumbNode(url, trail),
  ];
  const others = projects.filter((o) => o.page && o.slug !== p.slug);
  const showHero = p.image && p.heroImage !== false;

  const body = `
${showHero ? `        <figure class="project-hero">
          <img src="${p.image}" alt="${esc(p.imageAlt)}" width="960" height="600" fetchpriority="high">
        </figure>
` : ""}
        <section class="content-section">
          <p class="intro-lead">${esc(p.summary)}</p>
          <dl class="fact-list">
            <div><dt>Developer</dt><dd><a class="text-link" href="/about">${person.name}</a></dd></div>
            <div><dt>Type</dt><dd>${esc(p.category)}</dd></div>
            <div><dt>Language</dt><dd>${esc(p.languages.join(", "))}</dd></div>
            <div><dt>Links</dt><dd>${p.live || p.repos.length ? "See below" : "Not publicly available yet"}</dd></div>
          </dl>
        </section>
${p.features ? `
        <section class="content-section">
          <h2 class="h3">Features</h2>
          <ul class="bullet-list">
${p.features.map((f) => `            <li>${esc(f)}</li>`).join("\n")}
          </ul>
        </section>
` : ""}${p.repoNote ? `
        <section class="content-section">
          <h2 class="h3">What's in the codebase</h2>
          <p>${esc(p.repoNote)}</p>
        </section>
` : ""}
        <section class="content-section">
          <h2 class="h3">Technology</h2>
          <div class="skill-group">
            <h3 class="h5">${p.category === "Mobile app" ? "App" : "Frontend"}</h3>
            ${tags(p.frontend)}
          </div>
          <div class="skill-group">
            <h3 class="h5">Backend</h3>
            ${tags(p.backend)}
          </div>
        </section>

        <section class="content-section">
          <h2 class="h3">Links</h2>
${p.live || p.repos.length ? `          <ul class="link-list">
${p.live ? `            <li>${ext(p.live, '<ion-icon name="open-outline" aria-hidden="true"></ion-icon>Live demo')}</li>\n` : ""}${p.repos.map((r) => `            <li>${ext(r.url, `<ion-icon name="logo-github" aria-hidden="true"></ion-icon>${esc(r.label)} on GitHub`)}</li>`).join("\n")}
          </ul>` : `          <p>The source code and live demo for this project are not publicly linked yet. <a class="text-link" href="/contact">Get in touch</a> to ask about it.</p>`}
        </section>

        <section class="content-section">
          <h2 class="h3">More projects by ${person.name}</h2>
          <ul class="bullet-list">
${others.map((o) => `            <li><a class="text-link" href="${projectUrl(o)}">${esc(o.name)}</a></li>`).join("\n")}
          </ul>
          <p><a class="text-link" href="/projects">All projects</a> · <a class="text-link" href="/about">About ${person.name}</a></p>
        </section>
`;
  write(`projects/${p.slug}.html`, page({ url, title, description, graph, active: "Portfolio", trail, h1: esc(p.name), body }));
}

function resumePage() {
  const url = "/resume";
  const title = "Resume | Utsav Kalathiya, Full Stack Developer";
  const description =
    "Resume of Utsav Kalathiya, Full Stack Developer from Surat, India: experience at Elpiora, WRT InfoTech and NIQOX, key projects, skills and education.";
  const trail = [["Home", "/"], ["Resume", url]];
  const graph = [
    webPageNode("WebPage", url, title, description, { about: personRef, mainEntity: personRef, dateModified: MODIFIED }),
    breadcrumbNode(url, trail),
  ];
  const key = keyProjectSlugs.map(bySlug);
  const body = `
        <section class="content-section">
          <p class="intro-lead">${person.name} · ${person.jobTitle} · ${person.location}</p>
          <ul class="cta-list no-print">
            <li><button type="button" class="cta-link primary print-btn" onclick="window.print()"><ion-icon name="download-outline" aria-hidden="true"></ion-icon>Save as PDF</button></li>
            <li>${ext(person.github, '<ion-icon name="logo-github" aria-hidden="true"></ion-icon>GitHub', "cta-link")}</li>
            <li>${ext(person.linkedin, '<ion-icon name="logo-linkedin" aria-hidden="true"></ion-icon>LinkedIn', "cta-link")}</li>
          </ul>
        </section>

        <section class="content-section">
          <h2 class="h3">Summary</h2>
          <p>${esc(resumeSummary)}</p>
        </section>

        <section class="timeline">
          <div class="title-wrapper">
            <div class="icon-box"><ion-icon name="briefcase-outline" aria-hidden="true"></ion-icon></div>
            <h2 class="h3">Experience</h2>
          </div>
${experienceTimeline("h3")}
        </section>

        <section class="timeline">
          <div class="title-wrapper">
            <div class="icon-box"><ion-icon name="code-slash-outline" aria-hidden="true"></ion-icon></div>
            <h2 class="h3">Key projects</h2>
          </div>
          <ol class="timeline-list">
${key.map((p) => `
            <li class="timeline-item">
              <h3 class="h4 timeline-item-title"><a href="${projectUrl(p)}" style="color: inherit;">${esc(p.name)}</a></h3>
              <span>${esc([...p.frontend.slice(0, 2), ...p.backend.slice(0, 3)].join(", "))}</span>
              <p class="timeline-text">${esc(p.summary)}</p>
            </li>`).join("\n")}
          </ol>
          <p class="skill-note" style="margin-left: 0;">More on the <a class="text-link" href="/projects">projects page</a>.</p>
        </section>

        <section class="content-section">
          <h2 class="h3">Skills</h2>
${skillGroups.filter((g) => !g.name.startsWith("Libraries")).map((g) => `          <p><strong>${esc(g.name)}:</strong> ${esc(g.skills.join(", "))}</p>`).join("\n")}
          <p><strong>Spoken languages:</strong> ${esc(spokenLanguages.map(([l, level]) => `${l} (${level.toLowerCase()})`).join(", "))}</p>
        </section>

        <section class="timeline">
          <div class="title-wrapper">
            <div class="icon-box"><ion-icon name="book-outline" aria-hidden="true"></ion-icon></div>
            <h2 class="h3">Education</h2>
          </div>
${educationTimeline("h3")}
        </section>

        <section class="content-section">
          <h2 class="h3">Contact</h2>
          <ul class="link-list">
            <li><a href="mailto:${person.email}"><ion-icon name="mail-outline" aria-hidden="true"></ion-icon>${person.email}</a></li>
            <li>${ext(person.linkedin, '<ion-icon name="logo-linkedin" aria-hidden="true"></ion-icon>linkedin.com/in/utsavkalathiya1602')}</li>
            <li>${ext(person.github, '<ion-icon name="logo-github" aria-hidden="true"></ion-icon>github.com/utsavkalathiya1602')}</li>
            <li><a href="/"><ion-icon name="globe-outline" aria-hidden="true"></ion-icon>utsavkalathiya.vercel.app</a></li>
          </ul>
        </section>
`;
  write("resume.html", page({ url, title, description, graph, active: "Resume", trail, h1: "Utsav Kalathiya — Resume", body }));
}

function contactPage() {
  const url = "/contact";
  const title = "Contact | Utsav Kalathiya, Full Stack Developer";
  const description =
    "Contact Utsav Kalathiya, Full Stack Developer in Surat, Gujarat, India, by email, LinkedIn or the contact form.";
  const trail = [["Home", "/"], ["Contact", url]];
  const graph = [
    webPageNode("ContactPage", url, title, description, { about: personRef, mainEntity: personRef }),
    breadcrumbNode(url, trail),
  ];
  const body = `
        <section class="content-section">
          <p>The quickest way to reach me is by email or LinkedIn. You can also use the form below.</p>
          <ul class="link-list">
            <li><a href="mailto:${person.email}"><ion-icon name="mail-outline" aria-hidden="true"></ion-icon>${person.email}</a></li>
            <li>${ext(person.linkedin, '<ion-icon name="logo-linkedin" aria-hidden="true"></ion-icon>LinkedIn — utsavkalathiya1602')}</li>
            <li>${ext(person.github, '<ion-icon name="logo-github" aria-hidden="true"></ion-icon>GitHub — utsavkalathiya1602')}</li>
            <li><span style="display:inline-flex;align-items:center;gap:8px;color:var(--light-gray);font-size:var(--fs-6);"><ion-icon name="location-outline" aria-hidden="true"></ion-icon>${person.location}</span></li>
          </ul>
        </section>

        <section class="contact-form">
          <h2 class="h3 form-title">Contact form</h2>
          <form id="contact-form" class="form">
            <div class="input-wrapper">
              <div>
                <label class="form-label" for="contact-name">Full name</label>
                <input id="contact-name" type="text" name="fullname" class="form-input" autocomplete="name" required>
              </div>
              <div>
                <label class="form-label" for="contact-email">Email address</label>
                <input id="contact-email" type="email" name="email" class="form-input" autocomplete="email" required>
              </div>
            </div>
            <label class="form-label" for="contact-message">Message</label>
            <textarea id="contact-message" name="message" class="form-input" required></textarea>
            <button class="form-btn" type="submit">
              <ion-icon name="paper-plane" aria-hidden="true"></ion-icon>
              <span>Send Message</span>
            </button>
          </form>
        </section>
`;
  const extraScripts = `  <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js" defer></script>
  <script src="/assets/js/contact-form.js" defer></script>`;
  write("contact.html", page({ url, title, description, graph, active: "Contact", trail, h1: "Contact Utsav Kalathiya", body, extraScripts }));
}

function notFoundPage() {
  const body = `
        <section class="content-section">
          <p>Sorry, the page you're looking for doesn't exist or has moved. You're on the portfolio of ${person.name}, ${person.jobTitle}.</p>
          <ul class="cta-list">
            <li><a class="cta-link primary" href="/"><ion-icon name="home-outline" aria-hidden="true"></ion-icon>Back to home</a></li>
            <li><a class="cta-link" href="/projects"><ion-icon name="code-slash-outline" aria-hidden="true"></ion-icon>Projects</a></li>
            <li><a class="cta-link" href="/about"><ion-icon name="person-outline" aria-hidden="true"></ion-icon>About</a></li>
          </ul>
        </section>
`;
  write("404.html", page({
    url: "/404", title: `Page not found | ${person.name}`, description: "This page could not be found.",
    noindex: true, graph: null, active: null, trail: null, h1: "Page not found", body,
  }));
}



// ---------------------------------------------------------------- homepage sync + sitemap

function syncHomepage() {
  const file = join(OUT, "index.html");
  let html = readFileSync(file, "utf8");
  const title = "Utsav Kalathiya | Full Stack Developer | React, Node.js & MERN";
  const graph = [
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE}/`,
      name: person.name,
      description: `Official portfolio of ${person.name}, ${person.jobTitle}.`,
      inLanguage: "en",
      publisher: personRef,
      about: personRef,
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE}/#webpage`,
      url: `${SITE}/`,
      name: title,
      inLanguage: "en",
      isPartOf: websiteRef,
      mainEntity: personRef,
      about: personRef,
      dateModified: MODIFIED,
    },
    personNode(),
  ];
  const replaceBlock = (name, content) => {
    const re = new RegExp(`(<!-- generated:${name} -->)[\\s\\S]*?(<!-- /generated:${name} -->)`);
    if (!re.test(html)) throw new Error(`index.html is missing the generated:${name} markers`);
    html = html.replace(re, `$1\n${content}\n  $2`);
  };
  replaceBlock("jsonld", `  ${jsonLd(graph)}`);
  replaceBlock("footer", footer("      "));
  writeFileSync(file, html);
  console.log("synced index.html");
}

function sitemap() {
  const urls = [
    ["/", "1.0"],
    ["/about", "0.9"],
    ["/projects", "0.8"],
    ...projects.filter((p) => p.page).map((p) => [projectUrl(p), "0.7"]),
    ["/experience", "0.7"],
    ["/skills", "0.7"],
    ["/resume", "0.8"],
    ["/contact", "0.5"],
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([path, priority]) => `  <url>
    <loc>${abs(path === "/" ? "/" : path)}</loc>
    <lastmod>${TODAY}</lastmod>
    <priority>${priority}</priority>
  </url>`).join("\n")}
</urlset>
`;
  write("sitemap.xml", xml);
}

aboutPage();
experiencePage();
skillsPage();
projectsIndexPage();
projects.filter((p) => p.page).forEach(projectPage);
resumePage();
contactPage();
notFoundPage();
syncHomepage();
sitemap();
