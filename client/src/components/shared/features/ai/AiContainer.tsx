import React from 'react';

import AiChat from './AiChat';
import AiForm from './forms/AiForm';

type AiContainerProps = {
  socket: any;
};

const AiContainer: React.FC<AiContainerProps> = ({ socket }) => {
  return (
    <div className="flex flex-col h-full min-h-96">
      <div className="flex-grow overflow-y-auto hide-scrollbar">
        <AiChat socket={socket} />
      </div>
      <div>
        <AiForm socket={socket} />
      </div>
    </div>
  );
};

export default AiContainer;
