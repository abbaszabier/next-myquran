import React, { useState, useRef, useEffect } from "react";
import { Check, Pause, Play, Save } from "lucide-react";
import { Ayat } from "@/api/allSurah";
import { useSettingsStore } from "@/store/settings";
import { DropdownCopy } from "./dropdownCopy";
import { toast } from "sonner";
import DialogTafsir from "./dialogTafsir";

const QuranVerseCard: React.FC<Ayat> = ({
  teksArab,
  teksLatin,
  teksIndonesia,
  audio,
  nomorAyat,
  namaLatin,
  nomor,
  id,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayer = useRef<HTMLAudioElement | null>(null);
  const { qori, terakhirDibaca, setTerakhirDibaca } = useSettingsStore(
    (state) => state
  );

  const toggleSave = () => {
    toast("Berhasil!", {
      description: "Ayat terakhir berhasil disimpan",
      action: {
        label: <Check size={16} />,
        onClick: () => console.log("Undo"),
      },
    });

    setTerakhirDibaca({
      teksArab: teksArab,
      ayat: nomorAyat?.toString() || "",
      namaLatin: namaLatin || "",
      nomor: nomor || 0,
    });
  };

  useEffect(() => {
    // Periksa apakah teksArab dan ayat di state terakhirDibaca sesuai dengan props
    if (terakhirDibaca.teksArab === teksArab) {
      // Tunggu hingga elemen di-render
      setTimeout(() => {
        const element = document.getElementById(
          `ayat-${terakhirDibaca.ayat}-${terakhirDibaca.teksArab}`
        );
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 500); // Delay untuk memastikan elemen sudah di-render
    }
  }, [id, nomorAyat, teksArab, terakhirDibaca.ayat, terakhirDibaca.teksArab]);

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
      className={`p-6 mt-4 space-y-4 bg-background shadow rounded-xl gap-2 border
        ${
          terakhirDibaca.namaLatin &&
          terakhirDibaca.nomor === nomor &&
          terakhirDibaca.teksArab === teksArab
            ? "bg-[#F7F7F7] dark:bg-[#1E1E1E] border-[#D3B358] dark:border-[#D3B358]"
            : ""
        }
        ${
          isPlaying
            ? "border-gray-900 dark:border-gray-100"
            : "dark:border-gray-700"
        }`}
      id={`ayat-${id}`}
    >
      {/* Content Section */}
      <div className={`flex-1`} id={`${id}-${teksArab}`}>
        <div className="flex justify-between items-top gap-4 text-2xl md:text-3xl font-arabic mb-4">
          <span className="text-sm">{nomorAyat}</span>

          <span className="text-right leading-9 md:leading-10 z-2">
            {teksArab}{" "}
            {/* <span className="z-0 text-[#D3B358] dark:text-[#D3B358] relative text-2xl md:text-3xl font-arabic">
              ۝
              <span className="absolute text-sm left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {nomorAyat !== undefined ? toArabicNumber(nomorAyat) : ""}
              </span>
            </span> */}
          </span>
        </div>

        <p className="text-gray-500 mb-2 text-sm md:text-base dark:text-gray-500">
          {teksLatin}
        </p>
        <p className="text-gray-800 text-sm md:text-base dark:text-gray-400">
          {teksIndonesia}
        </p>
      </div>

      {/* Button Section */}
      <div className="flex flex-row gap-2 mt-2">
        <button
          aria-label="Play Audio"
          title="Play Audio"
          onClick={playAudio}
          className={`flex items-center px-2 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transition duration-200 hover:shadow-md`}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <DropdownCopy
          teksArab={teksArab}
          teksIndonesia={teksIndonesia}
          teksLatin={teksLatin}
        />
        <DialogTafsir
          surah={namaLatin || ""}
          nomorAyat={nomorAyat || 0}
          noSurah={nomor || 0}
        />
        <button
          aria-label="Save Ayat"
          title="Save Ayat"
          onClick={toggleSave}
          className={`flex items-center px-2 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transition duration-200 hover:shadow-md`}
        >
          <Save size={16} />
        </button>
      </div>
    </div>
  );
};

export default QuranVerseCard;
