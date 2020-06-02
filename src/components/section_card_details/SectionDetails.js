import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CardNote from "../note_card/CardNote";
import CardList from "../list_card/CardList";
import iconWhizle from "../../img/icon-whizle.svg";
import CardQA from "../qa_card/CardQAdNd";
import { connect } from "react-redux";
import { putNotes, postNotes } from "../../api/Notes";
import GridLayout from "react-grid-layout";
import { WidthProvider } from "react-grid-layout";
import { debounce } from "lodash";
import CreateCards from "../../buttons/CreateCards/Actions";
import * as post from "../../store/actions/post";
import { postList } from "../../api/List";
import { withRouter } from "react-router-dom";
import { postListItems } from "../../api/ListItems";
import { putList } from "../../api/List";
import { putQA } from "../../api/Qustions";
import CreateNoteModal from "../../Modals/CreateNoteModal";
import CreateListModal from "../../Modals/CreateListModal";
import { toast } from "react-toastify";
import AddQA from "../../Modals/AddQA";
import { postQA } from "../../api/Qustions";
import { postAnswer } from "../../api/Answers";
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import ReactGridWrapper from "../list_card/ReactGridWrapper";
import {ReactHeight} from 'react-height';


const ReactGridLayout = WidthProvider(GridLayout);

const SectionDetails = props => {
  const [layout, changeLayout] = useState([]);
  const [layoutCopy, setLayoutCopy] = useState([])
  const [richText, setRichText] = useState("");
  const [notesFormVisible, setNotesFormVisible] = useState(false);
  const [sectionId, setSectionId] = useState(null);
  const [listFormVisible, setListFormVisible] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [qaFormVGisible, setQaFormVisible] = useState(false);
  const [activeElem, setActiveElem] = useState(null);
  const [qOfA, setQofA] = useState(null)

  useEffect(() => {
    changeLayout(generateLayout());
    setLayoutCopy(generateLayout())
  }, [props.item.lists, props.item.notes]);

  useEffect(() => {
    changeLayout(generateLayout());
    setLayoutCopy(generateLayout())
  }, []);
  console.log(layout);
  
  // DND handlers
  const generateLayout = () => {
    let layoutTemp = [];
    if (props.item.notes.length > 0) {
      props.item.notes.map((item, i) =>
        layoutTemp.push({
          i: `notes-${item.id}-${i}`,
          x: +item.x || 0,
          y: +item.y || 0,
          w: +item.w ? Math.ceil(item.w) : 7,
          h: +item.h ? item.h : 2,
          veiwAll:false
        })
      );
    }
    if (props.item.lists.length > 0) {
      props.item.lists.map((item, i) =>
        layoutTemp.push({
          i: `lists-${item.id}-${i}`,
          x: +item.x || 0,
          y: +item.y || 0,
          w: +item.w ? item.w : 7,
          h: +item.h ? item.h : 1,
          veiwAll:false
        })
      );
    }

    if (props.item.questions.length > 0) {      
      props.item.questions.map((item, i) =>
        layoutTemp.push({
          i: `questions-${item.id}-${i}`,
          x: item.x || 0,
          y: item.y || 0,
          w: item.w ? item.w : 7,
          h: +item.h ? item.h : 2,
          veiwAll:false
        })
      );
    }

    return layoutTemp;
  };

  const changeSizeApi = debounce(layout => {    
    let type = layout.i.split("-")[0];
    let id = layout.i.split("-")[1];
    let index = layout.i.split("-")[2];
    const filteredNote = props.item.notes.filter(item => +item.id === +id)[0];
    const filteredList = props.item.lists.filter(item => +item.id === +id)[0];
    const filteredQa = props.item.questions.filter(item => +item.id === +id)[0];
    const getCurrentHeight = document.getElementById(layout.i).clientHeight
    const scrollHeight = document.getElementById(layout.i).scrollHeight

    if (type === "lists") {
      let listData = {
        section_id: filteredList.section_id,
        title: filteredList.title,
        index: +filteredList,
        index,
        x: layout.x,
        y: layout.y,
        h: layout.h,
        w: layout.w
      };
      if(scrollHeight > getCurrentHeight){
        handleHightChecker(putList, listData, filteredList.id, layout.i )
      }else{
        listData.veiwAll = false
        putList(filteredList.id, listData);
      }
    }

    if (type === "notes") {
      let noteData = {
        section_id: filteredNote.section_id,
        title: filteredNote.title,
        description: filteredNote.description,
        url: filteredNote.url,
        tags: filteredNote.tags,
        x: layout.x,
        y: layout.y,
        h: layout.h,
        w: layout.w,
        index: +filteredNote.index
      };
      if(scrollHeight > getCurrentHeight){
        handleHightChecker(putNotes, noteData, filteredNote.id, layout.i )
      }else{
      noteData.veiwAll = false;
        putNotes(filteredNote.id, noteData);
      }
    }

    if (type === "questions") {
      let qaData = {
        section_id: filteredQa.section_id,
        title: filteredQa.title,
        index: +filteredQa.index,
        question: filteredQa.question,
        x: layout.x,
        y: layout.y,
        h: layout.h,
        w: layout.w
      };
     
      if(scrollHeight > getCurrentHeight){
        handleHightChecker(putQA, qaData, filteredQa.id, layout.i )
      }else{
        qaData.veiwAll = false;
        putQA(filteredQa.id, qaData);
      }
    }
  }, 250);

  function handleHightChecker (apiFunction, data, id, layoutId ){
    let newLayout = []
    layoutCopy.forEach(item => {
      let element = item
      if(layoutId === item.i){
        element.veiwAll = true
        newLayout.push(element)
      }else{
        newLayout.push(element)
      }
    });        
    changeLayout(newLayout)
    data.veiwAll = true;
    apiFunction(id, data);
  }

  const getIndex = index => {};

  const createList = item => {
    setListFormVisible(true);
    setSectionId(item.id);
  };

  const saveList = values => {
    values.section_id = sectionId;
    values.listing_items = listItems;
    values.x = 0;
    values.y = 0;
    values.h = 3;
    values.w = 7;

    postList(values)
      .then(response => {
        listItems.map(item => {
          postListItems({ title: item.title, listing_id: response.id });
        });
      })
      .then(() => {
        setListFormVisible(false);
        setSectionId(null);
        setTimeout(() => {
          props.getPost(props.match.params.postId);
        }, 100);
      })
      .catch(error => {
        toast.error(`You can't save the list at the moment!`);
      });
  };

  //NOTE
  const createNote = item => {
    setSectionId(item.id);
    setNotesFormVisible(true);
  };

  const saveNote = values => {
    values.description = richText;
    values.section_id = sectionId;
    values.x = 0;
    values.y = 0;
    values.h = 1;
    values.w = 7;
    console.log("values", props.match.params.postId);
    postNotes(values)
      .then(response => {
        setNotesFormVisible(false);
        setSectionId(null);
      })
      .then(() => {
        props.getPost(props.match.params.postId);
      })
      .catch(error => {});
  };

  const onDragHandler = layouts => {
    props.item.lists.map(list => {
      layouts.map(layout => {
        let type = layout.i.split("-")[0];
        let id = layout.i.split("-")[1];
        if (+id === +list.id && (list.x !== layout.x || list.y !== layout.y)) {
          list.x = layout.x;
          list.y = layout.y;
          if (type === "lists") {
            putList(list.id, list);
          }
        }
      });
    });

    props.item.notes.map(note => {
      layouts.map(layout => {
        let type = layout.i.split("-")[0];
        let id = layout.i.split("-")[1];
        if (+id === +note.id && (note.x !== layout.x || note.y !== layout.y)) {
          note.x = layout.x;
          note.y = layout.y;
          if (type === "notes") {
            putNotes(note.id, note);
          }
        }
      });
    });

    props.item.questions.map(qa => {
      layouts.map(layout => {
        let type = layout.i.split("-")[0];
        let id = layout.i.split("-")[1];
        if (+id === +qa.id && (qa.x !== layout.x || qa.y !== layout.y)) {
          qa.x = layout.x;
          qa.y = layout.y;
          if (type === "questions") {
            putQA(qa.id, qa);
          }
        }
      });
    });
  };

  // SHOW-HIDE HANDLER

  const hideModalHandler = modal => {
    console.log(modal,'modalmodalmodalmodalmodal');
    
    if (modal === "note") {
      setNotesFormVisible(false);
    }
    if (modal === "list") {
      setListFormVisible(false);
    }
    if (modal === "qa") {
      setQaFormVisible(false);
      setQofA(null);
    }
  };

  const quillHandler = value => {
    setRichText(value);
  };

  //LIST MODAL

  const setListItemsHandler = value => {
    setListItems(value);
  };

  const createQA = (qOfA = null) => {
    setQofA(qOfA)
    setQaFormVisible(true);
  };

  const saveQA = (e, data) => {
    console.log(e, data,'e, datae, datae, data');
    
    e.preventDefault();
    const questionData = {
      section_id: props.item.id,
      question: data.question,
      url: data.url,
      x: 0,
      y: 0,
      h: 1,
      w: 7
    };
    postQA(questionData)
      .then(response => {
        console.log(response,'response');
        
        data.answers.map(item => {
          let answersData = {
            question_id: response.data.id,
            answer: item.value
          };
          return postAnswer(answersData)
            .then(() => {})
            .then(() => {
              setQaFormVisible(false);
            });
        });
      })
      .then(() => {
        toast.success(`QA was created successfully!`);
        props.getPost(props.match.params.postId);
      })
      .catch(error => {
        toast.success(`QA can't be created at the moment!`);
      });
  };

  const handleSaveAnswerTdQues = (e, answers, qId)=>{
    e.preventDefault();
    answers.map((item, index) => {
      let answersData = {
        question_id: qId,
        answer: item.value
      };
      return postAnswer(answersData)
        .then(() => {})
        .then(() => {
          if(answers.length-1 === index){
            toast.success(`${answers.length > 0 ? 'Answers' : 'Answer'} was saved successfully!`);
            props.getPost(props.match.params.postId);
          }
          setQaFormVisible(false);
        });
    });
  }

  if (!props.item) {
    return (
      <DIV className="cardData notes">
        <div className="loader" />
      </DIV>
    );
  }


  const cardListener = elem => {
    setActiveElem(elem);
  };

  function getViewAllStatus (data, index){
  let item =  layout.filter((item)=> item.i == `questions-${data.id}-${index}`)
    if(item.veiwAll){
      return true
    }else{
      return false
    }
  }

  return (
    <React.Fragment>
      {qaFormVGisible && 
        <AddQA show={qaFormVGisible} data={qOfA} handleSaveAnswerTdQues={handleSaveAnswerTdQues} onHide={hideModalHandler} saveQA={saveQA} />
      }

      <CreateListModal
        show={listFormVisible}
        onHide={hideModalHandler}
        onSubmit={saveList}
        setListItems={setListItemsHandler}
      />

      <CreateNoteModal
        show={notesFormVisible}
        onHide={hideModalHandler}
        dialogClassName="modalForm"
        onSubmit={saveNote}
        richText={richText}
        quillHandler={quillHandler}
      />

      <DIV className="section-details-wrapper">
        <div className="section-header-wrapper">
          <div className="left-side">
            <div className="section-name">
              <img
                src={iconWhizle}
                alt="icon selection"
                className="selection-icon"
              />
              {props.item.slug}
            </div>
            <div className="user-data">
              <div className="logo"></div>
              <div className="user">Dwayne Johnson</div>
            </div>
          </div>
          <div className="right-side">
            <div className="posted">Today at 1:32 PM </div>
          </div>
        </div>
        <div className="post-details-section">
          <div className="post-details__name">
            <div className="post-details__name-header">{props.item.title}</div>
            <div className="post-details__name-description">
              {props.item.description}
            </div>
          </div>
          <div className="post-logo"></div>
        </div>

        <CreateCards
          item={props.item}
          createNote={createNote}
          createList={createList}
          createQA={createQA}
        />

        <div className="main-data">
          {props.item &&
          props.item.notes &&
          props.item.notes &&
          props.item.lists ? (
            <ReactGridLayout
              layout={layout}
              // onResizeStop={(data)=>changeLayout(data)}
              onResizeStop={(layout, old, newItem) => {
                changeSizeApi(newItem);
              }}
              onDragStop={(layout, old, newItem) => {
                onDragHandler(layout);
              }}
            >
              {props.item.notes.map((item, index) => {                
                return (
                  <div
                    className={`card-wrapper ${
                      activeElem === `note-card-${index}`
                        ? "active-elem"
                        : "no-active-elem"
                    }`}
                    key={`notes-${item.id}-${index}`}
                    onClick={() => cardListener(`note-card-${index}`)}
                  >
                    <CardNote
                      veiwAll = {getViewAllStatus(item, index)}
                      index={index}
                      item={item}
                      action={props.action}
                      editHandler={props.editHandler}
                      getIndex={getIndex}
                      saveHandler={props.saveHandler}
                      type="note"
                      shareHandler={props.shareHandler}
                      openEditNoteHandler={props.openEditNoteHandler}
                    />
                  </div>
                );
              })}
              {props.item.lists.map((item, index) => {
                return (
                  <div
                    className={`list-wrapper  ${
                      activeElem === `card-list-${index}`
                        ? "active-elem"
                        : "no-active-elem"
                    }`}
                    key={`lists-${item.id}-${index}`}
                  >
                    <CardList
                      veiwAll = {getViewAllStatus(item, index)}
                      technologies={["#Mentality", "#Mentality"]}
                      action={props.action}
                      item={item}
                      onClick={() => cardListener(`card-list-${index}`)}
                      saveHandler={props.saveHandler}
                      type="list"
                      shareHandler={props.shareHandler}
                      openEditListHandler={props.openEditListHandler}
                    />
                  </div>
                );
              })}
 
              {props.item.questions.map((item, index) => {
                return (
                  <div
                    className={`qa-card  ${
                      activeElem === `qa-card-${index}`
                        ? "active-elem"
                        : "no-active-elem"
                    }`}
                    key={`questions-${item.id}-${index}`}
                    onClick={() => cardListener(`qa-card-${index}`)}
                  >
                      <CardQA
                        veiwAll = {getViewAllStatus(item, index)}
                        action={props.action}
                        className={`questions-${item.id}-${index}`}
                        item={item}
                        saveHandler={props.saveHandler}
                        type="qa"
                        shareHandler={props.shareHandler}
                        openEditListHandler={props.openEditListHandler}
                        createQA={createQA}
                      />
                  </div>
                );
              })}
            </ReactGridLayout>
          ) : null}
        </div>
      </DIV>
    </React.Fragment>
  );
};

const DIV = styled.div`
  box-shadow: 4px 4px 0 0 #56aeff;
  border-radius: 3px;
  border: 1px solid #e7e7e7;
  padding: 24px;
  width: 100%;

  margin-bottom: 26px;

  .section-header-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 16px;
  }
  .selection-icon {
    margin-right: 10px;
  }

  .section-name {
    color: #56aeff;
    font-weight: 500;
    font-size: 12px;
  }

  .logo {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: grey;
    margin-right: 8px;
  }

  .user {
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
  }

  .posted {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    color: #a7a7a7;
  }

  .left-side {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    margin-right: 20px;
  }

  .user-data {
    display: flex;
    align-items: center;
  }

  .header-data {
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 24px;
  }
  // .main-data{
  //   white-space: nowrap;
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  // }
  .main-data:first-child {
    margin-right: 27px !important;
  }

  .card-wrapper {
    margin-right: 27px;
  }

  .post-details__name {
    max-width: 90%;
  }

  .post-details__name-header {
    font-size: 24px;
    line-height: 28px;
  }

  .post-details__name-description {
    font-size: 16px;
  }

  .post-logo {
    width: 54px;
    height: 54px;
    border-radius: 3px;
    background-color: grey;
  }

  .post-details-section {
    display: flex;
    justify-content: space-between;
    padding-bottom: 18px;
    margin-bottom: 18px;
  }

  .ul {
    width: 100%;
    right: 0px;
    top: 40px;
    z-index: 1;
  }

  @media screen and (max-width: 1224px) {
    .main-data {
      flex-direction: column;
    }

    .card-wrapper {
      margin-right: 0;
    }
  }

  .unset-width {
    width: auto;
    div.react-grid-item {
      max-width: 100% !important;
    }
  }
  .active-elem {
    z-index: 2;
  }
`;

function ItemComponent({
  dragging,
  dragged,
  children: { title, description },
  ...rest
}) {
  return (
    <div {...rest} className={`list__item ${dragged ? "is-dragging" : ""}`}>
      <div className="list__item-content">
        <div className="list__item-title">{title}</div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  getPost: post.getPostById
};
export default withRouter(connect(null, mapDispatchToProps)(SectionDetails));
