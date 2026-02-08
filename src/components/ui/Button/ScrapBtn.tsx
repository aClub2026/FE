//import React from 'react';


import  ScrapIconDefault from '../../../assets/icon/ScrapBtn_default-2.svg?react';
import ScrapIconActive from '../../../assets/icon/ScrapBtn_activated.svg?react'

interface ScrapBtnProps {
  count: number;
  isActive?: boolean;
  onClick?: () => void;
}

const ScrapBtn = ({ count, isActive = false, onClick }: ScrapBtnProps) => {
  const displayCount = count > 99 ? '99+' : count;

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-[2px] w-[76px] h-[48px] px-3 py-2.5 rounded-[8px]
        transition-colors
        ${isActive
          ? 'bg-blue-400 text-white' // 기본상태
          : 'bg-gray-200 text-gray-800 border border-gray-300' // 기본 형태 수정
        }
      `}
    >
      {/* 2. isActive 값에 따른 버튼 수정 */}
      {isActive 
        ? <ScrapIconActive className="w-6 h-6" />
        : <ScrapIconDefault className="w-6 h-6" />
      }
      
      <span className="text-sm font-medium leading-[135%] tracking-[-0.03em]">
        {displayCount}
      </span>
    </button>
  );
};
export default ScrapBtn
