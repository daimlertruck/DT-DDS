var v=Object.defineProperty;var i=(r,a)=>v(r,"name",{value:a,configurable:!0});import{o as h,t as s,u as $}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as g}from"./src-Cgsrikn0.js";import{t as y}from"./jsx-runtime-Br4tQxt1.js";import"./icon-BVKwuEsa.js";import{t as _}from"./Typography-BVFm109i.js";import"./typography-D38L8NZ6.js";h();var b={small:"4px",large:"8px"},c=i(r=>({active:{background:r.palette.informative.default,helper:r.palette.content.medium,percentage:r.palette.content.default},success:{background:r.palette.success.default,helper:r.palette.content.medium,percentage:r.palette.content.default},error:{background:r.palette.error.default,helper:r.palette.error.default,percentage:r.palette.error.default}}),"progressBarColors"),j=s.div`
  ${({theme:r})=>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${r.spacing.spacing_20};
    min-width: 48px;
  `}
`,S=s.div`
  ${({theme:r})=>`
    display: grid;
    grid-template-columns: minmax(48px, 1fr) 28px 16px;
    align-items: center;
    gap: ${r.spacing.spacing_20};
    width: 100%;
    height: 16px;
  `}
`,B=s.div`
  ${({theme:r,size:a,state:o,progress:t})=>`
    width: ${t}%;
    height: ${b[a]};
    background-color: ${c(r)[o].background};
    transition: width 0.2s ease-in-out;
    border-radius: ${r.radius.radius_0} ${r.shape.progressbar} ${r.shape.progressbar} ${r.radius.radius_0}; 
  `};
`,P=s.div`
  ${({theme:r})=>`
    width: 100%;
    background-color: ${r.palette.secondary.medium};
    border-radius: ${r.shape.progressbar};
    overflow: hidden;
  `};
`,w=s.p`
  ${({theme:r,state:a})=>`
    ${r.fontStyles.bodySmRegular}
    color: ${c(r)[a].helper};
  `};
`,k=s.div`
  ${({theme:r,state:a})=>`
    ${r.fontStyles.bodySmRegular}
    text-align: center;
    color: ${c(r)[a].percentage};
  `};
`,m=s.div`
  height: 16px;
  line-height: 16px;
`,e=y(),C=i(({state:r,value:a,label:o,helperText:t,size:x="small",info:n="none"})=>{const d=Math.min(Math.max(a,0),100),p=$();return(0,e.jsxs)(j,{children:[o?(0,e.jsx)(_,{color:"content.default",fontStyles:"bodyMdBold",children:o}):null,(0,e.jsxs)(S,{children:[(0,e.jsx)(P,{"aria-label":o,"aria-valuemax":100,"aria-valuemin":0,"aria-valuenow":d,role:"progressbar",children:(0,e.jsx)(B,{progress:d,size:x,state:r})}),f()]}),t?(0,e.jsx)(w,{state:r,children:t}):null]});function f(){if(n==="none")return;const u={success:(0,e.jsx)(g,{code:"check_circle",color:p.palette.success.default,size:"small"}),error:(0,e.jsx)(g,{code:"error",color:p.palette.error.default,size:"small"})};let l=(0,e.jsx)(k,{state:r,children:`${d}%`});return r!=="active"&&(n==="icon"&&(l=(0,e.jsx)(m,{children:u[r]})),n==="both"&&(l=(0,e.jsxs)(e.Fragment,{children:[l,(0,e.jsx)(m,{children:u[r]})]}))),l}},"ProgressBar");export{C as t};
