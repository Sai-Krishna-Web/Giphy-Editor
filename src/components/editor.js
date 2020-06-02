import React,{useState} from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; 

import Search from './search';

  export default () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [range, setRange]=useState(0);
    //const [giph,setgiph]=useState();
    const { quill, quillRef } = useQuill({
      modules: {
        toolbar: '#toolbar'
      },
      formats: ["size", "bold", "script","image"], 
    });


    const insertToEditor = (url) => {
        
        setIsModalOpen(false);
        if(url){
            console.log(url);
            quill.insertEmbed(range, 'image',url, url);
        }
        
    };

    const toggle=()=>{
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        //input.click()
        const Range =quill.getSelection();
        setRange(Range?Range.index:0);
        console.log(range);
        setIsModalOpen(true);


    }
    React.useEffect(() => {
        if (quill) {
          // Add custom handler for Image Upload
          quill.getModule('toolbar').addHandler('image', toggle);
        }
      }, [quill]);

     
   
    return (
      <div style={{ height: 500 }}>
        
   
        <div id="toolbar" className="neomorphic-shadows neomorphic-shadows-hover">
          <select className="ql-size">
            <option value="small" />
            <option selected />
            <option value="large" />
            <option value="huge" />
          </select>
          <button className="ql-bold" />
          <button className="ql-script" value="sub" />
          <button className="ql-script" value="super" />
          <button className="image" value="G" onClick={toggle}>G</button>
          {isModalOpen &&  (<Search callback={insertToEditor}/>)}
        </div>
        <div className="neomorphic-shadows-i" ref={quillRef} />
        <div id="editor" />
      </div>
    );
  };