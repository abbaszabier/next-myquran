import React, { useState, useRef, useEffect } from "react";
import { Pause, Play, Save } from "lucide-react";
import { Ayat } from "@/api/allSurah";
import { useSettingsStore } from "@/store/settings";

const QuranVerseCard: React.FC<Ayat> = ({
  teksArab,
  teksLatin,
  teksIndonesia,
  audio,
  nomorAyat,
  id,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayer = useRef<HTMLAudioElement | null>(null);
  const { qori } = useSettingsStore((state) => state);

  const toggleSave = () => {
    setIsSaved((prev) => {
      if (!prev) localStorage.setItem("lastReadAyat", id.toString());
      return !prev;
    });
  };

  const playAudio = () => {
    if (audioPlayer.current) {
      // Jika sumber audio berubah
      if (audioPlayer.current.src !== audio[qori]) {
        audioPlayer.current.pause(); // Pause audio yang sedang diputar
        audioPlayer.current.currentTime = 0; // Reset waktu ke awal
        audioPlayer.current.src = audio[qori]; // Update sumber audio
      }

      // Jika audio sedang diputar
      if (isPlaying) {
        audioPlayer.current.pause();
        setIsPlaying(false);
      } else {
        // Coba memulai pemutaran dan tangani Promise-nya
        const playPromise = audioPlayer.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true); // Audio berhasil diputar
            })
            .catch((error) => {
              console.error("Audio playback failed", error);
              setIsPlaying(false); // Gagal memutar audio
            });
        }
      }
    } else {
      // Jika audioPlayer belum ada, buat objek Audio baru
      audioPlayer.current = new Audio(audio[qori]);

      const playPromise = audioPlayer.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true); // Audio berhasil diputar
          })
          .catch((error) => {
            console.error("Audio playback failed", error);
            setIsPlaying(false); // Gagal memutar audio
          });

        audioPlayer.current.addEventListener("ended", () => {
          setIsPlaying(false);
          const nextAyat = document.getElementById(
            `ayat-${(nomorAyat ?? 0) + 1}`
          );
          if (nextAyat) nextAyat.scrollIntoView({ behavior: "smooth" });
        });
      }
    }
  };

  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.src = audio[qori];
      if (isPlaying) {
        audioPlayer.current.play();
      }
    }
  }, [qori, audio, isPlaying]);

  return (
    <div
      className={`p-6 bg-white shadow rounded-xl gap-2 border ${
        isPlaying ? "border-foreground bg-gray-100" : ""
      }`}
      id={`ayat-${id}`}
    >
      {/* Content Section */}
      <div className="flex-1">
        <div className="flex justify-between items-top gap-4 text-3xl font-arabic mb-4">
          <span className="text-sm">{nomorAyat}</span>
          <span className="text-right">{teksArab}</span>
        </div>

        <p className="text-gray-500 mb-2">{teksLatin}</p>
        <p className="text-gray-800">{teksIndonesia}</p>
      </div>

      {/* Button Section */}
      <div className="flex flex-row gap-2 mt-2">
        <button
          aria-label="Play Audio"
          onClick={playAudio}
          className="flex items-center p-2 bg-foreground text-white rounded hover:bg-blue-600 transition"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <button
          aria-label="Save Ayat"
          onClick={toggleSave}
          className={`flex items-center p-2 rounded transition ${
            isSaved
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          <Save size={16} />
        </button>
      </div>
    </div>
  );
};

export default QuranVerseCard;
