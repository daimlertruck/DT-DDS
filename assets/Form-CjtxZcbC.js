import{j as e}from"./jsx-runtime-DMAvRu52.js";import{T as s,O as d}from"./Tooltip-OievAhLb.js";import{T as a}from"./Typography-DII2gFDQ.js";import{I as c}from"./Info-BRKcLzcc.js";import{n as r}from"./emotion-styled.browser.esm-Dv69Fly8.js";const p=r.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: ${({theme:t})=>t.spacing.medium};
`,m=r.div`
  ${({theme:t})=>`
    row-gap: ${t.spacing.xmedium};
    display: flex;
    flex-direction: column;
    width: 100%;
    color: ${t.palette.content.default};
  `}
`,x=r.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  align-items: center;
`,f=r.div`
  ${({theme:t,disabled:o})=>`
    display: flex;
    gap: ${t.spacing.xmedium};
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
`,u=t=>t.preventDefault(),y=({children:t,dataTestId:o,style:i,onSubmit:n=u})=>{const l=o??"test-form";return e.jsx(p,{"data-testid":l,onSubmit:n,style:i,children:t})};y.Group=({children:t,isDisabled:o,title:i,tooltip:n})=>e.jsxs(m,{children:[i?e.jsxs(x,{children:[e.jsx(a,{color:"primary.default",fontStyles:"h6",style:{textTransform:"uppercase"},children:i}),n?e.jsxs(s,{children:[e.jsx(c,{height:"16",width:"16"}),e.jsx(s.Content,{direction:d.Right,style:{maxWidth:250},children:n})]}):null]}):null,e.jsx(f,{disabled:o,children:t})]});export{y as F};
