import{j as t}from"./index-DQDoNcKn.js";const d=({status:s,recruitmentType:r,dDay:e,size:n="small"})=>{const x=`
    inline-flex w-auto items-center justify-center
    h-[20px] rounded-[4px]
    font-bold leading-[1.4] tracking-[-0.03em]
  `,l=()=>{switch(n){case"large":return"px-2 py-1 text-sm";case"medium":return"px-[5px] py-0.5 text-xs";case"small":default:return"px-[5px] py-[3px] text-[10px]"}},a=()=>{switch(s){case"d-day":return{style:"bg-red-50 text-red-300",text:e!==void 0?`마감 D-${e}`:"마감 임박"};case"end":return{style:"bg-gray-100 text-gray-500",text:"마감"};case"regular":default:return{style:"bg-blue-50 text-blue-400",text:r??"상시모집"}}},i=l(),{style:c,text:p}=a();return t.jsx("div",{className:`${x} ${i} ${c}`,children:t.jsx("span",{children:p})})};export{d as P};
