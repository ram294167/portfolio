import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiHeart, FiTrash2, FiShare2, FiCalendar } from 'react-icons/fi'
import '../styles/blog-post.css'

export default function BlogPost({ post, onDelete }) {
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(post.likes)
  const [showFullContent, setShowFullContent] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  const handleShare = async () => {
    const text = `${post.title}\n\n${post.excerpt}`
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: text,
        })
      } catch (error) {
        console.log('Share cancelled or failed')
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(text)
      alert('Post copied to clipboard!')
    }
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  return (
    <motion.article
      className="blog-post"
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ y: -4 }}
    >
      {/* Media Preview */}
      {(post.image || post.video) && (
        <div className="post-media">
          {post.image && (
            <motion.img
              src={post.image}
              alt={post.title}
              className="post-image"
              whileHover={{ scale: 1.05 }}
            />
          )}
          {post.video && (
            <motion.video
              src={post.video}
              className="post-video"
              controls
              whileHover={{ scale: 1.05 }}
            />
          )}
        </div>
      )}

      {/* Post Content */}
      <div className="post-content">
        {/* Header */}
        <div className="post-header">
          <motion.h3 
            className="post-title"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {post.title}
          </motion.h3>

          <div className="post-meta">
            <div className="meta-left">
              <span className="post-date">
                <FiCalendar /> {formatDate(post.createdAt)}
              </span>
              {post.tags && post.tags.length > 0 && (
                <div className="post-tags">
                  {post.tags.slice(0, 3).map((tag, idx) => (
                    <motion.span
                      key={tag}
                      className="tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      #{tag}
                    </motion.span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="tag-more">+{post.tags.length - 3}</span>
                  )}
                </div>
              )}
            </div>

            <motion.button
              className="btn-delete"
              onClick={() => onDelete(post.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Delete post"
            >
              <FiTrash2 />
            </motion.button>
          </div>
        </div>

        {/* Excerpt */}
        <p className="post-excerpt">{post.excerpt}</p>

        {/* Full Content (if expanded) */}
        {showFullContent && (
          <motion.p
            className="post-full-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {post.content}
          </motion.p>
        )}

        {/* Voice Recording (if exists) */}
        {post.voice && (
          <motion.div
            className="post-voice-container"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="voice-player">
              <FiShare2 className="voice-icon" />
              <audio src={post.voice} controls />
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <div className="post-footer">
          <div className="post-actions">
            <motion.button
              className={`action-btn like-btn ${isLiked ? 'active' : ''}`}
              onClick={handleLike}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <FiHeart />
              </motion.div>
              <span>{likes}</span>
            </motion.button>

            <motion.button
              className="action-btn share-btn"
              onClick={handleShare}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiShare2 />
              <span>Share</span>
            </motion.button>

            {post.content && post.content.length > post.excerpt?.length && (
              <motion.button
                className="action-btn read-more-btn"
                onClick={() => setShowFullContent(!showFullContent)}
                whileHover={{ scale: 1.05 }}
              >
                <span>{showFullContent ? 'Show Less' : 'Read More'}</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
