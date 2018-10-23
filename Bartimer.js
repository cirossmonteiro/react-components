import React from 'react';
import './Bartimer.css';
//import ReactDOM from 'react-dom';

class Bartimer extends React.Component {

    // this.props.num: total of steps
    // this.props.timer: duration of step

    constructor(props){
        super(props);
        this.state = {passed : 0};
        this.step = this.step.bind(this);
    }

    componentDidMount(){
        // sole = 1 means no other variable to consider in progress
        if (this.props.sole == 1) {
            this.step(this);
        }
    }

    step () {
        var passed1 = this.state.passed;
        if (passed1 == this.props.num) {
            console.log("timer's over");
            return;
        }
        this.setState({passed : passed1+1});
        setTimeout(this.step, this.props.timer);
    }

    render () {
        var ret = [];
        var elem;
        for (var i = 0; i < this.props.num; i++) {
            if (i < this.state.passed) {
                elem = <div key = {i} className = "timer-marked" />;
            }
            else {
                elem = <div key = {i} className = "timer-not-marked" />;
            }
            ret.push(elem);
        }

        return (
            <div>
                Bar with timer: {this.props.timer} milisseconds by step (total of {this.props.num} steps)<br />
                <div className = "bar-timer">
                    {ret}
                </div>
            </div>
        );
    }

}

export default Bartimer;
