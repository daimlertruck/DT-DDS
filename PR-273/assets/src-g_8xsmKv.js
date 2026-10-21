var P=Object.defineProperty;var o=(a,t)=>P(a,"name",{value:t,configurable:!0});import{n as e}from"./rolldown-runtime-CzYk_CEw.js";import{n as N,t as V}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{t as q}from"./jsx-runtime-Br4tQxt1.js";import{n as m,t as z}from"./Spinner-Dj5eK_5r.js";function g(){return(g=e((()=>{m()})))()}o(g,"init_src");function b(){return(b=e((()=>{g()})))()}o(b,"init_spinner");var u,f;function $(){return($=e((()=>{u=o(a=>({primary:`
    color: ${a.palette.primary.default};
    border-color: ${a.palette.primary.default};
    background-color: transparent;

    &:hover {
      color: ${a.palette.primary.default};
      border-color: ${a.palette.primary.default};
      background-color: ${a.palette.primary.light};
    }

    &:active {
      color: ${a.palette.primary.default};
      border-color: ${a.palette.primary.default};
    }

    &:disabled {
      cursor: not-allowed;
      color: ${a.palette.primary.light};
      border-color: ${a.palette.primary.light};
      background-color: transparent;
    }
  `,error:`
    color: ${a.palette.error.default};
    background-color: transparent;
    border-color: ${a.palette.error.default};

    &:hover {
      color: ${a.palette.error.default};
      border-color: ${a.palette.error.default};
      background-color: ${a.palette.error.light};
    }

    &:disabled {
      cursor: not-allowed;
      color: ${a.palette.error.light};
      border-color: ${a.palette.error.light};
    }
  `,secondary:`
    color: ${a.palette.secondary.default};
    border-color: ${a.palette.secondary.default};
    background-color: transparent;
    
    &:hover {
      color: ${a.palette.secondary.default};
      border-color: ${a.palette.secondary.default};
      background-color: ${a.palette.secondary.light};
    }
    &:active {
      color: ${a.palette.secondary.default};
      border-color: ${a.palette.secondary.default};
      background-color: ${a.palette.secondary.light};
    }
    &:disabled {
      cursor: not-allowed;
      color: ${a.palette.secondary.light};
      border-color: ${a.palette.secondary.light};
      background-color: transparent;
    }
  `,accent:`
    color: ${a.palette.accent.default};
    border-color: ${a.palette.accent.default};
    background-color: transparent;
    
    &:hover {
      color: ${a.palette.accent.default};
      border-color: ${a.palette.accent.default};
      background-color: ${a.palette.accent.light};
    }
    &:active {
      color: ${a.palette.accent.default};
      border-color: ${a.palette.accent.default};
      background-color: ${a.palette.accent.light};
    }
    &:disabled {
      cursor: not-allowed;
      color: ${a.palette.accent.light};
      border-color: ${a.palette.accent.light};
      background-color: transparent;
    }`}),"getOutlinedButtonStyles"),f=o((a,t,r)=>{if(r==="contrast")return{solid:`
        color: ${t.palette.content.dark};
        background-color: ${t.palette.surface.contrast};
        border: 0;

        &:hover {
          background-color: ${t.palette.secondary.light};
        }

        &:disabled {
          cursor: not-allowed;
          color: ${t.palette.secondary.medium};
          background-color: ${t.palette.surface.contrast};
        }
      `,outlined:`
        color: ${t.palette.content.contrast};
        border-color: ${t.palette.surface.contrast};
        background-color: transparent;

        &:hover {
          color: ${t.palette.content.dark};
          border-color: ${t.palette.surface.contrast};
          background-color: ${t.palette.surface.contrast};
        }

        &:disabled {
          cursor: not-allowed;
          color: ${t.palette.secondary.default};
          border-color: ${t.palette.secondary.default};
          background-color: transparent;
        }
      `,text:`
        color: ${t.palette.content.contrast};
        background-color: transparent;

        &:hover {
          color: ${t.palette.content.dark};
          background-color: ${t.palette.secondary.light};
        }

        &:disabled {
          cursor: not-allowed;
          color: ${t.palette.secondary.medium};
          background-color: transparent;
        }
      `}[a];{const l="dark",n="light";return{solid:`
        border: 0;
        color: ${t.palette.content.contrast};
        background-color: ${t.palette[r].default};
        
        &:hover {
          color: ${t.palette.content.contrast};
          background-color: ${t.palette[r][l]};
        }

        &:disabled {
          cursor: not-allowed;
          color: ${t.palette.content.contrast};
          background-color: ${t.palette[r][n]};
        }
    `,outlined:u(t)[r],text:`
        color: ${t.palette[r].default};
        background-color: transparent;
        border: 0;
        
        &:hover {
          color: ${t.palette[r].default};
          background-color: ${t.palette[r].light};
        }
        
        &:disabled {
          cursor: not-allowed;
          color: ${t.palette[r][n]};
          background-color: transparent;
        }
    `}[a]}},"buttonVariantStyles")})))()}o($,"init_buttonVariantStyles");var k;function y(){return(y=e((()=>{k=o((a,t,r)=>({large:`
      ${t.fontStyles.buttonLg}
      padding: ${r?`calc(${t.spacing.spacing_50} - 2px)`:t.spacing.spacing_50}  ${t.spacing.s};
    `,medium:`
      ${t.fontStyles.buttonMd}
      padding: ${r?`calc(${t.spacing.spacing_40} - 2px)`:t.spacing.spacing_40} ${t.spacing.xs};
    `,small:`
      ${t.fontStyles.buttonSm}
      padding: ${r?`calc(${t.spacing.spacing_30} - 2px)`:t.spacing.spacing_30} ${t.spacing.spacing_50};
    `})[a],"buttonSizeStyles")})))()}o(y,"init_buttonSizeStyles");var D;function d(){return(d=e((()=>{V(),$(),y(),D=N.button`
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: auto;
  min-width: 80px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
  align-items: center;
  border: 2px solid transparent;

  ${({theme:a,variant:t,color:r,size:l})=>`
    gap: ${a.spacing.spacing_30};
    border-radius: ${a.shape.button}; 
    ${k(l,a,t==="outlined")};
    ${f(t,a,r)}

    &:focus-visible {
      ${r==="contrast"?`
          outline: 1px solid ${a.palette.content.dark};
          outline-offset: -3px;
        `:`
          outline: 3px solid ${a.palette.border.dark};
          outline-offset: 1px;
        `}
    }

    @media only screen and (max-width: ${a.breakpoints.mq3}px) {
      width: 100%;
    }
  `};
`})))()}o(d,"init_Button_styled");var c,s;function _(){return(_=e((()=>{b(),d(),c=q(),s=o(({style:a,children:t,onClick:r,dataTestId:l,isLoading:n,isDisabled:i=!1,size:B="medium",variant:p="solid",color:x="primary",type:S="button",...v})=>{const T=o(w=>{i||n||r?.(w)},"handleButtonClick");return(0,c.jsxs)(D,{...v,color:x,"data-testid":`${l}-button`,disabled:i||n,onClick:T,size:B,style:a,type:S,variant:p,children:[t,n?(0,c.jsx)(z,{colorScheme:p!=="solid"?"positive":"negative",size:"extra-small"}):null]})},"Button");try{s.displayName="Button",s.__docgenInfo={description:"",displayName:"Button",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/button/src/Button.tsx",methods:[],props:{isDisabled:{defaultValue:{value:"false"},declarations:[{fileName:"DT-DDS/packages/react-packages/button/src/Button.tsx",name:"ButtonProps"}],description:"",name:"isDisabled",parent:{fileName:"DT-DDS/packages/react-packages/button/src/Button.tsx",name:"ButtonProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},isLoading:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/button/src/Button.tsx",name:"ButtonProps"}],description:"",name:"isLoading",parent:{fileName:"DT-DDS/packages/react-packages/button/src/Button.tsx",name:"ButtonProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},size:{defaultValue:{value:"medium"},declarations:[{fileName:"DT-DDS/packages/react-packages/button/src/Button.tsx",name:"ButtonProps"}],description:"",name:"size",parent:{fileName:"DT-DDS/packages/react-packages/button/src/Button.tsx",name:"ButtonProps"},required:!1,tags:{},type:{name:"ButtonSize | undefined"}},variant:{defaultValue:{value:"solid"},declarations:[{fileName:"DT-DDS/packages/react-packages/button/src/Button.tsx",name:"ButtonProps"}],description:"",name:"variant",parent:{fileName:"DT-DDS/packages/react-packages/button/src/Button.tsx",name:"ButtonProps"},required:!1,tags:{},type:{name:"ButtonVariant | undefined"}},color:{defaultValue:{value:"primary"},declarations:[{fileName:"DT-DDS/packages/react-packages/button/src/Button.tsx",name:"ButtonProps"}],description:"",name:"color",parent:{fileName:"DT-DDS/packages/react-packages/button/src/Button.tsx",name:"ButtonProps"},required:!1,tags:{},type:{name:"ButtonAppearance | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}}},tags:{}}}catch{}})))()}o(_,"init_Button");function j(){return(j=e((()=>{_(),d()})))()}o(j,"init_src$1");export{b as i,s as n,_ as r,j as t};
