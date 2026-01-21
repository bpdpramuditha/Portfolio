import { useEffect, useMemo, useRef, useState } from "react";
import Typed from "typed.js";
import emailjs from "@emailjs/browser";
import profilePic from "./assets/profile.png";
import "./App.css";

const SECTIONS = ["home", "about", "projects", "skills", "contact"];

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [showTop, setShowTop] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const formRef = useRef(null);
  const [status, setStatus] = useState("");

  const toggleMenu = () => setMenuActive((v) => !v);

  // Your data (keep/edit as you like)
  const socialLinks = useMemo(
    () => [
      {
        icon: "bx bxl-linkedin",
        href: "https://www.linkedin.com/in/denith-pramuditha/",
      },
      { icon: "bx bxl-github", href: "https://github.com/bpdpramuditha" },
      {
        icon: "bx bxl-instagram",
        href: "https://www.instagram.com/denith_pramuditha/",
      },
      {
        icon: "bx bxl-facebook",
        href: "https://www.facebook.com/denith.pramuditha/",
      },
    ],
    [],
  );

  const projects = useMemo(
    () => [
      {
        title: "RoamCeylon",
        desc: "AI-powered itinerary planning with embeddings + vector search + explainable ranking.",
        tags: ["NestJS", "RAG", "PostgreSQL", "Embeddings"],
        links: [
          { label: "GitHub", href: "https://github.com/bpdpramuditha" },
          // { label: "Live", href: "https://..." },
        ],
      },
      {
        title: "MedRead (Lung Cancer Report Analyzer)",
        desc: "NLP + CNN based platform to read, interpret, and summarize lung cancer medical reports with explainable AI (XAI) for transparency and trust.",
        tags: ["NLP", "CNN", "XAI", "Healthcare", "Web App"],
        links: [
          // Replace with your real links
          { label: "GitHub", href: "https://github.com/bpdpramuditha" },
          // { label: "Demo", href: "https://your-demo-link.com" },
        ],
      },
      {
        title: "Travel Blogging Web App",
        desc: "Mobile-style app with auth, posts, likes/dislikes, feed personalization.",
        tags: ["Node.js", "jQuery", "Bootstrap", "MySQL"],
        links: [{ label: "GitHub", href: "https://github.com/bpdpramuditha" }],
      },
      {
        title: "Crypto Signal Platform",
        desc: "Signal scanning + confidence filtering + tracking (bot-style workflow).",
        tags: ["Python", "APIs", "Automation"],
        links: [{ label: "GitHub", href: "https://github.com/bpdpramuditha" }],
      },
    ],
    [],
  );

  const technicalSkills = useMemo(
    () => [
      { name: "HTML", level: 70, icon: "bx bxl-html5" },
      { name: "CSS", level: 70, icon: "bx bxl-css3" },
      { name: "JavaScript", level: 65, icon: "bx bxl-javascript" },
      { name: "React", level: 70, icon: "bx bxl-react" },
      { name: "Node.js", level: 70, icon: "bx bxl-nodejs" },
      { name: "Python", level: 65, icon: "bx bxl-python" },
      { name: "Java", level: 65, icon: "bx bxl-java" },
    ],
    [],
  );

  const softSkills = useMemo(
    () => [
      { name: "Problem Solving", level: 80 },
      { name: "Teamwork", level: 85 },
      { name: "Adaptability", level: 85 },
      { name: "Communication", level: 65 },
      { name: "Creativity", level: 80 },
    ],
    [],
  );

  // Scroll → show "top" button
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 240);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Typed.js
  useEffect(() => {
    const typed = new Typed(".typed-text", {
      strings: [
        "Full Stack Application",
        "AI-Driven Application",
        "Web Application",
      ],
      typeSpeed: 75,
      backSpeed: 45,
      backDelay: 1200,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  // Scroll spy (active nav)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside / resizing
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 860) setMenuActive(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          formRef.current?.reset?.();
          setTimeout(() => setStatus(""), 3000);
        },
        (error) => {
          setStatus("❌ Failed to send message.");
          console.error("EmailJS Error:", error);
          setTimeout(() => setStatus(""), 3000);
        },
      );
  };

  return (
    <>
      {/* Background glow */}
      <div className="bg-glow" aria-hidden="true" />

      {/* Header */}
      <header className="header">
        <a href="#home" className="logo" onClick={() => setMenuActive(false)}>
          Denith<span className="dot">.</span>
        </a>

        <button
          className={`hamburger ${menuActive ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          aria-expanded={menuActive}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar ${menuActive ? "active" : ""}`}>
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? "active" : ""}
              onClick={() => setMenuActive(false)}
            >
              {id === "home"
                ? "Home"
                : id === "about"
                  ? "About"
                  : id === "projects"
                    ? "Projects"
                    : id === "skills"
                      ? "Skills"
                      : "Contact"}
            </a>
          ))}
          <a
            className="nav-cta"
            href="#contact"
            onClick={() => setMenuActive(false)}
          >
            Let’s Talk
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="section hero" id="home">
        <div className="container hero-grid">
          <div className="hero-content">
            <p className="badge">
              <i className="bx bx-sparkles" /> Available for internships /
              junior roles
            </p>

            <h1 className="hero-title">
              Hi, I’m <span className="accent">Denith Pramuditha</span>
            </h1>

            <h2 className="hero-sub">
              I build <span className="typed-text" />{" "}
              <span className="cursor" aria-hidden="true" />
            </h2>

            <p className="hero-desc">
              I’m a software engineer focused on clean UI, scalable backend
              services, and AI-powered product features (RAG, embeddings, and
              explainable ranking).
            </p>

            <div className="hero-actions">
              <a className="btn primary" href="#projects">
                View Projects <i className="bx bx-right-arrow-alt" />
              </a>
              <a className="btn ghost" href="#contact">
                Contact <i className="bx bx-send" />
              </a>
            </div>

            <div className="social-row">
              {socialLinks.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="hero-media">
            <div className="avatar-wrap">
              <img
                src={profilePic}
                alt="Denith Pramuditha"
                className="avatar"
              />
            </div>

            <div className="mini-cards">
              <div className="mini-card">
                <p className="mini-top">Focus</p>
                <p className="mini-main">AI + Full Stack</p>
              </div>
              <div className="mini-card">
                <p className="mini-top">Stack</p>
                <p className="mini-main">React • Node • NestJS</p>
              </div>
              <div className="mini-card">
                <p className="mini-top">Interests</p>
                <p className="mini-main">RAG • Embeddings • XAI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="container">
          <div className="section-head">
            <h2>About</h2>
            <p>
              Self-driven developer passionate about building robust
              applications and AI-powered features with strong engineering
              fundamentals.
            </p>
          </div>

          <div className="about-grid">
            <div className="card about-card">
              <h3>Who I am</h3>
              <p>
                I design and develop modern web apps with a focus on
                performance, maintainability, and great user experience. I enjoy
                turning real problems into clean solutions—end to end.
              </p>

              <div className="about-stats">
                <div className="stat">
                  <p className="stat-num">1+</p>
                  <p className="stat-label">Year Experience</p>
                </div>
                <div className="stat">
                  <p className="stat-num">10+</p>
                  <p className="stat-label">Projects Built</p>
                </div>
                <div className="stat">
                  <p className="stat-num">AI</p>
                  <p className="stat-label">RAG + Embeddings</p>
                </div>
              </div>

              <div className="about-actions">
                <a className="btn primary" href="#contact">
                  Hire / Collaborate <i className="bx bx-briefcase" />
                </a>
                <a className="btn ghost" href="#skills">
                  View Skills <i className="bx bx-bar-chart-alt-2" />
                </a>
              </div>
            </div>

            <div className="card about-card">
              <h3>What I do</h3>
              <ul className="bullets">
                <li>
                  <i className="bx bx-check-circle" />
                  Frontend: responsive UI, animations, clean components
                </li>
                <li>
                  <i className="bx bx-check-circle" />
                  Backend: REST APIs, auth, DB design, scalable services
                </li>
                <li>
                  <i className="bx bx-check-circle" />
                  AI features: embeddings search, ranking, explainable outputs
                </li>
              </ul>

              <div className="chip-row">
                {[
                  "React",
                  "Node.js",
                  "NestJS",
                  "PostgreSQL",
                  "MongoDB",
                  "Docker",
                ].map((x) => (
                  <span className="chip" key={x}>
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section" id="projects">
        <div className="container">
          <div className="section-head">
            <h2>Projects</h2>
          </div>

          <div className="grid projects">
            {projects.map((p) => (
              <article className="card project-card" key={p.title}>
                <div className="project-top">
                  <h3>{p.title}</h3>
                  <i className="bx bx-layer project-ico" />
                </div>
                <p className="muted">{p.desc}</p>

                <div className="tag-row">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      className="link-btn"
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {l.label} <i className="bx bx-link-external" />
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section" id="skills">
        <div className="container">
          <div className="section-head">
            <h2>Skills</h2>
            <p>
              Balanced focus on engineering fundamentals + modern development
              tools.
            </p>
          </div>

          <div className="skills-grid-modern">
            <div className="card">
              <h3 className="card-title">Technical</h3>

              <div className="skill-list">
                {technicalSkills.map((s) => (
                  <div className="skill-row" key={s.name}>
                    <div className="skill-name">
                      <i className={s.icon} />
                      <span>{s.name}</span>
                    </div>
                    <div
                      className="skill-bar"
                      aria-label={`${s.name} ${s.level}%`}
                    >
                      <span style={{ width: `${s.level}%` }} />
                    </div>
                    <span className="skill-val">{s.level}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Professional</h3>

              <div className="soft-list">
                {softSkills.map((s) => (
                  <div className="soft-row" key={s.name}>
                    <div className="soft-top">
                      <span>{s.name}</span>
                      <span className="skill-val">{s.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <span style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section" id="contact">
        <div className="container">
          <div className="section-head">
            <h2>Contact</h2>
            <p>
              Let’s build something. Send a message and I’ll get back to you.
            </p>
          </div>

          <div className="contact-grid">
            <div className="card contact-card">
              <h3 className="card-title">Details</h3>
              <ul className="contact-list">
                <li>
                  <i className="bx bxs-send" />
                  <a href="mailto:bpdpramuditha@gmail.com">
                    bpdpramuditha@gmail.com
                  </a>
                </li>
                <li>
                  <i className="bx bxs-phone" />
                  <span>+94 70 261 8507</span>
                </li>
              </ul>

              <div className="social-row">
                {socialLinks.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={s.icon} />
                  </a>
                ))}
              </div>
            </div>

            <div className="card contact-card">
              <h3 className="card-title">Message me</h3>
              <form ref={formRef} onSubmit={sendEmail} className="form">
                <div className="form-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    required
                  />
                </div>

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject (optional)"
                />
                <textarea name="message" placeholder="Your message" required />

                <button className="btn primary full" type="submit">
                  Send Message <i className="bx bx-send" />
                </button>

                {status && (
                  <p
                    className={`form-status ${status.includes("✅") ? "success" : "error"}`}
                  >
                    {status}
                  </p>
                )}
              </form>
            </div>
          </div>

          <footer className="footer">
            <p>
              © {new Date().getFullYear()} Denith Pramuditha • Built with React
            </p>
          </footer>
        </div>
      </section>

      <a
        href="#home"
        className={`top ${showTop ? "show" : ""}`}
        aria-label="Back to top"
      >
        <i className="bx bx-up-arrow-alt" />
      </a>
    </>
  );
}

export default App;
