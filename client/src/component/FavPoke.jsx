/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import LikePoke from "./LikePoke";

function FavPoke({ fav }) {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {fav?.map((data, idx) => (
        <div key={idx} className="border p-2 bg-white rounded-lg shadow-md">
           <h3 className="bg-orange-400 font-semibold text-center">
            {data.name}
          </h3>
          <img
            className="bg-green-200 w-full h-auto"
            src={data?.sprites?.other?.home?.front_default}
            alt={data.name}
          />
          <LikePoke fav={fav}/>
        </div>
      ))}
    </div>
  );
}

FavPoke.propTypes = {
  fav: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      sprites: PropTypes.shape({
        other: PropTypes.shape({
          home: PropTypes.shape({
            front_default: PropTypes.string,
          }),
        }),
      }),
    })
  ).isRequired,
};
export default FavPoke;
