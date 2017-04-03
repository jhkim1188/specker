import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
import Geosuggest from 'react-geosuggest';
import '../../styles/react-widgets.css';


let address={
    label:"대한민국 서울특별시 관악구 서울대학교",
    lat:37.459882,
    lng:126.95190530000002,
    placeId:"ChIJpeKhoOiffDUR58XwBLzu4qE"
};



class GeoSuggest extends Component{

    constructor(props) {
        super(props);
        this.state = {
            lastSelected:""
        };
    }

    componentDidMount(){
        this.props.input.onChange(address);
    }

    onActivateSuggest(suggest){
        this.setState({
            lastSelected:suggest.label
        })
    }

    onSuggestSelect(suggest) {
        address.label = ""+suggest.label;
        address.lat = suggest.location.lat;
        address.lng = suggest.location.lng;
        address.placeId = ""+suggest.placeId;
        this.props.input.onChange(address);

    }

    getSuggestLabel(suggest){
        return suggest.description;
    }

    onKeyPress(event){
    }
    onBlur(value){
        value = this.state.lastSelected;
        geocodeByAddress(value,  (err, result) => {
            if (err) { console.log('Oh no!', err) }

            address.label = ""+value;
            address.lat = result.lat;
            address.lng = result.lng;
            address.placeId = "none";
            // console.log(`Yay! got latitude and longitude for ${value}`, { lat, lng })
            this._geoSuggest.update(value);
            this.props.input.onChange(address);
        });


    }

    render(){
        const { input: { value, onChange } } = this.props;
        return(
            <Geosuggest
                ref={el=>this._geoSuggest=el}
                className="SignUp-letter"
                placeholder="ex)마두동,신논현동,청담동"
                initialValue={address.label}
                onSuggestSelect={this.onSuggestSelect.bind(this)}
                country="kr"
                onKeyPress={this.onKeyPress.bind(this)}
                autoActivateFirstSuggest={true}
                onActivateSuggest = {this.onActivateSuggest.bind(this)}
                getSuggestLabel={this.getSuggestLabel.bind(this)}
                location={new window.google.maps.LatLng(37.459882, 126.95190530000002)}
                onBlur={this.onBlur.bind(this)}
                radius="20"/>
        )
    }
}
export default GeoSuggest;