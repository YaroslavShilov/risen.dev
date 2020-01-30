import React from 'react'
import { Link, graphql } from 'gatsby'

import { Bio } from '../components/bio'
import { Seo } from '../components/seo'
import { rhythm, scale } from '../utils/typography'
import { fullDate } from '../utils/dates'
import { postUrl } from '../utils/post-url'
import { PostTemplate } from '../templates'

const BlogPost = ({ data, pageContext }) => {
  const {
    site: {
      siteMetadata: { title: siteTitle },
    },
    markdownRemark: {
      excerpt,
      html: postHtml,
      frontmatter: { title: postTitle, date, description },
    },
  } = data

  const { previous, next } = pageContext

  return (
    <PostTemplate title={siteTitle}>
      <Seo title={postTitle} description={description || excerpt} />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {postTitle}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {fullDate(date)}
          </p>
        </header>

        <section dangerouslySetInnerHTML={{ __html: postHtml }} />

        <nav style={{ marginTop: rhythm(3), marginBottom: rhythm(3) }}>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={postUrl(previous.fields.slug)} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={postUrl(next.fields.slug)} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>

        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: 0,
            marginBottom: rhythm(1),
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'var(--textLink)',
            }}
            to="/"
          >
            {siteTitle}
          </Link>
        </h3>

        <Bio />
      </article>
    </PostTemplate>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date
        description
      }
    }
  }
`

export default BlogPost