import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return <>
  <div className="footer">
    <div className="container flex flex-sb flex-wrap flex-left">
        <div className="footer_logo">
            <h2>TechBlogs</h2>
            <h4>&copy; 2025 All Rights Reserved.</h4>
            <h3>Coded By <span>@Rangeet</span></h3>
        </div>

        <div className="q_links">
            <h3>Quick Links</h3>
            <ul>
                <li><Link href="/">Advertise with us</Link></li>
                <li><Link href="/">About Us</Link></li>
                <li><Link href="/">Contact Us</Link></li>

            </ul>
        </div>
        <div className="q_links">
            <h3>Legal Stuff Links</h3>
            <ul>
                <li><Link href="/">Privacy Notice</Link></li>
                <li><Link href="/">Cookie Policy</Link></li>
                <li><Link href="/">Terms Of Use</Link></li>

            </ul>
        </div>
        <div className="q_links">
            <h3>Social Media</h3>
            <ul>
                <li><Link href="/">Github</Link></li>
                <li><Link href="/">Twitter</Link></li>
                <li><Link href="/">Instagram</Link></li>

            </ul>
        </div>
    </div>
  </div>

  </>
}
