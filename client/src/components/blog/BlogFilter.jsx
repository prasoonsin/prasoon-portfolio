function BlogFilter({
  categories,
  activeCategory,
  onCategoryChange
}) {
  return (
    <div className="blog-filter">

      {/* All */}
      <button
        type="button"
        className={activeCategory === "All" ? "active" : ""}
        onClick={() => onCategoryChange("All")}
      >
        All
      </button>

      {/* Categories */}
      {categories.map((category) => {
        const categoryName =
          typeof category === "string"
            ? category
            : category.name;

        return (
          <button
            type="button"
            key={
              typeof category === "string"
                ? category
                : category.id
            }
            className={
              activeCategory === categoryName
                ? "active"
                : ""
            }
            onClick={() =>
              onCategoryChange(categoryName)
            }
          >
            {categoryName}
          </button>
        );
      })}

    </div>
  );
}

export default BlogFilter;