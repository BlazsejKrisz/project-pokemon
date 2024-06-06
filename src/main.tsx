import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LocationList from "./Components/LocationList";
import Encounter from "./Components/Encounter";

function App() {
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  const [encounteredPokemon, setEncounteredPokemon] = useState<any | null>(
    null
  );
  const [usersPokemonUrls, setUsersPokemonUrls] = useState<string[]>([
    "https://pokeapi.co/api/v2/pokemon/bulbasaur",
    "https://pokeapi.co/api/v2/pokemon/charizard",
    "https://pokeapi.co/api/v2/pokemon/poliwhirl",
  ]);
  const [battleMessage, setBattleMessage] = useState<string>("");

  const handleLocationSelect = (location: any, pokemon: any) => {
    setSelectedLocation(location);
    setEncounteredPokemon(pokemon);
    setBattleMessage("");
  };

  const handleEndEncounter = (
    newUsersPokemonUrls: string[],
    message: string
  ) => {
    setUsersPokemonUrls(newUsersPokemonUrls);
    setSelectedLocation(null);
    setEncounteredPokemon(null);
    setBattleMessage(message);
  };

  return (
    <React.StrictMode>
      

 


      <h1>POKÉMON</h1>
      <img className="pika" src="https://i.pinimg.com/originals/8a/4a/72/8a4a7213b43f4ec4f99db406be655f9e.gif" alt="pikapika" />
      {battleMessage && <p>{battleMessage}</p>}
      {selectedLocation && encounteredPokemon ? (
        <Encounter
          location={selectedLocation.name.split("-")
          .map((s) => s[0].toUpperCase() + s.slice(1))
          .join(" ")}
          encounteredPokemon={encounteredPokemon}
          onEndEncounter={handleEndEncounter}
        />
      ) : (
      <LocationList onLocationSelect={handleLocationSelect} />

      )}
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
