import { useEffect, useMemo, useState } from "react";

import BlogCard from "./BlogCard";
import BlogFilter from "./BlogFilter";
import BlogSearch from "./BlogSearch";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
    Fetch blogs from backend
  */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/blogs`);

        if (!response.ok) {
          throw new Error("Failed to fetch blog posts.");
        }

        const result = await response.json();

        const blogData = Array.isArray(result)
          ? result
          : result.data || [];

        setPosts(blogData);
      } catch (err) {
        console.error("Blog API Error:", err);
        setError("Unable to load blog articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  /*
    Get categories from blog data
  */
  const categories = useMemo(() => {
    const categoryNames = posts
      .map((post) => {
        if (typeof post.category === "string") {
          return post.category;
        }

        return post.category?.name || null;
      })
      .filter(Boolean);

    return [...new Set(categoryNames)];
  }, [posts]);

  /*
    Filter blogs
  */
  const filteredPosts = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return posts.filter((post) => {
      const category =
        typeof post.category === "string"
          ? post.category
          : post.category?.name || "";

      const title = post.title || "";

      const excerpt =
        post.excerpt ||
        post.description ||
        "";

      const matchesCategory =
        activeCategory === "All" ||
        category === activeCategory;

      const matchesSearch =
        !searchValue ||
        title.toLowerCase().includes(searchValue) ||
        excerpt.toLowerCase().includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [posts, search, activeCategory]);

  /*
    Reset category if it no longer exists
  */
  useEffect(() => {
    if (
      activeCategory !== "All" &&
      !categories.includes(activeCategory)
    ) {
      setActiveCategory("All");
    }
  }, [categories, activeCategory]);

  return (
    <section className="blog-section" id="blog">

      <div className="blog-container">

        {/* Section Heading */}
        <div className="section-heading">
          <span>08.</span>
          <h2>Blog</h2>
        </div>

        <p className="blog-description">
          I write about development, DSA, projects,
          technologies and things I learn along the way.
        </p>

        {/* Search */}
        <BlogSearch
          search={search}
          setSearch={setSearch}
        />

        {/* Categories */}
        {!loading && !error && posts.length > 0 && (
          <BlogFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        )}

        {/* Loading */}
        {loading && (
          <div className="blog-state">
            <p>Loading articles...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="blog-state blog-error">
            <p>{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty Database */}
        {!loading &&
          !error &&
          posts.length === 0 && (
            <div className="blog-state">
              <p>No articles published yet.</p>
            </div>
          )}

        {/* Blog Cards */}
        {!loading &&
          !error &&
          posts.length > 0 && (
            <>
              {filteredPosts.length > 0 ? (
                <div className="blog-grid">
                  {filteredPosts.map((post) => (
                    <BlogCard
                      key={post.id}
                      post={post}
                    />
                  ))}
                </div>
              ) : (
                <div className="blog-state">
                  <p>
                    No articles found matching your search.
                  </p>
                </div>
              )}
            </>
          )}

      </div>

    </section>
  );
}

export default BlogList;