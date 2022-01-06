import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

export default class TextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.props.setState({...this.props.state, notes: draftToHtml(convertToRaw(editorState.getCurrentContent()))})
  };

  render(props) {
    const { editorState } = this.state;
    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    return (
      <>
        <h4 className="panel-heading">ملاحظات</h4>
        <div className="panel">
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}
          />
        </div>

      </>
    );
  }
}