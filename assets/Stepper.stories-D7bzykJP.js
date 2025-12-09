var it=Object.defineProperty;var s=(n,i)=>it(n,"name",{value:i,configurable:!0});import{j as t}from"./jsx-runtime-Cgz2XvFB.js";import{I as u}from"./Icon-BrO18bYS.js";import{r as p}from"./index-CwbBKW39.js";import{S as e}from"./Stepper-BpGBpMYi.js";import"./Tooltip-BwOnbqJt.js";import"./emotion-styled.browser.esm-Cgg3GKEJ.js";import"./typography-B3nKKPHm.js";import"./index-CwyZZ5B2.js";import"./emotion-react.browser.esm-DSneuyqi.js";import"./index-6Tx4pmSd.js";import"./iframe-leixZjei.js";import"./z-index-C44GOntP.js";import"./index-DV-VXEUn.js";const nt=s(n=>{const{initialStep:i=0,totalSteps:r}=n||{},[a,l]=p.useState(i),[c,d]=p.useState(new Set),m=a===0,C=r!==void 0?a===r-1:!1,v=r!==void 0?a<r-1:!0,S=a>0,h=p.useCallback(()=>{v&&l(o=>o+1)},[v]),X=p.useCallback(()=>{S&&l(o=>o-1)},[S]),Y=p.useCallback(o=>{o>=0&&(r===void 0||o<r)&&l(o)},[r]),Z=p.useCallback(()=>{l(i),d(new Set)},[i]),$=p.useCallback(o=>{d(x=>new Set(x).add(o))},[]),tt=p.useCallback(o=>{d(x=>{const k=new Set(x);return k.delete(o),k})},[]),et=p.useCallback(o=>c.has(o),[c]);return{activeStep:a,isFirstStep:m,isLastStep:C,canGoNext:v,canGoBack:S,completedSteps:c,handleNext:h,handleBack:X,handleChangeStep:Y,handleReset:Z,markStepComplete:$,markStepIncomplete:tt,isStepComplete:et}},"useStepper"),z={Vertical:"vertical",Horizontal:"horizontal"},I={Number:"number",Bullet:"bullet",Icon:"icon"},yt={title:"Data Display/Stepper",component:e,argTypes:{currentStep:{control:{type:"number",min:0},description:"Current active step index (0-based)"},orientation:{options:Object.keys(z),mapping:z,control:{type:"radio"},description:"Stepper orientation"},variant:{options:Object.keys(I),mapping:I,control:{type:"radio"},description:"Stepper variant"},completedSteps:{control:{type:"object"},description:"Array of completed step indices"},steps:{control:{type:"object"},description:"Array of step configurations"}},parameters:{layout:"padded"}},y={args:{currentStep:1,completedSteps:[0],orientation:"vertical",variant:"number",steps:[{title:"Personal Information",description:"Enter your basic"},{title:"Address Details",description:"Provide your address"},{title:"Review & Submit",description:"Check all information"}]},render:s(({currentStep:n,completedSteps:i,orientation:r,variant:a,steps:l})=>t.jsx(e,{activeStep:n,orientation:r,variant:a,children:l.map((c,d)=>{let m="incomplete";return i.includes(d)&&(m="completed"),t.jsx(e.Step,{description:c.description,state:m,title:c.title},d)})}),"render")},g={args:{orientation:"vertical",variant:"number"},render:s(({orientation:n,variant:i})=>t.jsxs(e,{orientation:n,variant:i,children:[t.jsx(e.Step,{description:"This step is done",state:"completed",title:"Completed"}),t.jsx(e.Step,{description:"Currently on this step",isActive:!0,state:"incomplete",title:"Active"}),t.jsx(e.Step,{description:"Not yet started",state:"incomplete",title:"Incomplete"}),t.jsx(e.Step,{description:"Requires attention",state:"warning",title:"Warning"}),t.jsx(e.Step,{description:"Something went wrong",state:"error",title:"Error"}),t.jsx(e.Step,{description:"Cannot access yet",state:"disabled",title:"Disabled"}),t.jsx(e.Step,{description:"Bold title with light background",isActive:!0,state:"completed",title:"Completed Active"}),t.jsx(e.Step,{description:"Bold title with warning colors",isActive:!0,state:"warning",title:"Warning Active"}),t.jsx(e.Step,{description:"Bold title with error colors",isActive:!0,state:"error",title:"Error Active"})]}),"render")},b={args:{variant:"bullet",orientation:"horizontal"},render:s(({orientation:n,variant:i})=>t.jsxs(e,{orientation:n,variant:i,children:[t.jsx(e.Step,{state:"completed"}),t.jsx(e.Step,{isActive:!0,state:"incomplete"}),t.jsx(e.Step,{state:"incomplete"}),t.jsx(e.Step,{state:"disabled"}),t.jsx(e.Step,{state:"warning"}),t.jsx(e.Step,{state:"error"})]}),"render")},f={args:{variant:"icon",orientation:"vertical"},render:s(({orientation:n,variant:i})=>t.jsxs(e,{orientation:n,variant:i,children:[t.jsx(e.Step,{description:"Payment processed successfully",icon:t.jsx(u,{code:"credit_card",size:"small"}),state:"completed",title:"Payment"}),t.jsx(e.Step,{description:"Verify your email address",icon:t.jsx(u,{code:"mail",size:"small"}),isActive:!0,state:"incomplete",title:"Verification"}),t.jsx(e.Step,{description:"Complete your profile",icon:t.jsx(u,{code:"edit",size:"small"}),state:"incomplete",title:"Profile Setup"}),t.jsx(e.Step,{description:"Action required on your order",icon:t.jsx(u,{code:"shopping_cart",size:"small"}),state:"warning",title:"Order Review"}),t.jsx(e.Step,{description:"Shipping address validation failed",icon:t.jsx(u,{code:"local_shipping",size:"small"}),state:"error",title:"Shipping"}),t.jsx(e.Step,{description:"Delivery is not available yet",icon:t.jsx(u,{code:"home",size:"small"}),state:"disabled",title:"Delivery"})]}),"render")},j={args:{orientation:"horizontal",variant:"number"},render:s(({orientation:n,variant:i})=>t.jsxs(e,{orientation:n,variant:i,children:[t.jsx(e.Step,{description:"This is a very long description that will be truncated after two lines and show a tooltip when you hover over it",state:"completed",title:"Very Long Step Title That Exceeds Maximum Width"}),t.jsx(e.Step,{description:"Short description",isActive:!0,state:"incomplete",title:"Normal Title"}),t.jsx(e.Step,{description:"Another long description that demonstrates the tooltip functionality when text overflows",state:"incomplete",title:"Another Step With A Really Long Title"})]}),"render")},w={args:{orientation:"vertical",variant:"number"},render:s(({orientation:n,variant:i})=>t.jsxs(e,{orientation:n,variant:i,children:[t.jsx(e.Step,{state:"completed",title:"Step 1"}),t.jsx(e.Step,{isActive:!0,state:"incomplete",title:"Step 2"}),t.jsx(e.Step,{state:"incomplete",title:"Step 3"}),t.jsx(e.Step,{state:"incomplete",title:"Step 4"})]}),"render")},A={render:s(()=>{const{activeStep:n,isFirstStep:i,isLastStep:r,handleNext:a,handleBack:l,markStepComplete:c,isStepComplete:d}=nt({initialStep:0,totalSteps:4}),m=[{title:"Personal Info",description:"Enter your details"},{title:"Contact",description:"Provide contact info"},{title:"Address",description:"Enter your address"},{title:"Review",description:"Review and submit"}],C=s(S=>d(S)?"completed":"incomplete","getStepState"),v=s(()=>{c(n),a()},"handleNextWithComplete");return t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[t.jsx(e,{activeStep:n,orientation:"horizontal",variant:"number",children:m.map((S,h)=>t.jsx(e.Step,{description:S.description,state:C(h),title:S.title},h))}),t.jsxs("div",{style:{display:"flex",gap:"12px",justifyContent:"center"},children:[t.jsx("button",{disabled:i,onClick:l,style:{padding:"8px 16px",cursor:i?"not-allowed":"pointer",opacity:i?.5:1},type:"button",children:"Back"}),t.jsx("button",{disabled:r,onClick:v,style:{padding:"8px 16px",cursor:r?"not-allowed":"pointer",opacity:r?.5:1},type:"button",children:r?"Finish":"Next"})]}),t.jsxs("div",{style:{textAlign:"center",fontSize:"14px",color:"#666"},children:["Step ",n+1," of ",m.length]})]})},"render")};var W,B,D;y.parameters={...y.parameters,docs:{...(W=y.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    currentStep: 1,
    completedSteps: [0],
    orientation: 'vertical',
    variant: 'number',
    steps: [{
      title: 'Personal Information',
      description: 'Enter your basic'
    }, {
      title: 'Address Details',
      description: 'Provide your address'
    }, {
      title: 'Review & Submit',
      description: 'Check all information'
    }]
  },
  render: ({
    currentStep,
    completedSteps,
    orientation,
    variant,
    steps
  }) => <Stepper activeStep={currentStep} orientation={orientation} variant={variant}>
      {steps.map((step, idx) => {
      let state: StepState = 'incomplete';
      if (completedSteps.includes(idx)) state = 'completed';
      return <Stepper.Step description={step.description} key={idx} state={state} title={step.title} />;
    })}
    </Stepper>
}`,...(D=(B=y.parameters)==null?void 0:B.docs)==null?void 0:D.source}}};var E,N,T;g.parameters={...g.parameters,docs:{...(E=g.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    orientation: 'vertical',
    variant: 'number'
  },
  render: ({
    orientation,
    variant
  }) => <Stepper orientation={orientation} variant={variant}>
      <Stepper.Step description='This step is done' state='completed' title='Completed' />
      <Stepper.Step description='Currently on this step' isActive state='incomplete' title='Active' />
      <Stepper.Step description='Not yet started' state='incomplete' title='Incomplete' />
      <Stepper.Step description='Requires attention' state='warning' title='Warning' />
      <Stepper.Step description='Something went wrong' state='error' title='Error' />
      <Stepper.Step description='Cannot access yet' state='disabled' title='Disabled' />
      <Stepper.Step description='Bold title with light background' isActive state='completed' title='Completed Active' />
      <Stepper.Step description='Bold title with warning colors' isActive state='warning' title='Warning Active' />
      <Stepper.Step description='Bold title with error colors' isActive state='error' title='Error Active' />
    </Stepper>
}`,...(T=(N=g.parameters)==null?void 0:N.docs)==null?void 0:T.source}}};var P,R,V;b.parameters={...b.parameters,docs:{...(P=b.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    variant: 'bullet',
    orientation: 'horizontal'
  },
  render: ({
    orientation,
    variant
  }) => <Stepper orientation={orientation} variant={variant}>
      <Stepper.Step state='completed' />
      <Stepper.Step isActive state='incomplete' />
      <Stepper.Step state='incomplete' />
      <Stepper.Step state='disabled' />
      <Stepper.Step state='warning' />
      <Stepper.Step state='error' />
    </Stepper>
}`,...(V=(R=b.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};var L,F,O;f.parameters={...f.parameters,docs:{...(L=f.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    variant: 'icon',
    orientation: 'vertical'
  },
  render: ({
    orientation,
    variant
  }) => <Stepper orientation={orientation} variant={variant}>
      <Stepper.Step description='Payment processed successfully' icon={<Icon code='credit_card' size='small' />} state='completed' title='Payment' />
      <Stepper.Step description='Verify your email address' icon={<Icon code='mail' size='small' />} isActive state='incomplete' title='Verification' />
      <Stepper.Step description='Complete your profile' icon={<Icon code='edit' size='small' />} state='incomplete' title='Profile Setup' />
      <Stepper.Step description='Action required on your order' icon={<Icon code='shopping_cart' size='small' />} state='warning' title='Order Review' />
      <Stepper.Step description='Shipping address validation failed' icon={<Icon code='local_shipping' size='small' />} state='error' title='Shipping' />
      <Stepper.Step description='Delivery is not available yet' icon={<Icon code='home' size='small' />} state='disabled' title='Delivery' />
    </Stepper>
}`,...(O=(F=f.parameters)==null?void 0:F.docs)==null?void 0:O.source}}};var _,q,H;j.parameters={...j.parameters,docs:{...(_=j.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    orientation: 'horizontal',
    variant: 'number'
  },
  render: ({
    orientation,
    variant
  }) => <Stepper orientation={orientation} variant={variant}>
      <Stepper.Step description='This is a very long description that will be truncated after two lines and show a tooltip when you hover over it' state='completed' title='Very Long Step Title That Exceeds Maximum Width' />
      <Stepper.Step description='Short description' isActive state='incomplete' title='Normal Title' />
      <Stepper.Step description='Another long description that demonstrates the tooltip functionality when text overflows' state='incomplete' title='Another Step With A Really Long Title' />
    </Stepper>
}`,...(H=(q=j.parameters)==null?void 0:q.docs)==null?void 0:H.source}}};var G,M,J;w.parameters={...w.parameters,docs:{...(G=w.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    orientation: 'vertical',
    variant: 'number'
  },
  render: ({
    orientation,
    variant
  }) => <Stepper orientation={orientation} variant={variant}>
      <Stepper.Step state='completed' title='Step 1' />
      <Stepper.Step isActive state='incomplete' title='Step 2' />
      <Stepper.Step state='incomplete' title='Step 3' />
      <Stepper.Step state='incomplete' title='Step 4' />
    </Stepper>
}`,...(J=(M=w.parameters)==null?void 0:M.docs)==null?void 0:J.source}}};var K,Q,U;A.parameters={...A.parameters,docs:{...(K=A.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => {
    const {
      activeStep,
      isFirstStep,
      isLastStep,
      handleNext,
      handleBack,
      markStepComplete,
      isStepComplete
    } = useStepper({
      initialStep: 0,
      totalSteps: 4
    });
    const steps = [{
      title: 'Personal Info',
      description: 'Enter your details'
    }, {
      title: 'Contact',
      description: 'Provide contact info'
    }, {
      title: 'Address',
      description: 'Enter your address'
    }, {
      title: 'Review',
      description: 'Review and submit'
    }];
    const getStepState = (idx: number): StepState => {
      if (isStepComplete(idx)) return 'completed';
      return 'incomplete';
    };
    const handleNextWithComplete = () => {
      markStepComplete(activeStep);
      handleNext();
    };
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
        <Stepper activeStep={activeStep} orientation='horizontal' variant='number'>
          {steps.map((step, idx) => <Stepper.Step description={step.description} key={idx} state={getStepState(idx)} title={step.title} />)}
        </Stepper>

        <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'center'
      }}>
          <button disabled={isFirstStep} onClick={handleBack} style={{
          padding: '8px 16px',
          cursor: isFirstStep ? 'not-allowed' : 'pointer',
          opacity: isFirstStep ? 0.5 : 1
        }} type='button'>
            Back
          </button>
          <button disabled={isLastStep} onClick={handleNextWithComplete} style={{
          padding: '8px 16px',
          cursor: isLastStep ? 'not-allowed' : 'pointer',
          opacity: isLastStep ? 0.5 : 1
        }} type='button'>
            {isLastStep ? 'Finish' : 'Next'}
          </button>
        </div>

        <div style={{
        textAlign: 'center',
        fontSize: '14px',
        color: '#666'
      }}>
          Step {activeStep + 1} of {steps.length}
        </div>
      </div>;
  }
}`,...(U=(Q=A.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};const gt=["Default","AllStates","BulletVariant","IconVariant","WithLongText","WithoutDescriptions","InteractiveWithHook"];export{g as AllStates,b as BulletVariant,y as Default,f as IconVariant,A as InteractiveWithHook,j as WithLongText,w as WithoutDescriptions,gt as __namedExportsOrder,yt as default};
