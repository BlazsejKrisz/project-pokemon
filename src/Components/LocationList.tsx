import { useState, useEffect } from "react";
import LocationCard from "./LocationCard";
import PokemonCard from "./PokemonCard";

type Location = {
  name: string;
  url: string;
};

type Pokemon = {
  name: string;
  url: string;
  sprites: { front_default: string };
};

type LocationListProps = {
  onLocationSelect: (location: Location, pokemon: Pokemon) => void;
  usersPokemonUrls: string[];
};

export default function LocationList(props: LocationListProps) {
  const { onLocationSelect} = props;
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/location/");
      const data = await response.json();
      setLocations(data.results);
    };

    fetchLocations();
  }, []);

  const handleLocationClick = async (location: Location) => {
    setSelectedLocation(location);

    const areaUrl = location.url.replace("/location/", "/location-area/");
    const areaResponse = await fetch(areaUrl);
    const areaData = await areaResponse.json();
    const rand = Math.floor(Math.random() * areaData.pokemon_encounters.length);
    const pokemonUrl = areaData.pokemon_encounters[rand].pokemon.url;
    const pokemonResponse = await fetch(pokemonUrl);
    const pokemonData = await pokemonResponse.json();

    setSelectedPokemon(pokemonData);
    onLocationSelect(location, pokemonData);
  };

  return (
    <><div className="logo-container">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png" className="logo" />
      </div><div>
              {selectedLocation && selectedPokemon ? (
                  <PokemonCard pokemon={selectedPokemon} />
              ) : (
                  <div className="table-container">
                      <div className="location-table">
                          {locations.map((location) => (
                              <LocationCard
                                  key={location.url}
                                  location={location}
                                  onClick={() => handleLocationClick(location)} />
                          ))}
                      </div>
                  </div>
              )}
          </div></>
  );
}
