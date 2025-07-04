
"use client";

import Image from "next/image";
import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type FlipContextType = {
  flippedId: string | null;
  setFlippedId: React.Dispatch<React.SetStateAction<string | null>>;
};

const FlipContext = createContext<FlipContextType>({
  flippedId: null,
  setFlippedId: () => {},
});

export const FlipProvider = ({ children }: { children: React.ReactNode }) => {
  const [flippedId, setFlippedId] = useState<string | null>(null);
  return (
    <FlipContext.Provider value={{ flippedId, setFlippedId }}>
      {children}
    </FlipContext.Provider>
  );
};

interface FlipCardProps {
  id: string;
  imageSrc: string;
  title: string;
  backDescription: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ id, imageSrc, title, backDescription }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [animateDesc, setAnimateDesc] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { flippedId, setFlippedId } = useContext(FlipContext);

  const truncateLength = 150;

  const displayDescription =
    backDescription.length > truncateLength && !showFullDesc
      ? backDescription.slice(0, truncateLength) + "..."
      : backDescription;

  useEffect(() => {
    setAnimateDesc(true);
    const timeout = setTimeout(() => setAnimateDesc(false), 700);
    return () => clearTimeout(timeout);
  }, [displayDescription]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const router = useRouter();

  const handleClick = () => {
    if (isMobile) {
      setFlippedId(flippedId === id ? null : id);
    }
  };

  const flipped = flippedId === id;

  return (
    <>
      <div
        className="flip-card w-72 h-96 perspective-1000 rounded-lg shadow-lg overflow-hidden cursor-pointer"
        tabIndex={0}
        aria-label={`Flip card for ${title}`}
        onClick={handleClick}
      >
        <div
          className={`flip-card-inner relative w-full h-full transition-transform duration-700 ease-in-out transform-style-preserve-3d rounded-lg ${
            isMobile && flipped ? "rotate-y-180" : ""
          } ${!isMobile ? "hover:rotate-y-180" : ""}`}
        >
          <div className="flip-card-front absolute w-full h-full backface-hidden rounded-lg overflow-hidden shadow-lg flex justify-center items-center">
            <Image
              src={imageSrc}
              alt={`Image of ${title}`}
              width={500}
              height={300}
              className="w-full h-full object-cover filter brightness-80 transition-transform duration-500 hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40"></div>
            <h1 className="absolute bottom-0 w-full bg-gradient-to-b from-black/5 h-10 to-black text-white text-lg font-semibold drop-shadow-md">
              {title}
            </h1>
          </div>
          <div className="flip-card-back absolute w-full h-full backface-hidden rotate-y-180 bg-transparent border border-primary/20 p-6 rounded-lg shadow-md flex flex-col justify-center items-center text-center text-black overflow-hidden">
            <div className="relative z-10 w-full h-full flex flex-col justify-center">
              <p
                className={`text-base leading-relaxed transition duration-700 ease-in-out transform hover:scale-105 text-justify ${
                  animateDesc ? "animate-fadeSlideIn" : ""
                }`}
                style={{
                  lineHeight: 1.8,
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                }}
              >
                {displayDescription}
              </p>
              {backDescription.length > truncateLength && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!showFullDesc) {
                      router.push("/countries");
                    } else {
                      setShowFullDesc(false);
                    }
                  }}
                  className="mt-6 bg-primary hover:bg-primary/80 text-white font-semibold px-5 py-2 rounded-md border focus:outline-none focus:ring-2 transition-colors duration-300 select-none"
                  aria-label={showFullDesc ? "Show less" : "Read more"}
                  style={{ wordSpacing: "0.15em" }}
                >
                  {showFullDesc ? "Show Less" : "Read More"}
                </Button>
              )}
            </div>
          </div>
        </div>
        <style jsx>{`
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
          @keyframes fadeSlideIn {
            0% {
              opacity: 0;
              transform: translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeSlideIn {
            animation: fadeSlideIn 1s ease forwards;
          }
          .flip-card-back::-webkit-scrollbar {
            display: none;
          }
          .flip-card-back {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </>
  );
};

export default FlipCard;


