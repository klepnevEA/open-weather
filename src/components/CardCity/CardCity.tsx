import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

type TProps = {
  city: any;
};

export const CardCity = ({ city }: TProps) => {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Город: {city.name}
          </Typography>
          <Typography>Температура: {city.main.temp} &deg;C</Typography>
          <Typography>Влажгность: {city.main.humidity} %</Typography>
          <Typography>Видимость: {city.visibility} м</Typography>
          <Link
            to={{
              pathname: `/datailed/${city.name}`,
            }}
          >
            Подробнее
          </Link>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
