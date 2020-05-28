import React, { useContext, useState, useEffect } from "react";
import "./index.scss";
import GridLayout from "react-grid-layout";
import { WidthProvider } from "react-grid-layout";
// import sizeMe from 'react-sizeme';

import Note from "../note/index";
import List from "../list/index";
import QA from "../qa/index";

import { ContextApp } from "../../Dapp";
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import { DropdownButton, Dropdown, Button } from "react-bootstrap";
import ListItemEditModal from "../modal/listItemEditModal";

const ReactGridLayout = WidthProvider(GridLayout);

const Section = props => {
	const {
		saveSize,
		savePos,
		saveSizeLayout,
		saveSizeBack,
		savePosBack,
	} = useContext(ContextApp);
	const [layout, changeLayout] = useState([]);
	const [timeOut, changeTimeout] = useState(null);
	const generateLayout = () => {
		let layoutTemp = [];
		props.notes.map((item, i) =>
			layoutTemp.push({
				i: `notes-${i}`,
				x: item.x || 0,
				y: item.y || 0,
				w: item.w ? Math.ceil(item.w) : Math.ceil(240 / 10),
				h: Math.ceil(item.h / 30),
			})
		);
		props.list.map((item, i) =>
			layoutTemp.push({
				i: `lists-${i}`,
				x: item.x || 0,
				y: item.y || 0,
				w: item.w ? Math.ceil(item.w) : Math.ceil(240 / 10),
				h: item.h
					? Math.ceil(item.h / 30)
					: item.url
					? Math.ceil(500 / 30)
					: Math.ceil(400 / 30),
			})
		);
		props.questions.map((item, i) =>
			layoutTemp.push({
				i: `questions-${i}`,
				x: item.x || 0,
				y: item.y || 0,
				w: item.w ? Math.ceil(item.w) : Math.ceil(240 / 10),
				h: item.h
					? Math.ceil(item.h / 30)
					: item.url
					? Math.ceil(500 / 30)
					: Math.ceil(400 / 30),
			})
		);
		return layoutTemp;
	};
	useEffect(() => {
		changeLayout(generateLayout());
	}, [props.list, props.notes, props.questions]);

	const layoutGenerator = () => {
		let layouts = [];
		[...props.notes, ...props.list, ...props.questions].map((item, index) => {
			layouts.push({
				i: index.toString(),
				x: item.x || 0,
				y: item.y || 0,
				w: item.w ? Math.ceil(item.w) : Math.ceil(240 / 30),
				h: item.h
					? Math.ceil(item.h / 30)
					: item.url
					? Math.ceil(500 / 30)
					: Math.ceil(400 / 30),
			});
		});
		return layouts;
	};

	return (
		<div className="Section">
			<header className="Header">
				{props.image_file && (
					<img src={URL.createObjectURL(props.image_file)} />
				)}
				<div className="Text">
					<h5>{props.title}</h5>
					<h6>{props.desc}</h6>
					{props.tags && (
						<div className="tags">
							{props.tags.split(",").map((item, index) => {
								return <span key={index + "__li"}>{item}</span>;
							})}
						</div>
					)}
				</div>
				<div className="sectionMenu">
					<DropdownButton
						alignRight
						className="clickgrid"
						id="dropdown-variants-secondary"
						variant="secondary"
						size="sm"
						title="Create Cards"
					>
						<Dropdown.Item
							onClick={() => props.addNote(props.num, props.postNum)}
						>
							+ note
						</Dropdown.Item>
						<Dropdown.Item
							onClick={() => props.addList(props.num, props.postNum)}
						>
							+ list
						</Dropdown.Item>
						<Dropdown.Item
							onClick={() => props.addQA(props.num, props.postNum)}
						>
							+ qa
						</Dropdown.Item>
					</DropdownButton>
					<Button
						variant="info"
						className="add_section_id"
						id="add_section_id"
						size="sm"
						onClick={() => props.toggleEditSection(props.num, props.postNum)}
					>
						Edit Section
					</Button>
					<Button
						variant="danger"
						className="add_section_id"
						id="add_section_id"
						size="sm"
						onClick={() => props.deleteSection(props.num, props.postNum)}
					>
						Delete Section
					</Button>
				</div>
			</header>
			<div className="Content">
				<ReactGridLayout
					className="layout unset-width"
					layout={layout}
					// onLayoutChange={onLayoutChange}
					onResize={(layout, old, newItem) => {
						console.log("newItemkkkk", newItem)
						saveSizeLayout(
							props.postNum,
							props.num,
							newItem,
							Number(newItem.h) * 30,
							Number(newItem.w)
						);
						changeTimeout(clearTimeout(timeOut));
						changeTimeout(
							setTimeout(() => {
								saveSizeBack(
									props.postNum,
									props.num,
									newItem,
									Number(newItem.h) * 30,
									Number(newItem.w)
								);
							}, 1500)
						);
					}}
					onDragStop={(layout, old, newItem, event) => {
						savePos(
							props.postNum,
							props.num,
							newItem,
							Number(newItem.x),
							Number(newItem.y),
							layout,
							event
						);
						changeTimeout(clearTimeout(timeOut));
						changeTimeout(
							setTimeout(() => {
								savePosBack(
									props.postNum,
									props.num,
									newItem,
									Number(newItem.x),
									Number(newItem.y)
								);
							}, 1500)
						);
					}}
					autoSize={true}
					draggableCancel=".Form"
					cols={10}
					rowHeight={30}
					width={1200}
					compactType="vertical"
				>
					{props.notes &&
						props.notes.map((item, index) => (
							<div key={`notes-${index}`}>
								<Note
									num={index}
									p={props.postNum}
									s={props.num}
									title={item.title}
									edit={item.edit}
									item={item}
									copyCard={props.copyCard}
									deleteCard={props.deleteCard}
									editCard={props.editCard}
									url={item.url}
									desc={item.description}
									tags={item.tags}
								/>
							</div>
						))}
					{props.list &&
						props.list.map((item, index) => (
							<div key={`lists-${index}`}>
								<List
									num={index}
									p={props.postNum}
									s={props.num}
									title={item.title}
									item={item}
									edit={item.edit}
									copyCard={props.copyCard}
									deleteCard={props.deleteCard}
									editCard={props.editCard}
									listing_items={item.listing_items}
								/>
							</div>
						))}
					{props.questions &&
						props.questions.map((item, index) => (
							<div key={`questions-${index}`}>
								<QA
									num={index}
									p={props.postNum}
									s={props.num}
									title={item.question}
									item={item}
									edit={item.edit}
									copyCard={props.copyCard}
									deleteCard={props.deleteCard}
									editCard={props.editCard}
									items={item.answers}
								/>
							</div>
						))}
				</ReactGridLayout>

				<button
					style={{ marginTop: "10px" }}
					onClick={() => props.pasteCard(props.postNum, props.num)}
				>
					paste
				</button>
			</div>
			<ListItemEditModal p={props.postNum} s={props.num} />
		</div>
	);
};

export default Section;
