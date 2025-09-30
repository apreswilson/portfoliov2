import { useEffect, useState } from "react";

type BackgroundProps = { tileSize?: number };

export default function TileBackground({ tileSize = 50 }: Readonly<BackgroundProps>) {
  const [gridDims, setGridDims] = useState({ rows: 0, cols: 0 });

  useEffect(() => {
    const calculateGrid = () => {
      setGridDims({
        rows: Math.ceil(window.innerHeight / tileSize) + 1,
        cols: Math.ceil(window.innerWidth / tileSize) + 1,
      });
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, [tileSize]);

  const total = gridDims.rows * gridDims.cols;

  const gridStyle: React.CSSProperties = {
    gridTemplateColumns: `repeat(${gridDims.cols}, ${tileSize}px)`,
    gridAutoRows: `${tileSize}px`,
  };

  return (
    <div
      className="fixed top-0 left-0 grid h-screen w-screen overflow-hidden pointer-events-none bg-moving"
      style={gridStyle}
      aria-hidden="true"
    >
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="border border-dashed border-gray-200" style={{ width: tileSize, height: tileSize }} />
      ))}
    </div>
  );
}
