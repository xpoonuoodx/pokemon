/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import FavPoke from "./component/FavPoke";
import { Link } from 'react-router-dom';

function App() {
  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fav, setFav] = useState([]);
  const [number, setNumber] = useState(1);

  useEffect(() => {
    const abortController = new AbortController();

    const loadPoke = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${number}`,
          {
            signal: abortController.signal,
          }
        );
        setPoke(response.data);
        setError("");
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    loadPoke();
    return () => abortController.abort();
  }, [number]);

  console.log(poke);

  const prevPoke = () => {
    if (number > 1) {
      setNumber((number) => number - 1);
    }
  };
  const nextPoke = () => {
    setNumber((number) => number + 1);
  };
  const addFav = () => {
    setFav((oldState) => [...oldState, poke]);
  };

  console.log("Number ID = ", number);
  console.log("You fav ", fav);

  return (
    <div className="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="bg-cyan-200 m-5 p-3 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div className="text-center border p-2 bg-white rounded-lg shadow-md m-2">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="text-center border p-2 bg-white rounded-lg shadow-md m-1 mx-auto w-auto">
                <h1 className="bg-pink-200 font-bold text-2xl inline-block ">
                  {poke?.name}
                </h1>
              </div>
              <button
                className="w-auto my-2 py-2 px-5 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75"
                onClick={addFav}
              >
                Add to Fev
              </button>
              <br className="m-5" />

              {poke?.sprites && (
                <img
                  className="bg-green-200 w-2/3 mx-auto"
                  src={poke?.sprites?.other?.home?.front_default}
                  alt={poke.name}
                />
              )}
              <div className="text-center border p-2 bg-white rounded-lg shadow-md m-2 w-full mx-auto">
                <h1 className="bg-pink-200 font-bold text-2xl inline-block">
                  Ability
                </h1>
              </div>
              <div className="text-center border p-2 bg-white rounded-lg shadow-md m-2 w-full mx-auto">
                <ul className="text-center ">
                  {poke?.abilities?.map((abil, idx) => (
                    <div key={idx}>
                      <li className="bg-orange-400 text-lg font-bold p-1 m-1 inline-block ">
                        {abil.ability.name}
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
              <center>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 ">
                  <button
                    className="w-auto py-2 px-5 my-1  bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75"
                    onClick={prevPoke}
                  >
                    Previous
                  </button>
                  <button
                    className="w-auto py-2 px-5 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75"
                    onClick={nextPoke}
                  >
                    Next
                  </button>
                </div>
              </center>
            </>
          )}
        </div>
        <div className="text-center border p-2 bg-white rounded-lg shadow-md s m-2">
          <div className="text-center border p-2 bg-white rounded-lg shadow-md m-2">
            <h2 className="bg-pink-200 font-bold text-2xl inline-block">
              Fav to poke
            </h2>
          </div>
          {fav.length > 0 ? (
            <FavPoke fav={fav} />
          ) : (
            <div className="flex h-full justify-center items-center">
              <p>No fav poke</p>
            </div>
          )}
        </div>
      </div>
      <Link to="/page-b">Go to Page B</Link>
    </div>
  );
}

export default App;
