import React from "react";
import { SelectAyat } from "./selectAyat";
import QuranVerseCard from "./quranVerse";

type Props = object;

const DetailSurah: React.FC<Props> = ({}) => {
  return (
    <div className="border borrder-gray-200 space-y-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
      <div
        className="flex sticky top-0 z-100 justify-between items-center p-4 bg-white border-b border-gray-200
  backdrop-blur-sm bg-opacity-80 backdrop-filter backdrop-saturate-150"
      >
        {/* Left Navigation */}
        <div className="flex w-[140px] items-center">
          <SelectAyat />
        </div>

        {/* Center Controls */}
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Al-Fatihah</h1>
          <div className="flex justify-center items-center space-x-4">
            <p className="text-sm">Pembukaan ⊙ 7 Ayat ⊙ Mekkah</p>
          </div>
        </div>

        {/* Right Navigation */}
        <div className="flex w-[140px] items-center">
          <SelectAyat />
        </div>
      </div>
      <div className="px-4 pb-4 space-y-4">
        <QuranVerseCard
          arabic="إِنَّ ٱلَّذِينَ كَفَرُواْ بِـَٔايَـٰتِنَا سَوْفَ نُصْلِيهِمْ نَارًۭ  إِنَّ ٱلَّذِينَ كَفَرُواْ بِـَٔايَـٰتِنَا سَوْفَ نُصْلِيهِمْ نَارًۭإِنَّ ٱلَّذِينَ كَفَرُواْ بِـَٔايَـٰتِنَا سَوْفَ نُصْلِيهِمْ نَارًۭإِنَّ ٱلَّذِينَ كَفَرُواْ بِـَٔايَـٰتِنَا سَوْفَ نُصْلِيهِمْ نَارًۭا"
          latin="Inna allatheena kafaroo bi-ayatina sawfa nusleehim naran Inna allatheena kafaroo bi-ayatina sawfa nusleehim naran Inna allatheena kafaroo bi-ayatina sawfa nusleehim naran Inna allatheena kafaroo bi-ayatina sawfa nusleehim naran Inna allatheena kafaroo bi-ayatina sawfa nusleehim naran"
          translation="Sesungguhnya orang-orang yang kafir kepada ayat-ayat Kami, kelak akan Kami masukkan ke dalam neraka. Sesungguhnya orang-orang yang kafir kepada ayat-ayat Kami, kelak akan Kami masukkan ke dalam neraka. Sesungguhnya orang-orang yang kafir kepada ayat-ayat Kami, kelak akan Kami masukkan ke dalam neraka."
          tafsir="Tafsir ayat ini menyebutkan tentang balasan bagi orang yang menolak kebenaran ayat-ayat Allah."
          audioUrl="https://example.com/ayat_audio.mp3"
        />
        <QuranVerseCard
          arabic="إِنَّ ٱلَّذِينَ كَفَرُواْ بِـَٔايَـٰتِنَا سَوْفَ نُصْلِيهِمْ نَارًۭ  إِنَّ ٱلَّذِينَ كَفَرُواْ بِـَٔايَـٰتِنَا سَوْفَ نُصْلِيهِمْ نَارًۭإِنَّ ٱلَّذِينَ كَفَرُواْ بِـَٔايَـٰتِنَا سَوْفَ نُصْلِيهِمْ نَارًۭإِنَّ ٱلَّذِينَ كَفَرُواْ بِـَٔايَـٰتِنَا سَوْفَ نُصْلِيهِمْ نَارًۭا"
          latin="Inna allatheena kafaroo bi-ayatina sawfa nusleehim naran Inna allatheena kafaroo bi-ayatina sawfa nusleehim naran Inna allatheena kafaroo bi-ayatina sawfa nusleehim naran Inna allatheena kafaroo bi-ayatina sawfa nusleehim naran Inna allatheena kafaroo bi-ayatina sawfa nusleehim naran"
          translation="Sesungguhnya orang-orang yang kafir kepada ayat-ayat Kami, kelak akan Kami masukkan ke dalam neraka. Sesungguhnya orang-orang yang kafir kepada ayat-ayat Kami, kelak akan Kami masukkan ke dalam neraka. Sesungguhnya orang-orang yang kafir kepada ayat-ayat Kami, kelak akan Kami masukkan ke dalam neraka."
          tafsir="Tafsir ayat ini menyebutkan tentang balasan bagi orang yang menolak kebenaran ayat-ayat Allah."
          audioUrl="https://example.com/ayat_audio.mp3"
        />
      </div>
    </div>
  );
};

export default DetailSurah;
