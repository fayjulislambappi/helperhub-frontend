import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, Divider, Grid } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import moment from "moment";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { toast } from "react-toastify";
import CommentList from "../components/CommentList";
import { io } from "socket.io-client";
import axiosInstance from "./axiosInstance";
import Header from "../components/Shared/Header/Header";
import { CartProvider } from "../hooks";
import Footer from "../components/Shared/Footer/Footer";

const socket = io("/", {
  reconnection: true,
});

const SinglePost = () => {
  const { userInfo } = useSelector((state) => state.signIn);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsRealTime, setCommentsRealTime] = useState([]);

  const { id } = useParams();
  //fetch single post
  const displaySinglePost = async () => {
    setLoading(true);
    try {
      //
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/post/${id}`
      );
      // console.log(data)
      setTitle(data.post.title);
      setContent(data.post.content);
      setImage(data.post.image.url);
      setCreatedAt(data.post.createdAt);
      setLoading(false);
      setComments(data.post.comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displaySinglePost();
  }, []);

  useEffect(() => {
    // console.log('SOCKET IO', socket);
    socket.on("new-comment", (newComment) => {
      setCommentsRealTime(newComment);
    });
  }, []);

  // add comment
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.put(
        `${process.env.REACT_APP_API_URL}/api/comment/post/${id}`,
        { comment }
      );
      if (data.success === true) {
        setComment("");
        toast.success("comment added");

        socket.emit("comment", data.post.comments);
      }
      //console.log("comment post", data.post)
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  let uiCommentUpdate =
    commentsRealTime.length > 0 ? commentsRealTime : comments;

  return (

    <>
    <CartProvider>
    <Header />
  </CartProvider>
    <div className="overflow-hidden">
      <Box
        sx={{
          bgcolor: "#fafafa",
          display: "flex",
          justifyContent: "center",
          pt: 4,
          pb: 4,
          minHeight: "100vh",
        }}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={8} md={6}>
                <Card
                  sx={{
                    maxWidth: "100%",
                    width: "80%",
                    height: "100%",
                    overFlow: "hidden",
                  }}
                >
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgColor: red[500] }} aria-label="recipe">
                        A
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={title}
                    subheader={moment(createdAt).format("MMMM DD, YYYY")}
                  />
                  <CardMedia
                    component="img"
                    sx={{
                      height: "300px",
                      width: "300px",
                      border: "1px solid gray",
                    }}
                    image={image}
                    alt={title}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      <Box
                        component="span"
                        dangerouslySetInnerHTML={{ __html: content }}
                      ></Box>
                    </Typography>
                    <Divider variant="inset" />
                    {/* add comment list */}
                    {comments.length === 0 ? (
                      ""
                    ) : (
                      <Typography variant="h5" sx={{ pt: 3, mb: 2 }}>
                        Comments:
                      </Typography>
                    )}

                    {uiCommentUpdate.map((comment) => (
                      <CommentList
                        key={comment._id}
                        name={comment.postedBy.name}
                        text={comment.text}
                      />
                    ))}

                    {userInfo ? (
                      <>
                        <Box sx={{ pt: 1, pl: 3, pb: 3, bgColor: "#fafafa" }} className="" >
                          <h4>Add your comment here!</h4>
                          <form onSubmit={addComment}>
                            <TextareaAutosize
                              onChange={(e) => setComment(e.target.value)}
                              value={comment}
                              aria-label="minimum height"
                              minRows={3}
                              placeholder="Add a comment..."
                              style={{ width: "80%", padding: "5px" }}
                            />
                            <Box sx={{ pt: 1 }}>
                              <Button type="submit" className="bg-danger text-white">
                                Comment
                              </Button>
                            </Box>
                          </form>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Link to="/login"> Log In to add a comment</Link>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </div>

    <Footer />
    </>
  );
};

export default SinglePost;
