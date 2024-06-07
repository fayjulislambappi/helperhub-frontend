import { Box, Button, Divider, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CommentList from "../components/CommentList";
import { io } from "socket.io-client";
import axiosInstance from "./axiosInstance";
import "./Pro.css";
import Header from "../components/Shared/Header/Header";

const socket = io("/", {
  reconnection: true,
});

const SingleItem = () => {
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
  //fetch single item
  const displaySingleItem = async () => {
    setLoading(true);
    try {
      //
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/item/${id}`
      );
      setTitle(data.item.title);
      setContent(data.item.content);
      setImage(data.item.image.url);
      setCreatedAt(data.item.createdAt);
      setLoading(false);
      setComments(data.item.comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displaySingleItem();
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
        `${process.env.REACT_APP_API_URL}/api/comment/item/${id}`,
        { comment }
      );
      if (data.success === true) {
        setComment("");
        toast.success("comment added");

        socket.emit("comment", data.item.comments);
      }
      //console.log("comment item", data.item)
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  let uiCommentUpdate =
    commentsRealTime.length > 0 ? commentsRealTime : comments;

  return (
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
            <div className="container singlepro-bg">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-12">
                  <img
                    src={image}
                    className="img-fluid pt-2 border"
                    alt="name"
                  />
                  <h2>{title}</h2>

                  <p>{content}</p>
                </div>
                <div className="col-lg-9 col-md-9 col-sm-12 mt-3">
                  <p>
                    <b>Details:</b> Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to
                    make a type specimen book. It has survived not only five
                    centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. It was popularised in the
                    1960s with the release of Letraset sheets containing Lorem
                    Ipsum passages, and more recently with desktop publishing
                    software like Aldus PageMaker including versions of Lorem
                    Ipsum
                  </p>
                  <p>
                    <b>Formula: </b>Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to
                    make a type specimen book. It has survived not only five
                    centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. It was popularised in the
                    1960s with the release of Letraset sheets containing Lorem
                    Ipsum passages, and more recently with desktop publishing
                    software like Aldus PageMaker including versions of Lorem
                    Ipsum
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </Box>
    </div>
  );
};

export default SingleItem;
