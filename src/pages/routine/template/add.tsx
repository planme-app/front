import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Button, Typography } from '@mui/material';
import MainBody from 'components/atoms/MainBody';
import RoutineTemplateAddText from 'components/organisms/RoutineTemplateAddText';
import RoutineTemplateAddType from 'components/organisms/RoutineTemplateAddType';
import RoutineTemplateAddWeek from 'components/organisms/RoutineTemplateAddWeek';
import { postRoutine } from 'controllers/services/api';

const types = ['time', 'count'];
const goalTypes = ['분', '개'];
const goalPlaceholders = ['분/일', '개'];
const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

export default function RoutineTemplateAddPage() {
  const router = useRouter();

  const stringTypeGuards = (value: string[] | string | undefined) => {
    if (value !== undefined && typeof value === 'string') {
      return value;
    }
    return '';
  };

  const title = stringTypeGuards(router.query?.title);
  const type = stringTypeGuards(router.query?.type);

  const [name, setName] = useState(title || '');
  const [selectedType, setSelectedType] = useState(type || types[0]);
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

  const saveTemplate = async () => {
    const weekData: string[] = [];
    week.forEach((item, index) => {
      if (item) {
        weekData.push(dayOfWeek[index]);
      }
    });
    if (title !== '' && type !== '' && weekData.length > 0 && goal !== '') {
      const res = await postRoutine(title, type, weekData, goal);
      if (res.result === true) {
        router.push('/routine');
      }
    }
  };

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
        <Button variant="contained" size="large" onClick={saveTemplate}>
          저장
        </Button>
      </MainBody>
    </>
  );
}
