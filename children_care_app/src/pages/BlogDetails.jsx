import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/BlogDetails.css"; // Import CSS


const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:5190/api/blogs/${id}`)
            .then((response) => setBlog(response.data))
            .catch((error) => console.error("Error fetching blog:", error));
    }, [id]);

    if (!blog) return <p>Loading...</p>;

    return (
        <div className="blog-details">
            <section className="blog-content">
                <h1>{blog.title}</h1>
                <p>Author: {blog.author}</p>
                <p>Updated: {new Date(blog.updatedAt).toLocaleDateString()}</p>
                <p>Category: {blog.category}</p>
                <h1>Content:</h1>
                <div>
                    <img width={400} src={blog.thumbnail || "placeholder.jpg"} alt={blog.title}/>
                </div>
                <div>{blog.content}</div>
            </section>
            <aside className="sidebar">
                <input type="text" placeholder="Search blogs..." />
            </aside>
        </div>
    );
};

export default BlogDetails;