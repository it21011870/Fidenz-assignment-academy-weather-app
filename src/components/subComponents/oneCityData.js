//import dependencies
import React from "react";
import PropTypes from 'prop-types';
import { Card, Typography, Grid } from '@mui/material'

//import css
import "../../assets/LayoutCSS/oneCity.css"

//import react icon
import { FiNavigation } from 'react-icons/fi';
import { BsArrowLeftShort } from "react-icons/bs";

//import background images
import Clear from "../../assets/backgroundImages/weatherBackgrond/clear.jpg"
import Clouds from "../../assets/backgroundImages/weatherBackgrond/clouds.jpeg"
import Default from "../../assets/backgroundImages/weatherBackgrond/default.jpeg"
import Haze from "../../assets/backgroundImages/weatherBackgrond/Haze.jpg"
import Rain from "../../assets/backgroundImages/weatherBackgrond/rain.jpg"
import Mist from "../../assets/backgroundImages/weatherBackgrond/Mist.jpeg"


//import calculation functions
import GetTimeDate from "../../Calculations/getTimeDate"
import GetTempurature from "../../Calculations/getTempurature";
import GetSunDetails from "../../Calculations/getSunDetails";



const oneCityData = props => {
   


    //selecting background image

    if (props.dataSet.weather[0].main == "Clear") {
        var url = `url(${Clear})`
    } else if (props.dataSet.weather[0].main == "Rain") {
        var url = `url(${Rain})`
    } else if (props.dataSet.weather[0].main == "Clouds") {
        var url = `url(${Clouds})`
    } else if (props.dataSet.weather[0].main == "Haze") {
        var url = `url(${Haze})`
    } else if (props.dataSet.weather[0].main == "Mist") {
        var url = `url(${Mist})`
    } 
     else {
        var url = `url(${Default})`
    }


    //redirection functions

    const handleClick = (data) => {
        if (props.condition == false) {
            localStorage.setItem("tempData", JSON.stringify(data));        
            window.location.href = "/oneCity";
        } else {
            window.location.href = "/";
        }
    }

    const handleClickIn = (data) => {
        if (props.condition == false) {
            localStorage.setItem("tempData", JSON.stringify(data));
            window.location.href = "/oneCity";
        }
    }

    //Item remove props function

    const onDelete = () => {
        props.deleteClickHandler();
    }


    return (
        <div>

            {/*creating single component and re use it*/ }
            <Card sx={{ maxWidth: 4000 }} className={props.condition ? 'notclickable' : 'clickable'} >


                <Typography variant="body2" color="text.secondary"
                    style={{
                        backgroundImage: `${url}`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        height: 'auto'
                    }} >
               
             
                    {/*Grid tag for responsive*/}
                    <Grid container spacing={0}>
                        <Grid item xs={10.8} xl={10.8} lg={10.8} md={10.8} sm={10.8} onClick={() => handleClickIn(props.dataSet)}>
                            {props.condition ?
                                <div className="back"><button className="cbtn2" onClick={() => handleClick(props.dataSet)} ><BsArrowLeftShort /></button></div>
                                : <div>

                                </div>}
                        </Grid>
                        <Grid item xs={1} xl={1} lg={1} md={1} sm={1}>
                            {props.condition ?
                                <div></div>
                                : <div className='close'>
                                    <button className="cbtn" onClick={() => onDelete()}>x</button>
                                </div>}
                        </Grid>
                        <Grid container spacing={0} onClick={() => handleClickIn(props.dataSet)}>
                            <Grid item xs={6} xl={12} lg={12} md={12} sm={6}>
                                <div className='lnt'>
                                    <div className="location"><h3>{props.dataSet.name},{props.dataSet.sys.country}</h3></div>

                                    <div className="time"><h1><GetTimeDate timeSpan={props.dataSet.dt} /></h1></div>
                                </div>
                            </Grid>
                            <Grid item xs={6} xl={6} lg={6} md={6} sm={6}>
                                <GetTempurature
                                    currentTemp={props.dataSet.main.temp}
                                    minTemp={props.dataSet.main.temp_min}
                                    maxTemp={props.dataSet.main.temp_max} />
                            </Grid>
                            <Grid item xs={6} xl={6} lg={6} md={6} sm={6}>

                                <div className='des'><h1><img src={`http://openweathermap.org/img/wn/${props.dataSet.weather[0].icon}@2x.png`} /> {props.dataSet.weather[0].description}</h1></div>
                            </Grid>
                        </Grid>

                    </Grid>
                </Typography>

                <Typography variant="body2" className='details' style={{ backgroundColor: "#565556", height: 'auto', paddingTop: '3%', paddingBottom: '3%' }} onClick={() => handleClickIn(props.dataSet)}>
                    <Grid container spacing={0}>
                        <Grid item xs={4} xl={4} lg={4} md={4} sm={4}>

                            <div className='b01'>
                                <h1><b>Pressure :</b>{props.dataSet.main.pressure}hpa</h1>
                                <h1><b>Hummidity :</b>{props.dataSet.main.humidity}%</h1>
                                <h1><b>Visibility :</b>{(props.dataSet.visibility) / 1000}km</h1>
                            </div>
                        </Grid>
                        <Grid xs={4} xl={4} lg={4} md={4} sm={4}>
                            <div className='b02'>
                                <FiNavigation style={{ color: 'white' }} />
                                <h1>{props.dataSet.wind.speed} m/s {props.dataSet.wind.deg} degree</h1>
                            </div>
                        </Grid>
                        <Grid xs={4} xl={4} lg={4} md={4} sm={4}>
                            <GetSunDetails
                                sunRise={props.dataSet.sys.sunrise}
                                sunSet={props.dataSet.sys.sunset}

                            />


                        </Grid>
                    </Grid>
                </Typography>


            </Card>
        </div>
    )
}

//calling props function 
oneCityData.protoTypes = {
    deleteClickHandler: PropTypes.func.isRequired
}

//export function
export default oneCityData;