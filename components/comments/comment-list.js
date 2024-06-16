import classes from './comment-list.module.css';

function CommentList() {
  return (
    <ul className={classes.comments}>
      {/* dummy comments */}
      {/* Render list of comments ---> fetched from API */}
      <li>
        <p>My comment is...</p>
        <div>
          By <address>Me</address>
        </div>
      </li>
      <li>
        <p>It is amazing!</p>
        <div>
          By <address>Second person</address>
        </div>
      </li>
    </ul>
  );
}

export default CommentList;