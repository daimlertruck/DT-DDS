import{j as o}from"./jsx-runtime-CB_V9I5Y.js";import{r as s}from"./index-CTjT7uj6.js";import{h as p}from"./index-D9dZuxfj.js";import"./index-BUIOwkTi.js";import"./index-XjDa9cP3.js";import{B as d}from"./z-index-CLLOsryR.js";import{f as n}from"./emotion-styled.browser.esm-DBghOYGd.js";const c={dark:.85,light:.2},m=n.div`
  ${({theme:t,type:r})=>`
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${p(t.palette.surface.dark,c[r])};
      z-index: ${d};
    `}
`,f={Dark:"dark",Light:"light"},B=s.forwardRef(({isOpen:t=!1,type:r=f.Dark,children:a,dataTestId:e},i)=>o.jsx(o.Fragment,{children:t?o.jsx(m,{"data-testid":e??"backdrop",ref:i,type:r,children:a}):null}));export{f as B,B as a};
