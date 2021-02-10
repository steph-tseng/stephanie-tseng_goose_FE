import {
  Button,
  ButtonGroup,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import routeActions from "../redux/actions/route.actions";
import topicActions from "../redux/actions/topic.actions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,4)), url(https://media1.thehungryjpeg.com/thumbs2/ori_3739542_fenjdoj1fkcrzj6sfkf6tvpnw6xkgcf6ocy3euci_watercolor-blue-backgrounds-vol-2.jpg)",
    backgroundSize: "100vw 100vh",
    margin: 0,
    minHeight: "100vh",
  },
  spacing: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    paddingBottom: 0,
  },
  main: {
    marginLeft: "2rem",
    textAlign: "center",
    width: "50vw",
    border: "solid",
    borderWidth: "1px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingBottom: theme.spacing(3),
    maxHeight: "70vh",
  },
  textBox: {
    width: "95%",
    padding: "5px",
  },
  btnGroup: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: 0,
    marginTop: theme.spacing(1),
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    "&:hover": { backgroundColor: theme.palette.primary.hover },
    paddingLeft: "10vw",
    paddingRight: "10vw",
  },
  btnPadding: {
    paddingLeft: "10vw",
    paddingRight: "10vw",
  },
  disabledButton: {
    backgroundColor: theme.palette.primary.disabled,
    color: "#fff",
  },
}));

const EditTopicPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const topic = useSelector((state) => state.topic.selectedTopic);
  const addOrEdit = topic === null ? "Add" : "Edit";

  useEffect(() => {
    if (addOrEdit === "Edit") {
      setFormData((formData) => ({
        ...formData,
        title: topic.title,
        description: topic.description,
        image: topic.image,
      }));
    }
  }, [topic, dispatch, addOrEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitTopic = (e) => {
    e.preventDefault();
    const { title, description, image } = formData;
    if (addOrEdit === "Add") {
      dispatch(topicActions.createNewTopic(title, description, image));
    } else {
      const topicId = topic._id;
      // const { title, description, image } = formData;
      dispatch(topicActions.updateTopic(topicId, formData));
    }
  };

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

  const handleCancelBtn = () => {
    dispatch(topicActions.cancelSelected());
    history.goBack();
  };

  return (
    <Grid
      container
      justify="center"
      alignContent="center"
      className={classes.root}
    >
      <div className={classes.main}>
        <Typography variant="h2">
          {addOrEdit === "Edit" ? "Update Topic" : "New Topic"}
        </Typography>
        {/* <Markdown children={content} options={options} /> */}
        <form className={classes.spacing} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            name="title"
            className={classes.textBox}
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            id="outlined-textarea"
            label="Description"
            placeholder="Description"
            multiline
            rows={8}
            variant="outlined"
            className={classes.textBox}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            id="outlined-textarea"
            label="Image Url"
            placeholder="Image Url"
            multiline
            rows={1}
            variant="outlined"
            className={classes.textBox}
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </form>
        <ButtonGroup
          color="primary"
          aria-label="outlined primary button group"
          className={classes.btnGroup}
        >
          <Button
            variant="outlined"
            className={classes.btn}
            onClick={handleSubmitTopic}
            disabled={!formData.description}
            classes={{ disabled: classes.disabledButton }}
          >
            {addOrEdit === "Edit" ? "Update" : "Submit"}
          </Button>
          <Button
            variant="outlined"
            className={classes.btnPadding}
            onClick={handleCancelBtn}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </div>
    </Grid>
  );
};

export default EditTopicPage;
