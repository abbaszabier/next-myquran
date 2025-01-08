import { SelectAyat } from "./selectAyat";
import QuranVerseCard from "./quranVerse";
import type { DetailSurah } from "@/api/allSurah";

interface DetailSurahProps {
  data?: DetailSurah;
  isLoading: boolean;
}

const DetailSurahQuran: React.FC<DetailSurahProps> = ({ data }) => {
  const scrollToVerse = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="border borrder-gray-200 space-y-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
      <div className="flex sticky top-0 z-100 justify-between items-center h-[80px] px-4 bg-white border-b border-gray-200 backdrop-blur-sm bg-opacity-80 backdrop-filter backdrop-saturate-150">
        {/* Left Navigation */}
        <div className="flex w-[140px] items-center">
          <SelectAyat onSelectAyat={scrollToVerse} data={data?.ayat} />
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
        <div className="flex w-[140px] items-center"></div>
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
