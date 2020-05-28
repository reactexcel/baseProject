import React, { useState, useContext, useEffect, useRef } from "react";
import "./index.scss";
import { ReactTinyLink } from "react-tiny-link";
import ReactPlayer from "react-player";
import { ContextApp } from "../../Dapp";
import ReactQuill from "react-quill";
import ReactResizeDetector from "react-resize-detector";
import { DropdownButton, Dropdown } from "react-bootstrap";
import * as Yup from "yup";
const Note = props => {
	const { saveNote, saveSize } = useContext(ContextApp);
	const container = useRef();
	const titleInput = useRef();
	const urlInput = useRef();
	const tagsInput = useRef();
	const [firstRender, toggleFirstRender] = useState(false);
	const [richText, setRichText] = useState("");

	useEffect(() => {
		if (props.edit === true) {
			titleInput.current.value = props.title;
			if (props.url) urlInput.current.value = props.url;
			if (props.tags) tagsInput.current.value = props.tags;

			if (props.desc) setRichText(props.desc);
		}
	}, [props.edit, props.title]);

	const regex = new RegExp(
		/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
	);
	useEffect(() => {
		toggleFirstRender(true);
	}, []);

	useEffect(() => {
		if (firstRender) {
			saveSize(
				props.p,
				props.s,
				props.num,
				"notes",
				container.current.children[0].clientHeight,
				props.item.w
			);
		}
	}, [props.edit]);
	useEffect(() => {
		if (props.edit === true) {
			saveSize(
				props.p,
				props.s,
				props.num,
				"notes",
				container.current.children[0].clientHeight,
				props.item.w
			);
		}
	}, []);
	return (
		<div className="Note grid-stack-item-content">
			<header className="NoteHeader">
				<h6>
					{props.edit
						? props.title.length > 0
							? "Edit Note"
							: "Add Note"
						: props.title}
				</h6>
			</header>
			<div
				ref={container}
				style={{
					height: props.item.h ? props.item.h : 400,
					width: `${100}%`,
				}}
			>
				<div>
					{!props.edit ? (
						<div className="NoteContent">
							{props.url && props.url.indexOf("youtube.com") >= 0 && (
								<ReactPlayer
									className="preview_video"
									url={props.url}
									playing={false}
								/>
							)}
							{/* {props.url &&
							props.url.indexOf("youtube.com") === -1 &&
							props.url.match(regex) !== null && (
								<ReactTinyLink
									className="preview"
									cardSize="large"
									showGraphic={true}
									url={props.url}
									onError={err => console.log("Something went Wrong", err)}
									defaultMedia={"http://www.google.com"}
								/>
							)} */}
							{props.tags && (
								<div className="tags">
									{props.tags.split(",").map((item, index) => {
										return <span key={index + "__li"}>{item}</span>;
									})}
								</div>
							)}
							{props.desc && (
								<div
									className="NoteText"
									style={{ overflowWrap: "break-word" }}
									dangerouslySetInnerHTML={{ __html: props.desc }}
								/>
							)}
							<DropdownButton
								className="note-dropdown"
								id="dropdown-variants-secondary"
								drop="right"
								variant="secondary"
								size="sm"
								title="Actions"
							>
								<Dropdown.Item
									onClick={() =>
										props.copyCard({ item: props.item, itemType: "notes" })
									}
								>
									copy
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() =>
										props.editCard(props.p, props.s, props.num, "notes")
									}
								>
									edit
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() =>
										props.deleteCard(props.p, props.s, props.num, "notes")
									}
								>
									delete
								</Dropdown.Item>
							</DropdownButton>
						</div>
					) : (
						<div className="NoteForm">
							<div className="Form">
								<form
									onSubmit={e =>
										saveNote(e, richText, props.p, props.s, props.num)
									}
								>
									<label>Title</label>
									<input type="text" name="title" ref={titleInput} />
									<label>URL</label>
									<input type="text" name="url" ref={urlInput} />
									<label>Tags</label>
									<input type="text" name="tags" ref={tagsInput} />
									<label>Desc</label>
									<div>
										<ReactQuill
											value={richText}
											onChange={value => setRichText(value)}
										/>
									</div>
									<button type="submit">Create Note</button>
								</form>
							</div>
						</div>
					)}
				</div>

				<ReactResizeDetector
					className="Resize-detector"
					handleWidth
					handleHeight
				/>
			</div>
		</div>
	);
};

export default Note;
