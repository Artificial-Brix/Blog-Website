import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const CONTENT_API_KEY = "1ec9ee62fb56a8f2258e4e2573";
const BLOG_URL = "http://localhost:2368";

async function getPost(slug: string) {
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&include=authors`
  ).then((res) => res.json());

  const posts = res.posts;
  // console.log(posts.authors);

  return posts[0];
}

export const getStaticProps = async ({ params }) => {
  const post = await getPost(params.slug);
  return {
    props: { post },
    revalidate: 10,
  };
};

type Post = {
  title: string;
  html: string;
  slug: string;
  authors: [string];
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

const Post: React.FC<{ post: Post }> = (props) => {
  const router = useRouter();

  const { post } = props;
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  // console.log(post.authors);
  return (
    <div style={{ backgroundColor: "#15171a" }}>
      <header>
        <nav className={styles.navbar}>
          <img
            className={styles.ABlogo}
            src="https://media-exp1.licdn.com/dms/image/C560BAQFvseEkqmA7nw/company-logo_200_200/0/1608369027923?e=2159024400&v=beta&t=R7QXw4D-3MvoXsSq-_Avcnle9mlFDFNGnUC0LlqMnSk"
            alt="Artificial Brix"
          />
          <span className={styles.txt_ctr}>
            <span>categories</span>
            <Link href="/">
              <span>mainPage</span>
            </Link>
          </span>
          <span className={styles.nav_icons}>
            <Link href="https://www.facebook.com/artificialbrix">
              <FaFacebookF className={styles.ico} />
            </Link>
            <Link href="https://in.linkedin.com/company/artificial-brix">
              <FaLinkedinIn className={styles.ico} />
            </Link>
          </span>
        </nav>
      </header>
      <div className="read-container">
        <Link href="/">
          <a>Go back simon</a>
        </Link>
        <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
        <style jsx global>
          {`
            .read-container {
              max-width: 600px;
              margin: 0 auto;
            }
            img {
              max-width: 100%;
              height: auto;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Post;
