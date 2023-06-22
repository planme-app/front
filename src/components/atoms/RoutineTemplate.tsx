import React from 'react';
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';
import { Typography, Card, CardContent, CardActions } from '@mui/material';

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
        minWidth: 110,
        backgroundColor: '#F8F8F8'
      }}
    >
      <CardActions onClick={moveAdd}>
        <CardContent>
          <Typography
            align="center"
            sx={{
              fontWeight: 'bold',
              fontSize: 16,
              maxWidth: 65,
              maxHeight: 16
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
