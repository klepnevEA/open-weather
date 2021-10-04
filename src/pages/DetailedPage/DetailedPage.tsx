import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import styles from "./index.module.css";

type TProps = {
  list: any[];
};

export const DetailedPage = ({ list }: TProps) => {
  const history = useHistory();
  const { name } = useParams<{ name?: string }>();
  const city = [...list].filter((item: any) => item.name === name);

  useEffect(() => {
    if (list.length === 0) {
      history.replace({ pathname: "/" });
    }
  }, [history, list]);

  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Детальная информация о городе {city[0]?.name}
          </Typography>
          <Typography>
            Температура воздуха: {city[0]?.main.temp} &deg;C
          </Typography>
          <Typography>Влажгность: {city[0]?.main.humidity} %</Typography>
          <Typography>Видимость: {city[0]?.visibility} м</Typography>
          <Typography>
            Облачность:{" "}
            {city[0]?.clouds.all < 20
              ? "Низкая"
              : city[0]?.clouds.all < 100
              ? "Средняя"
              : "Высокая"}
          </Typography>
          <Typography>Облака: {city[0]?.weather[0].description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
