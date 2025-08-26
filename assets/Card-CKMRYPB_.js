import{j as i}from"./jsx-runtime-DMAvRu52.js";import{T as r}from"./Typography-DII2gFDQ.js";import{n as e}from"./emotion-styled.browser.esm-Dv69Fly8.js";const l=e.div`
  ${({theme:t})=>`
    margin: ${t.spacing.none};
    background-color: ${t.palette.surface.contrast};
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
      background-color: ${t.palette.primary.default};
      border-radius: ${t.spacing.xxsmall};
      width: 40px;
      height: 5px;
      margin-top: 14px;
    }

    &:hover {
      box-shadow: ${t.shadows[1]};
    }
  `}
`,d=e.div`
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`,s=e.div`
  ${({theme:t})=>`
    margin-top: ${t.spacing.small};
    width: 100%;
    height: auto;
    max-height: ${t.spacing.xlarge};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  `}
`,a=({children:t,dataTestId:o})=>i.jsx(l,{"data-testid":o??"card",children:t});a.Title=({children:t})=>i.jsx(d,{children:i.jsx(r,{element:"h2",fontStyles:"h4",children:t})});a.Detail=({children:t})=>i.jsx(s,{children:t});export{a as C};
