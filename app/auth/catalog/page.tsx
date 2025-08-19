// app/auth/catalog/page.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/authClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PokemonCard from "@/components/PokemonCard";
import Modal from "@/components/Modal";

const PAGE_SIZE = 10;

type PokemonCardData = {
  name: string;
  weight: number;
  moves: string[];
  imageUrl: string;
};

type PokeListResponse = {
  count: number;
  results: { name: string; url: string }[];
};

export default function Catalog() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<PokemonCardData[]>([]);
  const [selected, setSelected] = useState<PokemonCardData | null>(null);
  const [count, setCount] = useState<number>(0);

  // Guard
  useEffect(() => {
    if (!getToken()) router.replace("/auth/login");
  }, [router]);

  const totalPages = useMemo(() => Math.ceil(count / PAGE_SIZE), [count]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const offset = (page - 1) * PAGE_SIZE;
      const listRes = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
      const listJson: PokeListResponse = await listRes.json();
      setCount(listJson.count ?? 0);

      // 2) detalles
      const detailPromises = listJson.results.map(async (p) => {
        const res = await fetch(p.url);
        const j = await res.json();
        const data: PokemonCardData = {
          name: j.name,
          weight: j.weight,
          moves: (j.moves || []).map((m: any) => m.move?.name).slice(0, 2),
          imageUrl:
            j.sprites?.other?.["official-artwork"]?.front_default ||
            j.sprites?.front_default ||
            "",
        };
        return data;
      });

      const details = await Promise.all(detailPromises);
      setItems(details);
    }
    load();
  }, [page]);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Poke Catalog</h1>
            <div className="text-sm text-[var(--grey-1)]">
              Página {page} de {totalPages || 1}
            </div>
          </div>

          {loading && <div className="mb-4">Cargando...</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {items.map((p) => (
              <PokemonCard
                key={p.name}
                name={p.name}
                weight={p.weight}
                moves={p.moves}
                imageUrl={p.imageUrl}
                onClick={() => setSelected(p)}
              />
            ))}
          </div>

          {/* Paginación */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((n) => Math.max(1, n - 1))}
              disabled={page === 1}
              className="px-3 py-2 rounded border border-[var(--purple-1)] disabled:opacity-50"
            >
              Anterior
            </button>

            <span className="px-3 py-2 border border-transparent">
              {page} / {totalPages || 1}
            </span>

            <button
              onClick={() => setPage((n) => Math.min(totalPages || 1, n + 1))}
              disabled={page >= (totalPages || 1)}
              className="px-3 py-2 rounded border border-[var(--purple-1)] disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </main>

        <Modal open={!!selected} onClose={() => setSelected(null)}>
          {selected && (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <img src={selected.imageUrl} alt={selected.name} className="w-20 h-20 object-contain" />
                <div>
                  <h2 className="text-xl font-bold text-[var(--purple-1)] capitalize">{selected.name}</h2>
                  <p className="text-[var(--grey-1)]">Weight: {selected.weight} kg</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {selected.moves.map((m: string, i: number) => (
                  <span key={i} className="bg-[var(--green-1)] text-white text-sm px-3 py-1 rounded-full">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Modal>

        <Footer />
      </div>
      
    </>
  );
}
