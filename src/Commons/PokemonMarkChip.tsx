import styled from "@emotion/styled";

const PokemonMarkChip = () => {
    return (
        <Chip>
            <Mark>Pokémon</Mark>
        </Chip>
    )
};

export default PokemonMarkChip;

const Chip = styled.div`
    display: flex;
    align-items: center;
    height: 25px;

    border: 1px solid #c0c0c0;
    border-radius: 16px;

    font-weight: bold;
    box-shadow: 0.5px 0.5px 0 #c0c0c0;

    margin-left: auto;
    margin-right: 16px;

    background: white;

    @media screen and (max-width: 500px) {
        height: 10px;
        font-size: 10px;
    }
`;

const Mark = styled.label`
    padding: 2px 8px;
`;