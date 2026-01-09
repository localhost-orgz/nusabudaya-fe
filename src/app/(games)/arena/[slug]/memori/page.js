"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Trophy, Clock, Zap, Award, ArrowLeft, Crown } from "lucide-react";
import MemoriSummary from "@/components/Arena/MemoriSummary";
import MemoriNav from "@/components/Arena/MemoriNav";
import MemoriTimer from "@/components/Arena/MemoriTimer";
import { useParams } from "next/navigation";
import { provinceService } from "@/services/modules/province.service";
import { GameType } from "@/constants/gameType";
import { gameResultService } from "@/services/modules/game-result.service";
import GoldEmblem from "@/app/loading/page";

const Memori = () => {
  // Card data - 8 pairs of matching cards
  // const cardPairs = [
  //   { id: 1, text: "Jakarta" },
  //   { id: 2, text: "Bandung" },
  //   { id: 3, text: "Surabaya" },
  //   { id: 4, text: "Semarang" },
  //   { id: 5, text: "Yogyakarta" },
  //   { id: 6, text: "Malang" },
  //   { id: 7, text: "Medan" },
  //   { id: 8, text: "Bali" },
  // ];

  // Create pairs and shuffle
  const [cardPairs, setCardPairs] = useState([]);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [timeLeft, setTimeLeft] = useState(80); // 80 seconds timer
  const [gameEnded, setGameEnded] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timeUsed, setTimeUsed] = useState(0);

  const { slug } = useParams();
  const [province, setProvince] = useState(null);
  const [resultSubmitted, setResultSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Province
  useEffect(() => {
    if (!slug) return;

    const fetchProvince = async () => {
      setIsLoading(true);
      try {
        const data = await provinceService.getBySlug(slug);

        const cultures = {
          culinary:          data.culinaries?.[0]?.name || "kuliner",
          musicalInstrument: data.musicalInstruments?.[0]?.name || "musik",
          regionalSong:      data.regionalSongs?.[0]?.title || "lagu",
          tourismSpot:       data.tourismSpots?.[0]?.name || "wisata",
          traditionalDance:  data.traditionalDances?.[0]?.name || "tari",
          traditionalHouse:  data.traditionalHouses?.[0]?.name || "rumah",
          traditionalWeapon: data.traditionalWeapons?.[0]?.name || "senjata",
          tradition:         data.traditions?.[0]?.name || "tradisi",
        };

        setCardPairs([
          { id: 1, text: cultures.culinary },
          { id: 2, text: cultures.musicalInstrument },
          { id: 3, text: cultures.regionalSong },
          { id: 4, text: cultures.tourismSpot },
          { id: 5, text: cultures.traditionalDance },
          { id: 6, text: cultures.traditionalHouse },
          { id: 7, text: cultures.traditionalWeapon },
          { id: 8, text: cultures.tradition },
        ]);
        setProvince(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProvince();
  }, [slug]);

  // Initialize game
  useEffect(() => {
    const doubledCards = [...cardPairs, ...cardPairs].map((card, index) => ({
      ...card,
      uniqueId: index,
      isFlipped: false,
      isMatched: false,
    }));

    // Shuffle cards
    const shuffled = doubledCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, [cardPairs]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !gameEnded) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        setTimeUsed(timeUsed + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameEnded(true);
    }
  }, [timeLeft, gameEnded, timeUsed]);

  // Check if all cards are matched
  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameEnded(true);
    }
  }, [matchedCards, cards]);

  // Handle card click
  const handleCardClick = (uniqueId) => {
    if (
      gameEnded ||
      flippedCards.length === 2 ||
      flippedCards.includes(uniqueId) ||
      matchedCards.includes(uniqueId)
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, uniqueId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find((c) => c.uniqueId === firstId);
      const secondCard = cards.find((c) => c.uniqueId === secondId);

      if (firstCard.id === secondCard.id) {
        // Match found
        setMatchedCards([...matchedCards, firstId, secondId]);
        setXpEarned(xpEarned + 10);
        setFlippedCards([]);
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const isCardFlipped = (uniqueId) => {
    return flippedCards.includes(uniqueId) || matchedCards.includes(uniqueId);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const calculateAccuracy = () => {
    if (moves === 0) return 0;
    const maxPossibleMoves = cardPairs.length;
    const accuracy = Math.round((maxPossibleMoves / moves) * 100);
    return Math.min(accuracy, 100);
  };

  const getPerformanceRating = () => {
    const isComplete = matchedCards.length === cards.length;
    const accuracy = calculateAccuracy();

    if (!isComplete) return { text: "Belum Selesai", color: "text-gray-400" };
    if (accuracy >= 90 && timeUsed <= 60)
      return { text: "Sempurna!", color: "text-yellow-400" };
    if (accuracy >= 80 && timeUsed <= 90)
      return { text: "Hebat!", color: "text-green-400" };
    if (accuracy >= 70) return { text: "Bagus!", color: "text-blue-400" };
    return { text: "Cukup Baik", color: "text-purple-400" };
  };

  // Summary Page Component
  useEffect(() => {
    if (gameEnded && !resultSubmitted) {
      const provinceId = province.id;
      const isComplete = matchedCards.length === cards.length;
      const type = GameType.MEMORY_CARD;
      const resultData = {
        provinceId,
        type,
        xp: xpEarned,
        time: timeUsed,
        is_complete: isComplete
      };
      
      (async () => {
        try {
          await gameResultService.create(resultData);
          setResultSubmitted(true);
        } catch (error) {
          console.error("Error submitting quiz result:", error);
        }
      })();
    }
  }, [gameEnded, matchedCards.length, cards.length]);
  
  if (isLoading) return <GoldEmblem />;

  if (gameEnded) {
    const isComplete = matchedCards.length === cards.length;
    const performance = getPerformanceRating();
    const accuracy = calculateAccuracy();

    return (
      <MemoriSummary
        isComplete={isComplete}
        performance={performance}
        accuracy={accuracy}
        xpEarned={xpEarned}
        formatTime={formatTime}
        timeUsed={timeUsed}
        moves={moves}
        matchedCards={matchedCards}
        cardPairs={cardPairs}
      />
    );
  }

  // Game Play Screen
  return (
    <main className="min-h-screen w-full bg-[#0D1922] flex flex-col items-center overflow-y-auto">
      {/* navigation bar */}
      <MemoriNav xpEarned={xpEarned} province={province} />

      {/* main layout */}
      <div className="w-full max-w-[900px] min-h-full p-3 md:p-5 mx-auto">
        <MemoriTimer timeLeft={timeLeft} />

        {/* Card Grid */}
        <div className="w-fit mx-auto grid grid-cols-4 md:grid-cols-4 gap-2 md:gap-3 mt-6 md:mt-8 mb-6 md:mb-8">
          {cards.map((card) => (
            <div
              key={card.uniqueId}
              onClick={() => handleCardClick(card.uniqueId)}
              className={`cursor-pointer ${
                isCardFlipped(card.uniqueId) ? "" : "hover:scale-105"
              } transition-transform duration-200`}
              style={{ perspective: "1000px" }}
            >
              <div
                className="relative w-[75px] h-[105px] sm:w-[90px] sm:h-[126px] md:w-[130px] md:h-[182px]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isCardFlipped(card.uniqueId)
                    ? "rotateY(180deg)"
                    : "rotateY(0deg)",
                  transition: "transform 0.6s",
                }}
              >
                {/* Back of card */}
                <div
                  className="absolute w-full h-full"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <Image
                    src="/back-card.png"
                    alt="back card"
                    width={130}
                    height={182}
                    className="w-full h-full object-cover rounded-md md:rounded-lg shadow-lg"
                  />
                </div>

                {/* Front of card (answer) */}
                <div
                  className="absolute w-full h-full bg-linear-to-br from-[#c8a668] to-[#a68850] rounded-md md:rounded-lg flex items-center justify-center border-2 md:border-4 border-[#d4b876] shadow-lg"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <span className="text-white text-xs sm:text-sm md:text-xl font-bold text-center px-1 md:px-3">
                    {card.text}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Memori;
