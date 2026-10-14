var v=Object.defineProperty;var r=(t,a)=>v(t,"name",{value:a,configurable:!0});import{n as o}from"./rolldown-runtime-CzYk_CEw.js";import{n as P,t as w}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{t as V}from"./jsx-runtime-Br4tQxt1.js";import{n as q,t as z}from"./Spinner-_7Ge4BuV.js";function f(){return(f=o((()=>{q()})))()}r(f,"init_src");function b(){return(b=o((()=>{f()})))()}r(b,"init_spinner");var g,y;function k(){return(k=o((()=>{g=r(t=>({primary:`
    color: ${t.palette.primary.default};
    border-color: ${t.palette.primary.default};
    background-color: transparent;

    &:hover {
      color: ${t.palette.primary.default};
      border-color: ${t.palette.primary.default};
      background-color: ${t.palette.primary.light};
    }

    &:active {
      color: ${t.palette.primary.default};
      border-color: ${t.palette.primary.default};
    }

    &:disabled {
      cursor: not-allowed;
      color: ${t.palette.primary.light};
      border-color: ${t.palette.primary.light};
      background-color: transparent;
    }
  `,error:`
    color: ${t.palette.error.default};
    background-color: transparent;
    border-color: ${t.palette.error.default};

    &:hover {
      color: ${t.palette.error.default};
      border-color: ${t.palette.error.default};
      background-color: ${t.palette.error.light};
    }

    &:disabled {
      cursor: not-allowed;
      color: ${t.palette.error.light};
      border-color: ${t.palette.error.light};
    }
  `,secondary:`
    color: ${t.palette.secondary.default};
    border-color: ${t.palette.secondary.default};
    background-color: transparent;
    
    &:hover {
      color: ${t.palette.secondary.default};
      border-color: ${t.palette.secondary.default};
      background-color: ${t.palette.secondary.light};
    }
    &:active {
      color: ${t.palette.secondary.default};
      border-color: ${t.palette.secondary.default};
      background-color: ${t.palette.secondary.light};
    }
    &:disabled {
      cursor: not-allowed;
      color: ${t.palette.secondary.light};
      border-color: ${t.palette.secondary.light};
      background-color: transparent;
    }
  `,accent:`
    color: ${t.palette.accent.default};
    border-color: ${t.palette.accent.default};
    background-color: transparent;
    
    &:hover {
      color: ${t.palette.accent.default};
      border-color: ${t.palette.accent.default};
      background-color: ${t.palette.accent.light};
    }
    &:active {
      color: ${t.palette.accent.default};
      border-color: ${t.palette.accent.default};
      background-color: ${t.palette.accent.light};
    }
    &:disabled {
      cursor: not-allowed;
      color: ${t.palette.accent.light};
      border-color: ${t.palette.accent.light};
      background-color: transparent;
    }`}),"getOutlinedButtonStyles"),y=r((t,a,e)=>{if(e==="contrast")return{solid:`
        color: ${a.palette.content.dark};
        background-color: ${a.palette.surface.contrast};
        border: 0;

        &:hover {
          background-color: ${a.palette.secondary.light};
        }

        &:disabled {
          cursor: not-allowed;
          color: ${a.palette.secondary.medium};
          background-color: ${a.palette.surface.contrast};
        }
      `,outlined:`
        color: ${a.palette.content.contrast};
        border-color: ${a.palette.surface.contrast};
        background-color: transparent;

        &:hover {
          color: ${a.palette.content.dark};
          border-color: ${a.palette.surface.contrast};
          background-color: ${a.palette.surface.contrast};
        }

        &:disabled {
          cursor: not-allowed;
          color: ${a.palette.secondary.default};
          border-color: ${a.palette.secondary.default};
          background-color: transparent;
        }
      `,text:`
        color: ${a.palette.content.contrast};
        background-color: transparent;

        &:hover {
          color: ${a.palette.content.dark};
          background-color: ${a.palette.secondary.light};
        }

        &:disabled {
          cursor: not-allowed;
          color: ${a.palette.secondary.medium};
          background-color: transparent;
        }
      `}[t];{const l="dark",n="light";return{solid:`
        border: 0;
        color: ${a.palette.content.contrast};
        background-color: ${a.palette[e].default};
        
        &:hover {
          color: ${a.palette.content.contrast};
          background-color: ${a.palette[e][l]};
        }

        &:disabled {
          cursor: not-allowed;
          color: ${a.palette.content.contrast};
          background-color: ${a.palette[e][n]};
        }
    `,outlined:g(a)[e],text:`
        color: ${a.palette[e].default};
        background-color: transparent;
        border: 0;
        
        &:hover {
          color: ${a.palette[e].default};
          background-color: ${a.palette[e].light};
        }
        
        &:disabled {
          cursor: not-allowed;
          color: ${a.palette[e][n]};
          background-color: transparent;
        }
    `}[t]}},"buttonVariantStyles")})))()}r(k,"init_buttonVariantStyles");var $;function D(){return(D=o((()=>{$=r((t,a,e)=>({large:`
      ${a.fontStyles.buttonLg}
      padding: ${e?`calc(${a.spacing.spacing_50} - 2px)`:a.spacing.spacing_50}  ${a.spacing.s};
    `,medium:`
      ${a.fontStyles.buttonMd}
      padding: ${e?`calc(${a.spacing.spacing_40} - 2px)`:a.spacing.spacing_40} ${a.spacing.xs};
    `,small:`
      ${a.fontStyles.buttonSm}
      padding: ${e?`calc(${a.spacing.spacing_30} - 2px)`:a.spacing.spacing_30} ${a.spacing.spacing_50};
    `})[t],"buttonSizeStyles")})))()}r(D,"init_buttonSizeStyles");var s;function i(){return(i=o((()=>{w(),k(),D(),s=P.button`
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: auto;
  min-width: 80px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
  align-items: center;
  border: 2px solid transparent;

  ${({theme:t,variant:a,color:e,size:l})=>`
    gap: ${t.spacing.spacing_30};
    border-radius: ${t.shape.button}; 
    ${$(l,t,a==="outlined")};
    ${y(a,t,e)}

    &:focus-visible {
      ${e==="contrast"?`
          outline: 1px solid ${t.palette.content.dark};
          outline-offset: -3px;
        `:`
          outline: 3px solid ${t.palette.border.dark};
          outline-offset: 1px;
        `}
    }

    @media only screen and (max-width: ${t.breakpoints.mq3}px) {
      width: 100%;
    }
  `};
`;try{s.displayName="ButtonStyled",s.__docgenInfo={description:"",displayName:"ButtonStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/button/src/Button.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},isLoading:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/button/src/Button.styled.ts",name:"ButtonStyledProps"}],description:"",name:"isLoading",parent:{fileName:"DT-DDS/packages/react-packages/button/src/Button.styled.ts",name:"ButtonStyledProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},variant:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/button/src/Button.styled.ts",name:"ButtonStyledProps"}],description:"",name:"variant",parent:{fileName:"DT-DDS/packages/react-packages/button/src/Button.styled.ts",name:"ButtonStyledProps"},required:!0,tags:{},type:{name:"ButtonVariant"}},color:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/button/src/Button.styled.ts",name:"ButtonStyledProps"},{fileName:"DT-DDS/node_modules/@types/react/index.d.ts",name:"HTMLAttributes"}],description:"",name:"color",parent:{fileName:"DT-DDS/packages/react-packages/button/src/Button.styled.ts",name:"ButtonStyledProps"},required:!1,tags:{},type:{name:'"contrast" | "error" | "primary" | "secondary" | "accent"'}},size:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/button/src/Button.styled.ts",name:"ButtonStyledProps"}],description:"",name:"size",parent:{fileName:"DT-DDS/packages/react-packages/button/src/Button.styled.ts",name:"ButtonStyledProps"},required:!0,tags:{},type:{name:"ButtonSize"}}},tags:{}}}catch{}})))()}r(i,"init_Button_styled");var c,d;function m(){return(m=o((()=>{b(),i(),c=V(),d=r(({style:t,children:a,onClick:e,dataTestId:l,isLoading:n,isDisabled:u=!1,size:S="medium",variant:p="solid",color:B="primary",type:_="button",...x})=>{const T=r(N=>{u||n||e?.(N)},"handleButtonClick");return(0,c.jsxs)(s,{...x,color:B,"data-testid":`${l}-button`,disabled:u||n,onClick:T,size:S,style:t,type:_,variant:p,children:[a,n?(0,c.jsx)(z,{colorScheme:p!=="solid"?"positive":"negative",size:"extra-small"}):null]})},"Button");try{d.displayName="Button",d.__docgenInfo={description:"",displayName:"Button",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/button/src/Button.tsx",methods:[],props:{isDisabled:{defaultValue:{value:"false"},declarations:[{fileName:"DT-DDS/packages/react-packages/button/src/Button.tsx",name:"ButtonProps"}],description:"",name:"isDisabled",parent:{fileName:"DT-DDS/packages/react-packages/button/src/Button.tsx",name:"ButtonProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},isLoading:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/button/src/Button.tsx",name:"ButtonProps"}],description:"",name:"isLoading",parent:{fileName:"DT-DDS/packages/react-packages/button/src/Button.tsx",name:"ButtonProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},size:{defaultValue:{value:"medium"},declarations:[{fileName:"DT-DDS/packages/react-packages/button/src/Button.tsx",name:"ButtonProps"}],description:"",name:"size",parent:{fileName:"DT-DDS/packages/react-packages/button/src/Button.tsx",name:"ButtonProps"},required:!1,tags:{},type:{name:"ButtonSize | undefined"}},variant:{defaultValue:{value:"solid"},declarations:[{fileName:"DT-DDS/packages/react-packages/button/src/Button.tsx",name:"ButtonProps"}],description:"",name:"variant",parent:{fileName:"DT-DDS/packages/react-packages/button/src/Button.tsx",name:"ButtonProps"},required:!1,tags:{},type:{name:"ButtonVariant | undefined"}},color:{defaultValue:{value:"primary"},declarations:[{fileName:"DT-DDS/packages/react-packages/button/src/Button.tsx",name:"ButtonProps"}],description:"",name:"color",parent:{fileName:"DT-DDS/packages/react-packages/button/src/Button.tsx",name:"ButtonProps"},required:!1,tags:{},type:{name:"ButtonAppearance | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}}},tags:{}}}catch{}})))()}r(m,"init_Button");function L(){return(L=o((()=>{m(),i()})))()}r(L,"init_src$1");export{b as i,d as n,m as r,L as t};
