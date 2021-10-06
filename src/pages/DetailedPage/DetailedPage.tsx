import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { TCity } from "../../types/city";
import DataCity from "../../store/data-city";
import { observer } from "mobx-react-lite";

export const DetailedPage = observer(() => {
  const history = useHistory();
  const { name } = useParams<{ name?: string }>();
  const city = [...DataCity.listCityes].filter(
    (item: TCity) => item.name === name
  );

  useEffect(() => {
    if (DataCity.listCityes.length === 0) {
      history.replace({ pathname: "/" });
    }
  }, [history]);

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
});
