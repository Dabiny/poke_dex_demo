import { Route, Routes } from "react-router-dom";
import PokemonCollection from "./Commons/PokemonCollection";
import PokemonSearch from "./Commons/PokemonSearch";
import PokemonDetail from "./Description/PokemonDetail";
import PokeCardList from "./List/PokeCardList";

const PageNavigator = () => {
    return (
        <Routes>
            <Route path="/" element={<PokeCardList />} />
            <Route path="/pokemon/:name" element={<PokemonDetail/>} />
            <Route path="/mycollection" element={<PokemonCollection />} />
            <Route path="search" element={<PokemonSearch />} />
        </Routes>
    )
};

export default PageNavigator;