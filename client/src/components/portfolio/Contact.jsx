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
    <section className="contact" id="contact">
      <div className="contact-container">

        {/* =================================================
            SECTION HEADING
            ================================================= */}

        <div className="contact-heading">
          <div className="contact-heading-line" />

          <h2>Contact</h2>
        </div>


        {/* =================================================
            INTRODUCTION
            ================================================= */}

        <p className="contact-intro">
          Have a project, opportunity or just want to
          connect? I'd love to hear from you.
        </p>


        {/* =================================================
            CONTACT CONTENT
            ================================================= */}

        <div className="contact-content">

          {/* =================================================
              CONTACT INFORMATION
              ================================================= */}

          <div className="contact-info-card">

            <span className="contact-label">
              GET IN TOUCH
            </span>

            <h3>
              Let's build something
              <span> meaningful.</span>
            </h3>

            <p className="contact-description">
              Whether you have a project idea, internship
              opportunity, collaboration or simply want to
              connect, feel free to reach out.
            </p>


            {/* Contact Details */}

            <div className="contact-details">

              <a
                href="mailto:prasoonp.mzp@gmail.com"
                className="contact-detail"
              >
                <div className="contact-detail-icon">
                  @
                </div>

                <div>
                  <span className="contact-detail-label">
                    EMAIL
                  </span>

                  <span className="contact-detail-value">
                    prasoonp.mzp@gmail.com
                  </span>
                </div>
              </a>


              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-detail"
              >
                <div className="contact-detail-icon">
                  GH
                </div>

                <div>
                  <span className="contact-detail-label">
                    GITHUB
                  </span>

                  <span className="contact-detail-value">
                    GitHub Profile
                  </span>
                </div>
              </a>


              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-detail"
              >
                <div className="contact-detail-icon">
                  in
                </div>

                <div>
                  <span className="contact-detail-label">
                    LINKEDIN
                  </span>

                  <span className="contact-detail-value">
                    LinkedIn Profile
                  </span>
                </div>
              </a>

            </div>


            {/* Availability */}

            <div className="contact-availability">
              <span className="availability-dot" />

              <span>
                Open to opportunities and collaborations
              </span>
            </div>

          </div>


          {/* =================================================
              CONTACT FORM
              ================================================= */}

          <div className="contact-form-card">

            <div className="form-card-header">
              <span className="form-label">
                MESSAGE
              </span>

              <p>
                Send me a message and I'll get back to you
                as soon as possible.
              </p>
            </div>


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
                  placeholder="you@example.com"
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
                  placeholder="What would you like to talk about?"
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
                  placeholder="Tell me a little about your idea..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>


              {/* Status */}

              {status.message && (
                <div
                  className={`contact-status ${status.type}`}
                  role="status"
                >
                  <span className="status-indicator" />

                  <span>{status.message}</span>
                </div>
              )}


              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="contact-submit"
              >
                <span>
                  {loading
                    ? "Sending..."
                    : "Send Message"}
                </span>

                {!loading && (
                  <span className="submit-arrow">
                    ↗
                  </span>
                )}
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;