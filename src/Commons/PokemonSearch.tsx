import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import { useMemo } from "react";
import { searchKoreanAPI } from "../API/PokemonService";
import PokeCard from "../List/PokeCard";

const PokemonSearch = () => {
    const [value, setValue] = useState("");
    const [enterValue, setEnterValue] = useState("");
    const [mp, setMp] = useState<Map<string, string>>(new Map());

    const request = useMemo(async () => {
        if(mp.size === 0) {
            const response = await searchKoreanAPI();
            [...response.keys()].map((k) => {
                // console.log(k, response.get(k));
                setMp(mp.set(k, response.get(k)));
            });
        }
    }, [mp]);

    // useEffect(() => {
    //     (async () => {
    //         const response = await searchKoreanAPI();

    //         // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    //         [...response.keys()].map((k) => {
    //             // console.log(k, response.get(k));
    //             setMp(mp.set(k, response.get(k)));
    //         });
    //     })();
        
    // }, [mp]);

    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (mp.has(value)) {
            const res = mp.get(value);
            setEnterValue(res as string);
        }
    };

    return (
        <div>
            <Section onSubmit={onHandleSubmit}>
                <SearchBar value={value} onChange={onHandleChange} placeholder='포켓몬의 이름을 입력해주세요' />
            </Section>
            <SearchResult>
                {enterValue ? (
                    <PokeCard name={enterValue} />
                ) : (
                    <div>
                        <p>🧐</p>
                    </div>
                )}
            </SearchResult>
        </div>
    );
};

export default React.memo(PokemonSearch);

const Section = styled.form`
    display: flex;
    justify-content: center;
`;

const SearchBar = styled.input`
    width: 300px;
    height: 50px;

    padding: 5px 10px 5px 10px;
    font-size: 25px;

    margin-top: 50px;

    @media screen and (max-width: 500px) {
        width: 200px;
        height: 20px;

        padding: 5px;
        font-size: 10px;

        margin-top: 20px;
    }
`;
const SearchResult = styled.section`
    display: flex;
    justify-content: center;

    margin-top: 60px;
`;

