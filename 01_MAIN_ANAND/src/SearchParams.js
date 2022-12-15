import { useEffect, useState, useRef } from "react";
import Results from "./Results";
import useBreedList from "./useBreedList";
import locations from "./states.json"

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, updateLocation] = useState("");
  const [animal, updateAnimal] = useState("");
  const [breed, updateBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [focused, setFocus] = useState(false);
  const [breeds] = useBreedList(animal);
  const [filteredList, setList] = useState(locations)

  const inputRef = useRef(null)

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();

    setPets(json.pets);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })

  function handleClickOutside (e) {
    const {current: wrap} = inputRef
    if (wrap && !wrap.contains(e.target)) {
      setFocus(false)
    }
  }

  function onInputChange (e) {
    updateLocation(e.target.value)
    setFocus(true)
    if (e.target.value) {
      // important
      setList(locations.filter(t => t.code.toLowerCase().includes(e.target.value.toLowerCase) || t.name.toLowerCase().includes(e.target.value.toLowerCase())))
    } else {
      setList(locations)
    }
  }

  return (
    <div className="search-params">
      <form
        ref={inputRef}
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
          setFocus(false);
        }}
      >
          <input
            id="location"
            aria-label="location"
            value={location}
            placeholder="Type to Search"
            onChange={(e) => onInputChange(e)}
            style={{  marginBottom: focused ? '0px' : '30px' }}
          />
        {
          focused && <div 
          style={{ paddingTop: '0px', marginTop: '0px'}}
          >
              {filteredList.map(({name, code}) => (
                
              <div 
                tabIndex="0"    
                role="button"
                onClick={(e) => {
                  updateLocation(name);
                  setFocus(false)
                }   
                }
                onKeyDown={(e) => {
                  updateLocation(name);
                  e.key === 'Enter' ? setFocus(false) : updateLocation(name)
                }}
                key={code}
                style={{cursor: 'pointer', backgroundColor: 'white'}}
              >
                {name}
                </div>
            ))}
          </div>
        }
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              updateAnimal(e.target.value);
              updateBreed("");
            }}
            onBlur={(e) => {
              updateAnimal(e.target.value);
              updateBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => updateBreed(e.target.value)}
            onBlur={(e) => updateBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
