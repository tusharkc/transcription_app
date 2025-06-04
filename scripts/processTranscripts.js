const { parseTranscript } = require("../lib/transcriptParser");
const Document = require("../models/Document");
const fs = require("fs");
const path = require("path");
const dbConnect = require("../lib/dbConnect");

async function processTranscriptFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const fileName = path.basename(filePath, ".txt");

    // Parse the transcript
    const metadata = extractFileMetadata(fileName);
    const parsed = parseTranscript(content);

    // Create document in MongoDB
    const doc = new Document({
      companyLogo: getCompanyLogo(),
      name: getTickerSymbol(metadata.company),
      recordDateTimeStamp: metadata.date,
      shortDescription: `${metadata.company} ${metadata.event}`,
      venue: metadata.event.includes("Earnings")
        ? "Earnings Call"
        : "Conference Call",
      venueDateTimeStamp: metadata.eventDate,
      participants: parsed.participants,
      transcription: parsed.transcription,
      fullText: parsed.fullText,
    });

    await doc.save();
    console.log(`Processed ${fileName}`);
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

async function processFolder(folderPath) {
  await dbConnect();
  const items = fs.readdirSync(folderPath, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(folderPath, item.name);

    if (item.isDirectory()) {
      await processFolder(fullPath);
    } else if (item.isFile() && path.extname(item.name) === ".txt") {
      await processTranscriptFile(fullPath);
    }
  }
}

// Helper functions
function getCompanyLogo() {
  return "https://images.pexels.com/photos/15406292/pexels-photo-15406292/free-photo-of-google-on-smartphone-touchscreen.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
}

function getTickerSymbol(companyName) {
  const tickerMap = {
    "Adobe Inc.": "ADBE",
    Google: "GOOGL",
  };
  return tickerMap[companyName] || companyName.substring(0, 4).toUpperCase();
}

// Run the script with your root folder path
const rootFolderPath = path.join(process.cwd(), "transcriptions");
processFolder(rootFolderPath)
  .then(() => {
    console.log("All files processed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });

function extractFileMetadata(filename) {
  const match = filename.match(/^(\d{8}) (.+?), (.+?), (\w{3} \d{1,2}, \d{4})/);
  if (!match)
    return {
      company: "Unknown Company",
      date: new Date(),
      event: "Conference Call",
      eventDate: new Date(),
    };

  return {
    date: new Date(match[1].replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")),
    company: match[2].trim(),
    event: match[3].trim(),
    eventDate: new Date(match[4]),
  };
}
