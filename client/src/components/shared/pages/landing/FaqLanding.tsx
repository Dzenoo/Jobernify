'use client';

import React, { useState } from 'react';

import { EmployerFAQs, GeneralPlatformFAQs, JobSeekerFAQs } from '@/constants';

import BlueButton from './BlueButton';

import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from '@/components/ui/navigation/accordion';
import { Button } from '@/components/ui/buttons/button';
import { AccordionHeader } from '@radix-ui/react-accordion';

const FaqLanding: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  function handleActiveTab(tab: number): void {
    setActiveTab(tab);
  }

  const Buttons = [
    { id: 0, title: 'Seekers' },
    { id: 1, title: 'Employers' },
    { id: 2, title: 'General' },
  ];

  const AccordionData =
    activeTab === 0
      ? JobSeekerFAQs
      : activeTab === 1
      ? EmployerFAQs
      : GeneralPlatformFAQs;

  return (
    <section id="faq" className="px-5 space-y-28 md:landing-padding">
      <div className="text-center space-y-5">
        <div>
          <BlueButton>FAQ</BlueButton>
        </div>
        <div>
          <h1 className="dark:text-white text-4xl font-semibold leading-tight max-sm:text-3xl">
            Frequently Asked{' '}
            <strong className="text-[#0084FF]">Questions</strong>
          </h1>
        </div>
        <div className="max-w-2xl m-auto">
          <p className="text-[#9C9C9C] leading-relaxed">
            Have questions about how our platform works? We have got you
            covered! Whether you are a job seeker looking for your next
            opportunity or an employer searching for top tech talent, here are
            the answers to the most commonly asked questions.
          </p>
        </div>
        <div className="pt-5 space-x-5">
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
            <AccordionItem
              className="dark:text-white space-y-3 py-7 border-b-gray-200 dark:border-b-[#1b1b1b]"
              key={id}
              value={`item-${id}`}
            >
              <AccordionTrigger className="font-semibold max-sm:text-sm text-left pb-0">
                {title}
              </AccordionTrigger>
              <AccordionContent className="text-[#9C9C9C] pb-0">
                {description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="pb-28 space-y-5 text-center">
        <div>
          <h1 className="dark:text-white text-4xl font-semibold leading-tight max-sm:text-3xl">
            Still Have Questions?
          </h1>
        </div>
        <div className="max-w-lg m-auto">
          <p className="text-[#9C9C9C] leading-relaxed">
            If you have any further questions or concerns, please don't hesitate
            to reach out to us. Our dedicated support team is always ready to
            assist you with any inquiries you may have.
          </p>
        </div>
        <div>
          <Button className="px-6 font-medium" variant="outline">
            <a href="mailto:jobernify@gmail.com">Contact Us</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FaqLanding;
