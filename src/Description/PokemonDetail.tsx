import styled from "@emotion/styled";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PokemonLike from "../Commons/PokemonLike";
import PokemonMarkChip from "../Commons/PokemonMarkChip";
import { RootState, useAppDispatch } from "../Store";
import { fetchPokemonDetailData } from "../Store/pokemonDetailSlice";
import { onHandleLike } from "../Store/pokemonLikeSlice";

const PokemonDetail = () => {
    const { name } = useParams(); // 포켓몬이름 경로 파라미터에서 가져옴.
    const { pokemonLike } = useSelector((state: RootState) => state.likeData); 
    const pokeLike = name ? pokemonLike[name] : false;

    // 전역적으로 바뀌어줄 이미지
    const imageChange = useSelector(
        (state: RootState) => state.imageType.pokemonImage
    );

    // 전역 pokeDetail
    const pokeDetail = useSelector(
        (state: RootState) => state.detailData.pokemonDetailData
    );
    const pokemon = name ? pokeDetail[name] : null;
    const dispatch = useAppDispatch();
    // const [detail, setDetail] = useState<pokemonDetailType | null>(null);

    useEffect(() => {
        // (async () => {
        //     const pokemonDetail = await fetchDetailPokemon(name);
        //     setDetail(pokemonDetail);
        // })();

        if (!name) {
            return;
        }

        dispatch(fetchPokemonDetailData(name)); // name이 없을시 구현해야함
    }, [dispatch, name]);

    // if (!detail) {
    //     return null;
    // }

    // 전역으로 바뀌기 전 이미지 로드
    /*detail.images[imageChange]*/

    // 전역으로 바뀌기 전 속성 로드
    /*
       {detail.types.map((v, idx) => {
            return <td key={`${v}_${idx}`}>{v}</td>;
        })}
    */

    // 전역으로 바뀌기 전 능력치 로드
    /*
        {detail.baseStats.map((elem, idx) => {
            return (
                <TableRow key={`${elem}_${idx}`}>
                 <TableHeader>{elem.name}</TableHeader>
                    <td>{elem.value}</td>
                </TableRow>
            );
        })}
    */

    if (!pokemon) {
        return null;
    }

    return (
        <Container>
            <Like className="heart">
                <PokemonLike
                    onClick={() => dispatch(onHandleLike(pokemon))}
                    like={pokeLike}
                />
            </Like>
            <Header>
                <Image
                    src={pokemon.images[imageChange]}
                    alt={pokemon.koreanName}
                />
            </Header>
            <Body>
                <h2>기본 정보</h2>
                <Divider />
                <Table>
                    <tbody>
                        <TableRow>
                            <TableHeader>번호</TableHeader>
                            <td>{pokemon.id}</td>
                        </TableRow>
                    </tbody>
                    <tbody>
                        <TableRow>
                            <TableHeader>이름</TableHeader>
                            <td>
                                {pokemon.koreanName} ({pokemon.name})
                            </td>
                        </TableRow>
                    </tbody>
                    <tbody>
                        <TableRow>
                            <TableHeader>타입</TableHeader>
                            {pokemon.types.map((v, _idx) => (
                                <td key={`${v}_${_idx}`}>{v}</td>
                            ))}
                        </TableRow>
                    </tbody>
                    <tbody>
                        <TableRow>
                            <TableHeader>키</TableHeader>
                            <td>{pokemon.height / 10}m</td>
                        </TableRow>
                    </tbody>
                    <tbody>
                        <TableRow>
                            <TableHeader>몸무게</TableHeader>
                            <td>{pokemon.weight / 10}kg</td>
                        </TableRow>
                    </tbody>
                </Table>

                <h2>포켓몬 능력치</h2>
                <Divider />
                <Table>
                    <tbody>
                        {pokemon.baseStats.map((v, index) => {
                            return (
                                <TableRow key={`${v}_${index}`}>
                                    <TableHeader>{v.name}</TableHeader>
                                    <td>{v.value}</td>
                                </TableRow>
                            );
                        })}
                    </tbody>
                </Table>
            </Body>
            <Footer>
                <PokemonMarkChip />
            </Footer>
        </Container>
    );
};
export default PokemonDetail;

const Container = styled.div`
    border: 1px solid #c0c0c0;
    margin: 10px 12px;
    border-radius: 16px;
    box-shadow: 1px 1px 1px 1px #c0c0c0;
    background: white;
`;
const Like = styled.div`
    display: flex;
    margin: 16px 0 0 6px;

    .heart {
        font-size: 50px;
    }

    @media screen and (max-width: 500px) {
        margin: 10px 0 0 10px;
        .heart {
            font-size: 30px;
        }
    }
`;
const Header = styled.section`
    display: flex;
    flex: 1 1 auto;
    justify-content: center;

    margin: 30px 0;
    min-hight: 300px;
`;
const Image = styled.img`
    widtableheader: 300px;
    height: 300px;

    @media screen and (max-width: 500px) {
        widtableheader: 150px;
        height: 150px;
    }
`;

const Body = styled.section`
    margin: 0 40px;

    h2 {
        margin: 30px 1px 16px 1px;
        color: green;
    }

    @media screen and (max-width: 500px) {
        h2 {
            margin: 15px 1px 5px 1px;
            color: green;

            font-size: 20px;
        }
    }
`;
const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    margin: 0 auto 16px;

    td {
        display: flex;
        padding: 6px 6px 6px 30px;
    }

    @media screen and (max-width: 500px) {
        font-size: 15px
        margin: 0 auto 10px;
    }
`;

const TableHeader = styled.th`
    width: 100px;
    white-space: nowrap;
    text-align: center;
    font-weight: normal;
    font-size: 16px;
    color: #a0a0a0;
    
    @media screen and (max-width: 500px) {
        font-size: 15px;
        width: 70px;
        white-space: wrap;
    }
`;

const TableRow = styled.tr`
    border-width: 1px 0;
    border-style: solid;
    border-color: #f0f0f0;
`;

const Divider = styled.hr`
    border-top: 1px solid #c0c0c0;
`;

const Footer = styled.section`
    display: flex;
    margin: 20px;
`;
