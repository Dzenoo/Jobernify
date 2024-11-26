"use client";

import React, { useState } from "react";

import { EmployerFAQs, GeneralPlatformFAQs, JobSeekerFAQs } from "@/constants";

import BlueButton from "./BlueButton";

import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const FaqLanding: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  function handleActiveTab(tab: number): void {
    setActiveTab(tab);
  }

  const Buttons = [
    { id: 0, title: "Seekers" },
    { id: 1, title: "Employers" },
    { id: 2, title: "General" },
  ];

  const AccordionData =
    activeTab === 0
      ? JobSeekerFAQs
      : activeTab === 1
      ? EmployerFAQs
      : GeneralPlatformFAQs;

  return (
    <section id="faq" className="px-5 flex flex-col gap-28 md:landing-padding">
      <div className="flex flex-col justify-center items-center gap-8">
        <div>
          <BlueButton>FAQ</BlueButton>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-center max-sm:text-3xl">
            Frequently Asked <span className="text-[#0084FF]">Questions</span>
          </h1>
        </div>
        <div className="max-w-2xl">
          <p className="text-center text-[#A8A8A8] leading-[28px]">
            Have questions about how our platform works? We have got you
            covered! Whether you are a job seeker looking for your next
            opportunity or an employer searching for top tech talent, here are
            the answers to the most commonly asked questions.
          </p>
        </div>
        <div className="flex items-center gap-5">
          {Buttons.map(({ id, title }) => (
            <BlueButton
              key={id}
              isActive={activeTab === id}
              onClick={() => handleActiveTab(id)}
            >
              {title}
            </BlueButton>
          ))}
        </div>
      </div>
      <div>
        <Accordion type="single" collapsible>
          {AccordionData.map(({ id, title, description }) => (
            <AccordionItem className="py-5" key={id} value={`item-${id}`}>
              <AccordionTrigger className="font-semibold max-sm:text-sm text-left">
                {title}
              </AccordionTrigger>
              <AccordionContent>{description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="pb-28 flex flex-col justify-center items-center gap-10">
        <div>
          <h1 className="text-4xl font-bold text-center max-sm:text-3xl ">
            Still Have Questions?
          </h1>
        </div>
        <div className="max-w-lg">
          <p className="text-center text-[#A8A8A8] leading-[28px]">
            If you have any further questions or concerns, please don't hesitate
            to reach out to us. Our dedicated support team is always ready to
            assist you with any inquiries you may have.
          </p>
        </div>
        <div>
          <Button>
            <a href="mailto:jobernify@gmail.com">Contact Us</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FaqLanding;
