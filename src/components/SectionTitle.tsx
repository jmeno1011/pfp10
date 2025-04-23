interface SectionTitleProps {
  title: string;
  subTitle?: string;
}

export default function SectionTitle({ title, subTitle }: SectionTitleProps) {
  return (
    <div className="flex gap-8 items-baseline">
      <h1 className="text-2xl font-bold">{title}</h1>
      {subTitle && <h2 className="text-[#aaaaaa]">{subTitle}</h2>}
    </div>
  );
}
