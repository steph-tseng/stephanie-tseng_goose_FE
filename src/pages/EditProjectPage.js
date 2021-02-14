import React, { useEffect, useState, useRef } from "react";
import { makeStyles, ThemeProvider, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatSizeIcon from "@material-ui/icons/FormatSize";
import FormatStrikethroughIcon from "@material-ui/icons/FormatStrikethrough";
import LinkIcon from "@material-ui/icons/Link";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import topicActions from "../redux/actions/topic.actions";
import routeActions from "../redux/actions/route.actions";
import projectActions from "../redux/actions/project.actions";
import {
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Tooltip,
  Typography,
  withStyles,
} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import ReactMarkdown from "react-markdown";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      color: theme.palette.primary.main,
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    // backgroundColor: theme.palette.background.paper,
    border: "1px solid rgb(33, 37, 41, .35)",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#4051b5",
      borderWidth: "2px",
      // transform: "translate(14px, 20px) scale(1)",
      // boxShadow: "0 0 0 0.2rem rgba(106,117,163, .25)",
    },
    "&:hover": {
      border: "1px solid rgb(33, 37, 41, 1)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      // width: "25ch",
    },
    backgroundImage:
      "url(data:image/jpeg;base64,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)",
    backgroundSize: "100vw, 100vh",
  },
  spacing: {
    margin: theme.spacing(1),
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  main: {
    marginTop: theme.spacing(10),
    marginLeft: "2rem",
    textAlign: "center",
    height: "105vh",
    border: "solid",
    borderWidth: "1px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  preview: {
    marginTop: theme.spacing(10),
    marginLeft: "2rem",
    height: "105vh",
    borderWidth: "1px",
    padding: "20px",
    borderRadius: "10px",
    justifyContent: "center",
    // color: theme.palette.primary.dark,
    overflowY: "scroll",
    backgroundColor: "rgba(26, 45, 78,0.7)",
    backdropFilter: "blur(10px)",
    border: "1px solid black",
    color: "#fff",
  },
  textBox: {
    width: "95%",
    // padding: "5px",
    borderRadius: "5px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
    width: "95%",
  },
  tagsBox: {
    width: "95%",
    // padding: "5px",
    marginBottom: theme.spacing(2),
  },
  editingBtnGroup: {
    display: "flex",
    justifyContent: "left",
    // width: "95%",
    // flexGrow: 1,
    width: "100%",
  },
  btnGroup: {
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    "&:hover": { backgroundColor: theme.palette.primary.hover },
    width: "100%",
  },
  btnPadding: {
    width: "100%",
  },
  disabledButton: {
    backgroundColor: theme.palette.primary.disabled,
    color: "#fff",
  },
  h2: {
    fontSize: "3vw",
    color: theme.palette.primary.dark,
  },
  previewh2: {
    fontSize: "3vw",
    color: "#fff",
  },
}));

const AddEditProjectPage = () => {
  const textAreaRef = useRef(null);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    topicId: "",
    tags: [],
    images: [],
  });
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const topics = useSelector((state) => state.topic.allTopics);
  const project = useSelector((state) => state.project.selectedProject);
  const currentUser = useSelector((state) => state.auth.user);
  // console.log("project", project);
  const addOrEdit = useRef(null);
  const params = useParams();
  // console.log("prms", params);
  if (params.id) {
    addOrEdit.current = "Edit";
  } else {
    addOrEdit.current = "Add";
  }

  // if (project?.author?._id === currentUser._id) {
  //   addOrEdit.current = project === null ? "Add" : "Edit";
  // } else {
  //   addOrEdit.current = "Add";
  // }

  useEffect(() => {
    if (project && addOrEdit.current === "Edit") {
      setFormData((formData) => ({
        ...formData,
        title: project.title,
        content: project.content,
        topicId: project.topicId,
        tags: project.tags.join(", "),
      }));
    }
  }, [project, dispatch, addOrEdit]);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(e);

    // if (e.target.name === "content") {
    //   console.log(e);
    //   console.log(textAreaRef.current.currentPosition);
    // }
  };

  const handleSubmitProject = (e) => {
    e.preventDefault();
    const { title, content, topicId, images } = formData;
    const { tags } = formData;
    if (addOrEdit.current === "Add") {
      if (tags.includes(", ")) {
        const tagArray = tags.split(", ");
        dispatch(
          projectActions.createNewProject({
            title,
            content,
            topicId,
            tagArray,
            images,
          })
        );
      } else {
        dispatch(projectActions.createNewProject(formData));
      }
    } else if (addOrEdit === "Edit") {
      // console.log("form", formData);
      const projectId = project._id;
      // console.log(projectId);
      if (tags.includes(", ")) {
        const tagArray = tags.split(", ");
        dispatch(
          projectActions.updateProject({
            projectId,
            title,
            content,
            topicId,
            tagArray,
            images,
          })
        );
      } else {
        dispatch(projectActions.updateProject(project._id, formData));
      }
    }
    history.goBack();
  };

  useEffect(() => {
    dispatch(topicActions.allTopicsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (redirectTo) {
      if (redirectTo === "__GO_BACK__") {
        history.goBack();
        dispatch(routeActions.removeRedirectTo());
      } else {
        history.push(redirectTo);
        dispatch(routeActions.removeRedirectTo());
      }
    }
  }, [redirectTo, dispatch, history]);

  const insertMetachars = (sStartTag, sEndTag) => {
    const oMsgInput = textAreaRef.current.childNodes[1].childNodes[0];
    const nSelStart = oMsgInput.selectionStart;
    const nSelEnd = oMsgInput.selectionEnd;
    const sOldText = oMsgInput.value;
    setFormData({
      ...formData,
      content:
        sOldText.substring(0, nSelStart) +
        (sStartTag + sOldText.substring(nSelStart, nSelEnd) + sEndTag) +
        sOldText.substring(nSelEnd),
    });

    oMsgInput.setSelectionRange(
      nSelStart === nSelEnd ? nSelStart + sStartTag.length : nSelStart,
      nSelEnd + sStartTag.length
    );
    oMsgInput.focus();
  };

  const handleCancelBtn = () => {
    dispatch(projectActions.cancelSelected());
    history.goBack();
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container className={classes.root}>
        <Grid item xs={8} sm={11} md={6} lg={7}>
          <div className={classes.main}>
            <Typography variant="h2" align="center" className={classes.h2}>
              {addOrEdit === "Edit" ? "Update Project" : "New Project"}
            </Typography>
            <form className={classes.spacing} noValidate autoComplete="off">
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                className={classes.textBox}
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
              />
              <ButtonGroup
                variant="text"
                color="primary"
                aria-label="text primary button group"
                className={classes.editingBtnGroup}
              >
                <Tooltip title="Bold">
                  <Button onClick={() => insertMetachars("**", "**")}>
                    <FormatBoldIcon fontSize="small" />
                  </Button>
                </Tooltip>
                <Tooltip title="Italicize">
                  <Button onClick={() => insertMetachars("_", "_")}>
                    <FormatItalicIcon fontSize="small" />
                  </Button>
                </Tooltip>
                <Tooltip title="Underline">
                  <Button onClick={() => insertMetachars("<u>", "</u>")}>
                    <FormatUnderlinedIcon fontSize="small" />
                  </Button>
                </Tooltip>
                <Tooltip title="List">
                  <Button
                    onClick={() => insertMetachars("<ul><li>", "</li></ul>")}
                  >
                    <FormatListBulletedIcon fontSize="small" />
                  </Button>
                </Tooltip>
                <Tooltip title="Strikethrough">
                  <Button onClick={() => insertMetachars("<del>", "</del>")}>
                    <FormatStrikethroughIcon fontSize="small" />
                  </Button>
                </Tooltip>
                <Tooltip title="Decrease font size">
                  <Button
                    onClick={() => insertMetachars("<small>", "</small>")}
                  >
                    <FormatSizeIcon fontSize="small" />
                  </Button>
                </Tooltip>
                <Tooltip title="Link">
                  <Button onClick={() => insertMetachars("[", "](link)")}>
                    <LinkIcon fontSize="small" />
                  </Button>
                </Tooltip>
              </ButtonGroup>
              <TextField
                ref={textAreaRef}
                id="outlined-textarea"
                label="Content"
                placeholder="Content"
                name="content"
                multiline
                rows={15}
                variant="outlined"
                className={classes.textBox}
                value={formData.content}
                onChange={handleChange}
              />
              {/* <TextField
            id="outlined-basic"
            label="Project Id"
            variant="outlined"
            className={classes.textBox}
            name="topicId"
            value={formData.topicId}
            onChange={handleChange}
          /> */}
              <TextField
                id="outlined-basic"
                label="Image"
                variant="outlined"
                className={classes.textBox}
                name="images"
                value={formData.images}
                onChange={handleChange}
                placeholder="Image URL"
              />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-label-placeholder">
                  Topic
                </InputLabel>
                <NativeSelect
                  id="demo-customized-select-native"
                  name="topicId"
                  value={formData.topicId}
                  onChange={handleChange}
                  input={<BootstrapInput />}
                >
                  <option value="">None</option>
                  {topics.map((topic) => (
                    <option key={topic._id} value={topic._id}>
                      {topic.title}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
              <TextField
                id="outlined-basic"
                label="Tags"
                variant="outlined"
                className={classes.tagsBox}
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Tags separated by commas"
              />
            </form>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
              style={{ overflowX: "scroll" }}
              className={classes.btnGroup}
            >
              <Grid
                container
                justify="center"
                style={{
                  width: "93%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid item xs={6} sm={6} lg={6}>
                  <Button
                    variant="outlined"
                    className={classes.btn}
                    onClick={handleSubmitProject}
                    disabled={!formData.content}
                    classes={{ disabled: classes.disabledButton }}
                  >
                    {addOrEdit.current === "Edit" ? "Update" : "Submit"}
                  </Button>
                </Grid>
                <Grid item xs={6} sm={6} lg={6}>
                  <Button
                    variant="outlined"
                    className={classes.btnPadding}
                    onClick={handleCancelBtn}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </ButtonGroup>
          </div>
        </Grid>
        <Grid item xs={8} sm={11} md={5} lg={4}>
          <div className={classes.preview}>
            <Typography variant="h2" className={classes.previewh2}>
              Preview
            </Typography>
            <hr />
            <Typography variant="h3">{formData.title}</Typography>
            <br />
            <Typography variant="h5" style={{ marginTop: "-20px" }}>
              <ReactMarkdown allowDangerousHtml>
                {formData.content}
              </ReactMarkdown>
            </Typography>
            <hr style={{ marginTop: "50vh" }} />
            {/* <h6>{formData.topicId}</h6> */}
            <Typography variant="subtitle1">#{formData.tags}</Typography>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default AddEditProjectPage;
