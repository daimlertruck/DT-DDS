import{j as s}from"./jsx-runtime-CB_V9I5Y.js";import{f as l,d as f}from"./emotion-styled.browser.esm-DBghOYGd.js";const p={"extra-small":"12px",small:"16px",medium:"20px",large:"24px","extra-large":"32px"},m=l.i`
  ${({size:t,theme:o,variant:e,color:n})=>`
    font-family: DTUI-icons-${o.icons};
    font-weight: normal;
    font-style: normal;
    font-size: ${p[t]};
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
`,x=({code:t,color:o,dataTestId:e,size:n="large",style:r,variant:i="outlined"})=>{const a=f();return s.jsx(m,{color:o??a.palette.content.default,"data-testid":e??"icon",size:n,style:r,variant:i,children:t})};export{x as I,p as f};
