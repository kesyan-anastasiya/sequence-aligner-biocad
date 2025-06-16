import { AMINO_ACID_COLORS } from "../lib/constants";
import { useEffect, useMemo, useRef, useState } from "react";
import { useToast } from "../hooks/use-toast";

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
  const { toast } = useToast();

  const copySequence = () => {
    const selectedText = window.getSelection()?.toString();
    if (selectedText && selectedText.trim()) {
      navigator.clipboard.writeText(selectedText.trim());
      toast({
        title: "Скопировано",
        description: "Последовательность скопирована в буфер обмена",
      });
    }
  };

  useEffect(() => {
    const updatePartSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;  
        if (containerWidth < 32) return;
        const symbolsPerLine = Math.max(10, Math.floor(containerWidth / 32));
        setPartSize(symbolsPerLine);
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

  const overlayContent = useMemo(() => {
    const buf: string[] = [];
    for (let i = 0; i < firstSequence.length; i += partSize) {
      buf.push(
        firstSequence.slice(i, i + partSize),
        "\n",
        secondSequence.slice(i, i + partSize),
        i + partSize < firstSequence.length ? "\n" : ""
      );
    }
    return buf.join("");
  }, [firstSequence, secondSequence, partSize]);

  return (
    <div
      ref={containerRef}
      className="relative w-full font-mono"
      onMouseUp={copySequence}
    >
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
              className="absolute top-0 left-0 select-text pointer-events-none font-mono m-0 break-all whitespace-pre-wrap"
              style={{
                color: "transparent",
                lineHeight: "2rem",
                letterSpacing: "calc(2rem - 1ch)",
                paddingLeft: "calc(1rem - 0.5ch)",
                maxWidth: "100%",
              }}
            >
              {overlayContent}
            </pre>
          </div>
        );
      })}
    </div>
  );
}
