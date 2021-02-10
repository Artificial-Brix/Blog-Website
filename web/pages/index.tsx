import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  CardDeck,
  Row,
  Container,
  Col,
} from "reactstrap";

const CONTENT_API_KEY = "1ec9ee62fb56a8f2258e4e2573";
const BLOG_URL = "http://localhost:2368";

type Post = {
  title: string;
  slug: string;
  excerpt: string;
  reading_time: Number;
  feature_image: string;
  authors: [string];
  name: string;
};

async function getPosts() {
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&include=authors`
  ).then((res) => res.json());

  console.log(res.posts[0].authors);

  const posts = res.posts;

  // console.log(posts.title);

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
      <div className={styles.container}>
        <Container>
          <Row>
            {props.posts.map((post, index) => {
              return (
                <Col key={index} sm={4}>
                  <div>
                    <CardDeck className="mb-4">
                      <Card
                        style={{
                          minHeight: "380px",
                          backgroundColor: "#15171a",
                        }}
                      >
                        <CardImg
                          top
                          width="100%"
                          src={post.feature_image}
                          style={{
                            backgroundSize: "cover",
                          }}
                        />
                        <CardBody>
                          <Link href="post/[slug]" as={`post/${post.slug}`}>
                            <a>
                              <CardTitle
                                style={{
                                  fontSize: "25px",
                                  fontWeight: 600,
                                  color: "hsla(0,0%,100%,.85)",
                                }}
                              >
                                {post.title}
                              </CardTitle>
                            </a>
                          </Link>
                          <CardSubtitle style={{ color: "#90a2aa" }}>
                            {post.excerpt}
                          </CardSubtitle>
                          {post.authors.map((author) => (
                            <CardSubtitle
                              key={author.id}
                              style={{
                                color: "hsla(0,0%,100%,.85)",
                                padding: "20px 0",
                              }}
                            >
                              Author -{" "}
                              <span style={{ fontWeight: 600 }}>
                                {author.name}
                              </span>
                            </CardSubtitle>
                          ))}
                          {/* <Link href="post/[slug]" as={`post/${post.slug}`}>
                            <a>
                              <Button color="primary">View full blog</Button>
                            </a>
                          </Link> */}
                        </CardBody>
                      </Card>
                    </CardDeck>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
      <div className={styles.footer}>
        <Link href="https://www.artificialbrix.com/">
          ©copyright Artificial Brix
        </Link>
      </div>
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
  );
};

export default Home;
