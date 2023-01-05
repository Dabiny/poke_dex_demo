import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useIntersectionObserver } from "react-intersection-observer-hook";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokemonLike from "../Commons/PokemonLike";

import PokemonMarkChip from "../Commons/PokemonMarkChip";
import PokeNameChip from "../Commons/PokeNameChip";
import {
  
    pokeLikeModule,
    
} from "../Modules/pokeLikeModule";
import { RootState, useAppDispatch } from "../Store";
import { fetchPokemonDetailData } from "../Store/pokemonDetailSlice";
import { onHandleLike, isPokeLike } from "../Store/pokemonLikeSlice";

// prop로 받는 자료형을 인터페이스로 고정시키기
export interface PokeCardPropsInterface {
    name: string;
}

// 전역상태를 pokemon의 이미지를 바꾸는 방법
// imageChange를 불러오기(useSelector)

const PokeCard = (props: PokeCardPropsInterface) => {
    // 전역에서 관리해준다.
    // const [pokeDetail, setPokeDetail] = useState<pokemonDetailType | null>(
    //     null
    // );

    // pokemon 좋아요 기능 state
    // 초기값에 localstorage의 key, value값 확인하면서 만약 localstorage에 값이 있으면 true로 바꿔주기.
    // const [pokeLike, setPokeLike] = useState<Boolean>(() =>
    //     pokeLikeModule(props.name)
    // );
    const {pokemonLike} = useSelector((state: RootState) => state.likeData);
    const pokemonLikeData = pokemonLike[props.name];

    const navigate = useNavigate();

    // redux 이미지 전역관리
    const imageChange = useSelector(
        (state: RootState) => state.imageType.pokemonImage
    );

    // redux thunk 비동기 관리
    const { pokemonDetailData } = useSelector(
        (state: RootState) => state.detailData
    );
    const pokemon = pokemonDetailData[props.name];
    const dispatch = useAppDispatch();

    // intersectionObserver 코드
    // 브라우저 화면에서 보여지면 true가 되고, 보여지지않으면 false로 바뀐다.
    const [ref, { entry }] = useIntersectionObserver();
    const isVisible = entry && entry.isIntersecting;

    // 클릭시 pokemon카드 상세정보로 넘어가기
    const handleOnClick = () => {
        navigate(`/pokemon/${props.name}`);
    };


    // <Observer> 화면에 보여지게되면 보여지게된 카드들만 api호출
    useEffect(() => {
        if (!isVisible) return;

        // (async () => {
        //     const pokemon = await fetchDetailPokemon(props.name);
        //     setPokeDetail(pokemon);
        // })();

        dispatch(fetchPokemonDetailData(props.name));
        dispatch(isPokeLike(props)); // 새로고침을 눌러도 좋아요가 풀리지 않게함.
    }, [props.name, isVisible, dispatch, props]);

    if (!pokemon) {
        // pokeDetail이 들어오지 않을 경우..
        return (
            <Container ref={ref} color={"#fff"}>
                <Header>
                    <PokeNameChip name={"pokemon"} color={"#ffca09"} id={0} />
                </Header>
                <Body>?</Body>
                <Footer>
                    <PokemonMarkChip />
                </Footer>
            </Container>
        );
    }

    return (
        <Container ref={ref}>
            <Header>
                <PokeNameChip
                    name={pokemon.koreanName}
                    color={pokemon.color}
                    id={pokemon.id}
                />
            </Header>
            <Body>
                <Image
                    onClick={handleOnClick}
                    src={pokemon.images[imageChange]}
                    alt={pokemon.koreanName}
                />
            </Body>
            <Footer>
                <PokemonLike onClick={() => dispatch(onHandleLike(props))} like={pokemonLikeData} />
                <PokemonMarkChip />
            </Footer>
        </Container>
    );
};

export default PokeCard;

// styled
const Container = styled.div`
    display: flex;
    flex-direction: column;

    width: 250px;
    height: 300px;
    border: 1px solid #c0c0c0;
    box-shadow: 1px 1px 3px 1px #c0c0c0;

    padding: 8px;
    background: white;

    transition: transform 0.1s ease-in-out;
    &:hover {
        transform: scale(1.1);
    }

    @media screen and (max-width: 500px) {
        width: 95px;
        height: 130px;
    }
`;

const Header = styled.section`
    display: flex;
    flex-direction: row;
    margin: 10px 0;
    @media screen and (max-width: 500px) {
       margin: 4px 0;
    }
`;
const Body = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 10px 0;
    @media screen and (max-width: 500px) {
        margin: 3px 0;
    }
`;
const Footer = styled.section`
    display: flex;
    height: 50px;
    align-items: center;

    @media screen and (max-width: 500px) {
        height: 25px;
    }
`;
const Image = styled.img`
    width: 180px;
    height: 180px;
    background-position: 50% 50%;
    background-repeat: no-repeat;

    cursor: pointer;

    @media screen and (max-width: 500px) {
        width: 85px;
        height: 85px;
    }
`;
