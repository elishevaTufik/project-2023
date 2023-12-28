import GetAllPosts from "./GetAllPosts";

function Posts(props) {

  const searchVal=props.searchVal

  return (
    <div className="Posts">
      <br/>
      <GetAllPosts page="posts" searchVal={searchVal}/>
    </div>
  );
}

export default Posts;
