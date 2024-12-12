"use client";

import React from "react";
import { Metadata } from "next";
import HeroLanding from "@/components/shared/pages/landing/HeroLanding";
import HowItWorksLanding from "@/components/shared/pages/landing/HowItWorksLanding";
import FeaturesLanding from "@/components/shared/pages/landing/FeaturesLanding";
import BenefitsLanding from "@/components/shared/pages/landing/BenefitsLanding";
import TechRolesOnlyLanding from "@/components/shared/pages/landing/TechRolesOnlyLanding";
import FaqLanding from "@/components/shared/pages/landing/FaqLanding";
import useZoomLevel from "@/hooks/defaults/useZoomLevel.hook";

export const metadata: Metadata = {
  title: "Home",
  description: "Start your job search journey with Jobernify.",
};

const HomePage = () => {
  const isZoomedOut = useZoomLevel();

  return (
    <div className="flex justify-center">
      <article
        className={`flex flex-col gap-72 w-full ${
          isZoomedOut ? "max-w-screen-2xl" : ""
        }`}
      >
        <HeroLanding />
        <HowItWorksLanding />
        <FeaturesLanding />
        <BenefitsLanding />
        <TechRolesOnlyLanding />
        <FaqLanding />
      </article>
    </div>
  );
};

export default HomePage;
