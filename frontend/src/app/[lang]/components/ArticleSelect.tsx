import Link from "next/link";

interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    articles: {
      data: Array<{}>;
    };
  };
}

interface Article {
  id: number;
  attributes: {
    title: string;
    slug: string;
  };
}

function selectedFilter(current: string, selected: string) {
  return current === selected
    ? "int-base mr-2 mb-2 px-3 py-1 rounded-lg hover:underline dark:bg-yellow-700 bg-yellow-700 dark:text-gray-100 text-gray-100"
    : "int-base mr-2 mb-2 px-3 py-1 rounded-lg hover:underline dark:bg-yellow-400 bg-yellow-400 dark:text-gray-900 text-gray-900";
}

export default function ArticleSelect({
  categories,
  articles,
  params,
}: {
  categories: Category[];
  articles: Article[];
  params: {
    slug: string;
    category: string;
  };
}) {

  return (
    <div className="p-4 rounded-lg dark:bg-gray-900 bg-gray-100 min-h-[365px] relative">
      <h4 className="text-xl font-semibold">Navega por categoría</h4>

      <div>
        <div className="flex flex-wrap py-6 dark:border-gray-400">
          {categories.map((category: Category) => {
            if (category.attributes.articles.data.length === 0) return null;
            return (
              <Link
                href={`/blog/${category.attributes.slug}`}
                className={selectedFilter(
                  category.attributes.slug,
                  params.category
                )}
              >
                #{category.attributes.name}
              </Link>
            );
          })}
          <Link href={"/blog"} className={selectedFilter("", "filter")}>
            #Todo
          </Link>
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold">También podría interesarte</h4>
          <ul className="ml-4 space-y-1 list-disc">
            {articles.map((article: Article) => {
              return (
                <li>
                  <Link
                    rel="noopener noreferrer"
                    href={`/blog/${params.category}/${article.attributes.slug}`}
                    className={`${
                      params.slug === article.attributes.slug &&
                      "text-yellow-400"
                    }  hover:underline hover:text-yellow-400 transition-colors duration-200`}
                  >
                    {article.attributes.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
