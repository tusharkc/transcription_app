import Image from "next/image";

const TranscriptionListItem = ({
  companyLogo,
  name,
  recordDateTimeStamp,
  shortDescription,
  venue,
  venueDateTimeStamp,
  ...rest
}) => {
  return (
    <div className="bg-white p-4 border-b-2 border-b-[#E1E5EA] cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image
            className="rounded-full object-cover h-[18px] w-[18px]"
            src={companyLogo}
            width={"28"}
            height={"28"}
            alt="company_logo"
          />
          <p className="text-[#4A5568] text-sm font-medium"> {name}</p>
        </div>

        <p className="text-[#7687A3] text-sm font-[400]">
          {recordDateTimeStamp}
        </p>
      </div>

      <p className="text-[15px] mt-2 text-[#4A5568] font-medium">
        {shortDescription}
      </p>

      <p className="text-[15px] mt-2 text-[#4A5568] font-medium">
        {venue}, {venueDateTimeStamp}
      </p>
    </div>
  );
};

export default TranscriptionListItem;
