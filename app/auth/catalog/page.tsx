'use client'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PokemonCard from '@/components/PokemonCard';

function Catalog(){
    return (
        <>      
        <Header/>
        <main className="p-4">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Catalog</h1>
          <hr className="mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Aquí puedes mapear tus Pokémon y renderizar un PokemonCard por cada uno */}
            <PokemonCard
              name="Pikachu"
              weight={6}
              moves={["Thunder Shock", "Quick Attack"]}
              imageUrl="https://img.pokemondb.net/artwork/large/pikachu.jpg"
            />
            <PokemonCard
              name="Charmander"
              weight={8.5}
              moves={["Ember", "Scratch"]}
              imageUrl="https://img.pokemondb.net/artwork/large/charmander.jpg"
            />
            <PokemonCard
              name="Bulbasaur"
              weight={6.9}
              moves={["Vine Whip", "Tackle"]}
              imageUrl="https://img.pokemondb.net/artwork/large/bulbasaur.jpg"
            />
          </div>
        </main>
        <Footer/>
        </>
    );
}
export default Catalog;