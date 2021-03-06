/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, FlatList } from "react-native";

import ForecastCard from './components/ForecastCard';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      forecast: [],
      error: ""
    };
  }

  componentDidMount(){
		// Get the user's location
		this.getLocation();
	}

  getLocation() {
    // Get the current location of the user
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState(
          prevState => ({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }),
          () => {
            this.getWeather();
          }
        );
      },
      error => this.setState({ forecast: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  getWeather() {
    // Construct the API url to call
    let url =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      this.state.latitude +
      "&lon=" +
      this.state.longitude +
      "&units=metric&appid=YOUR API KEY HERE";

    // Call the API, and set the state of the weather forecast
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState((prevState, props) => ({
          forecast: data
        }));
      });
  }

  render() {
		return (
			<FlatList data={this.state.forecast.list} style={{marginTop:20}} keyExtractor={item => item.dt_txt} renderItem={({item}) => <ForecastCard detail={item} location={this.state.forecast.city.name} />} />
		);
	}

}