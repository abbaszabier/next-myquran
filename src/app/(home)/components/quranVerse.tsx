import React, { useState } from "react";
import { Play, Save } from "lucide-react";
import { Ayat } from "@/api/allSurah";

const QuranVerseCard: React.FC<Ayat> = ({
  teksArab,
  teksLatin,
  teksIndonesia,
  audio,
  id,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const toggleSave = () => setIsSaved((prev) => !prev);

  const playAudio = () => {
    const audioPlayer = new Audio(audio["01"]);
    audioPlayer.play();
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl border" id={id}>
      <div className="text-right text-3xl font-arabic mb-4 space-x-4">
        {teksArab}
      </div>
      <div className="text-gray-500 mb-2">{teksLatin}</div>
      <div className="text-gray-800 mb-4">{teksIndonesia}</div>

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
      </div>
    </div>
  );
};

export default QuranVerseCard;
