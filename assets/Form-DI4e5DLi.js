import{j as e}from"./jsx-runtime-DMAvRu52.js";import{T as r,O as a}from"./Tooltip-D-Xg6YZv.js";import{T as c}from"./Typography-D4QoQXTm.js";import{I as d}from"./Info-BRKcLzcc.js";import{n as s}from"./emotion-styled.browser.esm-Dv69Fly8.js";const p=s.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: ${({theme:t})=>t.spacing.spacing_60};
`,m=s.div`
  ${({theme:t})=>`
    row-gap: ${t.spacing.spacing_50};
    display: flex;
    flex-direction: column;
    width: 100%;
    color: ${t.palette.content.default};
  `}
`,x=s.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  align-items: center;
`,f=s.div`
  ${({theme:t,disabled:o})=>`
    display: flex;
    gap: ${t.spacing.spacing_50};
    justify-content: stretch;
    align-items: start;
    flex-direction: column;

    @media only screen and (min-width: ${t.breakpoints.mq3}px) {
      flex-direction: row;
    }

    ${o&&`
        opacity: 0.5;
        pointer-events: none;
      `}
  `}
`,y=t=>t.preventDefault(),u=({children:t,dataTestId:o,style:i,onSubmit:n=y})=>{const l=o??"test-form";return e.jsx(p,{"data-testid":l,onSubmit:n,style:i,children:t})};u.Group=({children:t,isDisabled:o,title:i,tooltip:n})=>e.jsxs(m,{children:[i?e.jsxs(x,{children:[e.jsx(c,{color:"primary.default",fontStyles:"h6",style:{textTransform:"uppercase"},children:i}),n?e.jsxs(r,{children:[e.jsx(d,{height:"16",width:"16"}),e.jsx(r.Content,{direction:a.Right,style:{maxWidth:250},children:n})]}):null]}):null,e.jsx(f,{disabled:o,children:t})]});export{u as F};
