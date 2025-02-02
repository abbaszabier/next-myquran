import { WifiOff } from "lucide-react";
import Link from "next/link";
import React from "react";

const Offline = () => {
  return (
    <div className="flex flex-col items-center w-full justify-center min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-4rem)] bg-background">
      <div className="flex flex-col items-center text-center justify-center w-full max-w-lg">
        <WifiOff className="w-32 h-32 mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
          Anda Sedang Offline
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Upss, data pada halaman ini belum tersimpan di cache. Silakan kembali
          online terlebih dahulu untuk meng-cache halaman ini.
        </p>
      </div>
      <Link href="/" className="mt-8">
        <button className="px-6 py-2 bg-black text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white">
          Kembali ke Beranda
        </button>
      </Link>
    </div>
  );
};

export default Offline;
