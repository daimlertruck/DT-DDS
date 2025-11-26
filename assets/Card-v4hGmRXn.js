var s=Object.defineProperty;var o=(i,a)=>s(i,"name",{value:a,configurable:!0});import{j as t}from"./jsx-runtime-Cgz2XvFB.js";import{T as d}from"./Typography-BDc1BtFV.js";import{f as e}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";const l=e.div`
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
`,n=e.div`
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`,p=e.div`
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
`,r=o(({children:i,dataTestId:a})=>t.jsx(l,{"data-testid":a??"card",children:i}),"Card");r.Title=({children:i})=>t.jsx(n,{children:t.jsx(d,{element:"h2",fontStyles:"h4",children:i})});r.Detail=({children:i})=>t.jsx(p,{children:i});export{r as C};
