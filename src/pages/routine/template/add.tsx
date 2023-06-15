import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import { Typography } from '@mui/material';
import MainBody from 'components/atoms/MainBody';
import RoutineTemplateAddText from 'components/organisms/RoutineTemplateAddText';
import RoutineTemplateAddType from 'components/organisms/RoutineTemplateAddType';
import RoutineTemplateAddWeek from 'components/organisms/RoutineTemplateAddWeek';

const types = ['time', 'count'];
const goalTypes = ['분', '개'];
const goalPlaceholders = ['분/일', '개'];
const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

export default function RoutineTemplateAddPage() {
  const [name, setName] = useState('');
  const [selectedType, setSelectedType] = useState(types[0]);
  const [goal, setGoal] = useState('');
  const [goalType, setGoalType] = useState(goalTypes[0]);
  const [goalPlaceholder, setGoaplaceholder] = useState(goalPlaceholders[0]);
  const [week, setWeek] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]);

  useEffect(() => {
    if (selectedType === 'time') {
      setGoalType(goalTypes[0]);
      setGoaplaceholder(goalPlaceholders[0]);
    } else {
      setGoalType(goalTypes[1]);
      setGoaplaceholder(goalPlaceholders[1]);
    }
  }, [selectedType]);

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
          사용자 정의
        </Typography>
        <RoutineTemplateAddText
          title={'습관 이름'}
          placeholder={'습관 이름 입력'}
          value={name}
          setValue={setName}
        />
        <RoutineTemplateAddType
          types={types}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        <RoutineTemplateAddText
          title={`목표 (${goalType})`}
          placeholder={goalPlaceholder}
          value={goal}
          setValue={setGoal}
        />
        <RoutineTemplateAddWeek
          dayOfWeek={dayOfWeek}
          week={week}
          setWeek={setWeek}
        />
      </MainBody>
    </>
  );
}
