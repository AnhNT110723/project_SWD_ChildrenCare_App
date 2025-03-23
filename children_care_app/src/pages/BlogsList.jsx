import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/BlogsList.css"; // Import CSS


const BlogsList = () => {
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchBlogs();
    }, [page, search]);

    const fetchBlogs = () => {
        axios
            .get(`http://localhost:5190/api/blogs?page=${page}&search=${search}`)
            .then((response) => {
                setBlogs(response.data.blogs);
                setTotalPages(Math.ceil(response.data.totalItems / response.data.pageSize));
            })
            .catch((error) => console.error("Error fetching blogs:", error));
    };

    return (
        <div className="blogs-list">
            <section className="blogs">
                <h2>Blogs List</h2>
                <div className="blogs-container">
                    {blogs.map((blog) => (
                        <Link key={blog.id} to={`/blog/${blog.id}`} className="blog-card">
                            <img src={blog.thumbnail || "placeholder.jpg"} alt={blog.title} />
                            <h3>{blog.title}</h3>
                            <p>{blog.briefInfo}</p>
                        </Link>
                    ))}
                </div>
                <div className="pagination">
                    <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                    <span>Page {page} of {totalPages}</span>
                    <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
                </div>
            </section>
            <aside className="sidebar">
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </aside>
        </div>
    );
};

export default BlogsList;