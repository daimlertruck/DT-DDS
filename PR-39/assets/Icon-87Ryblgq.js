import{j as a}from"./jsx-runtime-DMAvRu52.js";import{n as l,d as p}from"./emotion-styled.browser.esm-Dv69Fly8.js";const f={xs:"12px",s:"16px",m:"20px",l:"24px",xl:"32px"},m=l.i`
  ${({size:t,theme:o,variant:e,color:n})=>`
    font-family: DTUI-icons-${o.icons};
    font-weight: normal;
    font-style: normal;
    font-size: ${f[t]};
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    font-variation-settings: 'FILL' ${e==="filled"?1:0};
    color: ${n};

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;
  
    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;
  
    /* Support for IE. */
    font-feature-settings: 'liga';
  `}
`,d=({code:t,color:o,dataTestId:e,size:n="l",style:i,variant:r="outlined"})=>{const s=p();return a.jsx(m,{color:o??s.palette.content.default,"data-testid":e??"icon",size:n,style:i,variant:r,children:t})};export{d as I,f};
