var E=Object.defineProperty;var t=(e,r)=>E(e,"name",{value:r,configurable:!0});import{n as k}from"./rolldown-runtime-CzYk_CEw.js";import{t as C}from"./react-HNhQAnN4.js";import{c as M,f as z,n as p,t as A}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{n as w}from"./src-DHrISQ1l.js";import{t as V}from"./jsx-runtime-Br4tQxt1.js";import{t as q}from"./icon-Cd5k6Y-r.js";import{t as B}from"./Tooltip-0M9Tfmio.js";import{l as W,r as F,t as H}from"./core-CzGUpEvE.js";import{t as U}from"./tooltip-D-6XAdV8.js";var m,u,f,y;function v(){return(v=k((()=>{A(),m=p.nav`
  ${({theme:e})=>`
    ${e.fontStyles.bodyMdRegular}
    color: ${e.palette.secondary.default};
    overflow: hidden;
  `}
`,u=p.ul`
  padding: 0px;
  margin: 0px;
  width: 100%;
  list-style: none;
  display: flex;
  align-items: center;
  white-space: nowrap;
  gap: ${({theme:e})=>e.spacing.spacing_30};
`,f=p.li`
  ${({theme:e})=>`
    display: flex;

    &:not(:last-child) {
      ${e.fontStyles.linkMdRegular}
      color: ${e.palette.accent.default};
      cursor: pointer;

      svg {
        color: ${e.palette.accent.default};
      }
      
      & * {
        text-decoration: underline;
      }
      
      &:hover {
        color: ${e.palette.accent.dark};

        svg {
          color: ${e.palette.accent.dark};
        }
      }
    }

    a {
      color: inherit;
    }

    svg {
      color: ${e.palette.secondary.default};
    }

    &:last-child * {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  `}
`,y=p.div`
  ${({theme:e})=>`
    display: flex;
    align-items: center;
    gap: ${e.spacing.spacing_20};
  `}
`;try{m.displayName="BreadcrumbStyled",m.__docgenInfo={description:"",displayName:"BreadcrumbStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/breadcrumb/src/Breadcrumb.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}}},tags:{}}}catch{}try{u.displayName="ListStyled",u.__docgenInfo={description:"",displayName:"ListStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/breadcrumb/src/Breadcrumb.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}}},tags:{}}}catch{}try{f.displayName="ItemStyled",f.__docgenInfo={description:"",displayName:"ItemStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/breadcrumb/src/Breadcrumb.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}}},tags:{}}}catch{}try{y.displayName="ItemContainerStyled",y.__docgenInfo={description:"",displayName:"ItemContainerStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/breadcrumb/src/Breadcrumb.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}}},tags:{}}}catch{}})))()}t(v,"init_Breadcrumb_styled");var d,b,x,D;function $(){return($=k((()=>{d=C(),M(),H(),q(),R(),b=V(),x=t((e,r)=>!!e.current&&!!r.current,"isBreadcrumbRefValid"),D=t(e=>{const r=(0,d.useRef)(null),a=(0,d.useRef)(null),s=z(),i=W(`(min-width: ${s.breakpoints.mq3}px)`),[_,S]=(0,d.useState)(e),L=(0,d.useCallback)(()=>{if(i||!x(r,a)){S(e);return}const g=d.Children.toArray(e);if(a.current.scrollWidth>r.current.clientWidth){const l=g[g.length-1],j=[g[0],(0,b.jsx)(o.Item,{children:(0,b.jsx)(w,{code:"more_horiz"})},"more-icon"),(0,d.isValidElement)(l)?(0,d.cloneElement)(l,{...l.props,style:{overflow:"hidden"}}):l];S(j)}},[e,i,r,a]);return F(L),{visibleChildren:_,breadcrumbRef:r,breadcrumbListRef:a}},"useCollapsedBreadcrumb");try{D.displayName="useCollapsedBreadcrumb",D.__docgenInfo={description:"",displayName:"useCollapsedBreadcrumb",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/breadcrumb/src/hooks/useCollapsedBreadcrumb.tsx",methods:[],props:{},tags:{}}}catch{}})))()}t($,"init_useCollapsedBreadcrumb");var c,n,h,o,N,P,T,I;function R(){return(R=k((()=>{c=C(),q(),U(),v(),$(),n=V(),h=30,o=t(({children:e,separator:r="slash"})=>{const{visibleChildren:a,breadcrumbRef:s,breadcrumbListRef:i}=D(e);return(0,n.jsx)(m,{"aria-label":"Breadcrumb","data-testid":"breadcrumb",ref:s,children:(0,n.jsx)(u,{ref:i,children:I(a,r)})})},"Breadcrumb"),N=t(({children:e,style:r})=>{const{truncatedChildren:a,tooltip:s}=T(e);return(0,n.jsx)(f,{style:r,children:(0,n.jsxs)(B,{style:{overflow:"hidden"},children:[(0,n.jsx)(y,{children:a}),(0,n.jsx)(B.Content,{children:s})]})})},"BreadcrumbItem"),P=t(e=>e.length>=h?`${e.substring(0,h)}...`:e,"truncateText"),T=t(e=>{let r="";return{truncatedChildren:c.Children.map(e,a=>{if(typeof a=="string"){const s=P(a);return r=s!==a?a:"",s}else if((0,c.isValidElement)(a)){const{truncatedChildren:s,tooltip:i}=T(a.props.children);return r=i,(0,c.cloneElement)(a,{...a.props,children:s})}else return null}),tooltip:r}},"mapTruncateChildren"),I=t((e,r)=>{const a=t(()=>({slash:(0,n.jsx)("span",{children:"/"}),arrow:(0,n.jsx)(w,{code:"arrow_forward_ios",size:"extra-small"})})[r],"addSeparator"),s=t(i=>c.Children.count(e)-1===i,"isLastBreadcrumb");return c.Children.map(e,(i,_)=>(0,n.jsxs)(n.Fragment,{children:[i,!s(_)&&a()]}))},"withSeparator"),o.Item=N;try{o.displayName="Breadcrumb",o.__docgenInfo={description:"",displayName:"Breadcrumb",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/breadcrumb/src/Breadcrumb.tsx",methods:[],props:{separator:{defaultValue:{value:"slash"},declarations:[{fileName:"DT-DDS/packages/react-packages/breadcrumb/src/Breadcrumb.tsx",name:"BreadcrumbProps"}],description:"",name:"separator",parent:{fileName:"DT-DDS/packages/react-packages/breadcrumb/src/Breadcrumb.tsx",name:"BreadcrumbProps"},required:!1,tags:{},type:{name:"BreadcrumbSeparator | undefined"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}try{o.Item.displayName="Breadcrumb.Item",o.Item.__docgenInfo={description:"",displayName:"Breadcrumb.Item",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/breadcrumb/src/Breadcrumb.tsx",methods:[],props:{id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}})))()}t(R,"init_Breadcrumb");export{R as n,o as t};
