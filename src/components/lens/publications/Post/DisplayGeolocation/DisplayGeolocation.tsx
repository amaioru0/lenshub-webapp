import React, { useEffect, useState } from "react";
import styled, { keyframes } from 'styled-components';

import GoogleMapReact from 'google-map-react';
import geohash from 'ngeohash';

const MapContainer = styled.div`
height: 30vh;
width: 100%;
margin: 0 auto;
max-width: 780px;
border: 1px solid #2C7A7B;
`

 const Marker = styled.div`
position: relative;
top: -15px;
`

 const FlashAnimation = keyframes`
0% {-webkit-transform: scale(0);opacity: 0.0;}
25% {-webkit-transform: scale(0);opacity: 0.1;}
50% {-webkit-transform: scale(0.1);opacity: 0.3;}
75% {-webkit-transform: scale(0.5);opacity: 0.5;}
100% {-webkit-transform: scale(1);opacity: 0.0;}
`

 const Pulse = styled.div`
width: 23px;
height: 23px;
  border: 8px solid #265700;
      border-radius: 60%;
      z-index: 10;
      position: absolute;
top: -25px;
left: 30px;
  

::after {
position: absolute;
content: '';
width: 0px;
height: 0px;
bottom: -29px;
left: -7px;
border: 10px solid transparent;
border-top: 17px solid #265700;
}
`

 const Pin = styled.div`

position: absolute;
top: -10px;
    left: -30px;
height: 70px;
    width: 70px;
    z-index: 2;
    opacity: 0;
    border: 10px solid #8BD84E;
    background: transparent;
    border-radius: 60px;
    animation: ${FlashAnimation} 2s ease-out;
    animation-iteration-count: infinite;
`


const ListingMapMarker = () => {
    return(
        <>
        <Marker>
            <Pulse>
                <Pin>

                </Pin>
            </Pulse>
        </Marker>
        </>
    )
}

const createMapOptions = () => {
    return {
      fullscreenControl: false,
      mapTypeControl: false,
      panControl: false,
      streetViewControl: false,
      zoomControl: false,
      gestureHandling: "none",
      scrollwheel: false,
      scaleControl: false,
      draggable: false,
    };
  };

  const DisplayGeolocation = ({latitude, longitude} : {latitude:any, longitude:any}) => {
    const [zoom, setZoom] = useState(14)

    return( 
        <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCWbUU02v7w8de1lkuE_cSUDOQUjYIVZOo" }}
          defaultCenter={{ lat: latitude, lng: longitude}}
        defaultZoom={zoom}
        hoverDistance={20 / 2}
        options={createMapOptions}
      > 
          <ListingMapMarker lat={latitude} lng={longitude} />
      </GoogleMapReact>
        </MapContainer>
      )
  }

export default DisplayGeolocation;