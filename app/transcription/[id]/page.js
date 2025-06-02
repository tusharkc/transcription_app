import { Users } from "lucide-react";
import TranscriptionHeader from "./components/TranscriptionHeader";

const page = () => {
  return (
    <div>
      <TranscriptionHeader
        title={
          "Alphabet Inc. Presents at BofA Securities Auto-motive Summit, Apr-15-2025 08:50 AM"
        }
      />

      <div className="bg-[#F9F9F9]">
        <p className="text-[#2E2E2E] text-md font-medium p-3 bg-white">
          Transcript
        </p>

        <div className="w-full h-full">
          <div className="mx-[30px]">
            <div className="bg-white m-3 p-4">
              <span className="bg-[#F9F9F9] w-fit border-2 border-[#EFEFEF] p-1 flex items-center space-x-2">
                <Users color="#4A5568" size={"14px"} />
                <p className="text-[#4A5568] text-sm font-light">
                  Participants
                </p>
              </span>

              <p>
                <span className="font-[600] text-sm"> Alan S. Lowe | </span>{" "}
                <span className="font-[400] text-sm">
                  Lumentum Holdings Inc.President, CEO & Director
                </span>
              </p>

              <p>
                <span className="font-[600] text-sm"> Alan S. Lowe | </span>{" "}
                <span className="font-[400] text-sm">
                  Lumentum Holdings Inc.President, CEO & Director
                </span>
              </p>
            </div>

            <div className="bg-white m-3 p-4">
              <p>
                <span className="font-[600] text-sm">
                  Simon Matthew Leopold |{" "}
                </span>{" "}
                <span className="font-[400] text-sm">
                  Raymond James & Associates, Inc., Research Division, MD &
                  Research Analyst
                </span>
              </p>

              <p className="font-[400] text-sm">
                Well, thanks a lot, folks, for joining us. My name is Simon
                Leopold from Raymond James. We're here at our Annual Tech
                Conference here in New York. And we've got a fireside chat
                session with Alan Lowe, the CEO of Lumentum. Alan, thanks for
                joining us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
