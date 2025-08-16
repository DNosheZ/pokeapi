'use client'
import React from "react";

const PokemonCard = ({ name, weight, moves, imageUrl, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[var(--bg-light)] border border-[var(--purple-1)] rounded-xl p-4 w-60 shadow-md text-left hover:shadow-lg transition"
    >
      <div className="flex justify-center mb-4">
        <img src={imageUrl} alt={name} className="w-32 h-32 object-contain" />
      </div>
      <h2 className="text-xl font-bold text-[var(--purple-1)] mb-1">{name}</h2>
      <p className="text-[var(--grey-1)] mb-3">Weight: {weight} kg</p>
      <div className="flex flex-wrap gap-2">
        {moves.slice(0, 2).map((move, index) => (
          <span key={index} className="bg-[var(--green-1)] text-white text-sm px-3 py-1 rounded-full">
            {move}
          </span>
        ))}
      </div>
    </button>
  );
};

export default PokemonCard;
