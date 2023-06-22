import React from 'react';
import Image from 'next/image';

import { Typography, Card, CardContent, CardActions } from '@mui/material';

export type RoutineTemplateProps = {
  title: string;
  logoUrl: string;
};

export default function RoutineTemplate(props: RoutineTemplateProps) {
  const { title, logoUrl } = props;

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
            {title}
          </Typography>
          <Image src={logoUrl} width={65} height={65} alt={title} />
        </CardContent>
      </CardActions>
    </Card>
  );
}
