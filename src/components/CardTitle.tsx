interface CardTitleProps{
  title: string;
}
export default function CardTitle({title}:CardTitleProps) {
  return (
    <h3 className="text-[1.125rem] font-bold">{title}</h3>
  )
}
