// 🍎official, dream_world, default 이미지를 모든 포켓몬에게 적용하기

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { POKEMON_IMAGE_TYPE } from "../Constant";

// typeof: 객체 데이터를 객체 타입으로 변환해주는 연산자
// keyof: 객체 형태 타입을 따로 속성들만 뽑아 모아 유니온타입을 만들어주는 연산자.
// POKEMON_IMAGE_TYPE의 [OFFICIAL..., DREAM..., DEFAULT]의 값을 PokemonImageKeyType의 타입으로 생성
// export type PokemonImgaeKeyType = "officialArtWork" | "dreamWork" | "defualtArt.."
export type PokemonImageKeyType =
    typeof POKEMON_IMAGE_TYPE[keyof typeof POKEMON_IMAGE_TYPE];

// PokemonImage상태를 저장할때 자료형을 명시
export interface PokemonImageState {
    pokemonImage: PokemonImageKeyType;
}

// 로딩시 처음 default 포켓몬 이미지는 official 스타일의 아트워크, 초기상태
const initialState: PokemonImageState = {
    pokemonImage: POKEMON_IMAGE_TYPE.OFFICIAL_ARTWORK,
};

// 슬라이스 생성 (reducer와 액션을 하나로 합친 함수이다.)
export const imageSlice = createSlice({
    name: "imageType",
    initialState,
    reducers: {
        // 리듀서
        // PayloadAction: 문자열 유형 및 관련 페이로드가 있는 작업입니다. 이것은 유형입니다
        // 문자열유형은 PokemonImageKeyType으로 명시
        changeImage: (state, action: PayloadAction<PokemonImageState>) => {
            state.pokemonImage = action.payload.pokemonImage;
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeImage } = imageSlice.actions;

// 리듀서를 내보내서 store에 적용해야한다.
export const imageSliceReducer = imageSlice.reducer;
