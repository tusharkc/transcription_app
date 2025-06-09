const mongoose = require("mongoose");
const dbConnect = require("../lib/dbConnect");

dbConnect();

const ParticipantSchema = new mongoose.Schema({
  name: String,
  company: String,
  designation: String,
});

const TranscriptionSegmentSchema = new mongoose.Schema({
  speaker: String,
  company: String,
  designation: String,
  content: String,
});

const DocumentSchema = new mongoose.Schema({
  companyLogo: String,
  name: String,
  recordDateTimeStamp: Date,
  shortDescription: String,
  venue: String,
  venueDateTimeStamp: Date,
  participants: [ParticipantSchema],
  transcription: [TranscriptionSegmentSchema],
  fullText: String,
});

DocumentSchema.index({
  fullText: "text",
  name: "text",
  shortDescription: "text",
});

module.exports =
  mongoose.models.Document || mongoose.model("Document", DocumentSchema);
