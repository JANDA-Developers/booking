import { TimePerMs } from '../types/apiEnum';

// 밀리세컨드 타임 스탬프를  00:00:00:00 으로 만들어줍니다.

const setMidNight = (date: number) => Math.floor(date / TimePerMs.DAY) * TimePerMs.DAY - 32400 * 1000;

export default setMidNight;
