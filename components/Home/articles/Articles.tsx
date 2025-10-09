import ArticleCard from "./ArticleCard";

const Articles = () => {
  return (
    <section className="relative px-6 py-24 xl:px-56">
      <div>
        <h2 className="h2-bold">Highlighted Articles</h2>
        <p className="regular-paragraph mt-8 max-w-[835px]">
          At <span className="text-yellow-600">ADSC</span>, we share informative and engaging articles to guide students in their tech journey. From beginner-friendly tutorials to advanced concepts, our blogs are designed to inspire innovation and deepen understanding of the latest technologies.
        </p>
      </div>

      <div className="mt-16">
        <ArticleCard />
      </div>

      <div className="projects-grid-pattern absolute inset-0 -z-10 opacity-50" />
    </section>
  );
};
export default Articles;
