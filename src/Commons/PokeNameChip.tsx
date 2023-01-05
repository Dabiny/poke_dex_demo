import styled from "@emotion/styled";

// pokeNameChip이 받는 prop 자료형 고정
interface PokeNameChip {
    name: string;
    color: string;
    id: number;
}

const PokeNameChip = (props: PokeNameChip) => {
    const changeNumber = (id: number) => {
        const count = 3;
        const numberString = id.toString();

        let rendering = '';
        for (let i = 0; i < count - numberString.length; i++) {
            rendering += '0';
        }
        return `${rendering}${numberString}`;
    }

    return (
        <Chip>
            <Number color={props.color}>{changeNumber(props.id)}</Number>
            <PokeName>{props.name}</PokeName>
        </Chip>
    )
}
export default PokeNameChip;

const Chip = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #c0c0c0;
    border-radius: 16px;

    font-weight: bold;
    background: white;
`;
const Number = styled.div<{ color: string }>`
    padding: 4px 6px;
    background: ${(props) => props.color};
    color: ${(props) => (props.color === "black" ? "white" : "black")};
    border-radius: 16px;

    @media screen and (max-width: 500px) {
        padding: 1px 6px;
        font-size: 7px;
    }
`;
const PokeName = styled.div`
    padding: 0 8px 0 3px;
    @media screen and (max-width: 500px) {
        padding: 0 3px 0 1px;
        font-size: 7px;
    }
`;