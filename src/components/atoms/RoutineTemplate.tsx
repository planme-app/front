import React from 'react';
import { NextRouter, useRouter } from 'next/router';
import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia
} from '@mui/material';

export type RoutineTemplateProps = {
  title: string;
  type: string;
  logoUrl: string;
};

export default function RoutineTemplate(props: RoutineTemplateProps) {
  const router: NextRouter = useRouter();
  const { title, type, logoUrl } = props;

  const moveAdd = () => {
    router.push({
      pathname: '/routine/template/add',
      query: { title: title, type: type }
    });
  };

  return (
    <Card
      sx={{
        display: 'flex',
        minWidth: 110,
        minHeight: 140,
        backgroundColor: '#F8F8F8'
      }}
      onClick={moveAdd}
    >
      <CardActionArea
        sx={{
          minHeight: 140
        }}
      >
        <CardContent>
          <Typography
            align="center"
            sx={{
              fontWeight: 'bold',
              fontSize: 16,
              maxHeight: 30
            }}
          >
            {title}
          </Typography>
          <CardMedia
            component="img"
            width={65}
            height={65}
            image={logoUrl}
            alt={title}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
