import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../../../components/sidebar/Sidebar";
import black_arrow_right from "../../../img/black_arrow_right.svg";
import CardNote from "../../../components/note_card/CardNoteUnresizable";
import CardList from "../../../components/list_card/CardList";
import NoteFeed from "../../../components/feed_cards/note_feed";
import { connect } from "react-redux";
import * as inboxActions from "../../../store/actions/Inbox";
import * as feedsActions from "../../../store/actions/feed";
import FeedList from "../../../components/feed_cards/feed_list";
import { saveListApi } from "../../../api/List";
import { toast } from "react-toastify";
import { saveNoteApi, shareNote } from "../../../api/Notes";
import { shareList, archiveList } from "../../../api/List";

const Main = props => {
  const [viewAll, setViewAll] = useState(false);
  const inboxData = viewAll === false ? props.inbox.slice(0, 3) : props.inbox;

  useEffect(() => {
    props.getSaves(localStorage.getItem("api_token"));
  }, []);

  useEffect(() => {
    props.getFeeds(localStorage.getItem("api_token"));
  }, []);
  const shareHandler = (type, id) => {
    if (type === "note") {
      shareNote(id)
        .then(response => {
          toast.success(`Shared successfully`);
          props.getSaves(localStorage.getItem("api_token"));
          props.getFeeds(localStorage.getItem("api_token"));
        })
        .catch(error => {
          toast.error(`You can't share this note!`);
        });
    }

    if (type === "list") {
      shareList(id)
        .then(response => {
          toast.success(`Shared successfully`);
          props.getSaves(localStorage.getItem("api_token"));
          props.getFeeds(localStorage.getItem("api_token"));
        })
        .catch(error => {
          toast.error(`You can't share this lists!`);
        });
    }
  };

  const archiveItemsHandler = (type, id) => {
    if (type === "list") {
      archiveList(id)
        .then(response => {
          toast.success(`Archived successfully`);
          props.getSaves(localStorage.getItem("api_token"));
        })
        .catch(error => {
          toast.error(`You can't archive this lists!`);
        });
    }
  };

  const viewAllHandler = () => {
    setViewAll(!viewAll);
  };

  const Inbox = (
    <div className="left">
      <div className="header-wrapper">
        <h2 className="topic-header">Inbox</h2>
        {(viewAll || props.inbox.length <= 3) ? null : (
          <div
            className={`view-all ${viewAll === true ? "disabled" : ""}`}
            onClick={viewAllHandler}
          >
            View all{" "}
            <img src={black_arrow_right} alt="arrow right" className="arrow" />
          </div>
        )}
      </div>
      {inboxData.map(item => {
        console.log("props.inbox", item);
        if (item.verb === "Note") {
          return (
            <CardNote
              item={item}
              edit={true}
              actions={true}
              key={item.id}
              shareHandler={shareHandler}
            />
          );
        }
        if (item.verb === "List") {
          return (
            <CardList
              item={item}
              edit={true}
              actions={true}
              key={item.id}
              shareHandler={shareHandler}
              archiveItemsHandler={archiveItemsHandler}
            />
          );
        }
      })}
    </div>
  );

  const saveHandler = (id, type) => {
    if (type === "list") {
      saveListApi(id)
        .then(response => {
          toast.success(`List saved successfully!`);
          props.getSaves(localStorage.getItem("api_token"));
        })
        .catch(error => {
          toast.error(`You can't save this list!`);
        });
    }

    if (type === "note") {
      saveNoteApi(id)
        .then(response => {
          toast.success(`Note saved successfully!`);
          props.getSaves(localStorage.getItem("api_token"));
        })
        .catch(error => {
          toast.error(`You can't save this note!`);
        });
    }
  };

  return (
    <DIV>
      {props.feeds !== null && props.inbox ? (
        <React.Fragment>
          <div className="content-wrapper">
            <Sidebar />
            <div className="main">
              {localStorage.getItem("api_token") && props.inbox.length > 0
                ? Inbox
                : null}
              <div className="right">
                <div className="header-wrapper">
                  <h2 className="topic-header">Feed</h2>
                </div>
                {props.feeds.map((item, index) => {
                  if (item.verb === "List") {
                    return (
                      <FeedList
                        key={index}
                        item={item}
                        actions={true}
                        saveHandler={saveHandler}
                      />
                    );
                  }

                  if (item.verb === "Note") {
                    return (
                      <NoteFeed
                        key={index}
                        item={item}
                        actions={true}
                        saveHandler={saveHandler}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div className="loader"></div>
      )}
    </DIV>
  );
};

const DIV = styled.div`
  display: flex;
  justify-content: center;
  .main {
    display: flex;
    max-width: 1026px;
  }
  .header-wrapper {
    display: flex;
    justify-content: space-between;
    alighn-items: center;
    width: 316px;
  }
  .content-wrapper {
    display: flex;
    padding: 38px 20px 69px 20px;
  }

  .topic-header {
    font-family: Gilroy;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: #ff906d;
    margin-bottom: 20px;
  }

  .left {
    margin-right: 24px;
    .cardData {
      width: 291px;
    }
  }

  @media screen and (max-width: 936px) {
    .main {
      display: flex;
      flex-direction: column;
    }
  }

  .view-all {
    cursor: pointer;
  }
   {
  }

  .disabled {
    color: #c1c1c1;
  }
`;
const mapStateToProps = state => {
  return {
    inbox: state.inbox.inbox_saves,
    feeds: state.feed.feed_info
  };
};

const mapDispatchToProps = {
  getSaves: inboxActions.getInboxSavesAction,
  getFeeds: feedsActions.getFeedsListAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
