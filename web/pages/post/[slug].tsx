import Link from "next/link";
import { useRouter } from "next/router";

const CONTENT_API_KEY = "1ec9ee62fb56a8f2258e4e2573";
const BLOG_URL = "http://localhost:2368";

async function getPost(slug: string) {
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,html`
  ).then((res) => res.json());

  const posts = res.posts;

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

  console.log(props);
  return (
    <div>
      <Link href="/">
        <a>Go back simon</a>
      </Link>
      <h1>hello</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
    </div>
  );
};

export default Post;
