import "./App.css";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useState } from "react";
import { AMINO_ACIDS } from "./lib/constants";
import { SequenceAlignment } from "./components/SequenceAlignment";
import { Toaster } from "./components/ui/toaster";

function App() {
  const [firstSequence, setFirstSequence] = useState("");
  const [secondSequence, setSecondSequence] = useState("");
  const [error, setError] = useState("");
  const [showAlignment, setShowAlignment] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toUpperCase();
    const hasInvalidChars = input
      .split("")
      .some((char: string) => !AMINO_ACIDS.includes(char) && char !== "");

    if (hasInvalidChars) {
      setError(
        "Проверьте раскладку клавиатуры. Допустимы только латинские буквы: A, R, N, D, C, E, Q, G, H, I, L, K, M, F, P, S, T, W, Y, V и символ -"
      );
    } else {
      setError("");
    }

    if (e.target.name === "firstSequence") {
      setFirstSequence(input);
    } else {
      setSecondSequence(input);
    }
  };

  const handleSubmit = () => {
    if (!firstSequence || !secondSequence) {
      setError("Оба поля обязательны для заполнения");
      return;
    }
    if (firstSequence.length !== secondSequence.length) {
      setError("Последовательности должны быть одной длины");
      return;
    }
    setError("");
    setShowAlignment(true);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <Input
          name="firstSequence"
          placeholder="Введите первую последовательность"
          value={firstSequence}
          onChange={handleInputChange}
          className="text-[10px] sm:text-sm md:text-base"
          required
        />
        <Input
          name="secondSequence"
          placeholder="Введите вторую последовательность"
          value={secondSequence}
          onChange={handleInputChange}
          className="text-[10px] sm:text-sm md:text-base"
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button
          variant="outline"
          onClick={handleSubmit}
          className="text-xs sm:text-sm md:text-base"
        >
          Выровнять
        </Button>
      </div>
      {showAlignment && (
        <div className="mt-8 w-full max-w-md overflow-x-auto">
          <SequenceAlignment
            firstSequence={firstSequence}
            secondSequence={secondSequence}
          />
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default App;
