import Blogmodel from "../models/blog.models.js";


//crud api



export const getAllblogs=async(req,res)=>{

    try {
        
        const blogs=await Blogmodel.findAll()
        res.status(200).json(blogs)

    } catch (error) {
        res.status(500).json({error:"hubo un problema, intentelo nuevamente"})
    }
    
}


export const getblogId = async (req, res) => {
    // Convertir a entero
    const blogId = parseInt(req.params.id); 

    try {
        // Validar el id
        if (!blogId || isNaN(blogId)) {
            return res.status(400).json({ message: "El id no es válido" });
        }

        // Buscar el blog por id
        const blog = await Blogmodel.findAll({ where: { id: blogId } });

        // Verificar si el blog existe
        if (blog.length === 0) { // Comprobamos solo la longitud
            return res.status(404).json({ message: "El id o tarea no existe" });
        }

        // Retornar el blog encontrado
        res.status(200).json(blog);
    } catch (error) {
        console.error("Error al obtener el blog:", error); // Log del error para debugging
        res.status(500).json({ error: "Hubo un problema, inténtelo luego" });
    }
};



export const createBlog=async(req,res)=>{
    const {title, content}= req.body
try {
    if(!title || !content){res.status(400).json({message:"Los campos title y content son obligatorios"})
                            return
    }

    const blog= await Blogmodel.create({title, content})

    res.status(201).json(blog)

} catch (error) {
    res.status(500).json({error:"hubo un problema, intentelo luego"})
        
    }

}


export const updateBlog=async(req,res)=>{
    const {title, content}=req.body
    const blogId=req.params.id
try {
    if(!blogId || isNaN(blogId)){res.status(400).json({message:"Inserte un id valido por favor"})
                                return}
    if(!title && !content){res.status(400).json({message:"Los campos son obligatorios"})
                        return}

    const [affectedRows] = await Blogmodel.update(
        { title, content }, 
        { where: { id: blogId } }
    );
    
    // si no existe el blog
    if (affectedRows === 0) {
         res.status(404).json({ message: "El id o tarea no existe" });
         return
    }

    
    const updatedBlog = await Blogmodel.findOne({ where: { id: blogId } });

    // Responder con el blog actualizado
    res.status(200).json(updatedBlog);
} catch (error) {
    res.status(500).json({error:"hubo un problema, intentelo luego nuevamente"})
}
}


export const deteleteBlog=async(req,res)=>{
   const blogId= req.params.id
   try {
    if (!blogId || isNaN(blogId)){res.status(400).json({message:"El id no es valido"})
        return}
        const deletecount= await Blogmodel.destroy({where:{id:blogId}})

        if(deletecount === 0){res.status(400).json({message:"El id o tarea  no existe"})
        return
    }
        res.status(200).json({message:`La tarea ${blogId}, fue eliminada`})
   } catch (error) {
    res.status(500).json({message:"hubo un error, intentelo mas tarde"})
   } 
}


