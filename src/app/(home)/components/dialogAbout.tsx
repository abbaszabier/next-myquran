import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

function DialogAbout() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-between items-center">Tentang</div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription className="flex flex-col items-center justify-center">
            <Image
              src="/logo-quranku.svg"
              width={0}
              height={0}
              alt="QuranKu"
              className="text-center h-[60px] w-[60px]"
            />
            <span className="text-foreground text-xs mt-1.5">
              Baca Quran di mana pun, kapan pun!
            </span>
          </DialogDescription>
          <DialogDescription className="flex justify-between items-center pt-4">
            <span>Nama</span>
            <span className="font-bold text-foreground">QuranKu</span>
          </DialogDescription>
          <DialogDescription className="flex justify-between items-center">
            <span>Versi</span>
            <span className="font-bold text-foreground">1.0.0</span>
          </DialogDescription>
          <DialogDescription className="flex justify-between items-center">
            <span>Developer</span>
            <span className="font-bold text-foreground">Abbas Zabier</span>
          </DialogDescription>
          <DialogDescription className="flex justify-between items-center">
            <span>Kontak (WA)</span>
            <span className="font-bold text-foreground">088211156895</span>
          </DialogDescription>
          <DialogDescription className="flex justify-center items-center pt-6">
            <span className="text-xs font-medium text-foreground">
              Copyright © {new Date().getFullYear()}
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DialogAbout;
