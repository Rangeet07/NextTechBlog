import React, { useEffect, useState } from 'react'
import Link from 'next/link';
// import IoSearchSharp, { IoSearch, IoSearchCircleSharp } from 'react-icons/io5'
import { HiBars3BottomRight, HiXMark } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { LuMoon, LuSun } from "react-icons/lu";
import useFetchData from '@/hooks/useFetchData';
export default function Header() {

    // searchbar open and close function
    const [searchopen, setSearchopen] = useState(false);

    // for open searchbar

    const openSearch = () => {
        setSearchopen(!searchopen);
    }

    // for close searchbar

    const closeSearch = () => {
        setSearchopen(false);
    }

    // asidebar for mobile device

    const [aside, setAside] = useState(false);

    const asideOpen = () => {
        setAside(true);
    }
    
    const asideClose = () => {
        setAside(false);
    }

    // for close aside menu when click on link also

    const handleLinkClick = () => {
        setAside(false);
    }
    

    // const [isFullScreen, setisFullScreen] = useState(false);

    // const toggleFullScreen = () => {
    //     if(!document.fullscreenElement){
    //         document.documentElement.requestFullscreen().then(() => {
    //             setisFullScreen(true);
    //         });
    //     } else {
    //         if(document.exitFullscreen){
    //             document.exitFullscreen().then(() => {
    //                 setisFullScreen(false);
    //             })
    //         }
    //     }
    // }

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);

    }, []);

    useEffect(() => {
        // apply darkmode styles when state changes
        if (darkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('darkMode', true)
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('darkMode', false)
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }
    
    
    // search data fetch

    const {alldata, loading } = useFetchData('/api/getblog');

    // filtering publish blogs

    const publishedblogs = alldata.filter(ab => ab.status === "publish");

    const [searchQuery, setsearchQuery] = useState('');
    // filtering based on search query, search data from title

    const filteredBlogs = searchQuery.trim() === '' ? publishedblogs : publishedblogs.filter(blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
   <div className="header_sec">
    <div className="container header">
        <div className="logo">
            <Link href="/"><h1>TechBlogs</h1></Link>
        </div>
        <div className="searchbar">
        <FaSearch />            
        <input type="search" onClick={openSearch} placeholder='Discover news, articles and more'/>
        </div>

        <div className="nav_list_dark">
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/">About Me</Link></li>
                <li><Link href="/contact">Contact</Link></li>
            </ul>
            {/* for mobile phone */}
            <div className="navlist_mobile_ul">
                <button onClick={toggleDarkMode}>{ darkMode? <LuMoon /> : <LuSun/> }</button>
                <button onClick={openSearch}><FaSearch /></button>
                <button onClick={asideOpen}><HiBars3BottomRight /></button>
            </div>
            <div className="darkmode">
                <label className="switch">
                    <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                    <span className='slider_header'></span>
                </label>
            </div>

        </div>
    </div>
    <div className={`search_click ${searchopen ? 'open' : ''}`}>
        <div className="searchab_input ">
            <FaSearch />
            <input type="search" value={searchQuery} onChange={(e) => setsearchQuery(e.target.value)} placeholder='Discover news, articles and more' />
        </div>
        <div className="search_data text-center">
            {/* <div className="blog">
                <h3>Search data</h3>
            </div> */}
            {loading ? <div className='wh_100 flex flex-center mt-2 pb-5'>
                <div className="loader"></div>
              </div> : <>
                {searchQuery?   <>
                {/* <div className="blog" key>
                    <Link href={`/blog/${}`}></Link>
                </div> */}
                {filteredBlogs.slice(0, 3).map((blog) => {
                    return <div className='blog' key={blog._id}>
                        <div className="bloginfo">
                        <Link href={`/blog/${blog.slug}`}>
                        <h3>{blog.slug}</h3>
                        </Link>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi omnis molestiae adipisci vitae quae voluptates vel ad illum nobis culpa dicta, quia ullam voluptatem accusantium suscipit quam maxime magnam repellat!</p>
                        </div>
                    </div>
                })}
                </> : <div>No Search Result</div>

                }


              </>  }
        </div>
        <div className="exit_search" onClick={closeSearch}>
            <div><HiXMark /></div>
            <h4>Esc</h4>
        </div>
    </div>

    <div className={ aside? `navlist_mobile open` : `navlist_mobile` }>
        <div className="navlist_m_title flex flex_sb">
            <h1>TechBlogs</h1>
            <button style={{margin:'10px'}} onClick={asideClose}><HiXMark/></button>
        </div>
        <hr />
        <h3 className='mt-3'>Main Menu</h3>
        <ul onClick={handleLinkClick}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/">About</Link></li>
            <li><Link href="/">Contact</Link></li>
        </ul>
        <hr />
        <h3 className="mt-3">Topics</h3>
        <ul onClick={handleLinkClick}>
            <li><Link href="/topics/htmlcssjs">Html Css Js</Link></li>
            <li><Link href="/topics/nextjs">Next Js</Link></li>
            <li><Link href="/topics/database">Database</Link></li>
            <li><Link href="/topics/deployment">Deployment</Link></li>

        </ul>
</div>
   </div>
  )
}
