import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichTextProps {
  data: {
    content: string;
  };
}

export default function RichTextPage({ data }: RichTextProps) {
  // TODO: STYLE THE MARKDOWN
  return (
    <section className="rich-text py-6 dark:bg-black dark:text-gray-50 ">
        <div className="container mx-auto space-y-2">
            <Markdown children={data.content} remarkPlugins={[remarkGfm]} />
        </div>
    </section>
  );
}
