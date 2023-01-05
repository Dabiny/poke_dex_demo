// useEffect로 api를 호출하게되면 여러 컴포넌트에서 useEffect로 api를 호출하기 때문에 중복이 일어나고, 불필요하게 계쏙 호출하게됨.
// 전역으로 관리해주면서 thunk middle웨어로 전역에서 한번 api 요청을 뺏어와서 수행하기
//
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { fetchPokemon, PokemonListResponseType } from "../API/PokemonService";

// 전역으로 offset값 관리하기
let offsetNumber: number = 0;

// First, create the thunk
// 비동기작업을 가로챌 thunk생성 (포켓몬 리스트를 불러오는 api)
export const fetchPokemonData = createAsyncThunk(
    "pokemon/fetchPokemonData",
    async (nextURL?: string) => {
        // const response = await fetchPokemon(nextURL);
        // return response;

        // 액션 payload 실행 callback 함수
        const response = await fetchPokemon(nextURL);

        // TODO: 전역에서 쿼리스트링 offset값을 가지고있다가 뒤로가기 버튼을 클릭해도 이상해씨가나오는 버그를 고치기 (해결)
        const urlObject = new URL(response.next);
        const queryString = urlObject.searchParams;
        const offset = queryString.get("offset");

        // 만약 offset값이 기존 offset값보다 높으면 갱신하고 아니면 그대로 냅두기
        if (Number(offset) > offsetNumber) {
            offsetNumber = Number(offset);
            return response;
        } else {
            const res = await fetchPokemon(
                `https://pokeapi.co/api/v2/pokemon?offset=${offsetNumber}&limit=20`
            );
            return res;
        }
    }
);

interface PokemonListState {
    pokemonDataList: PokemonListResponseType;
}

const initialState = {
    pokemonDataList: {
        count: 0,
        next: "",
        results: [],
    },
} as PokemonListState;

// Then, handle actions in your reducers:
const pokemonCardSlice = createSlice({
    name: "pokemonList",
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(
            fetchPokemonData.fulfilled,
            (state, action: PayloadAction<PokemonListResponseType>) => {
                // Add user to the state array
                // 만약 pokemonDataList의 results의 상태 배열 길이가 0보다 길다면 (리스트가 하나라도있다면)
                // 기존 배열에다가 추가하기
                if (state.pokemonDataList.results.length > 0) {
                    state.pokemonDataList = {
                        ...action.payload,
                        results: [
                            ...state.pokemonDataList.results,
                            ...action.payload.results,
                        ],
                    };
                } else {
                    // 아무것도 없으면 action.payload로 갱신한다.
                    state.pokemonDataList = action.payload;
                }
            }
        );
    },
});

// Later, dispatch the thunk as needed in the app
// store에 등록하기
export const pokemonDataSliceReducer = pokemonCardSlice.reducer;
