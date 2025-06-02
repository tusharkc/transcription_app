import { AppWindow, SortDesc } from "lucide-react";

const TranscriptionListHeader = () => {
  return (
    <div className="bg-white my-2 p-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <AppWindow color="#4A5568" height={"12px"} width={"12px"} />
        <p className="text-[#2E2E2E] text-sm">
          Results <span className="text-[#AEAEB2] text-xs">2259</span>
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <p className="text-xs">Sort by</p>
        <SortDesc />
      </div>
    </div>
  );
};

export default TranscriptionListHeader;
