import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/blog";


export default async function handle(req, res) {

    const { method } = req;

    await mongooseConnect();
    
    if(method === "GET") {
        if (req.query?.id) {
            // fetch a single blog by id
            const blog = await Blog.findById(req.query.id);
            res.json(blog);
        } else if (req.query?.blogcategory){
            // fertch blogs by blogcategory
            const cate = await Blog.find({ blogcategory: req.query.blogcategory});
            res.json(cate.reverse());
        } else if (req.query?.tags){
            // fertch blogs by tags
            const tag = await Blog.find({ tags: req.query.tags});
            res.json(tag.reverse());
        }else if (req.query?.slug){
            // fertch blogs by blogcategory
            const slug = await Blog.find({ slug: req.query.slug});
            res.json(slug.reverse());
        } else {
            const blogs = await Blog.find();
            res.json(blogs.reverse());
        }
    } else {
         res.status(405).json({ message: "Method Not Allowed"});
    }
}
