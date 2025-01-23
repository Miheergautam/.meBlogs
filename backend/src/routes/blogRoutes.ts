import {Hono} from 'hono';

const blogRoutes = new Hono()

blogRoutes.post('/create', (c) => {
    return c.json({ message: 'Create' })
})

blogRoutes.put('/update', (c) => {
    return c.json({ message: 'Update' })
})

blogRoutes.get('/read', (c) => {
    return c.json({ message: 'Read' })
})

blogRoutes.get('/read/:id', (c) => {
    return c.json({ message: 'Read by ID' })
})

export default blogRoutes;