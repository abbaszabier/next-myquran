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

interface DetailSurahProps {
  data?: DetailSurah;
  isLoading: boolean;
  setActiveCard: (value: number) => void;
}

const DetailSurahQuran: React.FC<DetailSurahProps> = ({
  data,
  isLoading,
  setActiveCard,
}) => {
  const { qori, setQori } = useSettingsStore((state) => state);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayer = useRef<HTMLAudioElement | null>(null);

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
    }
  };

  if (isLoading) return <LoadingDetailSurah />;

  return (
    <div className="border borrder-gray-200 space-y-4">
      <div className="flex sticky top-0 z-100 justify-between items-center h-[80px] px-4 bg-white border-b border-gray-200 backdrop-blur-sm bg-opacity-80 backdrop-filter backdrop-saturate-150">
        {/* Left Navigation */}
        <div className="flex gap-2 items-center">
          <button
            aria-label="Surah Sebelumnya"
            title={`Surah Sebelumnya: ${
              typeof data?.suratSebelumnya === "object"
                ? data.suratSebelumnya.namaLatin
                : "-"
            }`}
            onClick={() => data?.nomor !== undefined && prevSurah(data.nomor)}
            className={`border border-gray-200 p-1 shadow-sm rounded cursor-pointer hover:bg-gray-50 ${
              !data?.suratSebelumnya ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            aria-label="Surah Selanjutnya"
            title={`Surah Selanjutnya: ${
              typeof data?.suratSelanjutnya === "object"
                ? data.suratSelanjutnya.namaLatin
                : "-"
            }`}
            onClick={() => data?.nomor !== undefined && nextSurah(data.nomor)}
            className={`border border-gray-200 p-1 shadow-sm rounded cursor-pointer transform rotate-180 hover:bg-gray-50 ${
              !data?.suratSelanjutnya ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <ChevronLeft size={24} />
          </button>
          <SelectAyat onSelectAyat={onSelectAyat} data={data?.ayat} />
        </div>

        {/* Center Controls */}
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">{data?.namaLatin}</h1>
          <div className="flex justify-center items-center space-x-4">
            <p className="text-sm">
              {data?.arti} ⊙ {data?.jumlahAyat} Ayat ⊙ {data?.tempatTurun}
            </p>
          </div>
        </div>

        {/* Right Navigation */}
        <div className="flex w-[180px] gap-2 items-center">
          <button
            aria-label="Play Full Audio"
            title="Play Full Audio"
            onClick={playAudio}
            className="flex items-center p-2 bg-foreground text-white rounded hover:bg-blue-600 transition"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <Select onValueChange={onChaneQori} defaultValue={qori}>
            <SelectTrigger className="w-[140px]" aria-label="Pilih Qori">
              <SelectValue placeholder="Pilih Qori" aria-label="Pilih Qori" />
            </SelectTrigger>
            <SelectContent className="w-[140px]" aria-label="Pilih Qori">
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
        </div>
      </div>
      <div className="px-4 pb-4 space-y-4">
        {data?.ayat.map((verse) => (
          <div key={verse.nomorAyat}>
            <QuranVerseCard
              id={`ayat-${verse.nomorAyat}`}
              teksArab={verse.teksArab}
              nomorAyat={verse.nomorAyat}
              teksLatin={verse.teksLatin}
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
