import { useState } from "react";
import { createContact } from "../../services/api";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      type: "",
      message: "",
    });

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setStatus({
        type: "error",
        message: "Please fill in all fields.",
      });

      return;
    }

    try {
      setLoading(true);

      await createContact(formData);

      setStatus({
        type: "success",
        message: "Message sent successfully!",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus({
        type: "error",
        message:
          "Failed to send your message. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="contact"
      id="contact"
    >
      <div className="contact-container">

        {/* Section Heading */}

        <div className="section-heading">
          <span></span>
          <h2>Contact</h2>
        </div>


        {/* Contact Content */}

        <div className="contact-content">

          {/* Contact Information */}

          <div className="contact-info">

            <h3>Let's Work Together</h3>

            <p>
              Have a project, opportunity or just want to
              connect? Feel free to reach out.
            </p>


            {/* Contact Links */}

            <div className="contact-details">

              <a href="mailto:prasoonp.mzp@gmail.com">
                Email
              </a>

              <a
                href="https://github.com/"
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


          {/* Contact Form */}

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            {/* Name */}

            <div className="form-group">

              <label htmlFor="contact-name">
                Name
              </label>

              <input
                type="text"
                id="contact-name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            {/* Email */}

            <div className="form-group">

              <label htmlFor="contact-email">
                Email
              </label>

              <input
                type="email"
                id="contact-email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>


            {/* Subject */}

            <div className="form-group">

              <label htmlFor="contact-subject">
                Subject
              </label>

              <input
                type="text"
                id="contact-subject"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />

            </div>


            {/* Message */}

            <div className="form-group">

              <label htmlFor="contact-message">
                Message
              </label>

              <textarea
                id="contact-message"
                name="message"
                rows="6"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

            </div>


            {/* Status */}

            {status.message && (
              <p className={`contact-status ${status.type}`}>
                {status.message}
              </p>
            )}


            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Sending..."
                : "Send Message"}
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

export default Contact;