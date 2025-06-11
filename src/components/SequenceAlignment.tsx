import { AMINO_ACID_COLORS } from "../lib/constants";
import { useEffect, useRef, useState } from "react";

interface SequenceAlignmentProps {
  firstSequence: string;
  secondSequence: string;
}

export function SequenceAlignment({
  firstSequence,
  secondSequence,
}: SequenceAlignmentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [partSize, setPartSize] = useState(10);

  useEffect(() => {
    const updatePartSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const symbolsPerLine = Math.floor(containerWidth / 32);
        setPartSize(Math.max(1, symbolsPerLine));
      }
    };

    updatePartSize();
    window.addEventListener("resize", updatePartSize);

    return () => {
      window.removeEventListener("resize", updatePartSize);
    };
  }, []);

  const getParts = (input: string): string[] => {
    const parts: string[] = [];
    for (let i = 0; i < input.length; i += partSize) {
      parts.push(input.slice(i, i + partSize));
    }
    return parts;
  };

  const firstSequenceParts = getParts(firstSequence);
  const secondSequenceParts = getParts(secondSequence);

  return (
    <div ref={containerRef} className="relative w-full font-mono">
      {firstSequenceParts.map((firstPart: string, partIndex: number) => {
        const secondPart = secondSequenceParts[partIndex];
        return (
          <div key={partIndex} className="mb-6 relative">
            <div className="flex flex-wrap">
              {firstPart.split("").map((char: string, i: number) => (
                <span
                  key={i}
                  className={`w-8 h-8 flex items-center justify-center ${AMINO_ACID_COLORS[char]}`}
                >
                  {char}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap">
              {secondPart.split("").map((char: string, i: number) => (
                <span
                  key={i}
                  className={`w-8 h-8 flex items-center justify-center ${
                    char !== firstPart[i] ? AMINO_ACID_COLORS[char] : ""
                  }`}
                >
                  {char}
                </span>
              ))}
            </div>
            <pre
              className="absolute top-0 left-0 select-text pointer-events-none font-mono m-0"
              style={{
                color: "transparent",
                whiteSpace: "pre",
                lineHeight: "2rem",
                letterSpacing: "1.5rem",
                paddingLeft: "0.75rem",
              }}
            >
              {firstPart + "\n" + secondPart}
            </pre>
          </div>
        );
      })}
    </div>
  );
}
