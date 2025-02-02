import React from "react";

const Offline = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Anda Sedang Offline</h1>
      <p className="mt-2 text-gray-600">
        Silakan cek koneksi internet Anda dan coba lagi.
      </p>
    </div>
  );
};

export default Offline;
