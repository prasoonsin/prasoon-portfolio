import BlogCard from "./BlogCard";

function RelatedPosts({
  posts = [],
  currentPostId = null,
}) {
  // Remove the current article
  const relatedPosts = Array.isArray(posts)
    ? posts
        .filter((post) => post.id !== currentPostId)
        .slice(0, 3)
    : [];

  return (
    <section className="related-posts">

      {/* Header */}
      <div className="related-posts-header">

        <div className="related-posts-title">

          <span className="section-number">
            09.
          </span>

          <h2>
            Related Articles
          </h2>

        </div>

        <p>
          You may also find these articles interesting.
        </p>

      </div>


      {/* Related Articles */}
      {relatedPosts.length > 0 ? (

        <div className="blog-grid">

          {relatedPosts.map((post) => (

            <BlogCard
              key={post.id}
              post={post}
            />

          ))}

        </div>

      ) : (

        <p className="no-related-posts">
          No related articles available.
        </p>

      )}

    </section>
  );
}

export default RelatedPosts;