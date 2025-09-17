import{j as t}from"./jsx-runtime-DMAvRu52.js";import{T as r}from"./Typography-D4QoQXTm.js";import{n as a}from"./emotion-styled.browser.esm-Dv69Fly8.js";const n=a.div`
  ${({theme:i})=>`
    margin: ${i.spacing.spacing_0};
    background-color: ${i.palette.surface.contrast};
    width: 100%;
    max-width: 530px;
    height: 100%;
    padding: 47px 24px 52px 24px;
    transition: all 0.2s ease-in-out;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    
    &::after {
      content: '';
      background-color: ${i.palette.primary.default};
      border-radius: ${i.spacing.spacing_20};
      width: 40px;
      height: 5px;
      margin-top: 14px;
    }

    &:hover {
      box-shadow: ${i.shadows.elevation_200};
    }
  `}
`,s=a.div`
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`,d=a.div`
  ${({theme:i})=>`
    margin-top: ${i.spacing.spacing_40};
    width: 100%;
    height: auto;
    max-height: ${i.spacing.spacing_90};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  `}
`,e=({children:i,dataTestId:o})=>t.jsx(n,{"data-testid":o??"card",children:i});e.Title=({children:i})=>t.jsx(s,{children:t.jsx(r,{element:"h2",fontStyles:"h4",children:i})});e.Detail=({children:i})=>t.jsx(d,{children:i});export{e as C};
