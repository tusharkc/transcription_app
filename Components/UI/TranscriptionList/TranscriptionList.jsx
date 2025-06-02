import React from "react";
import TranscriptionListItem from "./TranscriptionListItem";

const TranscriptionList = ({ listData = [] }) => {
  return (
    <div className="rounded-2xl">
      {listData.map((item) => (
        <React.Fragment key={item?._id}>
          <TranscriptionListItem {...item} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default TranscriptionList;
