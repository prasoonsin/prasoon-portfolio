import { useState } from "react";
import { createContact } from "../services/api";
import "./Contact.css";
import "../styles/PortfolioPages.css";
function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setStatus("");

      await createContact(form);

      setStatus(
        "Your message has been sent successfully."
      );

      setForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (err) {
      console.error(err);

      setStatus(
        "Failed to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">

        <div className="section-heading">
          <span>10.</span>
          <h2>Contact</h2>
        </div>

        <div className="contact-content">

          <div className="contact-info">

            <h3>Let's Work Together</h3>

            <p>
              Have a project, opportunity or just want to connect?
              Feel free to reach out.
            </p>

            <div className="contact-details">

              <a href="mailto:prasoonp.mzp@gmail.com">
                Email
              </a>

              <a
                href="https://github.com/prasoonsin"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>

            </div>

          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div className="form-group">
              <label htmlFor="contact-name">
                Name
              </label>

              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">
                Email
              </label>

              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">
                Subject
              </label>

              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">
                Message
              </label>

              <textarea
                id="contact-message"
                name="message"
                rows="6"
                placeholder="Your message"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Sending..."
                : "Send Message"}
            </button>

            {status && (
              <p className="contact-status">
                {status}
              </p>
            )}

          </form>

        </div>

      </div>
    </section>
  );
}

export default Contact;