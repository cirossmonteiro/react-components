import React from 'react';

class Image extends React.Component {

    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        var q = 1;
    }

    render () {
        return (
            <div onClick = {this.handleClick}>
                <img alt = "image not loaded" className = {this.props.className} src = {this.props.src} />
            </div>
        );
    }

}


class Carousel extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            pics : [],
            ind : 0,
            search : null
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.ajax = this.ajax.bind(this);
    }

    handleClick(e, dir) {
        if (dir == "left") {
        }
        if (this.state.ind == 0) {
            this.setState({ind : this.state.pics.length-1});
        }
        else {
            this.setState({ind : this.state.ind-1});
        }
        if (dir == "right") {
            if (this.state.ind == this.state.pics.length-1) {
                this.setState({ind : 0});
            }
            else {
                this.setState({ind : this.state.ind+1});
            }
        }
    }

    handleKeyPress (e) {
        if (e.key == 'Enter') {
            this.ajax();
        }
    }

    handleInput (e) {
        this.setState({search : e.target.value});
    }

    ajax() {
        const axios = require('axios');
        var data1 = new FormData();
        var words1 = this.state.search;
        const formData = new FormData();
        formData.append('words', words1);
        axios({
            url : "http://ciro.com/react/website-react/src/img_crawler.php",
            method : "POST",
            data : formData
        }).then(response =>{
                this.setState({pics : response.data});
            }).catch(error => {
                console.log(error);
            });
    }

    render () {
        var num = this.state.pics.length;
        var ret = [];
        ret.push(
            <div>
                <label><input placeholder = "Pesquise por imagens"
                                defaultValue = {this.state.search}
                                onInput = {this.handleInput}
                                onKeyPress={this.handleKeyPress} />
                <button onClick = {this.ajax}>search</button></label>
            </div>
        );
        if (num != 0) {
            ret.push(
                <div>
                    <div id = "div-number">
                        around {num} pictures available
                    </div>
                    <div id = "div-carousel">
                        <div className = "button-left" dir = "left" onClick = {(e) => this.handleClick(e,"left")} />
                        <div className = "div-img">
                            <Image className = "img-carousel" src = {this.state.pics[this.state.ind]} />
                        </div>
                        <div className = "button-right" dir = "right" onClick = {(e) => this.handleClick(e,"right")} />
                    </div>
                </div>
            );
        }
        return ret;
    }

}

export default Carousel;
