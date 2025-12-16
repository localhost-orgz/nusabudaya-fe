import { SearchX } from "lucide-react";

const NotCulture = () => {
  return (
    <div className="w-full p-8 py-15 mt-5 border border-red-500/30 bg-red-500/10 rounded-xl flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
        <SearchX className="stroke-red-500" />
      </div>
      <h3 className="text-xl font-bold text-red-400 mb-2">
        Objek Tidak Dikenali
      </h3>
      <p className="text-white md:text-base text-sm max-w-lg">
        Sepertinya gambar ini bukan termasuk objek budaya Indonesia. Coba upload
        foto wayang, batik, atau rumah adat ya!
      </p>
    </div>
  );
};

export default NotCulture;
