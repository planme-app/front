import React, { useState } from 'react';
import Head from 'next/head';

import { Typography } from '@mui/material';
import MainBody from 'components/atoms/MainBody';
import RoutineTemplateAddText from 'components/organisms/RoutineTemplateAddText';
import RoutineTemplateAddType from 'components/organisms/RoutineTemplateAddType';

const types = ['time', 'count'];

export default function RoutineTemplateAddPage() {
  const [name, setName] = useState('');
  const [selectedType, setSelectedType] = useState(types[1]);

  return (
    <>
      <Head>
        <title>addpage</title>
      </Head>
      <MainBody>
        <Typography
          align="center"
          sx={{
            fontWeight: 'bold',
            fontSize: 30,
            pb: 2
          }}
        >
          습관 선택
        </Typography>
        <RoutineTemplateAddText name={name} setName={setName} />
        <RoutineTemplateAddType
          types={types}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </MainBody>
    </>
  );
}
