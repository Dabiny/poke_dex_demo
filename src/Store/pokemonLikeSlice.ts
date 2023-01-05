// 모든 페이지에서 좋아요 적용하기

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { POKEMON_LIKE_KEY } from "../Constant";
import { getPokeInfo, removePokeInfo } from "../Modules/pokeLikeModule";

// typeof: 객체 데이터를 객체 타입으로 변환해주는 연산자
// keyof: 객체 형태 타입을 따로 속성들만 뽑아 모아 유니온타입을 만들어주는 연산자.
// POKEMON_IMAGE_TYPE의 [OFFICIAL..., DREAM..., DEFAULT]의 값을 PokemonImageKeyType의 타입으로 생성
// export type PokemonImgaeKeyType = "officialArtWork" | "dreamWork" | "defualtArt.."

// Pokemon좋아요 상태를 저장할때 자료형을 명시
export interface PokemonLikeState {
    pokemonLike: Record<string, boolean>;
}

// 로딩시 처음 default 포켓몬 이미지는 official 스타일의 아트워크, 초기상태
const initialState = {
    pokemonLike: {},
} as PokemonLikeState;

interface PokemonLikeInterface {
    name: string;
    value: boolean;
}

interface isPokeLikeInterface {
    name: string;
}

// 슬라이스 생성 (reducer와 액션을 하나로 합친 함수이다.)
export const pokemonLikeSlice = createSlice({
    name: "pokemonLike",
    initialState,
    reducers: {
        // localstorage확인 후 state 변경하기
        isPokeLike: (state, action: PayloadAction<isPokeLikeInterface>) => {
            const result = getPokeInfo();
            if (!result) {
                state.pokemonLike = {};
            }

            if (result.find((info: string) => info === action.payload.name)) {
                state.pokemonLike = {
                    ...state.pokemonLike,
                    [action.payload.name]: true,
                };
            } else {
                state.pokemonLike = {
                    ...state.pokemonLike,
                    [action.payload.name]: false,
                };
            }
        },
        // removePokeInfo: 특정 값 localstorage 삭제
        removePokemonLikeInfo: (
            state,
            action: PayloadAction<isPokeLikeInterface>
        ) => {
            removePokeInfo(action.payload.name);
            state.pokemonLike = {
                ...state.pokemonLike,
                [action.payload.name]: false,
            };
        },
        onHandleLike: (state, action: PayloadAction<isPokeLikeInterface>) => {
            const pokeInfo = getPokeInfo();
            if (
                !pokeInfo.find(
                    (info: string) => info === action.payload.name
                ) ||
                state.pokemonLike[action.payload.name] === false
            ) {
                localStorage.setItem(
                    POKEMON_LIKE_KEY,
                    JSON.stringify([...pokeInfo, action.payload.name])
                );
                state.pokemonLike = {
                    ...state.pokemonLike,
                    [action.payload.name]: true,
                };
            } else {
                removePokeInfo(action.payload.name);
                state.pokemonLike = {
                    ...state.pokemonLike,
                    [action.payload.name]: false,
                };
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { isPokeLike, removePokemonLikeInfo, onHandleLike } =
    pokemonLikeSlice.actions;

// 리듀서를 내보내서 store에 적용해야한다.
export const pokemonLikeReducer = pokemonLikeSlice.reducer;
