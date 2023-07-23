import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

// Add this import
import Head from 'next/head';

// Add this import
import Date from '../../components/date';

// Add this import at the top of the file
import utilStyles from '../../styles/utils.module.css';

/* 
https://nextjs.org/learn/basics/dynamic-routes/render-markdown
Finally, update the Post component in pages/posts/[id].js to render contentHtml using dangerouslySetInnerHTML:
*/


export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    );
  }

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
      paths,
      fallback: false,
    };
  }

/*
https://nextjs.org/learn/basics/dynamic-routes/render-markdown
Important: We added the async keyword to getPostData because we need to use await for remark. async/await allow you to fetch data asynchronously.

That means we need to update getStaticProps in pages/posts/[id].js to use await when calling getPostData:




*/

  export async function getStaticProps({ params }) {
    // Add the "await" keyword like this:
    const postData = await getPostData(params.id);
  
    return {
      props: {
        postData,
      },
    };
  }