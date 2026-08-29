import { Routes, Route } from "react-router-dom";

// =====================================================
// PORTFOLIO COMPONENTS
// =====================================================

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import Hero from "./components/portfolio/Hero";
import About from "./components/portfolio/About";
import Education from "./components/portfolio/Education";
import Experience from "./components/portfolio/Experience";
import Skills from "./components/portfolio/Skills";
import Projects from "./components/portfolio/Projects";
import Certification from "./components/portfolio/Certifications";
import CodingStats from "./components/portfolio/CodingStats";
import Resume from "./components/portfolio/Resume";
import Contact from "./components/portfolio/Contact";

// =====================================================
// BLOG COMPONENTS
// =====================================================

import BlogList from "./components/blog/BlogList";
import BlogPost from "./pages/BlogPost";

// =====================================================
// ADMIN COMPONENTS
// =====================================================

import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";

import Posts from "./pages/admin/Posts";
import CreatePost from "./pages/admin/CreatePost";
import EditPost from "./pages/admin/EditPost";

import ProjectsAdmin from "./pages/admin/Projects";
import Messages from "./pages/admin/Messages";
import Comments from "./pages/admin/Comments";

// =====================================================
// ADMIN EDUCATION
// =====================================================

import EducationAdmin from "./pages/admin/Education";
import CreateEducation from "./pages/admin/CreateEducation";
import EditEducation from "./pages/admin/EditEducation";

// =====================================================
// ADMIN EXPERIENCE
// =====================================================

import ExperienceAdmin from "./pages/admin/Experience";

// =====================================================
// ADMIN SKILLS
// =====================================================

import SkillsAdmin from "./pages/admin/Skills";

// =====================================================
// ADMIN CERTIFICATIONS
// =====================================================

import CertificationsAdmin from "./pages/admin/Certifications";

// =====================================================
// PORTFOLIO CSS
// =====================================================

import "./components/portfolio/Hero.css";
import "./components/portfolio/about.css";
import "./components/portfolio/Education.css";
import "./components/portfolio/Experience.css";
import "./components/portfolio/Skills.css";
import "./components/portfolio/Projects.css";
import "./components/portfolio/Certifications.css";
import "./components/portfolio/Stats.css";
import "./components/portfolio/CodingStats.css";
import "./components/portfolio/Resume.css";
import "./components/portfolio/Contact.css";

// =====================================================
// BLOG CSS
// =====================================================

import "./components/blog/Blog.css";

// =====================================================
// ADMIN EDUCATION CSS
// =====================================================

import "./pages/admin/Education.css";

// =====================================================
// ADMIN EXPERIENCE CSS
// =====================================================

import "./pages/admin/ExperienceForm.css";

// =====================================================
// ADMIN SKILLS CSS
// =====================================================

import "./pages/admin/Skills.css";

// =====================================================
// ADMIN CERTIFICATIONS CSS
// =====================================================

import "./pages/admin/Certifications.css";

// =====================================================
// PORTFOLIO
// =====================================================

function Portfolio() {
  return (
    <>
      <Navbar />

      <main>

        <Hero />

        <About />

        <Education />

        <Experience />

        <Skills />

        <Projects />

        <Certification />

        <CodingStats />

        <Resume />

        <BlogList />

        <Contact />

      </main>

      <Footer />
    </>
  );
}


// =====================================================
// APP
// =====================================================

function App() {
  return (
    <Routes>

      {/* =================================================
          PUBLIC PORTFOLIO
          ================================================= */}

      <Route
        path="/"
        element={<Portfolio />}
      />


      {/* =================================================
          PUBLIC BLOG POST
          ================================================= */}

      <Route
        path="/blog/:id"
        element={<BlogPost />}
      />


      {/* =================================================
          ADMIN LOGIN
          ================================================= */}

      <Route
        path="/admin/login"
        element={<Login />}
      />


      {/* =================================================
          ADMIN DASHBOARD
          ================================================= */}

      <Route
        path="/admin"
        element={<Dashboard />}
      />


      {/* =================================================
          ADMIN EDUCATION
          ================================================= */}

      <Route
        path="/admin/education"
        element={<EducationAdmin />}
      />

      <Route
        path="/admin/education/create"
        element={<CreateEducation />}
      />

      <Route
        path="/admin/education/edit/:id"
        element={<EditEducation />}
      />


      {/* =================================================
          ADMIN EXPERIENCE
          ================================================= */}

      <Route
        path="/admin/experience"
        element={<ExperienceAdmin />}
      />


      {/* =================================================
          ADMIN SKILLS
          ================================================= */}

      <Route
        path="/admin/skills"
        element={<SkillsAdmin />}
      />


      {/* =================================================
          ADMIN CERTIFICATIONS
          ================================================= */}

      <Route
        path="/admin/certifications"
        element={<CertificationsAdmin />}
      />


      {/* =================================================
          ADMIN BLOGS
          ================================================= */}

      <Route
        path="/admin/blogs"
        element={<Posts />}
      />

      <Route
        path="/admin/blogs/create"
        element={<CreatePost />}
      />

      <Route
        path="/admin/blogs/edit/:id"
        element={<EditPost />}
      />


      {/* =================================================
          ADMIN PROJECTS
          ================================================= */}

      <Route
        path="/admin/projects"
        element={<ProjectsAdmin />}
      />


      {/* =================================================
          ADMIN MESSAGES
          ================================================= */}

      <Route
        path="/admin/messages"
        element={<Messages />}
      />


      {/* =================================================
          ADMIN COMMENTS
          ================================================= */}

      <Route
        path="/admin/comments"
        element={<Comments />}
      />

    </Routes>
  );
}


export default App;