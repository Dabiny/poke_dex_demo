// useEffect로 api를 호출하게되면 여러 컴포넌트에서 useEffect로 api를 호출하기 때문에 중복이 일어나고, 불필요하게 계쏙 호출하게됨.
// 전역으로 관리해주면서 thunk middle웨어로 전역에서 한번 api 요청을 뺏어와서 수행하기
//
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDetailPokemon, pokemonDetailType } from "../API/PokemonService";

// First, create the thunk
// 비동기작업을 가로챌 thunk생성 (포켓몬 디테일정보를 불러오는 api)
export const fetchPokemonDetailData = createAsyncThunk(
    "pokemon/fetchPokemonDetailData",
    async (name: string) => {
        const response = await fetchDetailPokemon(name);
        return response;
    }
);

// list처럼 result만 붙여넣기하면되는게아니고 포켓몬별로 디테일정보를 저장해야한다.
// '피카츄' : { 정보들: ... }, '꼬부기': {...}
interface PokemonDetailState {
    pokemonDetailData: Record<string, pokemonDetailType>;
}

// 처음엔 비어있는 객체로 초기화 (포켓몬 정보를 추가해나갈것임.)
const initialState = {
    pokemonDetailData: {},
} as PokemonDetailState;

// Then, handle actions in your reducers:
const pokemonDetailSlice = createSlice({
    name: "pokemonList",
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(
            fetchPokemonDetailData.fulfilled,
            (state, action: PayloadAction<pokemonDetailType>) => {
                // Add user to the state array
                state.pokemonDetailData = {
                    ...state.pokemonDetailData,
                    // '피카추' : {정보}
                    [action.payload.name]: action.payload,
                };
            }
        );
    },
});

// Later, dispatch the thunk as needed in the app
// store에 등록하기
export const pokemonDetailSliceReducer = pokemonDetailSlice.reducer;
