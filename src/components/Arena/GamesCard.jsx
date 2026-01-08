// import Link from "next/link";
// import React from "react";

// const MemoryPreview = () => (
//   <div className="relative w-full h-full flex items-center justify-center">
//     {/* Kartu Kiri */}
//     <img
//       src="/back-card.png"
//       className="w-16 absolute transition-all duration-500 animate-memory-left lg:animate-none lg:group-hover:-translate-x-14 lg:group-hover:-rotate-12 opacity-50"
//     />

//     {/* Kartu Tengah (Diem aja tapi nge-scale) */}
//     <img
//       src="/back-card.png"
//       className="w-16 z-10 transition-all duration-500 md:group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(200,166,104,0.8)]"
//     />

//     {/* Kartu Kanan */}
//     <img
//       src="/back-card.png"
//       className="w-16 absolute transition-all duration-500 animate-memory-right md:animate-none md:group-hover:translate-x-14 md:group-hover:rotate-12 opacity-50"
//     />
//   </div>
// );

// // 🧩 Visual buat game Visual
// const VisualPreview = () => (
//   <div className="relative w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
//     <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
//       <img
//         src="https://cdn.antaranews.com/cache/1200x800/2011/01/20110122034405saman.jpg"
//         alt=""
//         className="rounded-sm"
//       />
//       <div className="inset-0 rounded-sm absolute top-0 left-0 backdrop-blur-xs group-hover:opacity-0 animate-visual-loop transition-all duration-300 flex justify-center items-center lg:animate-none">
//         <span className="shadow-5xl text-3xl">❓</span>
//       </div>
//     </div>
//   </div>
// );

// const QuizPreview = () => {
//   const options = [
//     { label: "A", delay: "delay-0", time: "0ms" },
//     { label: "B", delay: "delay-75", correct: true, time: "75ms" }, // 👇 Kita tambahin properti 'time' buat animation delay
//     { label: "C", delay: "delay-150", time: "150ms" },
//     { label: "D", delay: "delay-300", time: "300ms" },
//   ];

//   return (
//     <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
//       <div className="flex items-center justify-center gap-2">
//         {options.map((opt) => (
//           <div
//             key={opt.label}
//             // 👇 MAGIC-NYA DISINI: Inline style buat animation-delay biar geraknya gantian!
//             style={{ animationDelay: opt.time }}
//             className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all duration-300
//               ${
//                 opt.correct
//                   ? "bg-(--color-secondary)/20 text-(--color-secondary)"
//                   : "bg-white/10 text-white"
//               }
//               ${opt.correct ? "animate-quiz-correct" : "animate-quiz-other"}
//               lg:animate-none ${opt.delay}
//               lg:group-hover:-translate-y-5
//               ${
//                 opt.correct
//                   ? "lg:group-hover:bg-(--color-secondary) lg:group-hover:text-black lg:group-hover:shadow-[0_0_15px_rgba(200,166,104,0.6)]"
//                   : "lg:group-hover:bg-white lg:group-hover:text-black"
//               }
//             `}
//           >
//             {opt.label}
//           </div>
//         ))}
//       </div>

//       <span
//         className="text-white/60 text-xs font-medium tracking-widest uppercase
//                       animate-quiz-text lg:animate-none
//                       lg:opacity-0 lg:translate-y-2
//                       lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500"
//       >
//         Jawaban Benar!
//       </span>
//     </div>
//   );
// };
// const previewComponents = {
//   ingatan: <MemoryPreview />,
//   visual: <VisualPreview />,
//   pengetahuan: <QuizPreview />,
// };

// const GamesCard = ({
//   gameRole,
//   gameName,
//   gameDescription,
//   gameExp,
//   gameDuration,
//   province,
// }) => {
//   const gameRoutes = {
//     "Kartu Memori": `/arena/${province.slug}/memori`,
//     "Tebak Gambar": `/arena/${province.slug}/tebak-gambar`,
//     Kuis: `/arena/${province.slug}/quiz`,
//   };

//   const gameLink = gameRoutes[gameName] || "#";
//   return (
//     <div className="group w-full h-full border border-[#5b5b5b] rounded-lg flex flex-col overflow-hidden">
//       <div className="h-48 relative bg-[#0D1922] shrink-0">
//         {previewComponents[gameRole]}
//       </div>

//       <div className="flex-1 bg-(--color-primary) border-t border-[#5b5b5b] p-5">
//         <div className="w-fit py-1 px-4 text-xs uppercase font-medium tracking-wide text-(--color-secondary) border border-(--color-secondary) rounded-full bg-[#C8A66830] mb-2">
//           {gameRole}
//         </div>

//         <h3 className="text-2xl font-semibold text-white my-2">{gameName}</h3>

//         <p className="text-[#c7c7c7] text-sm leading-5">{gameDescription}</p>

//         <div className="border border-(--color-secondary) my-3 opacity-25 rounded-full"></div>

//         <div className="flex gap-5">
//           <div className="flex items-center gap-1 opacity-50">
//             <img src="/xp.svg" className="w-4 h-4" />
//             <span className="text-white text-sm">{`${gameExp}xp`}</span>
//           </div>
//           <div className="flex items-center gap-1 opacity-50">
//             <img src="/stopwatch.svg" className="w-4 h-4" />
//             <span className="text-white text-sm">{`${gameDuration} min`}</span>
//           </div>
//         </div>

//         <Link href={gameLink}>
//           <button className="w-full rounded-md mt-5 py-2 cursor-pointer flex items-center justify-center bg-(--color-secondary) font-semibold tracking-wide">
//             MULAI MAIN
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default GamesCard;

import Link from "next/link";
import React from "react";

const MemoryPreview = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Kartu Kiri */}
    <img
      src="/back-card.png"
      className="w-16 absolute transition-all duration-500 animate-memory-left lg:animate-none lg:group-hover:-translate-x-14 lg:group-hover:-rotate-12 opacity-50"
    />

    {/* Kartu Tengah (Diem aja tapi nge-scale) */}
    <img
      src="/back-card.png"
      className="w-16 z-10 transition-all duration-500 md:group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(200,166,104,0.8)]"
    />

    {/* Kartu Kanan */}
    <img
      src="/back-card.png"
      className="w-16 absolute transition-all duration-500 animate-memory-right md:animate-none md:group-hover:translate-x-14 md:group-hover:rotate-12 opacity-50"
    />
  </div>
);

// 🧩 Visual buat game Visual
const VisualPreview = () => (
  <div className="relative w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <img
        src="https://cdn.antaranews.com/cache/1200x800/2011/01/20110122034405saman.jpg"
        alt=""
        className="rounded-sm"
      />
      <div className="inset-0 rounded-sm absolute top-0 left-0 backdrop-blur-xs group-hover:opacity-0 animate-visual-loop transition-all duration-300 flex justify-center items-center lg:animate-none">
        <span className="shadow-5xl text-3xl">❓</span>
      </div>
    </div>
  </div>
);

const QuizPreview = () => {
  const options = [
    { label: "A", delay: "delay-0", time: "0ms" },
    { label: "B", delay: "delay-75", correct: true, time: "75ms" }, // 👇 Kita tambahin properti 'time' buat animation delay
    { label: "C", delay: "delay-150", time: "150ms" },
    { label: "D", delay: "delay-300", time: "300ms" },
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center gap-2">
        {options.map((opt) => (
          <div
            key={opt.label}
            // 👇 MAGIC-NYA DISINI: Inline style buat animation-delay biar geraknya gantian!
            style={{ animationDelay: opt.time }}
            className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all duration-300
              ${
                opt.correct
                  ? "bg-(--color-secondary)/20 text-(--color-secondary)"
                  : "bg-white/10 text-white"
              }
              ${opt.correct ? "animate-quiz-correct" : "animate-quiz-other"}
              lg:animate-none ${opt.delay} 
              lg:group-hover:-translate-y-5 
              ${
                opt.correct
                  ? "lg:group-hover:bg-(--color-secondary) lg:group-hover:text-black lg:group-hover:shadow-[0_0_15px_rgba(200,166,104,0.6)]"
                  : "lg:group-hover:bg-white lg:group-hover:text-black"
              }
            `}
          >
            {opt.label}
          </div>
        ))}
      </div>

      <span
        className="text-white/60 text-xs font-medium tracking-widest uppercase
                      animate-quiz-text lg:animate-none 
                      lg:opacity-0 lg:translate-y-2 
                      lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500"
      >
        Jawaban Benar!
      </span>
    </div>
  );
};
const previewComponents = {
  ingatan: <MemoryPreview />,
  visual: <VisualPreview />,
  pengetahuan: <QuizPreview />,
};

const GamesCard = ({
  gameRole,
  gameName,
  gameDescription,
  gameExp,
  gameDuration,
  province,
}) => {
  const gameRoutes = {
    "Kartu Memori": `/arena/${province}/memori`,
    "Tebak Gambar": `/arena/${province}/tebak-gambar`,
    Kuis: `/arena/${province}/kuis`,
  };

  const gameLink = gameRoutes[gameName] || "#";
  return (
    <div className="group w-full h-full border border-[#5b5b5b] rounded-lg flex flex-col overflow-hidden">
      <div className="h-48 relative bg-[#0D1922] shrink-0">
        {previewComponents[gameRole]}
      </div>

      <div className="flex-1 bg-(--color-primary) border-t border-[#5b5b5b] p-5">
        <div className="w-fit py-1 px-4 text-xs uppercase font-medium tracking-wide text-(--color-secondary) border border-(--color-secondary) rounded-full bg-[#C8A66830] mb-2">
          {gameRole}
        </div>

        <h3 className="text-2xl font-semibold text-white my-2">{gameName}</h3>

        <p className="text-[#c7c7c7] text-sm leading-5">{gameDescription}</p>

        <div className="border border-(--color-secondary) my-3 opacity-25 rounded-full"></div>

        <div className="flex gap-5">
          <div className="flex items-center gap-1 opacity-50">
            <img src="/xp.svg" className="w-4 h-4" />
            <span className="text-white text-sm">{`${gameExp}xp`}</span>
          </div>
          <div className="flex items-center gap-1 opacity-50">
            <img src="/stopwatch.svg" className="w-4 h-4" />
            <span className="text-white text-sm">{`${gameDuration} min`}</span>
          </div>
        </div>

        <Link href={!province ? "#" : gameLink}>
          <button
            className={`w-full rounded-md mt-5 py-2 flex items-center justify-center font-semibold tracking-wide transition-all duration-200
    ${
      !province
        ? "bg-gray-800 text-gray-200 cursor-not-allowed"
        : "bg-(--color-secondary) text-white cursor-pointer hover:opacity-90"
    }
  `}
            disabled={!province}
          >
            {province ? "MULAI MAIN" : "PILIH PROVINSI"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GamesCard;
