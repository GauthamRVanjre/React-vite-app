import "./App.css";
import { Posts } from "./utils/types";
import { useQuery } from "@tanstack/react-query";

function App() {
  // const [posts, setPosts] = useState<Posts[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  async function getPosts() {
    console.log("hit");
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("error fetching data");
    }
    return response.json();
  }

  // useEffect(() => {
  //   getPosts();
  // }, []);

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<Posts[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <main>
      {/* {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {posts.map((d) => (
            <li
              style={{
                textAlign: "left",
              }}
              key={d.id}
            >
              {d.title}
            </li>
          ))}
        </ul>
      )} */}

      <ul>
        {posts?.map((post) => (
          <li
            style={{
              textAlign: "left",
            }}
            key={post.id}
          >
            {post.title}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
