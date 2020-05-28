import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import Polygon from "../../../img/Polygon.svg";
import { postNotes } from "../../../api/Notes";
import { connect } from "react-redux";
import * as post from "../../../store/actions/post";
import CreateNoteModal from "../../../Modals/CreateNoteModal";
import { toast } from "react-toastify";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      notesFormVisible: false,
      richText: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }

  //NOTE MODAL
  saveNote = values => {
    values.description = this.state.richText;
    postNotes(values)
      .then(response => {
        this.setState({
          notesFormVisible: false,
          richText: ""
        });
      })
      .then(() => {
        this.props.getPosts();
      })
      .catch(error => {
        console.log(error);
      });
  };

  reactQuillHandler = value => {
    this.setState({ richText: value });
  };

  hideModalHandler = () => {
    this.setState({
      notesFormVisible: false
    });
  };

  handleClick(e) {
    this.setState({ display: !this.state.display });
  }

  handleClickOutside = () => {
    this.setState({ display: false });
  };

  createNoteHandler = () => {
    this.setState({
      notesFormVisible: true
    });
  };

  hideModalHandler = modal => {
    if (modal === "note") {
      this.setState({
        notesFormVisible: false
      });
    }
  };

  quillHandler = value => {
    this.setState({ richText: value });
  };


  render() {
    return (
      <React.Fragment>
      <CreateNoteModal
        show={this.state.notesFormVisible}
        onHide={this.hideModalHandler}
        dialogClassName="modalForm"
        onSubmit={this.saveNote}
        richText={this.state.richText}
        quillHandler={this.quillHandler}
        post_draft={true}
      />
        <div className="nav relative" onClick={this.handleClick}>
          <div className="relative">Post</div>
          <img src={Polygon} alt="arrow" className="arrow"></img>
          <ul className={`ul ${this.state.display ? "" : "none"}`}>
            <li className="li">Whizle </li>
            <li className="li" onClick={this.createNoteHandler}>
              Note
            </li>
            <li className="li">List</li>
            <li className="li">Q&A</li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  getPosts: post.getPosts
};
export default connect(null, mapDispatchToProps)(onClickOutside(List));
