"use client";
import { useSettingsStore } from "@/store/settings";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const { installed, setInstalled } = useSettingsStore((state) => state);
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showModal, setShowModal] = useState(!installed);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      console.log("beforeinstallprompt event triggered");
      setInstallPrompt(e);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) {
      console.warn("Install prompt tidak tersedia");
      return;
    }

    installPrompt.prompt();

    const choiceResult = await installPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the install prompt");
      setInstalled(true);
      setShowModal(false);
      setInstallPrompt(null);
    } else {
      console.log("User dismissed the install prompt");
      setShowModal(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    !installed &&
    installPrompt !== null && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white text-center p-4 md:rounded-2xl rounded-xl shadow-lg w-80 dark:bg-black dark:border dark:border-gray-800">
          <Image
            src="/logo-quranku.svg"
            className="w-[48px] h-[48px] text-center mx-auto"
            width={0}
            height={0}
            alt={"logo"}
          />
          <h2 className="text-lg font-semibold mt-1 mb-2">Install QuranKu</h2>
          <p className="text-sm mb-4">
            Aplikasi ini dapat diinstal untuk pengalaman yang lebih baik!
          </p>
          <div className="flex gap-2 w-full">
            <button
              aria-label="install"
              aria-labelledby="install"
              onClick={handleInstall}
              className="w-full px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-600 dark:text-neutral-800 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
              disabled={!installPrompt}
            >
              {!installPrompt
                ? "Tunggu ya, installasi prompt belum siap"
                : "Install"}
            </button>
            <button
              aria-label="tutup"
              aria-labelledby="tutup"
              onClick={() => handleClose()}
              className="w-full px-4 py-2 rounded-md border border-neutral-300 bg-red-500 text-background
              dark:text-white
              text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    )
  );
}
