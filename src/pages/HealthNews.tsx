import React from "react";
import { PageContainer } from "../ui/PageContainer";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import demoImage from "../assets/react.svg";
import { orange } from "@mui/material/colors";

export const HealthNews = () => {
  return (
    <PageContainer title="HealthNews">
      <div>
        <Card
          sx={{ maxWidth: 345, marginY: "1.2rem", borderRadius: "1.25rem" }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={demoImage}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </Card>
      </div>
    </PageContainer>
  );
};
