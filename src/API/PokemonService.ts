import axios from "axios";
import { constants } from "buffer";
import { response } from "express";
import { stringify } from "querystring";
import { json } from "stream/consumers";

const remote = axios.create(); // axios 생성

// ⭐️포켓몬 정보리스트를 불러오는 api
// count, next(다음 url을 불러오는 string), previous: null, results[] 포켓몬정보배열(name, url),
export const fetchPokemon = async (nextURL?: string) => {
    const pokemonURL = nextURL ? nextURL : "https://pokeapi.co/api/v2/pokemon";
    const response = await remote.get<PokemonListResponseType>(pokemonURL);

    return response.data;
};

// 포켓몬 정보리스트 인터페이스
export interface PokemonListResponseType {
    count: number;
    next: string; // 다음포켓몬의 url 정보
    results: {
        name: string;
        url: string;
    }[];
}

// ⭐️포켓몬 디테일정보를 불러오는 api
export const fetchDetailPokemon = async (
    name: string
): Promise<pokemonDetailType> => {
    const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${name}`; //
    const pokemonSpeciesURL = `https://pokeapi.co/api/v2/pokemon-species/${name}/`;

    const response = await remote.get<pokeDetailResponse>(pokemonURL);
    const detailResponse = await remote.get<speciesResponse>(pokemonSpeciesURL);

    const pokemon = response.data;
    const detail = detailResponse.data;

    // pokemonDetailType에 맞게 return 하기
    return {
        id: pokemon.id,
        height: pokemon.height,
        weight: pokemon.weight,
        name: pokemon.name,
        // find로 ko버전의 이름이 있으면 찾는데 없으면?. 그냥 영어이름 그것마저없으면 ?? 영어포켓몬의 이름
        koreanName:
            detail.names.find((name) => name.language.name === "ko")?.name ??
            pokemon.name,
        color: detail.color.name,
        // 타입: 포켓몬 타입배열중 타입의 이름 (풀, 독, 악, ...)
        types: pokemon.types.map((value) => value.type.name),
        images: {
            frontDefault: pokemon.sprites.front_default,
            dreamWorld: pokemon.sprites.other.dream_world.front_default,
            officialArtWork:
                pokemon.sprites.other["official-artwork"].front_default,
        },
        baseStats: pokemon.stats.map((stat) => {
            return {
                name: stat.stat.name,
                value: stat.base_stat,
            };
        }),
    };
};

// 디테일에 필요한 정보
// api에서 pokemonURL에서 불러올 정보를 인터페이스에 정의함.
interface pokeDetailResponse {
    id: number;
    weight: number;
    height: number;
    name: string;
    types: {
        type: {
            name: string;
        };
    }[];
    sprites: {
        front_default: string;
        other: {
            dream_world: {
                front_default: string;
            };
            "official-artwork": {
                front_default: string;
            };
        };
    };
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
}

// specipe: 컬러, names배열 {language: {name: 'ko', url: string}, name: '이상해씨' }
interface speciesResponse {
    color: {
        name: string;
    };
    names: {
        language: {
            name: string;
            url: string;
        };
        name: string;
    }[];
}

// return 할 필요한 포켓몬 정보 Type정의
export interface pokemonDetailType {
    id: number;
    weight: number;
    height: number;
    name: string;
    koreanName: string;
    color: string;
    types: string[];
    images: {
        frontDefault: string;
        dreamWorld: string;
        officialArtWork: string;
    };
    baseStats: {
        name: string;
        value: number;
    }[];
}

interface infoInterface {
    language: {
        name: string;
        url: string;
    };
    name: string;
}

interface ResponseData {
    id: number;
    name: string;
    color: {
        name: string;
    };
    names: {
        language: {
            name: string;
            url: string;
        };
        name: string;
    }[];
}

// 한글로 검색가능하게 하는 fetch
export const searchKoreanAPI = async () => {
    let mp = new Map();
    for (let i = 1; i <= 151; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon-species/${i}/`;
        const res = axios.get<ResponseData>(url);
        const nameData = await res.then((response) =>
            response.data.names.map((v) => v.name)
        );
        mp.set(nameData[2].replace(/[가-힣]/g), nameData[7].toLowerCase());
    }
    return mp;

    // const url = `https://pokeapi.co/api/v2/pokemon?limit=151`;
    // const res = await axios.get(url);
    // const resData = res.data.results;
};
