import { useGetTafsir } from "@/api/tafsir";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookOpen } from "lucide-react";

interface DialogTafsirProps {
  surah: string;
  nomorAyat: number;
  noSurah: number;
}

export default function DialogTafsir({
  surah,
  nomorAyat,
  noSurah,
}: DialogTafsirProps) {
  const { data: tafsir } = useGetTafsir(noSurah);

  const getTafsirPerAyat = tafsir?.tafsir.find(
    (tafsir) => tafsir.ayat === nomorAyat
  )?.teks;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          aria-label="Tafsir"
          title="Tafsir"
          className={` flex items-center px-2 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transition duration-200 hover:shadow-md`}
        >
          <BookOpen size={16} />
        </button>
      </DialogTrigger>
      <DialogContent className="w-80 md:w-96">
        <DialogHeader>
          <DialogTitle>Tafsir</DialogTitle>
          <DialogDescription>
            Surah {surah} ayat {nomorAyat}
          </DialogDescription>
        </DialogHeader>
        <p className="text-gray-800 text-sm dark:text-gray-400 h-96 overflow-y-auto">
          {getTafsirPerAyat}
        </p>
      </DialogContent>
    </Dialog>
  );
}
