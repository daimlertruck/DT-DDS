import{j as n}from"./jsx-runtime-DMAvRu52.js";import{B as m}from"./index-DSuwS0lG.js";import{T as d}from"./Typography-D4QoQXTm.js";import{k as x}from"./emotion-react.browser.esm-DLeKyOu_.js";import{n as c,d as g}from"./emotion-styled.browser.esm-Dv69Fly8.js";const u=x`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`,s={"extra-small":"14px",small:"28px",medium:"42px",large:"50px","extra-large":"58px"},i={"extra-small":"2px",small:"4px",medium:"4px",large:"4px","extra-large":"4px"},l=r=>({positive:{main:r.palette.primary.default,background:r.palette.content.contrast},negative:{main:r.palette.content.contrast,background:r.palette.content.medium}}),y=c.div`
  ${({theme:r,size:t,colorScheme:e})=>`
    width: ${s[t]};
    height: ${s[t]};
    border: ${i[t]} solid ${l(r)[e].background};
    border-radius: 50%;
    border-top: ${i[t]} solid ${l(r)[e].main};
  `};
  animation: ${u} 1s cubic-bezier(0.3, 0.1, 0.25, 0.65) 0s
    infinite normal none;
`,b={positive:"content.default",negative:"content.contrast"},f={"extra-small":"bodyXsRegular",small:"bodyXsRegular",medium:"bodySmRegular",large:"bodySmRegular","extra-large":"bodyMdRegular"},k=({style:r,dataTestId:t="spinner",size:e="medium",colorScheme:o="positive",loadingText:a})=>{const p=g();return n.jsxs(m,{dataTestId:t,style:{...r},children:[n.jsx(y,{colorScheme:o,size:e}),a?n.jsx(d,{color:b[o],fontStyles:f[e],style:{marginTop:p.spacing.spacing_40},children:a}):null]})};export{k as S};
