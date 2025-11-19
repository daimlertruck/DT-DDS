import{j as a}from"./jsx-runtime-CB_V9I5Y.js";import{B as m}from"./index-CWvrgZ1b.js";import{T as d}from"./Typography-Bb7lZ69m.js";import{k as x}from"./emotion-react.browser.esm-Bwsi5GpN.js";import{f as g,d as u}from"./emotion-styled.browser.esm-DBghOYGd.js";const c=x`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`,s={"extra-small":"14px",small:"28px",medium:"42px",large:"50px","extra-large":"58px"},i={"extra-small":"2px",small:"4px",medium:"4px",large:"4px","extra-large":"4px"},l=r=>({positive:{main:r.palette.primary.default,background:r.palette.border.default},negative:{main:r.palette.border.light,background:r.palette.primary.dark}}),b=g.div`
  ${({theme:r,size:e,colorScheme:t})=>`
    width: ${s[e]};
    height: ${s[e]};
    border: ${i[e]} solid ${l(r)[t].background};
    border-radius: 50%;
    border-top: ${i[e]} solid ${l(r)[t].main};
  `};
  animation: ${c} 1s cubic-bezier(0.3, 0.1, 0.25, 0.65) 0s
    infinite normal none;
`,f={positive:"content.default",negative:"content.contrast"},y={"extra-small":"bodyXsRegular",small:"bodyXsRegular",medium:"bodySmRegular",large:"bodySmRegular","extra-large":"bodyMdRegular"},j=({style:r,dataTestId:e="spinner",size:t="medium",colorScheme:n="positive",loadingText:o})=>{const p=u();return a.jsxs(m,{dataTestId:e,style:{...r},children:[a.jsx(b,{colorScheme:n,"data-testid":`${e}-element`,size:t}),o?a.jsx(d,{color:f[n],fontStyles:y[t],style:{marginTop:p.spacing.spacing_30},children:o}):null]})};export{j as S};
