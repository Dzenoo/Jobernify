import React from 'react';

type CardSectionProps = {
  title: string;
  children?: React.ReactNode;
};

const CardSection: React.FC<CardSectionProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default CardSection;
