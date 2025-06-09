function parseTranscript(content) {
  const lines = content.split("\n");
  const result = {
    participants: [],
    transcription: [],
  };

  let currentSection = null;
  let currentSpeaker = null;
  let currentContent = "";

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    // Detect sections
    if (trimmedLine.includes("Event Details")) {
      currentSection = "eventDetails";
      continue;
    } else if (trimmedLine.includes("Corporate Participants")) {
      currentSection = "corporateParticipants";
      continue;
    } else if (trimmedLine.includes("Conference Call Participants")) {
      currentSection = "conferenceParticipants";
      continue;
    } else if (trimmedLine.includes("Event Transcript")) {
      currentSection = "transcript";
      continue;
    } else if (trimmedLine.includes("Prepared Remarks")) {
      currentSection = "preparedRemarks";
      continue;
    } else if (trimmedLine.includes("Question and Answer")) {
      currentSection = "qna";
      continue;
    }

    // Parse based on current section
    switch (currentSection) {
      case "eventDetails":
        // Extract date and time
        const dateMatch = trimmedLine.match(/([A-Za-z]+ \d{1,2}, \d{4})/);
        if (dateMatch) {
          result.venueDateTimeStamp = new Date(dateMatch[0]);
        }
        break;

      case "corporateParticipants":
      case "conferenceParticipants":
        // More flexible participant parsing
        const participantParts = trimmedLine.split("·").map((p) => p.trim());
        if (participantParts.length >= 3) {
          const name = participantParts[0];
          const companyAndDesignation = participantParts.slice(1).join(" · ");
          const lastDotIndex = name.lastIndexOf(".");

          let participantName = name;
          let company = "";
          let designation = companyAndDesignation;

          // Try to extract company from name if it looks like "Name Company · Designation"
          const nameParts = name
            .split(/(?<=[a-z])(?=[A-Z])|\./)
            .filter(Boolean);
          if (nameParts.length > 1) {
            participantName = nameParts[0].trim();
            company = nameParts.slice(1).join(" ").trim();
            designation = companyAndDesignation;
          }

          result.participants.push({
            name: participantName,
            company: company || "Unknown Company",
            designation,
          });
        }
        break;

      case "transcript":
      case "preparedRemarks":
      case "qna":
        // Improved speaker detection
        const speakerDivider = trimmedLine.indexOf("·");
        if (speakerDivider > 0) {
          // If we have existing speaker content, save it before starting new speaker
          if (currentSpeaker) {
            result.transcription.push({
              ...currentSpeaker,
              content: currentContent.trim(),
            });
            currentContent = "";
          }

          const speakerPart = trimmedLine.substring(0, speakerDivider).trim();
          const designationPart = trimmedLine
            .substring(speakerDivider + 1)
            .trim();

          // Extract speaker name and company
          const nameParts = speakerPart.split(/(?<=[a-z])(?=[A-Z])/);
          const speakerName = nameParts[0].trim();
          const company = nameParts.slice(1).join(" ").trim();

          currentSpeaker = {
            speaker: speakerName,
            company: company || "Unknown Company",
            designation: designationPart,
          };

          // Add the rest of the line after the speaker info to content
          currentContent =
            trimmedLine
              .substring(speakerDivider + 1 + designationPart.length)
              .trim() + "\n";
        } else if (currentSpeaker) {
          // Continuation of current speaker's content
          currentContent += trimmedLine + "\n";
        }
        break;
    }
  }

  // Add the last speaker if exists
  if (currentSpeaker && currentContent) {
    result.transcription.push({
      ...currentSpeaker,
      content: currentContent.trim(),
    });
  }

  // Create full text for searching
  result.fullText = result.transcription.map((t) => t.content).join("\n");

  return result;
}

module.exports = { parseTranscript };
