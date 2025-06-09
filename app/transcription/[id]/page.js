import { Users } from "lucide-react";
import TranscriptionHeader from "./components/TranscriptionHeader";

async function getTranscript(id) {
  const res = await fetch(`http://localhost:3000/api/transcriptions/${id}`);
  if (!res.ok) throw new Error("Failed to fetch transcript");
  return await res.json();
}

export default async function TranscriptionPage({ params }) {
  const transcript = await getTranscript(params.id);

  return (
    <div>
      <TranscriptionHeader title={transcript.shortDescription} />

      <div className="bg-[#F9F9F9]">
        <p className="text-[#2E2E2E] text-md font-medium p-3 bg-white">
          Transcript
        </p>

        <div className="w-full h-full">
          <div className="mx-[30px]">
            {/* Participants Section */}
            <div className="bg-white m-3 p-4">
              <span className="bg-[#F9F9F9] w-fit border-2 border-[#EFEFEF] p-1 flex items-center space-x-2">
                <Users color="#4A5568" size={"14px"} />
                <p className="text-[#4A5568] text-sm font-light">
                  Participants
                </p>
              </span>

              {transcript.participants.map((participant, index) => (
                <p key={index}>
                  <span className="font-[600] text-sm">
                    {participant.name} |{" "}
                  </span>
                  <span className="font-[400] text-sm">
                    {participant.company}, {participant.designation}
                  </span>
                </p>
              ))}
            </div>

            {/* Transcript Content */}
            {transcript.transcription.map((segment, index) => (
              <div key={index} className="bg-white m-3 p-4">
                <p>
                  <span className="font-[600] text-sm">
                    {segment.speaker} |{" "}
                  </span>
                  <span className="font-[400] text-sm">
                    {segment.company}, {segment.designation}
                  </span>
                </p>

                <p className="font-[400] text-sm mt-2">{segment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
