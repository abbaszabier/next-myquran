import QuranVerseCard from "./quranVerse";
import type { DetailSurah } from "@/api/allSurah";
import LoadingDetailSurah from "./loadingDetailSurah";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Pause, Play } from "lucide-react";
import { useSettingsStore } from "@/store/settings";
import { useRef, useState } from "react";
import { SelectAyat } from "./selectAyat";
import DropdownDetailQuran from "./dropdownDetailQuran";
import FloatingButton from "@/components/ui/floating-button";
import { usePathname } from "next/navigation";

interface DetailSurahProps {
  data?: DetailSurah;
  isLoading: boolean;
  setActiveCard: (value: number) => void;
  activeCard?: number;
}

const DetailSurahQuran: React.FC<DetailSurahProps> = ({
  data,
  isLoading,
  setActiveCard,
  activeCard,
}) => {
  const { qori, setQori } = useSettingsStore((state) => state);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayer = useRef<HTMLAudioElement | null>(null);
  const router = usePathname();

  const onChaneQori = (item: string) => {
    setQori(item);
  };

  const getUserNameQori = (key: string) => {
    switch (key) {
      case "01":
        return "Abdullah Al-Juhany";
      case "02":
        return "Abdul Muhsin Al-Qasim";
      case "03":
        return "Abdurrahman as Sudais";
      case "04":
        return "Ibrahim Al-Dossari";
      case "05":
        return "Misyari Rasyid Al-Afasi";
      case "default":
        return "null";
      default:
        return key;
    }
  };

  const nextSurah = (nomor: number) => {
    if (!data?.suratSelanjutnya) return;

    setActiveCard(nomor + 1);
  };

  const prevSurah = (nomor: number) => {
    if (!data?.suratSebelumnya) return;

    setActiveCard(nomor - 1);
  };

  const onSelectAyat = (ayatNumber: string) => {
    const element = document.getElementById(`ayat-${ayatNumber}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const playAudio = () => {
    if (audioPlayer.current) {
      // Jika sumber audio berubah
      if (audioPlayer.current.src !== data?.audioFull[qori]) {
        audioPlayer.current.pause(); // Pause audio yang sedang diputar
        audioPlayer.current.currentTime = 0; // Reset waktu ke awal
        if (data?.audioFull[qori]) {
          audioPlayer.current.src = data.audioFull[qori]; // Update sumber audio
        }
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
      audioPlayer.current = new Audio(data?.audioFull[qori] ?? "");

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

      audioPlayer.current.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }
  };

  if (isLoading) return <LoadingDetailSurah />;

  return (
    <div className="md:border-l border-b border-gray-200 dark:border-gray-800">
      <FloatingButton
        activeCard={activeCard}
        setActiveCard={setActiveCard}
        router={router}
      />
      <div className="flex sticky top-0 z-100000 justify-between items-center h-[60px] md:h-[80px] px-4 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm bg-opacity-80 backdrop-filter backdrop-saturate-150 dark:backdrop-blur-md dark:bg-opacity-60 ">
        {/* Left Navigation */}
        <div className="flex gap-4 items-center">
          {/* Navigation mobile */}
          <div className="flex gap-2 items-center md:hidden">
            <button
              aria-label="Surah Sebelumnya"
              title={`Surah Sebelumnya: ${
                typeof data?.suratSebelumnya === "object"
                  ? data.suratSebelumnya.namaLatin
                  : "-"
              }`}
              onClick={() => data?.nomor !== undefined && prevSurah(data.nomor)}
              className={`border border-gray-300 p-2 rounded-lg hover:bg-gray-100 transition ${
                !data?.suratSebelumnya ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              aria-label="Surah Selanjutnya"
              title={`Surah Selanjutnya: ${
                typeof data?.suratSelanjutnya === "object"
                  ? data.suratSelanjutnya.namaLatin
                  : "-"
              }`}
              onClick={() => data?.nomor !== undefined && nextSurah(data.nomor)}
              className={`border border-gray-300 p-2 rounded-lg hover:bg-gray-100 transition transform rotate-180 ${
                !data?.suratSelanjutnya ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <ChevronLeft size={14} />
            </button>
          </div>

          <div className="flex flex-col items-left">
            <h1 className="text-md md:text-xl font-bold">{data?.namaLatin}</h1>
            <div className="flex justify-center items-center space-x-4">
              <p className="text-xs md:text-sm">
                {data?.arti} ⊙ {data?.jumlahAyat} Ayat
              </p>
            </div>
          </div>
        </div>

        {/* Right Navigation */}
        <div className="flex gap-2 items-center hidden md:flex">
          <button
            aria-label="Play Audio"
            onClick={playAudio}
            className={`px-2 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md`}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <Select onValueChange={onChaneQori}>
            <SelectTrigger className="w-[140px]" aria-label="Pilih qori">
              <SelectValue placeholder="Pilih qori" aria-label="Pilih qori" />
            </SelectTrigger>
            <SelectContent className="w-[140px]" aria-label="Pilih qori">
              {Object.keys(data?.audioFull ?? {}).map((item, i) => (
                <SelectItem
                  key={i}
                  value={item}
                  onClick={() => onChaneQori(item)}
                >
                  {getUserNameQori(item)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <SelectAyat onSelectAyat={onSelectAyat} data={data?.ayat} />
          <div className="flex gap-2 items-center">
            <button
              aria-label="Surah Sebelumnya"
              title={`Surah Sebelumnya: ${
                typeof data?.suratSebelumnya === "object"
                  ? data.suratSebelumnya.namaLatin
                  : "-"
              }`}
              onClick={() => data?.nomor !== undefined && prevSurah(data.nomor)}
              className={`border border-gray-300 p-2 rounded-lg hover:bg-gray-100 transition ${
                !data?.suratSebelumnya ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              aria-label="Surah Selanjutnya"
              title={`Surah Selanjutnya: ${
                typeof data?.suratSelanjutnya === "object"
                  ? data.suratSelanjutnya.namaLatin
                  : "-"
              }`}
              onClick={() => data?.nomor !== undefined && nextSurah(data.nomor)}
              className={`border border-gray-300 p-2 rounded-lg hover:bg-gray-100 transition transform rotate-180 ${
                !data?.suratSelanjutnya ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        </div>

        {/* Right Navigation Mobile */}
        <div className="flex gap-2 items-center md:hidden">
          <DropdownDetailQuran
            darkMode={false}
            toggleDarkMode={() => {}}
            isPlaying={isPlaying}
            playAudio={playAudio}
            onChaneQori={onChaneQori}
            data={data}
            getUserNameQori={getUserNameQori}
            onSelectAyat={onSelectAyat}
          />
        </div>
      </div>
      <div className="px-4 md:pb-4 pb-20 space-y-4">
        {data?.ayat.map((verse) => (
          <div key={verse.nomorAyat}>
            <QuranVerseCard
              id={`ayat-${verse.nomorAyat}`}
              teksArab={verse.teksArab}
              nomorAyat={verse.nomorAyat}
              teksLatin={verse.teksLatin}
              namaLatin={data?.namaLatin}
              nomor={data?.nomor}
              teksIndonesia={verse.teksIndonesia}
              audio={verse.audio}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailSurahQuran;
