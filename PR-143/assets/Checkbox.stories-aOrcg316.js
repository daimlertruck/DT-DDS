var T=Object.defineProperty;var a=(c,r)=>T(c,"name",{value:r,configurable:!0});import{j as e}from"./jsx-runtime-Cgz2XvFB.js";import{r as b}from"./index-CwbBKW39.js";import{C as l}from"./Checkbox-DMXntJMv.js";import"./Icon-BrO18bYS.js";import"./emotion-styled.browser.esm-Cgg3GKEJ.js";const B={title:"Data Display/Checkbox",component:l,argTypes:{size:{control:"radio",options:["small","large"],description:"Size variant of the checkbox"},checked:{control:"boolean",description:"Controlled checked state"},disabled:{control:"boolean",description:"Whether the checkbox is disabled"},indeterminate:{control:"boolean",description:"Whether the checkbox is in an indeterminate state"},error:{control:"boolean",description:"Whether the checkbox is in an error state"},label:{control:"text",description:"Label text for the checkbox"}},args:{size:"large",disabled:!1,indeterminate:!1,error:!1}},n={args:{label:"Checkbox label",defaultChecked:!1}},s={render:a(c=>{const[r,o]=b.useState(!0),[h,x]=b.useState(!1);return e.jsx(l,{...c,checked:r||h,indeterminate:r,label:"Indeterminate → Checked → Unchecked",onChange:a(()=>{r?(o(!1),x(!0)):h?x(!1):o(!0)},"onChange")})},"render")},t={render:a(()=>e.jsxs("div",{style:{display:"flex",gap:"40px"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx("h3",{style:{margin:"0 0 8px 0"},children:"Large"}),e.jsx(l,{defaultChecked:!0,label:"Checked",size:"large"}),e.jsx(l,{defaultChecked:!1,label:"Unchecked",size:"large"}),e.jsx(l,{indeterminate:!0,label:"Indeterminate",size:"large"}),e.jsx(l,{defaultChecked:!0,disabled:!0,label:"Checked disabled",size:"large"}),e.jsx(l,{defaultChecked:!1,disabled:!0,label:"Unchecked disabled",size:"large"}),e.jsx(l,{defaultChecked:!0,error:!0,label:"Checked error",size:"large"}),e.jsx(l,{defaultChecked:!1,error:!0,label:"Unchecked error",size:"large"}),e.jsx(l,{error:!0,indeterminate:!0,label:"Indeterminate error",size:"large"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx("h3",{style:{margin:"0 0 8px 0"},children:"Small"}),e.jsx(l,{defaultChecked:!0,label:"Checked",size:"small"}),e.jsx(l,{defaultChecked:!1,label:"Unchecked",size:"small"}),e.jsx(l,{indeterminate:!0,label:"Indeterminate",size:"small"}),e.jsx(l,{defaultChecked:!0,disabled:!0,label:"Checked disabled",size:"small"}),e.jsx(l,{defaultChecked:!1,disabled:!0,label:"Unchecked disabled",size:"small"}),e.jsx(l,{defaultChecked:!0,error:!0,label:"Checked error",size:"small"}),e.jsx(l,{defaultChecked:!1,error:!0,label:"Unchecked error",size:"small"}),e.jsx(l,{error:!0,indeterminate:!0,label:"Indeterminate error",size:"small"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx("h3",{style:{margin:"0 0 8px 0"},children:"Without Labels"}),e.jsx(l,{"aria-label":"Large checked",defaultChecked:!0,size:"large"}),e.jsx(l,{"aria-label":"Large unchecked",defaultChecked:!1,size:"large"}),e.jsx(l,{"aria-label":"Small checked",defaultChecked:!0,size:"small"}),e.jsx(l,{"aria-label":"Small unchecked",defaultChecked:!1,size:"small"})]})]}),"render")},d={render:a(()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx("h3",{style:{margin:"0 0 8px 0"},children:"Label Wrapping Behavior"}),e.jsx("p",{style:{fontSize:"14px",color:"#666",margin:"0 0 10px 0"},children:"We recommend checkbox labels being fewer than three words or 60 characters. If you are tight on space, consider rewording the label. Long labels may wrap to a second line."}),e.jsx(l,{defaultChecked:!0,label:"Short label"}),e.jsx(l,{defaultChecked:!1,label:"This is a moderately long checkbox label"}),e.jsx(l,{defaultChecked:!1,label:"Small checkbox with a long label that also wraps",size:"small"})]}),"render")},i={render:a(()=>e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:"14px",color:"#666",margin:"0 0 10px 0"},children:"For RTL (right-to-left) languages, the layout of the checkbox is mirrored. The checkmark is placed on the right side of the text."}),e.jsxs("div",{style:{display:"flex",gap:"40px"},children:[e.jsxs("div",{style:{flex:1},children:[e.jsx("h3",{style:{margin:"0 0 16px 0"},children:"LTR (Default)"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsx(l,{defaultChecked:!0,label:"Checkbox label"}),e.jsx(l,{defaultChecked:!1,label:"Checkbox label"})]})]}),e.jsxs("div",{dir:"rtl",style:{flex:1},children:[e.jsx("h3",{style:{margin:"0 0 16px 0"},children:"RTL (Right-to-Left)"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsx(l,{defaultChecked:!0,label:"تسمية خانة الاختيار"}),e.jsx(l,{defaultChecked:!1,label:"تسمية خانة الاختيار"})]})]})]})]}),"render")};var k,f,m;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    label: 'Checkbox label',
    defaultChecked: false
  }
}`,...(m=(f=n.parameters)==null?void 0:f.docs)==null?void 0:m.source}}};var p,u,C;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => {
    const [indeterminate, setIndeterminate] = useState(true);
    const [checked, setChecked] = useState(false);
    return <Checkbox {...args} checked={indeterminate || checked} indeterminate={indeterminate} label='Indeterminate → Checked → Unchecked' onChange={() => {
      if (indeterminate) {
        setIndeterminate(false);
        setChecked(true);
      } else if (checked) {
        setChecked(false);
      } else {
        setIndeterminate(true);
      }
    }} />;
  }
}`,...(C=(u=s.parameters)==null?void 0:u.docs)==null?void 0:C.source}}};var g,y,z;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '40px'
  }}>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
        <h3 style={{
        margin: '0 0 8px 0'
      }}>Large</h3>
        <Checkbox defaultChecked label='Checked' size='large' />
        <Checkbox defaultChecked={false} label='Unchecked' size='large' />
        <Checkbox indeterminate label='Indeterminate' size='large' />
        <Checkbox defaultChecked disabled label='Checked disabled' size='large' />
        <Checkbox defaultChecked={false} disabled label='Unchecked disabled' size='large' />
        <Checkbox defaultChecked error label='Checked error' size='large' />
        <Checkbox defaultChecked={false} error label='Unchecked error' size='large' />
        <Checkbox error indeterminate label='Indeterminate error' size='large' />
      </div>

      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
        <h3 style={{
        margin: '0 0 8px 0'
      }}>Small</h3>
        <Checkbox defaultChecked label='Checked' size='small' />
        <Checkbox defaultChecked={false} label='Unchecked' size='small' />
        <Checkbox indeterminate label='Indeterminate' size='small' />
        <Checkbox defaultChecked disabled label='Checked disabled' size='small' />
        <Checkbox defaultChecked={false} disabled label='Unchecked disabled' size='small' />
        <Checkbox defaultChecked error label='Checked error' size='small' />
        <Checkbox defaultChecked={false} error label='Unchecked error' size='small' />
        <Checkbox error indeterminate label='Indeterminate error' size='small' />
      </div>

      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
        <h3 style={{
        margin: '0 0 8px 0'
      }}>Without Labels</h3>
        <Checkbox aria-label='Large checked' defaultChecked size='large' />
        <Checkbox aria-label='Large unchecked' defaultChecked={false} size='large' />
        <Checkbox aria-label='Small checked' defaultChecked size='small' />
        <Checkbox aria-label='Small unchecked' defaultChecked={false} size='small' />
      </div>
    </div>
}`,...(z=(y=t.parameters)==null?void 0:y.docs)==null?void 0:z.source}}};var j,v,S;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <h3 style={{
      margin: '0 0 8px 0'
    }}>Label Wrapping Behavior</h3>
      <p style={{
      fontSize: '14px',
      color: '#666',
      margin: '0 0 10px 0'
    }}>
        We recommend checkbox labels being fewer than three words or 60
        characters. If you are tight on space, consider rewording the label.
        Long labels may wrap to a second line.
      </p>
      <Checkbox defaultChecked label='Short label' />
      <Checkbox defaultChecked={false} label='This is a moderately long checkbox label' />
      <Checkbox defaultChecked={false} label='Small checkbox with a long label that also wraps' size='small' />
    </div>
}`,...(S=(v=d.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var L,D,I;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <div>
      <p style={{
      fontSize: '14px',
      color: '#666',
      margin: '0 0 10px 0'
    }}>
        For RTL (right-to-left) languages, the layout of the checkbox is
        mirrored. The checkmark is placed on the right side of the text.
      </p>

      <div style={{
      display: 'flex',
      gap: '40px'
    }}>
        <div style={{
        flex: 1
      }}>
          <h3 style={{
          margin: '0 0 16px 0'
        }}>LTR (Default)</h3>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
            <Checkbox defaultChecked label='Checkbox label' />
            <Checkbox defaultChecked={false} label='Checkbox label' />
          </div>
        </div>

        <div dir='rtl' style={{
        flex: 1
      }}>
          <h3 style={{
          margin: '0 0 16px 0'
        }}>RTL (Right-to-Left)</h3>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
            <Checkbox defaultChecked label='تسمية خانة الاختيار' />
            <Checkbox defaultChecked={false} label='تسمية خانة الاختيار' />
          </div>
        </div>
      </div>
    </div>
}`,...(I=(D=i.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};const F=["Default","IndeterminateToggle","AllSizesAndStates","LongLabelWrapping","RTLSupport"];export{t as AllSizesAndStates,n as Default,s as IndeterminateToggle,d as LongLabelWrapping,i as RTLSupport,F as __namedExportsOrder,B as default};
