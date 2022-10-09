import { ButtonStyled } from "./ButtonStyled"


export const Button = ({ onClickButton }) => {
    return (
            <ButtonStyled type="ButtonStyled" onClick={onClickButton}>Load more</ButtonStyled>    
        )
    
}