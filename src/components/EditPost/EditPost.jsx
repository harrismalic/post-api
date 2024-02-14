import React, { useEffect, useState } from "react";
import { apiBaseUrl } from "../../App";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";

const EditPost = ({ editPostId, getPost }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editPostId) {
      getPostById(editPostId);
    }
  }, [editPostId]);

  const getPostById = (postId) => {
    fetch(`${apiBaseUrl}/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data, "data");
        setTitle(data.title);
        setBody(data.body);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateFormSubmitHandler = (event) => {
    event.preventDefault();
    if (!title || !body) {
      Swal.fire("Please fill the form", "", "error");
      return;
    }
    setLoading(true);
    const payLoad = {
      title,
      body,
    };

    fetch(`${apiBaseUrl}/${editPostId}`, {
      method: "PUT",
      body: JSON.stringify(payLoad),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data, "data");
        setTitle("");
        setBody("");
        Swal.fire("Post is updated successfully", "", "success");

        const $ = window.$;
        $("#edit-post").modal("hide");
        setLoading(false);
        getPost();
      })
      .catch((error) => {
        console.log(error);
        Swal.fire(error, "", "error");
        setLoading(false);
      });
  };

  return (
    <div className="modal fade" id="edit-post">
      <Loader loader={loading} />

      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              &times;
            </button>
            <h4 className="modal-title">Edit Post</h4>
          </div>
          <div className="modal-body">
            <form
              action=""
              method="POST"
              role="form"
              id="edit-post-form"
              onSubmit={updateFormSubmitHandler}
            >
              <input type="hidden" name="post_id" id="edit_post_id" />
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="edit_post_title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => {
                    e.preventDefault();
                    setTitle(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label>Body</label>
                <textarea
                  name=""
                  id="edit_post_body"
                  cols="30"
                  rows="10"
                  placeholder="Body"
                  className="form-control"
                  value={body}
                  onChange={(e) => {
                    e.preventDefault();
                    setBody(e.target.value);
                  }}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
