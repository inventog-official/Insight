"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { ContainerScroll, CardSticky } from "@/components/cards-stack";
import { Button } from "../ui/button";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaArrowRight } from "react-icons/fa";

const services = [
  {
    title: "Counselling & Program Discovery",
    description:
      "Having trouble deciding on a course or country? We’ll help you explore your options based on your interests, background, and future goals. Our experienced team will guide you in finding the academic path that suits you best.",
    image: "/assets/services/counselling & program discovery.webp",
    icon: "/icons/counseling.svg",
  },
  {
    title: "IELTS, Duolingo, PTE & English Speaking Training",
    description:
      "We offer personalized training for IELTS, Duolingo, and PTE exams to help students meet language proficiency requirements with confidence. Many universities in countries like the UK, Canada, and the USA accept IELTS waivers based on medium of instruction (MOI) or alternative tests like Duolingo or Pearson Test of English (PTE). We help you identify such universities and streamline the documentation process for eligibility.",
    image: "/assets/services/IELTS training.webp",
    icon: "/icons/selection.svg",
  },
  {
    title: "SOP Writing",
    description:
      "Your Statement of Purpose is your story — and we help you tell it well. Our team works with you to write a compelling, authentic SOP that highlights your goals, strengths, and personality. It’s not about using templates — it’s about helping your voice stand out and make an impact.",
    image: "/assets/services/SOP writing.webp",
    icon: "/icons/processing.svg",
  },
];

export default function ServicesSection() {
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
  const router = useRouter();

  const toggleExpand = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const truncateText = (text: string, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  useEffect(() => {
    AOS.init({
      duration: 400,
      offset: 100,
      once: true,
    });
  }, []);

  return (
    <>
      <Head>
        <title>Our Services | End-to-End Study Abroad Support – Insight</title>
        <meta
          name="description"
          content="From counselling to visa and guaranteed accommodation, get expert support for your global study journey every step of the way"
        />
      </Head>

      <div className="relative">
        {/* Decorative SVG Background Image */}
        <div
          className="absolute bg:bottom-20 bottom-20 top-2/5 left-0 w-24 h-24 sm:w-36 sm:h-36 opacity-80 z-0 block"
          style={{
            backgroundImage:
              "url('https://cdn-icons-png.flaticon.com/512/7978/7978776.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "left center",
            backgroundAttachment: "scroll",
          }}
        ></div>

        <section className="relative z-10 flex flex-col items-center md:flex-col justify-center md:text-center">
          <div className="container flex flex-col gap-10 px-8 py-8 md:py-10 lg:py-12 lg:flex-row">
            {/* Left side - Not sticky on mobile */}
            <div className="flex-1 self-start flex flex-col gap-4 rounded-xl items-center justify-center text-center lg:sticky top-20">
              <h4 className="text-primary uppercase text-base tracking-wider">
                — Services —
              </h4>
              <div className="h-px bg-gray-700 my-2"></div>

              {/* ✨ New Glow Effect Background Behind Heading */}
              <div className="relative px-4 py-2 rounded-xl overflow-hidden">
                <div
                  className="absolute inset-0 -z-10 rounded-xl blur-md opacity-80"
                  style={{
                    background:
                      "radial-gradient(circle at center,rgba(255, 0, 0, 0.2)	, transparent 80%)",
                  }}
                ></div>
                <h2 className="lg:text-5xl md:text-4xl text-3xl text-black font-bold">
                  Your Journey,{" "}
                  <span className="text-primary">Fully Supported</span>
                </h2>
              </div>

              <p className="text-black py-4 font-medium">
                Every Step of the Way!
              </p>

              {/* Show button only on large screens */}
              <div className="hidden lg:block">
                <Button
                  onClick={() => router.push("/services")}
                  className="md:mt-4 lg:mt-6 w-40 text-white"
                >
                  Go to Services
                </Button>
              </div>
            </div>

            {/* Right side - Cards container */}
            <div className="flex-1 w-full">
              <ContainerScroll className="py-4 space-y-8">
                {services.map((service, index) => {
                  const isExpanded = expanded[index] || false;
                  const displayedText = isExpanded
                    ? service.description
                    : truncateText(service.description, 120);

                  return (
                    <React.Fragment key={index}>
                      <CardSticky
                        key={index}
                        index={index + 2}
                        className="rounded-2xl text-xl bg-black overflow-hidden p-0 shadow-md lg:backdrop-blur-md transform transition duration-300 hover:scale-[1.02] hover:shadow-xl"
                        incrementY={30}
                        incrementZ={10}
                      >
                        <div className="relative w-full flex flex-col sm:flex-row h-auto sm:h-[270px]">
                          {/* Left Side: Image */}
                          <div className="relative w-full sm:w-1/2 h-[200px] sm:h-full">
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              className="object-cover transition duration-300 hover:brightness-110"
                            />
                          </div>

                          {/* Right Side: Content */}
                          <div className="w-full sm:w-1/2 bg-[#fefefe] p-5 flex flex-col justify-between">
                            <div className="space-y-4 h-full flex flex-col">
                              {/* Title */}
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <FaArrowRight className="text-primary text-sm sm:text-base flex-shrink-0" />
                                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
                                    {service.title}
                                  </h3>
                                </div>
                              </div>

                              {/* Description Box */}
                              <div className="border-l-4 border-primary pl-4 bg-[#f4f6f8] p-3 rounded text-[#374151] text-sm sm:text-base leading-snug flex-grow">
                                {displayedText}
                              </div>

                              {/* Read More */}
                              {service.description.length > 120 && (
                                <div className="text-right">
                                  <button
                                    onClick={() => router.push("/services")}
                                    className="text-primary font-semibold text-sm hover:underline"
                                    type="button"
                                  >
                                    Read More →
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardSticky>
                    </React.Fragment>
                  );
                })}
              </ContainerScroll>

              {/* Mobile-only button */}
              <div className="flex justify-center lg:hidden mt-8">
                <Button
                  onClick={() => router.push("/services")}
                  className="w-40"
                >
                  Go to Services
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
