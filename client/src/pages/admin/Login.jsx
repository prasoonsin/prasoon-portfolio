import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { login } from "../../services/api";

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login: saveLogin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Please enter your username and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await login({
        username: username.trim(),
        password,
      });

      console.log("Login response:", response);

      saveLogin(
        {
          username: response.username,
          role: response.role,
        },
        response.token
      );

      navigate("/admin");
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.message || "Invalid username or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login">

      {/* Background decoration */}
      <div className="login-background">
        <span className="background-grid"></span>
        <span className="background-glow glow-one"></span>
        <span className="background-glow glow-two"></span>
      </div>

      <div className="login-wrapper">

        {/* Logo / Brand */}
        <div className="login-brand">
          <div className="brand-mark">
            &lt;/&gt;
          </div>

          <div>
            <h2>Prasoon</h2>
            <span>Portfolio Admin</span>
          </div>
        </div>

        {/* Login Card */}
        <section className="login-card">

          <div className="login-header">

            <div className="login-icon">
              <span>⌁</span>
            </div>

            <div>
              <p className="login-eyebrow">
                ADMIN PANEL
              </p>

              <h1>
                Welcome back<span>.</span>
              </h1>

              <p className="login-description">
                Sign in to manage your portfolio,
                projects and content.
              </p>
            </div>

          </div>

          {/* Error */}
          {error && (
            <div className="login-error">
              <span className="error-icon">!</span>

              <div>
                <strong>Login failed</strong>
                <p>{error}</p>
              </div>
            </div>
          )}

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >

            {/* Username */}
            <div className="login-form-group">

              <label htmlFor="login-username">
                Username
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  @
                </span>

                <input
                  id="login-username"
                  type="text"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  placeholder="Enter your username"
                  autoComplete="username"
                  disabled={loading}
                  required
                />

              </div>

            </div>

            {/* Password */}
            <div className="login-form-group">

              <div className="password-label-row">

                <label htmlFor="login-password">
                  Password
                </label>

              </div>

              <div className="input-wrapper">

                <span className="input-icon">
                  *
                </span>

                <input
                  id="login-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (current) => !current
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>

            {/* Submit */}
            <button
              className="login-button"
              type="submit"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="login-spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <span className="button-arrow">
                    →
                  </span>
                </>
              )}

            </button>

          </form>

          {/* Footer */}
          <div className="login-footer">

            <span className="status-dot"></span>

            <span>
              Secure administrator access
            </span>

          </div>

        </section>

        <p className="login-copyright">
          © {new Date().getFullYear()} Prasoon.
          All rights reserved.
        </p>

      </div>
    </main>
  );
}

export default Login;