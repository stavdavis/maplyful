import React from 'react';
import { Map, LayersControl } from 'react-leaflet';
import { connect } from 'react-redux';
import * as syncActionCreators from '../../../actions/sync.js';
import L from 'leaflet';
import Tile from './tile_layer';
import MarkerLayer from './marker_layer';
L.Icon.Default.imagePath = '../assets/images/';

    // locations = locations.filter(location => {
    //     return location.show === 'yes'
    //   });

class MapComponent extends React.Component {

  render() {
    const city = [43.6615, -70.2553];
    const { locations } = this.props; 

    if (!locations) {
      return <div></div>
    }

      return (
        <Map className="display-map" center={city} zoom={14}>
          <Tile />
          <MarkerLayer locationInfo={locations} />
        </Map>
      );
    }
  }

const mapStateToProps = (state) => ({
  selectedLocations: state.selectedLocations,
  locationsFilteredByUser: state.locationsFilteredByUser,
  allLocationsAndDescriptions: state.allLocationsAndDescriptions, 
  locations: state.locations
});

export default connect(mapStateToProps, syncActionCreators)(MapComponent);
