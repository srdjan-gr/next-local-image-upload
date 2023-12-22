import React from "react";

const Message = ({ messageText }) => {
  switch (messageText.label) {
    case "danger":
      return (
        <div className="dark:bg-red-400/60 rounded-xl border-[1px] dark:border-neutral-800 p-4 mt-2 lg:mt-0 text-center">
          <p>{messageText.messageInfo}</p>
        </div>
      );
      break;
    case "success":
      return (
        <div className="dark:bg-green-300/30 rounded-xl border-[1px] dark:border-neutral-800 p-4 mt-2 lg:mt-0 text-center">
          <p>{messageText.messageInfo}</p>
        </div>
      );
      break;

    default:
      break;
  }
};

export default Message;
5;
