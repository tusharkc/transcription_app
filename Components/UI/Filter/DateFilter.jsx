import { filterOptions } from "@/Components/data/filterOptions";
import React from "react";

const DateFilter = () => {
  return (
    <div>
      <p className="text-[#2E2E2E] text-sm px-3 py-2.5 mt-4 border-y border-4 border-x-0 border-y-[#F1F1F1]">
        Date Range
      </p>

      <div className="flex flex-col px-3 space-y-3">
        {filterOptions.map((filter) => (
          <React.Fragment key={filter.title}>
            <label className="flex items-center space-x-2">
              <input type="radio" name="group" value="option1" />
              <p className="text-[#4A6682]">{filter.title}</p>
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DateFilter;
