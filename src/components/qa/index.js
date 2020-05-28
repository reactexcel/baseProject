import React, { useState, useContext, useRef, useEffect } from "react";
import "./index.scss";
// import { Accordion, AccordionItem } from 'react-sanfona';
import { ContextApp } from "../../Dapp";
import ReactQuill from "react-quill";
import ReactResizeDetector from "react-resize-detector";
import { DropdownButton, Dropdown } from "react-bootstrap";

const QA = props => {
	const [currentQAItems, setCurrentQAItems] = useState([{}]);
	const { saveQA, saveSize } = useContext(ContextApp);
	const container = useRef();
	const titleInput = useRef(null);

	useEffect(() => {
		if (props.edit === true) {
			titleInput.current.value = props.title;
			if (props.items) setCurrentQAItems(props.items);
			// console.log('hello initial:', currentQAItems);
		}
	}, [props.edit, props.title]);

	// console.log('hello update', currentQAItems);

	const editCurrentQAItem = (n, item) => {
		// let items = currentQAItems;
		// items[n] = item;
		// setCurrentQAItems({type: 'anwer1', value: 'anwer'})
		// setCurrentQAItems(items);
		const updatedQAs = [...currentQAItems].map((qa, index) =>
			index === n ? { ...qa, value: item } : qa
		);
		setCurrentQAItems(updatedQAs);
	};

	const editAnswerTitle = e => {};

	const addCurrentQAItem = e => {
		e.preventDefault();
		saveSize(
			props.p,
			props.s,
			props.num,
			"questions",
			props.item.h + 200,
			props.item.w
		);
		setCurrentQAItems([...currentQAItems, ""]);
	};

	const setType = (e, index) => {
		const updatedQAs = [...currentQAItems].map((qa, i) =>
			i === index ? { ...qa, answer: e.target.value } : qa
		);
		setCurrentQAItems(updatedQAs);
	};
	const [firstRender, toggleFirstRender] = useState(false);
	useEffect(() => {
		toggleFirstRender(true);
	}, []);

	useEffect(() => {
		if (firstRender) {
			saveSize(
				props.p,
				props.s,
				props.num,
				"questions",
				container.current.children[0].clientHeight + 80,
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
				"questions",
				container.current.children[0].clientHeight + 80,
				props.item.w
			);
		}
	}, []);

	// const [opened, setOpened] = useState(0);
	return (
		<ReactResizeDetector handleWidth handleHeight>
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
				<div
					ref={container}
					style={{
						height: props.item.h ? props.item.h : "auto",
						width: `${100}%`,
					}}
				>
					<div>
						{!props.edit ? (
							<div className="QAContent">
								{/* <Accordion> */}
								{props.items &&
									props.items.map((item, index) => {
										return (
											<div key={index + "_a"}>
												<div
													className="QAText"
													style={{ overflowWrap: "break-word" }}
													dangerouslySetInnerHTML={{ __html: item.answer }}
												/>
												<div
													className="QAText"
													style={{ overflowWrap: "break-word" }}
													dangerouslySetInnerHTML={{
														__html: item.value ? item.value : "",
													}}
												/>
												{item.value && item.value.length ? <hr /> : null}
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
									<Dropdown.Item
										onClick={() =>
											props.copyCard({
												item: props.item,
												itemType: "questions",
											})
										}
									>
										copy
									</Dropdown.Item>
									<Dropdown.Item
										onClick={() =>
											props.editCard(props.p, props.s, props.num, "questions")
										}
									>
										add/ edit
									</Dropdown.Item>
									<Dropdown.Item
										onClick={() =>
											props.deleteCard(props.p, props.s, props.num, "questions")
										}
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
											{currentQAItems.map(
												({ answer = "", value = "" }, index) => (
													<div key={index + "_a"}>
														<label>Title</label>
														<input
															className="w-100"
															value={answer}
															onChange={e => setType(e, index)}
															type="text"
															name="qustion"
															placeholder="Answer Title"
														></input>
														<ReactQuill
															value={value}
															onChange={value =>
																editCurrentQAItem(index, value)
															}
														/>
													</div>
												)
											)}
										</div>
										<button onClick={addCurrentQAItem}>+add answer</button>
										<button type="submit">Save</button>
									</form>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</ReactResizeDetector>
	);
};

export default QA;
