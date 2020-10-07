import React from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
 
export default function GoogleMaps(props){

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