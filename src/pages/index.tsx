import React from "react";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby"; // useStaticQuery 훅 설정(LatestPostListQuery 불러오기)

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const LatestPostListQuery = graphql`
  query LatestPostListQuery {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
      edges {
        node {
          excerpt(truncate: false, pruneLength: 180)
          frontmatter {
            title
            path
            date(formatString: "DD MMM, YYYY")
            category
          }
          id
        }
      }
    }
  }
`;

const IndexPage: React.FC = () => {
  const data = useStaticQuery<Query>(LatestPostListQuery);

  return (
    <Layout>
      <SEO title="Home" />
      {/* <h1>최근 게시글</h1>
      <br /> */}
      <ul>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <li key={node.id}>
            <span>
              <h3>
                <Link 
                  style={{color: `powderblue`, textDecoration: `none`, fontSize: `15pt`}}
                  to={node.frontmatter.category}
                >
                  {node.frontmatter.category} {'> '}
                </Link>
                <Link
                  style={{color: `DarkSlateGray`, textDecoration: `none`}}
                  to={node.frontmatter.title}
                >
                  {node.frontmatter.title}
                </Link>
              </h3>
            </span>
            
            {/* <p
              style={{
                color: `Gray`,
                fontSize: `small`,
              }}
            >
              {node.excerpt}
            </p> */}
            
            <span
              style={{
                color: `LightGray`,
                fontSize: `small`
              }}
            >
              posted on{` `}
              {node.frontmatter.date}
            </span>
            <br />
            <br />
            <hr />
          </li>
          
        ))}
      </ul>
    </Layout>
  );
};

export default IndexPage;
