import React from "react";
import CardCity from "../../components/CardCity";
import { TCity } from "../../types/city";
import styles from "./index.module.css";
import DataCity from "../../store/data-city";
import { observer } from "mobx-react-lite";

export const MainPage = observer(() => {
  return (
    <>
      {DataCity.listCityes.length ? (
        <ul className={styles["list-city"]}>
          {DataCity.listCityes.map((elem: TCity, index: number) => {
            return (
              <li key={index}>
                <CardCity city={elem} />
              </li>
            );
          })}
        </ul>
      ) : (
        <h2>Список городов пуст</h2>
      )}
    </>
  );
});
