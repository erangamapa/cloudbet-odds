//Competition.js
import "./styles.css";
import React from "react";
import Event from './Event';
function getCompetition(competition, apiKey) {
  return fetch(
    `https://sports-api.cloudbet.com/pub/v2/odds/competitions/${competition}`,
    {
      headers: {
        "X-Api-Key": apiKey,
        "cache-control": "max-age=600"
      }
    }
  );
}

export default function Competition({ competition, apiKey, sportKey }) {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const loadEvents = (key) => {
    setExpanded((e) => !e);
    if (events.length || loading) {
      return;
    }
    setLoading(true);
    getCompetition(key, apiKey)
      .then((response) => response.json())
      .then((body) => {
        setEvents(body.events);
        setLoading(false);
      });
  };
  return (
    <div className="competition">
      <div
        className="competition-title"
        onClick={() => loadEvents(competition.key)}
      >
        {competition.name}
      </div>
      {expanded && (
        <div>
          {loading ? (
            <Loading />
          ) : (
            events.map((e) => (
              <Event event={e} key={e.id} sportKey={sportKey} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

function Loading() {
  return <div className="loading">Loading...</div>;
}
