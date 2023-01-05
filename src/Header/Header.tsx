// 홈페이지 머리부분 : 로고, 이미지 셀렉트
// 셀렉트는 value값을 전역으로 관리하여 모든 포켓몬의 이미지를 바꿔주는 역할을 한다.
// 상태 state만 여기서 바꿔주고 , 실질적으로 바뀌는 코드는 이미지를 가지고 있는 요소에 있다.

import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { POKEMON_IMAGE_TYPE } from "../Constant";
import { RootState, useAppDispatch } from "../Store";
import { FcSearch } from "react-icons/fc";
import {
    changeImage,
    imageSliceReducer,
    PokemonImageKeyType,
} from "../Store/pokemonImageSlice";
import { ChangeEvent } from "react";
import { BiBookHeart } from "react-icons/bi";

const HomepageHeader = () => {
    // useSelector로 만들어놓은 리듀서를 연결시키기 Select 요소에 value값으로 넣는다.
    const typeImage = useSelector(
        (state: RootState) => state.imageType.pokemonImage
    );
    const dispatch = useAppDispatch();

    // 셀렉트가 바뀌게 되면 dispatch 호출
    const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(
            changeImage({
                pokemonImage: e.target.value as PokemonImageKeyType,
            })
        );
    };

    // TODO: select value값 넣어줘야함. (해결)
    return (
        <>
            <Header>
                <Title>
                    <Link to={"/"}>Pokémon Dex</Link>
                </Title>
                <Nav>
                    <Search>
                        <Link to={"/search"}>
                            <FcSearch />
                        </Link>
                    </Search>
                    <Heart>
                        <Link to={"/mycollection"}>
                            <BiBookHeart />
                        </Link>
                    </Heart>
                    <Select value={typeImage} onChange={handleOnChange}>
                        <option value={POKEMON_IMAGE_TYPE.OFFICIAL_ARTWORK}>
                            offitial Artwork
                        </option>
                        <option value={POKEMON_IMAGE_TYPE.DREAM_WORLD}>
                            dreamworld Artwork
                        </option>
                        <option value={POKEMON_IMAGE_TYPE.FRONTDEFAULT}>
                            pixel Artwork
                        </option>
                    </Select>
                </Nav>
            </Header>
        </>
    );
};
const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    
    
    padding: 10px 20px;
    background: #db2400;

    z-index: 9999;
`;
const Title = styled.h1`
    margin: 0;
    font-size: 40px;
    color: #fff500;
    text-shadow: -1px 0 blue, 0 2px blue, 1px 0 blue, 0 -1px blue;
    cursor: pointer;
    align-items: center;

    @media screen and (max-width: 500px) {
        font-size: 23px;
    }
`;
const Nav = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: 10px;

    @media screen and (max-width: 500px) {
        margin-right: 0.5px;
        aligns-items: start;
    }
`;
const Select = styled.select`
    width: 130px;
    height: 40px;

    @media screen and (max-width: 500px) {
        width: 90px;
        height: 25px;

        font-size: 10px;
    }
`;
const Search = styled.div`
    margin-right: 10px;
    font-size: 40px;

    @media screen and (max-width: 500px) {

        margin-right: 5px;
        font-size: 25px;
    }
`;

const Heart = styled.div`
    margin-right: 20px;
    font-size: 40px;

    @media screen and (max-width: 500px) {

        margin-right: 10px;
        font-size: 25px;
    }
`;
export default HomepageHeader;
