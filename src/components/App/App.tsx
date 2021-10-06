import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DetailedPage from "../../pages/DetailedPage";
import MainPage from "../../pages/MainPage";
import Page404 from "../../pages/Page404";
import "../../theme/variables.css";
import InputSearch from "../InputSearch";
import styles from "./index.module.css";
import DataCity from "../../store/data-city";

function App() {
  DataCity.getLocation();

  return (
    <div className={styles["wrapper"]}>
      <header className={styles["header"]}>
        <div className={styles["container"]}>
          <h1>Погода в доме</h1>
          <div className={styles["header-search"]}>
            <InputSearch
              name="Найти"
              placeholder="Введите название города"
              onOutput={(e) => DataCity.search(e)}
            />
          </div>
        </div>
      </header>
      <main className={styles["main"]}>
        <div className={styles["container"]}>
          <Router>
            <Switch>
              <Route path="/" exact={true}>
                <MainPage />
              </Route>
              <Route path="/datailed/:name">
                <DetailedPage />
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
