// require ('./lib/gridstack/gridstack.all')
import React, { useState, useEffect } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Post from "./components/post";
import { connect } from "react-redux";
import "./styles/styles_grid.css";
import "./styles/styles.scss";
import "./styles/quill.snow.css";
import "./lib/gridstack/gridstack.min.css";
import { Formik } from "formik";
import * as Yup from "yup";
import * as post from "./store/actions/post";
import { Modal } from "react-bootstrap";
import Header from "./components/header/Header";


export const ContextApp = React.createContext();

function Dapp(props) {
	console.log("context Dapp", props)

	const [postsList, setPosts] = useState([]);
	const [copiedCard, copyCard] = useState({});
	const [edit, toggleEdit] = useState(false);
	const [postsFormVisible, setPostsFormVisible] = useState(false);
	const [postVal, changePostVal] = useState(0);
	const [secVal, changeSecVal] = useState({
		postId: 0,
		secId: 0,
	});

	const [sectionsFormVisible, setSectionsFormVisible] = useState(false);
	const [editedPost, setEditedPost] = useState(0);
	const [editValues, changeEditValues] = useState({});
	const [file, setFile] = useState();

	useEffect(() => {
		props.getPosts();
	}, []);

	// POSTS

	const savePost = values => {
		values.image_file = file;
		values.items = [];
		props.sendPost(values);

		setPostsFormVisible(false);
	};

	const toggleEditPost = i => {
		setPostsFormVisible(true);
		toggleEdit(true);
		changePostVal(i);
	};
	const editPost = values => {
		values.image_file = file;
		// posts.putPosts(postVal.id, values);
		// const newPosts = [...postsList];
		// let num = newPosts.findIndex(item => item.id === postVal.id);
		// newPosts[num] = { ...newPosts[num], ...values };
		// setPosts(newPosts);
		props.editPost(postVal, values, props.post[postVal]);
		setPostsFormVisible(false);
		toggleEdit(false);
	};
	const deletePost = i => {
		props.deletePost(i);
	};

	// SECTIONS
	const saveSection = values => {
		values.items = [];
		values.image_file = file;
		props.addSection(editedPost, values);
		setSectionsFormVisible(false);
	};

	const addSection = n => {
		setEditedPost(n);
		changeSecVal({ postId: n, secId: null });
		setSectionsFormVisible(true);
		toggleEdit(false);
		setSectionsFormVisible(true);
	};

	const toggleEditSection = (section, post) => {
		changeSecVal({ postId: post, secId: section });
		setSectionsFormVisible(true);
		toggleEdit(true);
	};

	const editSection = values => {
		values.image_file = file;
		props.editSection(
			secVal.postId,
			secVal.secId,
			values,
			props.post[secVal.postId].sections[secVal.secId]
		);
		setPostsFormVisible(false);
		toggleEdit(false);

		setSectionsFormVisible(false);
		toggleEdit(false);
	};

	const deleteSection = (sectionNum, postNum) => {
		props.deleteSection(postNum, sectionNum);
	};

	// NOTES
	const saveNote = (e, richText, p, s, i, h) => {
		let elem = {};
		const formData = new FormData(e.target);
		e.preventDefault();
		for (let entry of formData.entries()) {
			elem[entry[0]] = entry[1];
		}

		elem.description = richText;
		elem.edit = false;
		props.post[p].sections[s].notes[i].id !== undefined
			? props.editNotes(p, s, i, elem, h)
			: props.addNotes(p, s, i, elem, h);
	};
	const addNote = (s, p) => {
		let elem = {};
		elem.type = "note";
		elem.edit = true;
		elem.w = 5;
		elem.h = 400;
		elem.title = "";
		props.toggleAddNote(p, s, elem);
	};
	// LISTS

	const addList = (s, p) => {
		let elem = {};
		elem.type = "list";
		elem.edit = true;
		elem.title = "";
		elem.listing_items = [];
		elem.w = 5;
		elem.h = 400;

		props.addCreateList(p, s, elem);
	};

	const saveList = (e, listItems, p, s, i, h) => {
		let elem = {};
		console.log(h);
		const formData = new FormData(e.target);
		e.preventDefault();
		for (let entry of formData.entries()) {
			elem[entry[0]] = entry[1];
		}
		elem.type = "list";
		elem.edit = false;
		elem.listing_items = listItems;
		elem.w = props.post[p].sections[s].lists[i].w;
		elem.h = h;
		props.post[p].sections[s].lists[i].id !== undefined
			? props.editList(p, s, i, elem)
			: props.createList(p, s, i, elem);

		// posts_cloned[p].items[s].items[i] = elem;

		// setPosts([...posts_cloned]);
	};

	// QUESTIONS
	const addQA = (s, p) => {
		let elem = {};
		elem.type = "qa";
		elem.edit = true;
		elem.w = 80;
		elem.h = 600;
		elem.question = "";
		props.toggleAddQA(p, s, elem);
	};

	const saveQA = (e, currentQAItems, p, s, i) => {
		let elem = {};
		const formData = new FormData(e.target);
		e.preventDefault();
		for (let entry of formData.entries()) {
			elem[entry[0]] = entry[1];
		}

		elem.type = "qa";
		elem.answers = currentQAItems;

		elem.edit = false;

		let posts_cloned = props.post;
		elem.w = posts_cloned[p].sections[s].questions[i].w;
		elem.h = posts_cloned[p].sections[s].questions[i].h;

		props.post[p].sections[s].questions[i].id !== undefined
			? props.editQA(p, s, i, elem)
			: props.createQA(p, s, i, elem);
	};

	// OTHER
	const _handleImageChange = e => {
		e.preventDefault();

		let file = e.target.files[0];
		changePostVal(prev => ({ ...prev, file: file }));
		setFile(file);
	};

	const saveSize = (p, s, i, type, h, w) => {
		props.saveSize(p, s, i, type, h, w);
	};
	const saveSizeLayout = (p, s, newItem, h, w) => {
		console.log("need", p, s, newItem, h, w)
		let i = newItem.i.split("-")[1];
		let type = newItem.i.split("-")[0];
		props.saveSize(p, s, i, type, h, w);
	};

	const savePos = (p, s, newItem, x, y, old) => {
		let i = newItem.i.split("-")[1];
		let type = newItem.i.split("-")[0];
		props.savePos(p, s, i, x, y, type);
	};

	const savePosBack = (p, s, newItem, x, y, old) => {
		let i = newItem.i.split("-")[1];
		let type = newItem.i.split("-")[0];
		props.savePosBack(p, s, i, x, y, type);
	};

	const saveSizeBack = (p, s, newItem, h, w) => {
		let i = newItem.i.split("-")[1];
		let type = newItem.i.split("-")[0];
		props.saveSizeBack(p, s, i, type, h, w);
	};

	const pasteCard = (p, s) => {
		if (copiedCard) {
			const clone = JSON.parse(JSON.stringify(copiedCard));
			if (clone.itemType === "notes") {
				props.toggleAddNote(p, s, { ...clone.item, x: null, y: null });
				props.addNotes(p, s, props.post[p].sections[s].notes[-1], {
					...clone.item,
					x: null,
					y: null,
				});
			} else if (clone.itemType === "lists") {
				props.addCreateList(p, s, { ...clone.item, x: null, y: null });
				props.createList(p, s, props.post[p].sections[s].lists[-1], {
					...clone.item,
					x: null,
					y: null,
				});
			} else if (clone.itemType === "questions") {
				props.toggleAddQA(p, s, { ...clone.item, x: null, y: null });
				props.createQA(p, s, props.post[p].sections[s].questions[-1], {
					...clone.item,
					x: null,
					y: null,
				});
			}
		}
	};

	const deleteCard = (p, s, i, type) => {
		if (type === "notes") {
			props.deleteNotes(p, s, i);
		} else if (type === "lists") {
			props.deleteList(p, s, i);
		} else if (type === "questions") {
			props.deleteQA(p, s, i);
		}
	};

	const editCard = (p, s, i, type) => {
		if (type === "notes") {
			props.toggleEditNote(p, s, i);
		} else if (type === "lists") {
			props.toggleEditList(p, s, i);
		} else if (type === "questions") {
			props.toggleEditQA(p, s, i);
		}
	};

	return (
		<ContextApp.Provider
			value={{
				saveList,
				saveNote,
				saveQA,
				saveSize,
				savePos,
				saveSizeLayout,
				saveSizeBack,
				savePosBack,
			}}
		>
			<div className="App col-12">
				<button
					onClick={() => setPostsFormVisible(true)}
					className="post_btn"
					id="post_btn"
				>
					POST
				</button>
				<div className="SectionsList">
					{props.post.map((post, index) => {
						return (
							<Post
								pasteCard={pasteCard}
								key={index}
								num={index}
								tags={post.tags}
								copyCard={copyCard}
								deleteCard={deleteCard}
								editCard={editCard}
								addSection={addSection}
								deleteSection={deleteSection}
								addNote={addNote}
								addList={addList}
								addQA={addQA}
								deletePost={deletePost}
								toggleEditPost={toggleEditPost}
								toggleEditSection={toggleEditSection}
								title={post.title}
								description={post.description}
								items={post.sections}
								image_file={post.image_file}
							/>
						);
					})}
				</div>
				{/* Add post */}
				<Modal
					show={postsFormVisible}
					onHide={() => setPostsFormVisible(false)}
					dialogClassName="modalForm"
				>
					<Modal.Header closeButton>
						{edit ? "Edit Post" : "Add Post"}
					</Modal.Header>
					<Modal.Body>
						<div className="Form">
							<Formik
								initialValues={{
									title: edit ? props.post[postVal].title : "",
									description: edit ? props.post[postVal].description : "",
									image_file: null,
									tags: edit ? props.post[postVal].tags : "",
								}}
								onSubmit={edit ? editPost : savePost}
								validationSchema={Yup.object().shape({
									title: Yup.string().required("Required"),
								})}
							>
								{props => {
									const {
										values,
										touched,
										errors,
										dirty,
										isSubmitting,
										handleChange,
										handleBlur,
										handleSubmit,
										handleReset,
									} = props;
									return (
										<form onSubmit={handleSubmit}>
											<label>Title</label>
											<input
												type="text"
												name="title"
												value={values.title}
												onChange={handleChange}
											/>
											<label>Desc</label>
											<input
												type="text"
												name="description"
												value={values.description}
												onChange={handleChange}
											/>
											<label>Thumbnail image</label>
											<input
												className="fileInput"
												name="image_file"
												type="file"
												onChange={e => _handleImageChange(e)}
											/>
											<label>Tags</label>
											<input
												type="text"
												value={values.tags}
												name="tags"
												onChange={handleChange}
											/>
											<button type="submit" onClick={handleSubmit}>
												Save Post
											</button>
										</form>
									);
								}}
							</Formik>
						</div>
					</Modal.Body>
				</Modal>

				<Modal
					show={sectionsFormVisible}
					onHide={() => setSectionsFormVisible(false)}
					dialogClassName="modalForm"
				>
					<Modal.Header closeButton>
						{edit ? "Edit Section" : "Add Section"}
					</Modal.Header>
					<Modal.Body>
						<div className="Form">
							<Formik
								initialValues={{
									title: edit
										? props.post[secVal.postId].sections[secVal.secId].title
										: "",
									description: edit
										? props.post[secVal.postId].sections[secVal.secId]
												.description
										: "",
									image_file: null,
									tags: edit
										? props.post[secVal.postId].sections[secVal.secId].tags
										: "",
								}}
								onSubmit={edit ? editSection : saveSection}
								validationSchema={Yup.object().shape({
									title: Yup.string().required("Required"),
								})}
							>
								{props => {
									const {
										values,
										touched,
										errors,
										dirty,
										isSubmitting,
										handleChange,
										handleBlur,
										handleSubmit,
										handleReset,
									} = props;
									return (
										<form onSubmit={handleSubmit}>
											<label>Title</label>
											<input
												type="text"
												name="title"
												value={values.title}
												onChange={handleChange}
											/>
											<label>Desc</label>
											<input
												type="text"
												name="description"
												value={values.description}
												onChange={handleChange}
											/>
											<label>Thumbnail image</label>
											<input
												className="fileInput"
												name="image_file"
												type="file"
												onChange={e => _handleImageChange(e)}
											/>
											<label>Tags</label>
											<input
												type="text"
												value={values.tags}
												name="tags"
												onChange={handleChange}
											/>
											<button type="submit" onClick={handleSubmit}>
												Save Section
											</button>
										</form>
									);
								}}
							</Formik>
						</div>
					</Modal.Body>
				</Modal>
			</div>
		</ContextApp.Provider>
	);
}

const mapStateToProps = state => {
	return {
		post: state.post,
	};
};

const mapDispatchToProps = {
	getPosts: post.getPosts,
	sendPost: post.sendPost,
	editPost: post.editPost,
	deletePost: post.deletePost,
	addSection: post.addSection,
	editSection: post.editSection,
	deleteSection: post.deleteSection,
	addNotes: post.addNotes,
	toggleAddNote: post.toggleAddNote,
	editNotes: post.editNotes,
	deleteNotes: post.deleteNotes,
	saveSize: post.saveSize,
	addCreateList: post.addCreateList,
	createList: post.createList,
	editList: post.editList,
	deleteList: post.deleteList,
	toggleEditNote: post.toggleEditNote,
	toggleEditList: post.toggleEditList,
	toggleAddQA: post.toggleAddQA,
	createQA: post.createQA,
	editQA: post.editQA,
	deleteQA: post.deleteQA,
	toggleEditQA: post.toggleEditQA,
	savePos: post.savePos,
	saveSizeBack: post.saveSizeBack,
	savePosBack: post.savePosBack,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dapp);
