import React, { useState, useContext, useEffect, useRef } from "react";
import "./index.scss";
import SortableList from "react-sortable-dnd-list";
import { ContextApp } from "../../Dapp";
import ReactResizeDetector from "react-resize-detector";
import { DropdownButton, Dropdown, ButtonGroup, Button } from "react-bootstrap";
import { TextArea } from "semantic-ui-react";
import { useDispatch, connect } from "react-redux";
import * as Actions from "../../store/actions";
import * as post from "../../store/actions/post";
const List = props => {
	const {
		list_edit_item,
		list_modal_show,
		list_save_item,
		list_edit_item_modal,
	} = props;

	const handleDelete = (p, s, i, list) => {
		dispatch(post.deleteListItems(p, s, i, list));
	};

	const dispatch = useDispatch();
	const [firstRender, toggleFirstRender] = useState(false);
	useEffect(() => {
		toggleFirstRender(true);
	}, []);

	useEffect(() => {
		if (props.edit === true) {
			titleInput.current.value = props.title;
			if (props.items) setListItems(props.items);
		}
		dispatch(Actions.setListEditItem(props.items));
	}, [props.edit, props.title]);

	const listItemInput = useRef(null);
	const titleInput = useRef(null);
	const [listItems, setListItems] = useState(props.listing_items);
	const { saveList, saveSize } = useContext(ContextApp);
	const container = useRef();

	const handleShow = (item, index) => {
		dispatch(Actions.setListModalShow(true));
		dispatch(
			Actions.setListEditItemIndex(
				item,
				index,
				props.item,
				props.p,
				props.s,
				props.num
			)
		);
	};

	const addListLine = (e, listItemInput) => {
		e.preventDefault();
		// if (listItemInput.current.value.length > 0) {
		// 	setListItems([...listItems, { title: listItemInput.current.value }]);

		// 	listItemInput.current.value = "";
		// }
		if (listItemInput.current.ref.current.value.length > 0) {
			setListItems([
				...listItems,
				{ title: listItemInput.current.ref.current.value },
			]);

			listItemInput.current.ref.current.value = "";
		}
	};

	useEffect(() => {
		if (firstRender) {
			saveSize(
				props.p,
				props.s,
				props.num,
				"lists",
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
				"lists",
				container.current.children[0].clientHeight,
				props.item.w
			);
		}
	}, []);
	return (
		<div className="List grid-stack-item-content">
			<header className="ListHeader">
				<h6>
					{props.edit
						? props.title.length > 0
							? "Edit list"
							: "Add List"
						: props.title}
				</h6>
			</header>
			<div
				ref={container}
				style={{
					height: props.item.h ? props.item.h : 240,
					width: `${100}%`,
				}}
			>
				<div>
					{!props.edit ? (
						<div className="ListContent">
							<ul>
								{props.listing_items &&
									props.listing_items.map((item, index) => {
										return (
											<li key={index}>
												{item.title}
												<ButtonGroup
													style={{ position: "absolute", right: "0px" }}
													aria-label="Basic example"
												>
													<Button
														variant="link"
														style={{ padding: "0" }}
														onClick={() => handleShow(item.title, index)}
													>
														E
													</Button>
													<Button
														variant="link"
														style={{ color: "red" }}
														onClick={() =>
															handleDelete(props.p, props.s, props.num, index)
														}
													>
														X
													</Button>
												</ButtonGroup>
											</li>
										);
									})}
							</ul>
							<DropdownButton
								className="List-dropdown"
								id="dropdown-variants-secondary"
								drop="right"
								variant="secondary"
								size="sm"
								title="Actions"
							>
								<Dropdown.Item
									onClick={() =>
										props.copyCard({ item: props.item, itemType: "lists" })
									}
								>
									copy
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() =>
										props.editCard(
											props.p,
											props.s,
											props.num,
											"lists",
											container
										)
									}
								>
									addlist
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() =>
										props.deleteCard(props.p, props.s, props.num, "lists")
									}
								>
									delete
								</Dropdown.Item>
							</DropdownButton>
						</div>
					) : (
						<div className="ListForm">
							<div className="Form">
								<form
									className="container"
									onSubmit={e => {
										saveList(e, listItems, props.p, props.s, props.num);
									}}
								>
									<label>Title</label>
									<input type="text" name="title" ref={titleInput} />
									<div className="enterLineHolder">
										<TextArea
											className="col-12 col-md-12 col-sm-12 col-xs-12"
											style={{ padding: "0" }}
											name="item"
											ref={listItemInput}
										/>
										<button
											className="col-12 col-md-12 col-sm-12 col-xs-12"
											onClick={e => addListLine(e, listItemInput)}
										>
											Add
										</button>
									</div>
									<SortableList
										className="list"
										itemComponent={ItemComponent}
										value={listItems}
										onChange={setListItems}
									/>

									<button type="submit">Save</button>
								</form>
							</div>
						</div>
					)}
				</div>
				<ReactResizeDetector handleWidth handleHeight />
			</div>
		</div>
	);
};

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

// export default List;

const mapStateToProps = state => {
	return {
		list_edit_item: state.list_edit_item,
		list_modal_show: state.list_modal_show,
		list_edit_item_modal: state.list_edit_item_modal,
		list_save_item: state.list_save_item,
	};
};

const mapDispatchToProps = {
	editListItems: post.editListItems,
};
export default connect(mapStateToProps, null)(List);
