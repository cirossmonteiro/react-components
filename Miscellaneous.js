import React from 'react';
import Carousel from './Carousel';
import Bartimer from './Bartimer';
import CEP from './CEP.js';


class Miscellaneous extends React.Component {

    render () {
        return (
            <div>
                <Carousel /><br />
                // implementar bar de tempo e tamanho variados
                <Bartimer sole = "1" timer = "10" num = "100" />
                <CEP />
            </div>
        );
    }

}

export default Miscellaneous;
