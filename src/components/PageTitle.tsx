interface PageTitleProps {
  title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  return <h1 className="text-[1.75rem] font-bold">{title}</h1>;
}
