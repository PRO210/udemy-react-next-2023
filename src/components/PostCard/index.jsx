import P from 'prop-types';
import './styles.css'

export const PostCard = ({ title, cover, body, id }) => (
    <div className="post">
        <img src={cover} alt={title} />
        <div className="post-content">
            <h2>{title} {id}</h2>
            <p>{body}</p>
        </div>
    </div>
);
    // <div className='post'>
    //     <img src={post.cover} alt={post.title} />
    //     <div className="post-content">
    //         <h2>{post.id} - {post.title}</h2>
    //         <p>{post.body}</p>
    //     </div>
    // </div>

    PostCard.propTypes = {
      title: P.string.isRequired,
      cover: P.string.isRequired,
      body: P.string.isRequired,
      id: P.number.isRequired,
    };
