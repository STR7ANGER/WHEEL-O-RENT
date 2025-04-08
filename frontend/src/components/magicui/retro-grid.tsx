import { cn } from "@/lib/utils";

// Custom animation for the grid effect
const gridAnimation = `
@keyframes grid-movement {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(var(--cell-size));
  }
}
`;

interface RetroGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Additional CSS classes to apply to the grid container
   */
  className?: string;
  /**
   * Rotation angle of the grid in degrees
   * @default 65
   */
  angle?: number;
  /**
   * Grid cell size in pixels
   * @default 60
   */
  cellSize?: number;
  /**
   * Grid opacity value between 0 and 1
   * @default 0.5
   */
  opacity?: number;
  /**
   * Grid line color in light mode
   * @default "amber-500"
   */
  lightLineColor?: string;
  /**
   * Grid line color in dark mode
   * @default "amber-400"
   */
  darkLineColor?: string;
}

export function RetroGrid({
  className,
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "#f59e0b", // amber-500
  darkLineColor = "#fbbf24", // amber-400
  ...props
}: RetroGridProps) {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  } as React.CSSProperties;

  return (
    <>
      <style>{gridAnimation}</style>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 size-full overflow-hidden [perspective:200px]",
          `opacity-[var(--opacity)]`,
          className,
        )}
        style={gridStyles}
        {...props}
      >
        <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
          <div 
            className="absolute [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw] dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]"
            style={{
              animation: "grid-movement 10s infinite linear"
            }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-0%" />
      </div>
    </>
  );
}