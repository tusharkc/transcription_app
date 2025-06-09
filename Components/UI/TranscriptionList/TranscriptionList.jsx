"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TranscriptionListItem from "./TranscriptionListItem";

const TranscriptionList = () => {
  const [transcriptions, setTranscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTranscriptions = async () => {
      try {
        const response = await axios.get("/api/transcriptions");
        setTranscriptions(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching transcriptions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTranscriptions();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading transcriptions...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="rounded-2xl">
      {transcriptions.length > 0 ? (
        transcriptions.map((item) => (
          <React.Fragment key={item?._id}>
            <TranscriptionListItem {...item} />
          </React.Fragment>
        ))
      ) : (
        <div className="text-center py-8">No transcriptions found</div>
      )}
    </div>
  );
};

export default TranscriptionList;
