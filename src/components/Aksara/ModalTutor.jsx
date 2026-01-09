import { CheckCircle, XCircle, X, RotateCcw, Brush } from "lucide-react";
import React from "react";

const ModalTutor = ({ isOpen, onClose, aksaraName, tutorialImage }) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-9999 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="fixed inset-0 z-10000 flex items-center justify-center p-4">
        <div className="bg-[#0D1922] w-full max-w-md rounded-xl border border-(--color-secondary)/50 overflow-hidden animate-in zoom-in duration-300">
          {/* Header */}
          <div className={`p-6 border-b bg-green-500/5 border-green-500/30`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Brush className="w-7 h-7 text-green-400" />
                </div>

                <div>
                  <h2 className={`text-xl font-bold text-green-400`}>
                    Tutorial Menulis Aksara {aksaraName}
                  </h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#c7c7c7]" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {tutorialImage ? (
              <img
                src={tutorialImage}
                alt={`Tutorial Aksara ${aksaraName}`}
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <div className="text-center text-gray-400 py-10">
                Tutorial belum tersedia
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={onClose}
                className={`flex-1 font-semibold py-3 px-4 rounded-lg transition-all duration-200 bg-(--color-secondary) hover:bg-[#d4b876] text-white`}
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalTutor;
