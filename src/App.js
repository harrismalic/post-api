import React, { useEffect, useState } from "react";
import "./App.css";
import Swal from "sweetalert2";
import CreatePost from "./components/CreatePost/CreatePost";
import EditPost from "./components/EditPost/EditPost";
import Loader from "./components/Loader/Loader";

export const apiBaseUrl = `https://jsonplaceholder.typicode.com/posts`;

function App() {
  const [post, setPost] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = () => {
    setLoader(true);
    fetch(apiBaseUrl)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const deletePostById = (postId) => {
    fetch(`${apiBaseUrl}/${postId}`, {
      method: "DELETE",
    })
      .then(() => {
        getPost();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Something went wrong!",
          text: "Your file has not been deleted.",
          icon: "error",
        });
      });
  };

  const deleteBtnHandler = (event, postId) => {
    event.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePostById(postId);
      }
    });
  };

  const editBtnHandler = (event, postId) => {
    event.preventDefault();
    setEditPostId(postId);
    const $ = window.$;
    $("#edit-post").modal("show");
  };

  return (
    <>
      <Loader loader={loader} />
      <div className="container">
        <h1>Posts</h1>
        <a className="btn btn-primary" data-toggle="modal" href="#create-post">
          Create Post
        </a>
        <CreatePost getPost={getPost} />

        {/* <!-- EDIT POST POPUP --> */}
        <EditPost editPostId={editPostId} getPost={getPost} />
        {/* <!-- EDIT POST POPUP END --> */}

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Post Id</th>
              <th>User Id</th>
              <th>Title</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody id="todos-listing">
            {post.map((singlePost) => {
              return (
                <tr key={singlePost.id}>
                  <td>{singlePost.id}</td>
                  <td>{singlePost.userId}</td>
                  <td>{singlePost.title}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={(event) => editBtnHandler(event, singlePost.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(event) =>
                        deleteBtnHandler(event, singlePost.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
