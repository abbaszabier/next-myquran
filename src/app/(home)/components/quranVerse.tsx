import { Book, Play, Save } from "lucide-react";
import React from "react";
import { useState } from "react";

interface QuranVerseCardProps {
  arabic: string;
  latin: string;
  translation: string;
  tafsir: string;
  audioUrl: string;
}

const QuranVerseCard: React.FC<QuranVerseCardProps> = ({
  arabic,
  latin,
  translation,
  tafsir,
  audioUrl,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showTafsir, setShowTafsir] = useState(false);

  const toggleSave = () => setIsSaved(!isSaved);
  const toggleTafsir = () => setShowTafsir(!showTafsir);

  const playAudio = () => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl border">
      <div className="text-right text-3xl font-arabic mb-4">{arabic}</div>
      <div className="text-gray-500 mb-2">{latin}</div>
      <div className="text-gray-800 mb-4">{translation}</div>

      <div className="flex items-center justify-start space-x-2">
        <button
          onClick={playAudio}
          className="flex items-center px-4 py-2 bg-foreground text-white rounded hover:bg-blue-600 transition"
        >
          <Play className="mr-2" /> Play
        </button>

        <button
          onClick={toggleSave}
          className={`flex items-center px-4 py-2 rounded transition ${
            isSaved ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
          } hover:bg-green-600`}
        >
          <Save className="mr-2" /> {isSaved ? "Saved" : "Save"}
        </button>

        <button
          onClick={toggleTafsir}
          className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          <Book className="mr-2" /> Tafsir
        </button>
      </div>

      {showTafsir && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold mb-2">Tafsir Ayat</h3>
          <p>{tafsir}</p>
        </div>
      )}
    </div>
  );
};

export default QuranVerseCard;
