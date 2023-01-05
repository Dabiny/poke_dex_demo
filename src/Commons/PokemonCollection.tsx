import styled from "@emotion/styled";
import { useCallback, useEffect, useMemo, useState } from "react";
import PokeCard from "../List/PokeCard";
import { getPokeInfo } from "../Modules/pokeLikeModule";

const PokemonCollection = () => {
    const [Likelist, setLikeList] = useState([]);
    // TODO: 바로바로 업데이트를 해서 카드를 없애고 싶음. 
    const update = useMemo(() => setLikeList(getPokeInfo), [getPokeInfo]);
    useEffect(() => {
        (() => {
            const res = getPokeInfo();
            setLikeList(res);
        })();
    }, []);

    return (
        <div>
            <List>
                {Likelist.map((pokemon: string, index: number) => {
                    return (
                        <PokeCard key={`${index}_`} name={pokemon} />
                    );
                })}
            </List>
        </div>
    );
};

export default PokemonCollection;

// styled
const List = styled.li`
    list-style: none;
    padding: 0;
    margin: 30px 0 32px 0;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`;

const Loading = styled.div`
    display: flex;
    justify-content: center;
`;
