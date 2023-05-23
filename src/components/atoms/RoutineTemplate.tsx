import React from 'react';
import Image from 'next/image';

import { Typography, Card, CardContent, CardActions } from '@mui/material';

export type RoutineTemplateProps = {
  routineName: string;
  imageSrc: string;
};

export default function RoutineTemplate(props: RoutineTemplateProps) {
  const { routineName, imageSrc } = props;

  return (
    <Card
      sx={{
        minWidth: 110,
        backgroundColor: '#F8F8F8'
      }}
    >
      <CardActions>
        <CardContent>
          <Typography
            align="center"
            sx={{
              fontWeight: 'bold',
              fontSize: 16,
              maxWidth: 65
            }}
          >
            {routineName}
          </Typography>
          <Image src={imageSrc} width={65} height={65} alt={routineName} />
        </CardContent>
      </CardActions>
    </Card>
  );
}
