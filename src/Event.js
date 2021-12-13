import "./styles.css";
import React from "react";
import {
  MarketType,
  getMarket,
} from "@cloudbet/market-helper";
const sportMarkets = {
  soccer: [MarketType.soccer_match_odds],
  basketball: [MarketType.basketball_1x2],
  tennis: [MarketType.tennis_winner]
};


export default function Event({ event, sportKey }) {
  const eventMarkets = React.useMemo(() => {
    const [markets, err] = getMarket(event, sportMarkets[sportKey][0]);
    if (err) {
      return [];
    }
    return markets;
  }, [event, sportKey]);
  if (!eventMarkets || !eventMarkets.length) {
    return null;
  }
  return (
    <div>
      <div className="event-title">{event.name}</div>
      {eventMarkets.map((m) => {
        const line = m.lines[0];
        if (!line) {
          return null;
        }
        return (
          <div className="selections">
            {line.map((outcome) => (
              <div className="selection">
                {outcome.name} <br />
                {outcome.back.price}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
