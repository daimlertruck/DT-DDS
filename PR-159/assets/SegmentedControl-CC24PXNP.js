var x=Object.defineProperty;var o=(e,t)=>x(e,"name",{value:t,configurable:!0});import{j as n}from"./jsx-runtime-Cgz2XvFB.js";import{I as S}from"./Icon-BWIy_dZb.js";import{T as g}from"./Tooltip-D4LphEms.js";import{r as d}from"./index-CwbBKW39.js";import{f}from"./emotion-styled.browser.esm-CIRWz9XU.js";const $={selectedValue:void 0,showLabel:!0,onChange:o(()=>null,"onChange"),setSelectedValue:o(()=>null,"setSelectedValue")},b=d.createContext($),m=o(()=>{const e=d.useContext(b);if(!e)throw new Error("useSegmentedControlContext must be used within a SegmentedControlProvider");return e},"useSegmentedControlContext"),C=o(({children:e,selectedValue:t,showLabel:r,onChange:s})=>{const[a,l]=d.useState(t);d.useEffect(()=>{l(t)},[t]);const c=o(i=>{s(i),l(i)},"handleChangeValue");return n.jsx(b.Provider,{value:{selectedValue:a,setSelectedValue:c,showLabel:r,onChange:s},children:e})},"SegmentedControlProvider"),v=f.button`
  ${({theme:e,showLabel:t})=>`
    ${e.fontStyles.bodySmBold};

    display: flex;
    align-items: center;
    gap: ${e.spacing.spacing_20};
    cursor: pointer;
    background-color: ${e.palette.surface.contrast};
    color: ${e.palette.informative.default};
    border: none;
    border-radius: ${e.shape.button};
    padding: ${e.spacing.spacing_20} ${e.spacing[t?"spacing_40":"spacing_20"]};

  i {
    color: ${e.palette.informative.default};
  }

    &:not(:disabled):hover {
      background-color: ${e.palette.informative.light};
    }

    &:not(:disabled)[aria-pressed="true"] {
      background-color: ${e.palette.informative.default};
      color: ${e.palette.content.contrast};

      i {
        color: ${e.palette.content.contrast};
      }
    }

    &:disabled {
        color: ${e.palette.content.light};
        cursor: not-allowed;

        i {
          color: ${e.palette.content.light};
        }
    }

  `}
`,j=o(({label:e,iconCode:t,value:r,disabled:s})=>{const{setSelectedValue:a,showLabel:l,selectedValue:c}=m(),i=c===r,p=l||!t,u=n.jsxs(v,{"aria-label":e,"aria-pressed":i?"true":"false",disabled:s,onClick:o(()=>a(r),"onClick"),showLabel:p,type:"button",children:[t?n.jsx(S,{code:t,size:"small"}):null,p?e:null]});return p?u:n.jsxs(g,{children:[u,n.jsx(g.Content,{children:e})]})},"SegmentedControlOption"),y=f.div`
  ${({theme:e})=>`
    display: inline-flex;
    align-items: center;
    padding: ${e.spacing.spacing_20};
    border: 1px solid ${e.palette.border.medium};
    border-radius: ${e.shape.segmentedControl};
  `}
`,V=o(({dataTestId:e,children:t,showLabel:r=!1,selectedValue:s,onChangeControl:a=o(()=>null,"onChangeControl"),...l})=>n.jsx(C,{onChange:a,selectedValue:s,showLabel:r,children:n.jsx(y,{"data-testid":e,role:"group",...l,children:t})}),"SegmentedControl");V.Option=j;export{V as S};
