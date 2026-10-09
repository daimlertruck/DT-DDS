var h=Object.defineProperty;var a=(e,r)=>h(e,"name",{value:r,configurable:!0});import{o as w}from"./rolldown-runtime-CzYk_CEw.js";import{t as k}from"./react-HNhQAnN4.js";import{o as j,t as _,u as S}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as C}from"./src-Cgsrikn0.js";import{t as I}from"./jsx-runtime-Br4tQxt1.js";import"./icon-BVKwuEsa.js";var g=w(k()),A={transparent:a(()=>"transparent","transparent"),light:a(e=>e.palette.surface.light,"light"),contrast:a(e=>e.palette.surface.contrast,"contrast")},H=_.div`
  ${({theme:e,background:r,isDisabled:t,hasBorderBottom:o})=>`
    position: relative;
    width: 100%;
    background-color: ${A[r](e)};
    border-bottom: ${o?`1px solid ${e.palette.border.default}`:"none"};

    ${t?`
          color: ${e.palette.content.light};

          * {
            cursor: not-allowed;
            user-select: none;
            color: inherit;
          }
        `:`
          &:hover {
            background-color: ${e.palette.surface.default};
            box-shadow: ${e.shadows.elevation_100};
          }
        `}
  `}
`;j();var B=_.header`
  ${({theme:e})=>`
    ${e.fontStyles.h6Bold};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${e.spacing.spacing_30};
    padding: ${e.spacing.spacing_50};
    cursor: pointer;
    user-select: none;
    color: ${e.palette.surface.dark};

    &:focus-visible {
      outline: 2px solid ${e.palette.primary.default};
    }
  `}
`,n=I(),q=a(({handleHeaderClick:e,handleHeaderKeyPress:r,isOpen:t,isDisabled:o,children:i,dataTestId:c,style:s})=>{const p=S();return(0,n.jsxs)(B,{"aria-disabled":o,"aria-expanded":t,"data-testid":c??"accordion-header",onClick:e,onKeyDown:r,role:"button",style:s,tabIndex:o?-1:0,children:[i,(0,n.jsx)(C,{code:t?"unfold_less":"unfold_more",color:p.palette.content.dark,size:"large"})]})},"AccordionHeader"),E=_.div`
  ${({theme:e,isOpen:r})=>`
    ${e.fontStyles.bodyLgRegular};
    display: grid;
    grid-template-rows: ${r?"1fr":"0fr"};
    transition: grid-template-rows 0.3s ease-in-out, padding 0.3s ease-in-out;
    color: ${e.palette.content.dark};
    
    padding: 0 ${e.spacing.spacing_50} ${r?e.spacing.spacing_50:0};
      
    & > div {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  `}
`,K=a(({isOpen:e,id:r,children:t,dataTestId:o,style:i})=>(0,n.jsx)(E,{"aria-expanded":e,"data-testid":o??"accordion-body",id:r,isOpen:e,style:i,children:(0,n.jsx)("div",{children:t})}),"AccordionBody"),J=a(({isOpen:e,defaultIsOpen:r=!1,onToggle:t,headerContent:o,background:i="light",hasBorderBottom:c=!1,isDisabled:s=!1,children:p,dataTestId:v,style:$,className:x})=>{const u=e!==void 0,[m,y]=(0,g.useState)(r),d=u?e:m,f=(0,g.useCallback)(()=>{if(s)return;const l=!d;u||y(l),t?.(l)},[s,d,u,t]),b=(0,g.useCallback)(l=>{l.key==="Enter"&&f()},[f]);return(0,n.jsxs)(H,{className:x,"data-testid":v??"accordion-container",background:i,hasBorderBottom:c,isDisabled:s,style:$,children:[(0,n.jsx)(q,{handleHeaderClick:f,handleHeaderKeyPress:b,isDisabled:s,isOpen:d,children:o}),(0,n.jsx)(K,{isOpen:d,children:p})]})},"Accordion");export{J as t};
