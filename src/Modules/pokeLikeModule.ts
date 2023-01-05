import { POKEMON_LIKE_KEY } from "../Constant";

export const pokeLikeModule = (name: string) => {
    const result = getPokeInfo();

    // 최초로열어서 localStorage가 아예없는경우
    if (!result) {
        return false;
    }
    // TODO: localStorage에 값이 있는경우(해결)
    if (result.find((info: string) => info === name)) {
        console.log(true);
        return true;
    } else {
        return false;
    }
};

export const getPokeInfo = () => {
    const result =
        JSON.parse(localStorage.getItem(POKEMON_LIKE_KEY) as string) ?? [];
    return result;
};

export const removePokeInfo = (name: string) => {
    const pokeInfo = getPokeInfo();
    const newPokeInfo = pokeInfo.filter((info: string) => info !== name);
    localStorage.setItem(POKEMON_LIKE_KEY, JSON.stringify(newPokeInfo));
};

// 좋아요 클릭시 localStorage에 키값이 저장되고 하트가 바뀐다.
// 한번더 클릭하면 좋아요 해제하기
// export const onHandleLike = () => {
//     const pokeInfo = getPokeInfo();

//     // if (pokeInfo.findIndex((info: string) => info === props.name) !== -1) {
//     //     return;
//     // }

//     if (!pokeLikeModule(props.name)) {
//         // 해당 포켓몬 좋아요가 false이면
//         localStorage.setItem(
//             POKEMON_LIKE_KEY,
//             JSON.stringify([...pokeInfo, pokemon.name])
//         );
//         setPokeLike(true);
//     } else {
//         removePokeInfo(props.name);
//         setPokeLike(false);
//     }
// };
