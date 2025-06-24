import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function TagsPage() {
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(5);
    const [blog, setBlog] = useState([]);

    const router = useRouter();

    const { tags } = router.query;

    useEffect(() => {
    
        const fetchBlogdata = async () => {
            try {
                const res = await axios.get(`/api/getblog?tags=${tags}`);
                const alldata = res.data;
                setBlog(alldata);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blog data", error);
                setLoading(false);
            }
        }
        // fetch blog data only if tag exists
        if (tags) {
            fetchBlogdata();
        } else {
            router.push('/404');
        }
         
    }, [tags]);



        // function to handle page change

        const paginate = (pageNumber) => {
            setCurrentPage(pageNumber)
        }
        const indexOfFirstblog = (currentPage - 1) * perPage;
        const indexOfLastblog = currentPage * perPage;
        const currentBlogs = blog.slice(indexOfFirstblog, indexOfLastblog);
        
        const allblog = blog.length;
 
        const pageNumbers = [];
   
        for(let i = 1; i <= Math.ceil(allblog / perPage); i++){
           pageNumbers.push(i);
        }
     
        // filter publish blogs
        const publishedblogs = currentBlogs.filter(ab => ab.status === 'publish');

        function extractFirstImageUrl(markdownContent){
            //  check if markdown content is provided and non-empty
            if(!markdownContent || typeof markdownContent !== 'string') {
              return null;
            }
        
            // regular expression to match first image url in mdown format ![alt text](imageurl)
            const regex = /!\[.*?\]\((.*?)\)/;
            const match = markdownContent.match(regex);
            return match? match[1] : null;
          }
    

  return (
    <div className="blogpage">
        <div className="category_slug">
            <div className="container">
                <div className="category_title">
                    <div className="flex gap-1">
                        <h1>{loading ? <div>Loading...</div> : publishedblogs ?
                        publishedblogs && publishedblogs[0]?.tags : publishedblogs && publishedblogs.tags }</h1>
                        <span>{loading ? <div>0</div> : publishedblogs.filter(blog => blog.tags).length }</span>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae id deserunt omnis mollitia quia, eum pariatur fuga numquam libero praesentium natus laboriosam, cupiditate ad aliquam reiciendis velit consequatur molestias repellendus.</p>
                </div>
                <div className="category_blogs mt-3">
                    { loading ? <>
                    <div className="wh-100 flex flex-center mt-2 pb-5">
                        <div className="loader"></div>
                    </div>
                    </> : <>
                    {publishedblogs.map((item) => {
                    // in the markdown content first image show here
                        const firstImageUrl = extractFirstImageUrl(item.description);
                        return <div className="cate_blog" key={item._id}>
                          {/* if no image mdown show no img */}
                          <Link href={`/blog/${item.slug}`}>
                          <img src={firstImageUrl || "/img/No_Image.jpg"} alt={item.title} />
                          </Link>
                        <div className="bloginfo mt-2">
                          <Link href={`/tag/${item.tags[0]}`}>
                          <div className="blogtag">{item.tags[0]}</div>
                          </Link>
                          <Link href={`/blog/${item.slug}`}><h3>{item.title}</h3></Link>
                          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat tenetur non ab obcaecati nemo id repellendus assumenda corporis fugiat, repudiandae quaerat quasi tempora natus ad? Natus rerum libero at nemo!</p>
                          <div className="blogauthor flex gap-1">
                            <div className="bloaimg">
                              {/* <img src="/img/Rangeet.png" alt="coder" /> */}
                            </div>
                            <div className="flex flex-col flex-left gap-05">
                              <h4>Vbm coder</h4>
                              <span>{new Date(item.createdAt).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric' })}</span>
      
                            </div>
                          </div>
                        </div>
                      </div>
                    })}
                    
                    
                    </>}
                    
                </div>
                <div className="blogpagination">
 
 <div className="blogpagination">
     <button onClick={() => paginate(currentPage - 1)}  disabled={currentPage === 1} > Previous</button>
     {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
         <button key={number}
                 onClick={() => paginate(number)}
                 className={currentPage === number ? 'active' : ''}                    >
             {number}
         </button>
     ))}
     <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}>Next</button>
 </div>
 </div>

            </div>
        </div>
    </div>
  )
}