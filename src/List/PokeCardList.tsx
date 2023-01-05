import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { fetchPokemon, PokemonListResponseType } from "../API/PokemonService";
import PokeCard from "./PokeCard";
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../Store";
import { fetchPokemonData } from "../Store/pokemonCardSlice";

const PokeCardList = () => {
    // 포켓몬 리스트를 저장하는 변수이니까 인터페이스에 맞춰서 useState를 작성한다.
    // 전역에서 관리해줄거기 때문에 useState 지우기
    // const [pokemon, setPokemon] = useState<PokemonListResponseType>({
    //     count: 0,
    //     next: "",
    //     results: [],
    // });

    // 상태값을 가져온다. 
    const {pokemonDataList} = useSelector((state: RootState) => state.pokemonData);
    const dispatch = useAppDispatch();

    // 무한스크롤 넣기
    const [infinityRef] = useInfiniteScroll({
        loading: false,
        // 다음페이지가 있는지 ? 만약 pokemon.next가 없으면 false
        hasNextPage: pokemonDataList.next !== "",
        // 무한스크롤 로딩될 때마다 api nextURL 불러오기
        onLoadMore: async () => {
            // const response = await fetchPokemon(pokemonList.next);
            // setPokemon({
            //     ...response,
            //     results: [...pokemon.results, ...response.results],
            // });

            // dispatch로 비동기를 처리해줄 thunk호출
            dispatch(fetchPokemonData(pokemonDataList.next));
        },
        disabled: false,
        rootMargin: "0px 0px 400px 0px",
    });

    // useEffect를 사용하여 로딩시 api를 불러와서 card들을 로딩한다.
    useEffect(() => {
        // (async () => {
        //     const pokemonsLoad = await fetchPokemon();
        //     setPokemon(pokemonsLoad);
        // })();

        dispatch(fetchPokemonData());
    }, [dispatch]);

    return (
        <div>
            <List>
                {pokemonDataList.results.map((pokemon, index) => {
                    return (
                        <PokeCard
                            key={`${pokemon}_${index}`}
                            name={pokemon.name}
                        />
                    );
                })}
            </List>
            <Loading ref={infinityRef}>
                <HiOutlineEllipsisHorizontal />
            </Loading>
        </div>
    );
};

export default PokeCardList;

// styled
const List = styled.li`
    list-style: none;
    padding: 0;
    margin: 30px 0 32px 0;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;

    @media screen and (max-width: 500px) {
        margin: 15px 0 17px 0;
        gap: 13px;
    }
`;

const Loading = styled.div`
    display: flex;
    justify-content: center;
`;
