import styled from "@emotion/styled";
import React from "react";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";

interface Props {
    onClick: () => void;
    like: Boolean;
}

const PokemonLike = ({ onClick, like }: Props) => {
    return (
        <Like onClick={onClick}>
            {like === true ? (
                <HiHeart className={"heart"} />
            ) : (
                <HiOutlineHeart className={"heart"} />
            )}
        </Like>
    );
};
export default PokemonLike;

// styled;

const Like = styled.div`
    display: flex;
    align-items: center;

    margin-left: 30px;
    margin-rignt: auto;

    cursor: pointer;
    .heart {
        font-size: 25px;
        color: #ff3453;
    }

    @media screen and (max-width: 500px) {
        .heart {
            font-size: 20px;
            color: #ff3453;
        }

        margin-left: 1px;
        margin-right: 4px;
    }
`;
