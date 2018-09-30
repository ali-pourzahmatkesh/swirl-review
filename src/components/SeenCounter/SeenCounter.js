import React ,{PureComponent} from 'react';
import {Text} from 'react-native';

export default class SeenCounter extends PureComponent{
    render(){
        let counter = this.props.userCount;
        let k = 1000;
        let m = Math.pow(k, 2);
        let g = Math.pow(k, 3);
        let t = Math.pow(k, 4);
        if (counter >= k && counter < m) {
            counter =  (counter / k).toFixed(1) + ' ' + 'K';
        } else if (counter >= m && counter < g) {
            counter =  (counter / m).toFixed(1) + ' ' + 'M';
        } else if (counter >= g && counter < t) {
            counter =  (counter / g).toFixed(1) + ' ' + 'G';
        }
        return(
            <Text>{counter}</Text>
        )
    }
}