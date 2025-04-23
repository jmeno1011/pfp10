interface CardSubTitleProps{
  subtitle?: string;
}

export default function CardSubTitle({subtitle}:CardSubTitleProps) {
  return (
    <h4 className='text-[#aaaaaa] text-[12px]'>{subtitle}</h4>
  )
}
