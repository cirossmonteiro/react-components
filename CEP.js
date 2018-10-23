import React from 'react';

class CEP extends React.Component {

    constructor(props) {
        super(props);
        this.state = {cep_number : "", address : null};
        this.handleInput =this.handleInput.bind(this);
        this.ajax = this.ajax.bind(this);
    }

    handleInput(e){
        this.setState({cep_number : e.target.value});
    }

    ajax() {
        const axios = require('axios');
        var url = "https://api.postmon.com.br/v1/cep/"+this.state.cep_number;
        axios.get(url).then(response => {
            this.setState({address : response.data});

        }).catch(function (error) {
            // handle error
            console.log("console: "+error);
        });
        return;
    }

    render () {
        var ret = [];
        var address;
        if (this.state.cep_number.length == 8) {
            if (this.state.address == null) {
                this.ajax();
            }
            else {
                var add = this.state.address;
                address = <div>
                            Logradouro: <input value = {add.logradouro} /><br />
                            Bairro: <input value = {add.bairro} /><br />
                            Cidade: <input value = {add.cidade} /><br />
                            Estado : <input value = {add.estado_info.nome} /><br />
                            </div>;
                ret.push(address);
            }
        }
        else if (this.state.address != null) {
            this.setState({address : null});
        }
        return (
            <div>
                <input placeholder = "CEP sem traços nem pontos" defaultValue = {this.state.cep_number} onInput = {this.handleInput} />
                {ret}
            </div>
        );
    }
}

export default CEP;
