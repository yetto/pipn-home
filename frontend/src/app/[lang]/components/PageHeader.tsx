interface PageHeaderProps {
  heading: string,
  text?: string,
}

export default function PageHeader({ heading, text } : PageHeaderProps) {
  return (
    <div className="w-full my-16 text-center">
    <h2 className="my-4 text-4xl font-bold text-yellow-500 lg:text-5xl font-heading">{heading}</h2>
    { text && <span className="font-bold">{text}</span> }
  </div>
  );
}
