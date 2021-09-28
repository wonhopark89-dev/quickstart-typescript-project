import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';
import IBlog from '../../interfaces/blog';

// export interface IBlogPreviewProps {
//     _id: string;
//     title: string;
//     headline: string;
//     author: string;
//     createdAt: string;
//     updatedAt: string;
// }

export interface IBlogPreviewProps extends Pick<IBlog, "_id" | "title" | "headline" | "author" | "createdAt" | "updatedAt"> { }

const BlogPreview: React.FunctionComponent<IBlogPreviewProps> = props => {
    const { _id, title, headline, author, createdAt, updatedAt, children } = props;
    return (
        <Card className="border-0">
            <CardBody className="p-0">
                <Link to={`/blogs/${_id}`} style={{ textDecoration: "none" }} className="text-primary">
                    <h1><strong>{title}</strong></h1>
                    <h3>{headline}</h3><br />
                </Link>
                {createdAt !== updatedAt ?
                    <p>Updated by {author} at {new Date(updatedAt).toLocaleDateString()}</p>
                    : <p>Posted by {author} at {new Date(createdAt).toLocaleDateString()}</p>
                }
                {children}
            </CardBody>
        </Card>
    );
};

export default BlogPreview;