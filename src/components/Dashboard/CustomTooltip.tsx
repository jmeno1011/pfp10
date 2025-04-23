import { bditooltips, Tootip } from "@/lib/constants/tooltipData";
import { ReactNode, useEffect, useRef, useState } from "react";

interface CustomTooltipProps {
  children: ReactNode;
  tooltipName: string;
}

export default function CustomTooltip({
  children,
  tooltipName,
}: CustomTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-help"
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute top-6 right-0 z-10 w-64 px-3 py-2 text-sm text-left text-gray-700 bg-white border border-gray-200 rounded-md shadow-lg transform -translate-y-0"
        >
          <div className="relative">
            {/* {content} */}
            {tooltipName in bditooltips ? (
              <DynamicTooltip tooltipKey={tooltipName as keyof typeof bditooltips} />
            ) : (
              <p className="text-xs text-red-500">Invalid tooltip name</p>
            )}
            <div className="absolute -top-4 -right-3 transform -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-gray-200 rotate-225"></div>
          </div>
        </div>
      )}
    </div>
  );
}


const DynamicTooltip = ({ tooltipKey }: { tooltipKey: keyof typeof bditooltips }) => {
  const tooltip:Tootip = bditooltips[tooltipKey];
  // const tooltip = bditooltips[tooltipKey];
  return (
    <div className="text-xs">
      <p className="font-semibold">{tooltip.title}</p>
      <p className="mt-1">{tooltip.description}</p>
      {
        tooltip.interpretation &&
       (
        <>
          <p className="mt-1">총점 해석:</p>
          <ul className="list-disc pl-4 mt-1">
            {tooltip.interpretation.map((item, index) => (
              <li key={index}>{item.range}: {item.meaning}</li>
            ))}
          </ul>
        </>
      )}
      {tooltip.items && (
        <>
          <p className="mt-2">{tooltip.description}</p>
          <p>{tooltip.items.join(', ')}</p>
        </>
      )}
    </div>
  );
};
