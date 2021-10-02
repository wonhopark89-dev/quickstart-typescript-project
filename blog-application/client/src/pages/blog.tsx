import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { match, Redirect, RouteComponentProps, useHistory, withRouter } from 'react-router';
import config from '../config/config';
import logging from '../config/logging';
import UserContext from '../contexts/user';
import IBlog from '../interfaces/blog';
import IPageProps from '../interfaces/page';
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import LoadingComponent, { Loading } from '../components/LoadingComponent';
import { Button, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import ErrorText from '../components/ErrorText';
import { Editor } from 'react-draft-wysiwyg';
import SuccessText from '../components/SuccessText';
import { Link } from 'react-router-dom';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import IUser from '../interfaces/user';

const BlogPage: React.FunctionComponent<IPageProps & RouteComponentProps<any>> = props => {
    const [_id, setId] = useState<string>("");
    const [blog, setBlog] = useState<IBlog | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const [modal, setModal] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);


    const { user } = useContext(UserContext).userState;
    const history = useHistory();

    useEffect(() => {
        // https://wooooooak.github.io/frontend/2018/11/02/Typescript%EC%99%80-React%EC%97%90%EC%84%9C-match-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/
        // let blogID = props.match.blogID; // fixme : TS2339 
        let blogID = props.match.params.blogID;

        if (blogID) {
            setId(blogID);
        } else {
            history.push("/");
        }
    }, []);

    useEffect(() => {
        if (_id !== "") {
            getBlog();
        }
    }, [_id]);

    const getBlog = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: `${config.server.url}/blogs/read/${_id}`
            });

            if (response.status === 200 || response.status === 304) {
                setBlog(response.data.blog);
            } else {
                setError(`Unable to retrieve blog ${_id}`);
            }

        } catch (error) {
            setError(JSON.stringify(error));
        } finally {
            setLoading(false);
        }
    };


    const deleteBlog = async () => {
        setDeleting(true);

        try {
            const response = await axios({
                method: "DELETE",
                url: `${config.server.url}/blogs/${_id}`
            });

            if (response.status === 201) {
                history.push("/");
            } else {
                setError(`Unable to retrieve blog ${_id}`);
                setDeleting(false);
            }

        } catch (error) {
            setError(JSON.stringify(error));
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        setError(error);
        setDeleting(false);
    }

    if (loading) {
        return <LoadingComponent>Loading BLog ...</LoadingComponent>;
    }

    if (blog) {
        return (
            <Container fluid className="p-0">
                <Navigation />
                <Modal isOpen={modal}>
                    <ModalHeader>
                        Delete
                    </ModalHeader>
                    <ModalBody>
                        {deleting ?
                            <Loading />
                            : "Are you sure you want to delete this blog ?"
                        }
                        <ErrorText error={error} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => deleteBlog()}>Delete Permanently</Button>
                        <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Header
                    image={blog.picture || undefined}
                    headline={blog.headline}
                    title={blog.title}>
                    <p className="text-white">Posted by {(blog.author as IUser).name} on {new Date(blog.createdAt).toLocaleString()}</p>
                </Header>
                <Container className="mt-5">
                    {user._id === (blog.author as IUser)._id &&
                        <Container fluid className="p-0">
                            <Button
                                color="info"
                                className="mr-2"
                                tag={Link}
                                to={`/edit/${blog._id}`}
                            >
                                <i className="fas fa-edit mr-2">Edit</i>
                            </Button>
                        </Container>
                    }
                </Container>
            </Container>
        );
    } else {
        return <Redirect to="/" />;
    }

};

export default BlogPage;