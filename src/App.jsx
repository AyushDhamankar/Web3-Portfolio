import "./App.css";
import Web3 from "web3";
import abi from "./ABI.json";
import { useRef, useState, useEffect } from "react";

function App() {
  const [account, setAccount] = useState("");
  const [about, setAbout] = useState("");
  const [experience, setExperience] = useState("");
  const [education1, setEducation1] = useState("");
  const [education2, setEducation2] = useState("");
  const [project, setProject] = useState("");
  const [gmail, setGmail] = useState("");
  const [linkedln, setLinkedln] = useState("");
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  useEffect(() => {
    const init = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const contract = new web3.eth.Contract(
          abi,
          "0xD7d719ebEb72e299Cb3a20D839d8911CF088e2f4"
        );
        setState({ web3: web3, contract: contract });
        console.log(state);
        setAccount(accounts[0]);

        const aboutme = await contract.methods.about_me().call();
        setAbout(aboutme);

        const experience = await contract.methods.experiencelist(0).call();
        setExperience(experience);

        const edu1 = await contract.methods.education(0).call();
        setEducation1(edu1);
        const edu2 = await contract.methods.education(1).call();
        setEducation2(edu2);

        const project = await contract.methods.getproj().call();
        setProject(project);

        const gmail = await contract.methods.gmail().call();
        setGmail("mailto:" + gmail);
        console.log("mailto:" + gmail);

        const linkedln = await contract.methods.linkedln().call();
        setLinkedln(linkedln);
      } catch (error) {
        console.log("Please Install Metamask");
      }
    };
    init();
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const experienceSection = useRef(null);
  const projectSection = useRef(null);
  const contactSection = useRef(null);
  return (
    <>
      {account !== "" ? (
        <>
          <nav id="desktop-nav">
            <div class="logo">Ayush</div>
            <div>
              <ul class="nav-links">
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#experience">Experience</a>
                </li>
                <li>
                  <a href="#projects">Projects</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>
          </nav>
          <nav id="hamburger-nav">
            <div class="logo">Ayush</div>
            <div class="hamburger-menu">
              <div
                class="hamburger-icon"
                className={`hamburger-icon ${menuOpen ? "open" : ""}`}
                onClick={toggleMenu}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className={`menu-links ${menuOpen ? "open" : ""}`}>
                <li>
                  <a href="#about" onClick={toggleMenu}>
                    About
                  </a>
                </li>
                <li>
                  <a href="#experience" onClick={toggleMenu}>
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#projects" onClick={toggleMenu}>
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={toggleMenu}>
                    Contact
                  </a>
                </li>
              </div>
            </div>
          </nav>
          <section id="profile">
            <div class="section__pic-container">
              {/* <img src="./assets/profile-pic.png" alt="John Doe profile picture" /> */}
              <lottie-player
                src="https://assets5.lottiefiles.com/packages/lf20_ghs9bkkc.json"
                alt="profilePhoto"
                background="transparent"
                speed="1"
                loop=""
                autoplay="true"
                style={{ width: "100%", height: "100%", marginBottom: "220px" }}
              ></lottie-player>
            </div>
            <div class="section__text">
              <p class="section__text__p1">Hello, I'm</p>
              <h1 class="title">Ayush Dhamankar</h1>
              <p class="section__text__p2">Frontend + Blockchain Developer</p>
              <div class="btn-container">
                <button
                  class="btn btn-color-2"
                  onclick="window.open('./assets/resume-example.pdf')"
                >
                  Download CV
                </button>
                <button
                  class="btn btn-color-1"
                  onClick={() => {
                    contactSection.current.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  Contact Info
                </button>
              </div>
            </div>
          </section>
          <section id="about">
            <p class="section__text__p1">Get To Know More</p>
            <h1 class="title">About Me</h1>
            <div class="section-container">
              <div class="about-details-container">
                <div class="about-containers">
                  <div class="details-container">
                    <img
                      src="https://res.cloudinary.com/darrqmepw/image/upload/v1689436672/Web%203.0%20Portfolio%20Images/experience_vpxehv.png"
                      alt="Experience icon"
                      class="icon"
                    />
                    <h3>Experience</h3>
                    <p>{experience[0]}</p>
                    <p>{experience[1]}</p>
                  </div>
                  <div class="details-container">
                    <img
                      src="https://res.cloudinary.com/darrqmepw/image/upload/v1689436672/Web%203.0%20Portfolio%20Images/education_liu3k7.png"
                      alt="Education icon"
                      class="icon"
                    />
                    <h3>Education</h3>
                    <p>{education1}</p>
                    <p>{education2}</p>
                  </div>
                </div>
                <div class="text-container" style={{ textAlign: "center" }}>
                  <p>{about}</p>
                </div>
              </div>
            </div>
            <img
              src="https://res.cloudinary.com/darrqmepw/image/upload/v1689436677/Web%203.0%20Portfolio%20Images/arrow_zansox.png"
              alt="Arrow icon"
              class="icon arrow"
              onClick={() => {
                experienceSection.current.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            />
          </section>
          <section id="experience" ref={experienceSection}>
            <p class="section__text__p1">Explore My</p>
            <h1 class="title">Experience</h1>
            <div class="experience-details-container">
              <div class="about-containers">
                <div class="details-container">
                  <h2 class="experience-sub-title">Frontend Development</h2>
                  <div class="article-container">
                    <article>
                      <img
                        src="https://res.cloudinary.com/darrqmepw/image/upload/v1689436672/Web%203.0%20Portfolio%20Images/checkmark_vwxfrt.png"
                        alt="Experience icon"
                        class="icon"
                      />
                      <div>
                        <h3>HTML</h3>
                        <p>Experienced</p>
                      </div>
                    </article>
                    <article>
                      <img
                        src="https://res.cloudinary.com/darrqmepw/image/upload/v1689436672/Web%203.0%20Portfolio%20Images/checkmark_vwxfrt.png"
                        alt="Experience icon"
                        class="icon"
                      />
                      <div>
                        <h3>CSS</h3>
                        <p>Experienced</p>
                      </div>
                    </article>
                    <article>
                      <img
                        src="https://res.cloudinary.com/darrqmepw/image/upload/v1689436672/Web%203.0%20Portfolio%20Images/checkmark_vwxfrt.png"
                        alt="Experience icon"
                        class="icon"
                      />
                      <div>
                        <h3>React JS</h3>
                        <p>Intermediate</p>
                      </div>
                    </article>
                    <article>
                      <img
                        src="https://res.cloudinary.com/darrqmepw/image/upload/v1689436672/Web%203.0%20Portfolio%20Images/checkmark_vwxfrt.png"
                        alt="Experience icon"
                        class="icon"
                      />
                      <div>
                        <h3>JavaScript</h3>
                        <p>Basic</p>
                      </div>
                    </article>
                    <article>
                      <img
                        src="https://res.cloudinary.com/darrqmepw/image/upload/v1689436672/Web%203.0%20Portfolio%20Images/checkmark_vwxfrt.png"
                        alt="Experience icon"
                        class="icon"
                      />
                      <div>
                        <h3>TypeScript</h3>
                        <p>Basic</p>
                      </div>
                    </article>
                    <article>
                      <img
                        src="https://res.cloudinary.com/darrqmepw/image/upload/v1689436672/Web%203.0%20Portfolio%20Images/checkmark_vwxfrt.png"
                        alt="Experience icon"
                        class="icon"
                      />
                      <div>
                        <h3>Material UI</h3>
                        <p>Intermediate</p>
                      </div>
                    </article>
                  </div>
                </div>
                <div class="details-container">
                  <h2 class="experience-sub-title">Blockchain Development</h2>
                  <div class="article-container">
                    <article>
                      <img
                        src="https://res.cloudinary.com/darrqmepw/image/upload/v1689436672/Web%203.0%20Portfolio%20Images/checkmark_vwxfrt.png"
                        alt="Experience icon"
                        class="icon"
                      />
                      <div>
                        <h3>Solidity</h3>
                        <p>Intermediate</p>
                      </div>
                    </article>
                    <article>
                      <img
                        src="https://res.cloudinary.com/darrqmepw/image/upload/v1689436672/Web%203.0%20Portfolio%20Images/checkmark_vwxfrt.png"
                        alt="Experience icon"
                        class="icon"
                      />
                      <div>
                        <h3>Web3.js</h3>
                        <p>Intermediate</p>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
            <img
              src="https://res.cloudinary.com/darrqmepw/image/upload/v1689436677/Web%203.0%20Portfolio%20Images/arrow_zansox.png"
              alt="Arrow icon"
              class="icon arrow"
              onClick={() => {
                projectSection.current.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </section>
          <section id="projects" ref={projectSection}>
            <p class="section__text__p1">Browse My Recent</p>
            <h1 class="title">Projects</h1>
            <div class="experience-details-container">
              <div class="about-containers">
                {project !== "" &&
                  project.map((project) => {
                    return (
                      <div class="details-container color-container">
                        <div class="article-container">
                          <img
                            src={project[1]}
                            alt="ECG Monitoring System using AD8232"
                            class="project-img"
                          />
                        </div>
                        <h2 class="experience-sub-title project-title">
                          {project[0]}
                        </h2>
                        <div class="btn-container">
                          <a
                            class="btn btn-color-2 project-btn"
                            href={project[2]}
                            style={{ textDecoration: "none" }}
                          >
                            Github
                          </a>
                          <a
                            class="btn btn-color-2 project-btn"
                            href={project[3]}
                            style={{ textDecoration: "none" }}
                          >
                            Live Demo
                          </a>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <img
              src="https://res.cloudinary.com/darrqmepw/image/upload/v1689436677/Web%203.0%20Portfolio%20Images/arrow_zansox.png"
              alt="Arrow icon"
              class="icon arrow"
              onClick={() => {
                contactSection.current.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </section>
          <section id="contact" ref={contactSection}>
            <p class="section__text__p1">Get in Touch</p>
            <h1 class="title">Contact Me</h1>
            <div class="contact-info-upper-container">
              <div class="contact-info-container">
                <img
                  src="https://res.cloudinary.com/darrqmepw/image/upload/v1689436673/Web%203.0%20Portfolio%20Images/email_rosjgp.png"
                  alt="Email icon"
                  class="icon contact-icon email-icon"
                />
                <p>
                  <a href={gmail} style={{ marginRight: "0.5rem" }}>
                    abc@gmail.com
                  </a>
                </p>
              </div>
              <div class="contact-info-container">
                <img
                  src="https://res.cloudinary.com/darrqmepw/image/upload/v1689436673/Web%203.0%20Portfolio%20Images/linkedin_augqxv.png"
                  alt="LinkedIn icon"
                  class="icon contact-icon"
                />
                <p>
                  <a href={linkedln} style={{ marginRight: "0.5rem" }}>
                    LinkedIn
                  </a>
                </p>
              </div>
            </div>
          </section>
          <footer>
            <nav>
              <div class="nav-links-container">
                <ul class="nav-links">
                  <li>
                    <a href="#about">About</a>
                  </li>
                  <li>
                    <a href="#experience">Experience</a>
                  </li>
                  <li>
                    <a href="#projects">Projects</a>
                  </li>
                  <li>
                    <a href="#contact">Contact</a>
                  </li>
                </ul>
              </div>
            </nav>
            <p>Copyright &#169; 2023 Ayush Dhamankar. All Rights Reserved.</p>
          </footer>
        </>
      ) : (
        <div class="main">
          <div class="glitch">
            <div class="text">Connect to Metamask</div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
