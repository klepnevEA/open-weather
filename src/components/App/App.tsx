import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DetailedPage from "../../pages/DetailedPage";
import MainPage from "../../pages/MainPage";
import Page404 from "../../pages/Page404";
import "../../theme/variables.css";
import { TCity } from "../../types/city";
import InputSearch from "../InputSearch";
import styles from "./index.module.css";

function App() {
  const key = "ea6da953729f4d3bf6658f2f0b28e742";
  const [listCityes, setListCityes] = useState<TCity[]>([]);
  function getInfoWeather(name: string) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${key}`
    )
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        }
      })
      .then((data) => {
        if (data.cod === "404") {
          setListCityes([...listCityes]);
        } else if (
          [...listCityes].filter((item: TCity) => item.name === data.name)
            .length === 0
        ) {
          setListCityes([data, ...listCityes]);
        }
      })
      .catch((err) => {
        console.warn("Такого города нет");
      });
  }

  function getInfoWeatherCoordinates(coordinates: number[]) {
    fetch(
      `http://api.openweathermap.org/data/2.5/find?lat=${coordinates[0]}&lon=${
        coordinates[1]
      }&cnt=${50}&appid=${key}`
    )
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        }
      })
      .then((data) => {
        if (data.cod === "404") {
          setListCityes([...listCityes]);
        } else if (
          [...listCityes].filter(
            (item: TCity) => item.name === data.list[0].name
          ).length === 0
        ) {
          setListCityes([data.list[0], ...listCityes]);
        }
      })
      .catch((err) => {
        console.warn("Такого города нет!");
      });
  }

  const search = (value: string) => {
    getInfoWeather(value);
    return value;
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getInfoWeatherCoordinates([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getLocation();

  return (
    <div className={styles["wrapper"]}>
      <header className={styles["header"]}>
        <div className={styles["container"]}>
          <h1>Погода в доме</h1>
          <div className={styles["header-search"]}>
            <InputSearch
              name="Найти"
              placeholder="Введите название города"
              onOutput={(e) => search(e)}
            />
          </div>
        </div>
      </header>
      <main className={styles["main"]}>
        <div className={styles["container"]}>
          <Router>
            <Switch>
              <Route path="/" exact={true}>
                <MainPage list={listCityes} />
              </Route>
              <Route path="/datailed/:name">
                <DetailedPage list={listCityes} />
              </Route>
              <Route>
                <Page404 />
              </Route>
            </Switch>
          </Router>
        </div>
      </main>
    </div>
  );
}

export default App;
