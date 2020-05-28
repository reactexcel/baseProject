import React, { useState, useContext, useRef, useEffect } from "react";
import "./index.scss";
// import { Accordion, AccordionItem } from 'react-sanfona';
import { ContextApp } from "../../Dapp";
import ReactQuill from "react-quill";
import ReactResizeDetector from "react-resize-detector";
import { DropdownButton, Dropdown } from "react-bootstrap";

const QA = props => {
	const [currentQAItems, setCurrentQAItems] = useState([]);
	const [currentQATitle, setCurrentQATitle] = useState("");
	const [currentAnswer, setCurrentAnswer] = useState("");
	const { saveQA, saveSize } = useContext(ContextApp);
	const container = useRef();
	const titleInput = useRef(null);

	useEffect(() => {
		if (props.edit === true) {
			titleInput.current.value = props.title;
			if (props.items) setCurrentQAItems(props.items);
		}
	}, [props.edit, props.title]);

	const onResize = (w, h) => {
		saveSize(
			props.p,
			props.s,
			props.num,
			"questions",
			container.current.clientHeight,
			null
		);
	};

	const editCurrentQAItem = (n, answer, title) => {
		let items = currentQAItems;
		// items[n] = answer;
		setCurrentAnswer(answer);
		let element = {
			title: "",
			answer: "",
		};
		if (currentAnswer && currentAnswer.length)
			element = {
				title: title,
				answer: currentAnswer,
			};

		if (currentQATitle && currentQATitle.length)
			element = {
				title: currentQATitle,
				answer: answer,
			};

		items[n] = element;
	};

	const editAnswerTitle = (index, e) => {
		setCurrentQATitle(e.target.value);
		editCurrentQAItem(index, null, e.target.value);
	};

	const addCurrentQAItem = e => {
		e.preventDefault();
		setCurrentQAItems([...currentQAItems, ""]);
	};

	// const [opened, setOpened] = useState(0);
	return (
		<div className="QA grid-stack-item-content">
			<header className="QAHeader">
				<h6>
					{props.edit
						? props.title.length > 0
							? "Edit QA"
							: "Add QA"
						: props.title}
				</h6>
			</header>
			<div ref={container}>
				{!props.edit ? (
					<div className="QAContent">
						{/* <Accordion> */}
						{props.items.map((item, index) => {
							return (
								<div key={index + "_a"}>
									<div
										className="QAText"
										style={{ overflowWrap: "break-word" }}
										dangerouslySetInnerHTML={{ __html: item }}
									/>
									{item.length ? <hr /> : null}
								</div>
							);
						})}
						{/* </Accordion> */}
						<DropdownButton
							className="Qa-dropdown"
							id="dropdown-variants-secondary"
							drop="right"
							variant="secondary"
							size="sm"
							title="Actions"
						>
							<Dropdown.Item onClick={props.copyCard}>copy</Dropdown.Item>
							<Dropdown.Item
								onClick={() => props.editCard(props.p, props.s, props.num)}
							>
								add/ edit
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => props.deleteCard(props.p, props.s, props.num)}
							>
								delete
							</Dropdown.Item>
						</DropdownButton>
					</div>
				) : (
					<div className="QAForm">
						<div className="Form">
							<form
								onSubmit={e =>
									saveQA(e, currentQAItems, props.p, props.s, props.num)
								}
							>
								<label>Question</label>
								<input type="text" name="title" ref={titleInput} />

								<label>Answer</label>
								<div>
									{currentQAItems.map((item, index) => (
										<div key={index + "_a"}>
											<label>Title</label>
											<input
												className="w-100"
												type="text"
												placeholder="Answer Title"
												onChange={e => editAnswerTitle(index, e)}
											></input>
											<ReactQuill
												value={item}
												onChange={value =>
													editCurrentQAItem(index, value, null)
												}
											/>
										</div>
									))}
								</div>
								<button onClick={addCurrentQAItem}>+add answer</button>
								<button type="submit">Save</button>
							</form>
						</div>
					</div>
				)}
				<ReactResizeDetector handleWidth handleHeight onResize={onResize} />
			</div>
		</div>
	);
};

export default QA;
