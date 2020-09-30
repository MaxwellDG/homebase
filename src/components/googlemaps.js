import React from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

const containerStyle = {
    width: "300px",
    height: "300px"
  };
  
export default function GoogleMaps(props){

  let windowSize = window.innerWidth 

  const{ coords, coordChange } = props

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDadapyM0BuRFWydArAuwb9-xyutxDarK8"
  })

  if(loadError) return "There was an error"
  if(!isLoaded) return "Loading... Please wait."

    return (
          <GoogleMap
            mapContainerClassName="myMap"
            center={ coords }
            zoom={ 10 }
            clickableIcons={ false }
            onClick={ (dataObj) => coordChange(dataObj) }
          >
            <Marker position={ coords }/>
          </GoogleMap>
      )
    }