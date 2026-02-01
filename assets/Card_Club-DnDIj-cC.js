import{u as c,j as e}from"./index-CVGXEiNJ.js";import{T as i}from"./Chip_type-EFomsXNA.js";const m=({club:l,variant:n="home"})=>{const{clubId:x,profileImageUrl:o,clubType:r,clubName:a}=l,p=c(),s=()=>{p(`/clubs/${x}`,{state:{clubType:r}})},t=n==="explore";return e.jsxs("div",{onClick:s,role:"button",tabIndex:0,className:`
        ${t?"w-[109px] h-[147px] rounded-[12px] px-2 pt-3 pb-4":"w-[120px] h-[156px] rounded-[13.41px] px-2 pt-3 pb-4"}
        bg-gray-50 flex flex-col items-center justify-between
      `,children:[e.jsx("img",{src:o||"/OnlyLogo.svg",alt:`${a} profile`,className:`
          ${t?"w-[72px] h-[72px]":"w-[80px] h-[80px]"}
          rounded-full border border-gray-100 object-cover
        `,loading:"lazy",decoding:"async"}),e.jsx(i,{size:"regular",children:r}),e.jsx("p",{className:`
          ${t?"text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-gray-900 text-center w-full truncate":"w-[104px] h-[18px] text-center truncate text-[14px] font-medium text-gray-900 leading-[135%] tracking-[-0.03em]"}
        `,children:a})]})};export{m as C};
