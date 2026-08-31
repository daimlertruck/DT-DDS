var l=Object.defineProperty;var e=(i,r)=>l(i,"name",{value:r,configurable:!0});import{t as a}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as d}from"./jsx-runtime-Br4tQxt1.js";import{t as p}from"./Typography-BVFm109i.js";import"./typography-D38L8NZ6.js";var s=a.div`
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
`,n=a.div`
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`,x=a.div`
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
`,t=d(),o=e(({children:i,dataTestId:r})=>(0,t.jsx)(s,{"data-testid":r??"card",children:i}),"Card");o.Title=({children:i})=>(0,t.jsx)(n,{children:(0,t.jsx)(p,{color:"grey_90",element:"h2",fontStyles:"h4",children:i})});o.Detail=({children:i})=>(0,t.jsx)(x,{children:i});export{o as t};
