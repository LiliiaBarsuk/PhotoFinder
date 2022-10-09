import { ButtonStyled } from "./ButtonStyled"
import PropTypes from 'prop-types';

export const Button = ({ onClickButton }) => {
    return (
        <ButtonStyled type="ButtonStyled" onClick={onClickButton}>Load more</ButtonStyled>    
    );   
};

Button.propTypes = {
   onClickButton: PropTypes.func.isRequired,
};