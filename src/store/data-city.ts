import { makeAutoObservable } from "mobx";
import { TCity } from "../types/city";

class DataCity {
  key = "ea6da953729f4d3bf6658f2f0b28e742";
  listCityes: TCity[] = [];
  getInfoWeather = (name: string) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${this.key}`
    )
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        }
      })
      .then((data) => {
        if (data.cod === "404") {
          this.listCityes = [...this.listCityes];
        } else if (
          [...this.listCityes].filter((item: TCity) => item.name === data.name)
            .length === 0
        ) {
          this.listCityes.unshift(data);
        }
      })
      .catch((err) => {
        console.warn("Такого города нет");
      });
  };

  getInfoWeatherCoordinates = (coordinates: number[]) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/find?lat=${coordinates[0]}&lon=${
        coordinates[1]
      }&cnt=${1}&appid=${this.key}`
    )
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        }
      })
      .then((data) => {
        if (data.cod === "404") {
          this.listCityes = [...this.listCityes];
        } else if (
          [...this.listCityes].filter(
            (item: TCity) => item.name === data.list[0].name
          ).length === 0
        ) {
          this.listCityes.unshift(data.list[0]);
        }
      })
      .catch((err) => {
        console.warn("Такого города нет!");
      });
  };

  search = (value: string) => {
    this.getInfoWeather(value);
    return value;
  };

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.getInfoWeatherCoordinates([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export default new DataCity();
