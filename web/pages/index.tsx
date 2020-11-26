import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
// import { getPosts } from "./api/posts";

const CONTENT_API_KEY = "1ec9ee62fb56a8f2258e4e2573";
const BLOG_URL = "http://localhost:2368";

type Post = {
  title: string;
  slug: string;
};

async function getPosts() {
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,excerpt,reading_time`
  ).then((res) => res.json());

  const posts = res.posts;

  console.log(posts);

  return posts;
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts();
  return {
    props: { posts },
  };
};

const Home: React.FC<{ posts: Post[] }> = (props) => {
  return (
    <div className={styles.container}>
      <h1>HEllo :)</h1>
      {props.posts.map((post, index) => {
        return (
          <li key={index}>
            <Link href="post/[slug]" as={`post/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        );
      })}
    </div>
  );
};

export default Home;
