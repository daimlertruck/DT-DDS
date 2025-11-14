import{g as p}from"./index-D9dZuxfj.js";import{f as b}from"./emotion-styled.browser.esm-DBghOYGd.js";const r={Letter:"letter",Collapsed:"collapsed",Thumbnail:"thumbnail",Photo:"photo"},n={Small:"small",Medium:"medium",Large:"large"},$={[n.Small]:"s",[n.Medium]:"m",[n.Large]:"l"},y=b.div`
  ${({theme:t,type:d,size:s,bgColor:l,hoverBgColor:e})=>{let a=`
      & > * {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        text-transform: uppercase;
        border-radius: ${t.radius.radius_500};
      }
    `;const o=(i,c)=>c?p(c,t):i;switch(s){case n.Small:a+=`
          width: 20px;
          height: 20px;
          ${t.fontStyles.bodyXsBold};
        `;break;case n.Medium:a+=`
          width: ${t.spacing.spacing_60};
          height: ${t.spacing.spacing_60};
          ${t.fontStyles.bodyXsBold};
        `;break;case n.Large:a+=`
          width: ${t.spacing.spacing_70};
          height: ${t.spacing.spacing_70};
          ${t.fontStyles.bodySmBold};
        `;break}switch(d){case r.Letter:a+=`
          color: ${t.palette.content.contrast};
          
          & > * {
            background-color: ${o(t.palette.primary.default,l)};
          } 

          button:disabled > &[data-component="button"] > * {
            background-color: ${t.palette.primary.light};
          }

          button:not(:disabled):hover > &[data-component="button"] > * {
            background-color: ${o(t.palette.primary.dark,e)};
          }
        `;break;case r.Collapsed:a+=`
          color: ${t.palette.content.medium};
          
          & > * {
            background-color: ${o(t.palette.content.contrast,l)};
          }

          button:disabled > &[data-component="button"] > * {
            background-color: ${t.palette.content.contrast};
          }

          button:not(:disabled):hover > &[data-component="button"] > * {
            background-color: ${o(t.palette.primary.light,e)};
          }
        `;break;case r.Thumbnail:a+=`
          color: ${t.palette.content.contrast};
          
          & > * {
            background-color: ${o(t.palette.primary.default,l)};
          }

          button:disabled > &[data-component="button"] > * {
            background-color: ${t.palette.primary.light};
          }

          button:not(:disabled):hover > &[data-component="button"] > * {
            background-color: ${o(t.palette.primary.dark,e)};
          }
        `;break;case r.Photo:a+=`
          button:disabled > &[data-component="button"] > * {
            opacity: 0.38;
          }
        `;break}return a}}
`;export{n as A,$ as I,r as a,y as b};
