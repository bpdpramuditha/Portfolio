import { useEffect, useState } from "react";
import Typed from "typed.js";
import profilePic from "./assets/profile.png";
import "./App.css";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  // Typed.js for animated titles
  useEffect(() => {
    const typed = new Typed(".typed-text", {
      strings: ["Frontend Developer", "Web Developer", "Backend Developer"],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  // Animate circular skill bars
  useEffect(() => {
    const circles = document.querySelectorAll(".circle");
    circles.forEach((circle, index) => {
      const target = circle.getAttribute("data-target");
      let current = 0;
      const interval = setInterval(() => {
        if (current >= target) clearInterval(interval);
        else current++;
        circle.style.setProperty("--percent", `${current}%`);
        circle.querySelector("span").textContent = `${current}%`;
      }, 15); // speed of count-up
    });
  }, []);

  // Scroll spy for navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPos = window.scrollY + 150;

      sections.forEach((section) => {
        if (
          scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Data arrays
  const technicalSkills = [
    {
      name: "HTML",
      icon: "bx bxl-html5",
      style: { color: "#c95d2e" },
      percent: "90%",
    },
    {
      name: "CSS",
      icon: "bx bxl-css3",
      style: { color: "#147bbc" },
      percent: "80%",
    },
    {
      name: "JavaScript",
      icon: "bx bxl-javascript",
      style: { color: "#b0bc1e" },
      percent: "70%",
    },
    {
      name: "Python",
      icon: "bx bxl-python",
      style: { color: "#c32ec9" },
      percent: "90%",
    },
    {
      name: "Java",
      icon: "bx bxl-java",
      style: { color: "#127093ff" },
      percent: "95%",
    },
    {
      name: "React",
      icon: "bx bxl-react",
      style: { color: "#69bcbc" },
      percent: "95%",
    },
    {
      name: "Node",
      icon: "bx bxl-nodejs",
      style: { color: "#3f873f" },
      percent: "75%",
    },
  ];

  const professionalSkills = [
    { name: "Creativity", percent: 90 },
    { name: "Problem Solving", percent: 75 },
    { name: "Teamwork", percent: 85 },
    { name: "Communication", percent: 65 },
    { name: "Adaptability", percent: 65 },
  ];

  return (
    <>
      {/* Header */}
      <header className="header">
        <a href="#home" className="logo">
          Portfolio.
        </a>
        <nav className="navbar">
          <a className={activeSection === "home" ? "active" : ""} href="#home">
            Home
          </a>
          <a
            className={activeSection === "about" ? "active" : ""}
            href="#about"
          >
            About
          </a>
          <a
            className={activeSection === "skills" ? "active" : ""}
            href="#skills"
          >
            Skills
          </a>
          <a
            className={activeSection === "services" ? "active" : ""}
            href="#services"
          >
            Services
          </a>
          <a
            className={activeSection === "contact" ? "active" : ""}
            href="#contact"
          >
            Contact
          </a>
        </nav>
      </header>

      {/* Home Section */}
      <section className="home" id="home">
        <div className="home-content">
          <h3>Hello, I am</h3>
          <h1>Denith Pramuditha</h1>
          <h3>
            And I'm a <span className="typed-text"></span>
          </h3>
          <p>
            Welcome to my portfolio website. Here you’ll find my projects and
            achievements.
          </p>
          <div className="home-scl">
            <a href="https://www.facebook.com/denith.pramuditha/">
              <i className="bx bxl-facebook"></i>
            </a>
            <a href="https://www.instagram.com/denith_pramuditha/">
              <i className="bx bxl-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/in/denith-pramuditha/">
              <i className="bx bxl-linkedin"></i>
            </a>
            <a href="https://github.com/bpdpramuditha">
              <i className="bx bxl-github"></i>
            </a>
          </div>
          <a href="#about" className="btn">
            More About Me
          </a>
        </div>
        <div className="home-img">
          <img src={profilePic} alt="profile" />
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="about-img">
          <img src={profilePic} alt="about" />
        </div>
        <div className="about-txt">
          <h2>About Me</h2>
          <h4>Full Stack Developer</h4>
          <p>
            A self-driven individual who is passionate about developing robust,
            scalable applications and experienced in full-stack development with
            one year of experience. Skilled in designing, developing, and
            optimizing software solutions, I thrive on solving complex business
            challenges through innovative technology. With a strong foundation
            in both front-end and back-end development, I excel in creating
            seamless user experiences and efficient system architectures. Adept
            at working in agile environments, I am always eager to learn and
            integrate emerging technologies to enhance performance and security.
            My problem-solving mindset, coupled with a keen eye for detail,
            enables me to build reliable, high-performing applications that
            drive business growth.
          </p>
          <a href="#contact" className="btn">
            Contact Me
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services">
        <div className="container">
          <h1 className="sub-title">My Services</h1>
          <div className="services-list">
            <div>
              <i className="bx bx-code"></i>
              <h2>Web Development</h2>
              <p>
                I build responsive and user-friendly websites using modern
                front-end and back-end technologies.
              </p>
              <a href="#" className="read">
                Learn more
              </a>
            </div>
            <div>
              <i className="bx bx-crop"></i>
              <h2>Frontend Development</h2>
              <p>
                I create responsive, interactive, and visually appealing
                websites using HTML, CSS, JavaScript, and modern frameworks.
              </p>
              <a href="#" className="read">
                Learn more
              </a>
            </div>
            <div>
              <i className="bx bxl-apple"></i>
              <h2>Backend Development</h2>
              <p>
                I build secure and scalable back-end systems with strong APIs
                and efficient databases.
              </p>
              <a href="#" className="read">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills">
        <h2 className="skills-title">My Skills</h2>
        <div className="skills-wrapper">
          {/* Technical Skills */}
          <div className="skill-card">
            <h3>Technical Skills</h3>
            {technicalSkills.map((skill) => (
              <div className="skill" key={skill.name}>
                <i className={skill.icon} style={skill.style}></i>
                <p>{skill.name}</p>
                <div className="progress-bar">
                  <span style={{ "--target-width": skill.percent }}></span>
                </div>
                <span className="percent">{skill.percent}</span>
              </div>
            ))}
          </div>

          {/* Professional Skills */}
          <div className="skill-card">
            <h3>Professional Skills</h3>
            <div className="skills-grid">
              {professionalSkills.map((skill) => (
                <div className="circular-skill" key={skill.name}>
                  <div
                    className="circle"
                    style={{ "--percent": "0%" }}
                    data-target={skill.percent}
                  >
                    <span>0%</span>
                  </div>
                  <p>{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-title">
          <h2>Contact Me</h2>
          <h4>Let's work Together</h4>
          <p>
            I’m currently open to full-time, part-time, or freelance developer
            roles. If you have a position or project that fits my skills, let’s
            connect!
          </p>
          <div className="contact-list">
            <li>
              <i className="bx bxs-send">bpdpramuditha@gmail.com</i>
            </li>
            <li>
              <i className="bx bxs-phone">+94702618507 </i>
            </li>
          </div>
          <div className="contact-icons">
            <a href="https://www.facebook.com/denith.pramuditha/">
              <i className="bx bxl-facebook"></i>
            </a>
            <a href="https://www.instagram.com/denith_pramuditha/">
              <i className="bx bxl-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/in/denith-pramuditha/">
              <i className="bx bxl-linkedin"></i>
            </a>
            <a href="https://github.com/bpdpramuditha">
              <i className="bx bxl-github"></i>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
