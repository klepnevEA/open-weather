import React from "react";
import CardCity from "../../components/CardCity";
import styles from "./index.module.css";

type TProps = {
  list: any[];
};

export const MainPage = ({ list }: TProps) => {
  return (
    <>
      {list.length ? (
        <ul className={styles["list-city"]}>
          {list.map((elem: any, index: number) => {
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
};
