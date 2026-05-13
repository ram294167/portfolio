import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FiPlus, FiX } from 'react-icons/fi'
import PostForm from './PostForm'
import BlogPost from './BlogPost'
import '../styles/blog.css'

export default function Blog() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Building Scalable Backend Systems',
      excerpt: 'Learn how to design backend systems that can handle millions of requests.',
      content: 'Building scalable backend systems requires careful planning and architectural decisions...',
      tags: ['backend', 'scalability', 'architecture'],
      createdAt: new Date('2024-01-15'),
      image: null,
      video: null,
      voice: null,
      likes: 24,
    },
  ])
  
  const [showForm, setShowForm] = useState(false)

  const handlePostCreate = (newPost) => {
    setPosts([newPost, ...posts])
    setShowForm(false)
  }

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId))
  }

  return (
    <section id="blog" className="blog-section">
      <div className="container">
        {/* Header */}
        <motion.div
          className="blog-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="section-title">Insights & Articles</h2>
            <p className="section-subtitle">
              Technical deep-dives, architecture patterns, and lessons learned
            </p>
          </div>
          
          <motion.button
            className="btn-create-post"
            onClick={() => setShowForm(!showForm)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlus />
            <span>{showForm ? 'Close' : 'New Post'}</span>
          </motion.button>
        </motion.div>

        {/* Post Creation Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PostForm onPostCreate={handlePostCreate} onCancel={() => setShowForm(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Posts Grid */}
        <motion.div
          className="posts-grid"
          layout
        >
          <AnimatePresence mode="popLayout">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <BlogPost 
                    post={post} 
                    onDelete={handleDeletePost}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p>No posts yet. Create your first post to get started!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
