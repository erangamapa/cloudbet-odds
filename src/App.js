import "./styles.css";
import React from "react";
import Competition from './Competition';
import { Locale, getSportsName } from "@cloudbet/market-helper";
function getSport(sport, apiKey) {
  return fetch(`https://sports-api.cloudbet.com/pub/v2/odds/sports/${sport}`, {
    headers: {
      "X-Api-Key": apiKey,
      "cache-control": "max-age=600"
    }
  });
}
const sports = ["soccer", "basketball", "american-football"];
export default function App() {
  const [apiKey, setApiKey] = React.useState("");
  const [sport, setSport] = React.useState(sports[0]);
  const [loading, setLoading] = React.useState(false);
  const [competitions, setCompetitions] = React.useState([]);
  React.useEffect(() => {
    if (!sport || !apiKey) {
      return;
    }
    setLoading(true);
    getSport(sport, apiKey)
      .then((response) => {
        setLoading(false);
        return response.json();
      })
      .then((body) => {
        setCompetitions(body.categories.flatMap((c) => c.competitions));
      });
  }, [apiKey, sport]);

  return (
    <div className="App">
      <div>
        <label for="apiKey">API Key</label>
        <input
          className="apikey-field"
          type="text"
          id="apiKey"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>
      <div>
        <label for="sport">Sport</label>
        <select value={sport} onChange={(e) => setSport(e.target.value)}>
          {sports.map((s) => (
            <option value={s}>{getSportsName(s, Locale.ko)}</option>
          ))}
        </select>
      </div>
      {loading ? <Loading /> : competitions.map((c) => (
        <Competition
          competition={c}
          apiKey={apiKey}
          key={c.key}
          sportKey={sport}
        />
      ))}
    </div>
  );
}


function Loading() {
  return <div className="loading">Loading...</div>;
}

