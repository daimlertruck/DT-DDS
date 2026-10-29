var E=Object.defineProperty;var s=(e,a)=>E(e,"name",{value:a,configurable:!0});import{n as D}from"./rolldown-runtime-CzYk_CEw.js";import{t as P}from"./react-HNhQAnN4.js";import{c as z,f as A,n as p,t as L}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{n as x}from"./src-BeXhsZIY.js";import{t as C}from"./jsx-runtime-Br4tQxt1.js";import{t as w}from"./icon-DutGOQyb.js";import{t as h}from"./Tooltip-BiU__WjC.js";import{l as W,r as F,t as H}from"./core-CmZBTw5G.js";import{t as U}from"./tooltip-DcDgDBG5.js";var I,N,v,$;function R(){return(R=D((()=>{L(),I=p.nav`
  ${({theme:e})=>`
    ${e.fontStyles.bodyMdRegular}
    color: ${e.palette.secondary.default};
    overflow: hidden;
  `}
`,N=p.ul`
  padding: 0px;
  margin: 0px;
  width: 100%;
  list-style: none;
  display: flex;
  align-items: center;
  white-space: nowrap;
  gap: ${({theme:e})=>e.spacing.spacing_30};
`,v=p.li`
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
`,$=p.div`
  ${({theme:e})=>`
    display: flex;
    align-items: center;
    gap: ${e.spacing.spacing_20};
  `}
`})))()}s(R,"init_Breadcrumb_styled");var i,g,k,m;function j(){return(j=D((()=>{i=P(),z(),H(),w(),V(),g=C(),k=s((e,a)=>!!e.current&&!!a.current,"isBreadcrumbRefValid"),m=s(e=>{const a=(0,i.useRef)(null),r=(0,i.useRef)(null),t=A(),c=W(`(min-width: ${t.breakpoints.mq3}px)`),[u,y]=(0,i.useState)(e),q=(0,i.useCallback)(()=>{if(c||!k(a,r)){y(e);return}const f=i.Children.toArray(e);if(r.current.scrollWidth>a.current.clientWidth){const d=f[f.length-1],M=[f[0],(0,g.jsx)(o.Item,{children:(0,g.jsx)(x,{code:"more_horiz"})},"more-icon"),(0,i.isValidElement)(d)?(0,i.cloneElement)(d,{...d.props,style:{overflow:"hidden"}}):d];y(M)}},[e,c,a,r]);return F(q),{visibleChildren:u,breadcrumbRef:a,breadcrumbListRef:r}},"useCollapsedBreadcrumb");try{m.displayName="useCollapsedBreadcrumb",m.__docgenInfo={description:"",displayName:"useCollapsedBreadcrumb",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/breadcrumb/src/hooks/useCollapsedBreadcrumb.tsx",methods:[],props:{},tags:{}}}catch{}})))()}s(j,"init_useCollapsedBreadcrumb");var l,n,b,o,B,S,_,T;function V(){return(V=D((()=>{l=P(),w(),U(),R(),j(),n=C(),b=30,o=s(({children:e,separator:a="slash"})=>{const{visibleChildren:r,breadcrumbRef:t,breadcrumbListRef:c}=m(e);return(0,n.jsx)(I,{"aria-label":"Breadcrumb","data-testid":"breadcrumb",ref:t,children:(0,n.jsx)(N,{ref:c,children:T(r,a)})})},"Breadcrumb"),B=s(({children:e,style:a})=>{const{truncatedChildren:r,tooltip:t}=_(e);return(0,n.jsx)(v,{style:a,children:(0,n.jsxs)(h,{style:{overflow:"hidden"},children:[(0,n.jsx)($,{children:r}),(0,n.jsx)(h.Content,{children:t})]})})},"BreadcrumbItem"),S=s(e=>e.length>=b?`${e.substring(0,b)}...`:e,"truncateText"),_=s(e=>{let a="";return{truncatedChildren:l.Children.map(e,r=>{if(typeof r=="string"){const t=S(r);return a=t!==r?r:"",t}else if((0,l.isValidElement)(r)){const{truncatedChildren:t,tooltip:c}=_(r.props.children);return a=c,(0,l.cloneElement)(r,{...r.props,children:t})}else return null}),tooltip:a}},"mapTruncateChildren"),T=s((e,a)=>{const r=s(()=>({slash:(0,n.jsx)("span",{children:"/"}),arrow:(0,n.jsx)(x,{code:"arrow_forward_ios",size:"extra-small"})})[a],"addSeparator"),t=s(c=>l.Children.count(e)-1===c,"isLastBreadcrumb");return l.Children.map(e,(c,u)=>(0,n.jsxs)(n.Fragment,{children:[c,!t(u)&&r()]}))},"withSeparator"),o.Item=B;try{o.displayName="Breadcrumb",o.__docgenInfo={description:"",displayName:"Breadcrumb",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/breadcrumb/src/Breadcrumb.tsx",methods:[],props:{separator:{defaultValue:{value:"slash"},declarations:[{fileName:"DT-DDS/packages/react-packages/breadcrumb/src/Breadcrumb.tsx",name:"BreadcrumbProps"}],description:"",name:"separator",parent:{fileName:"DT-DDS/packages/react-packages/breadcrumb/src/Breadcrumb.tsx",name:"BreadcrumbProps"},required:!1,tags:{},type:{name:"BreadcrumbSeparator | undefined"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}try{o.Item.displayName="Breadcrumb.Item",o.Item.__docgenInfo={description:"",displayName:"Breadcrumb.Item",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/breadcrumb/src/Breadcrumb.tsx",methods:[],props:{id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}})))()}s(V,"init_Breadcrumb");export{V as n,o as t};
