var f=Object.defineProperty;var p=(t,r)=>f(t,"name",{value:r,configurable:!0});import{o as u}from"./rolldown-runtime-CzYk_CEw.js";import{t as _}from"./react-HNhQAnN4.js";import{o as c,t as y,u as d}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as g}from"./jsx-runtime-Br4tQxt1.js";import"./src-CIbK0PmT.js";var v=p((t,r)=>{if(!t)return;const o=t.split(".");if(o.length!==2)return;const[s,n]=o,e=r.palette[s];if(!e)return;const a=e[n];if(typeof a=="string")return a},"getContextualColor"),h=u(_());c();var x=y.p`
  ${({theme:t,fontStyles:r,color:o})=>{const s=t.colors?.[o],n=v(o,t),e=s||n||o;return`
      ${t.fontStyles[r]};
      color: ${e};
      ${t.responsiveFontStyles[r]};
    `}}
`,C=g(),R=(0,h.forwardRef)(({children:t,element:r,fontStyles:o,color:s="content.default",dataTestId:n,...e},a)=>{const l=d(),i=r,m=o??(l.fontStyles[i]?i:"bodyLgRegular");return(0,C.jsx)(x,{as:r,color:s,"data-testid":n??"typography",fontStyles:m,ref:a,...e,children:t})});export{R as t};
