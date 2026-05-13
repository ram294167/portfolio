import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { FiUpload, FiMic, FiX, FiImage, FiVideo } from 'react-icons/fi'
import { MdCheckCircle } from 'react-icons/md'
import '../styles/post-form.css'

export default function PostForm({ onPostCreate, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
  })

  const [uploads, setUploads] = useState({
    image: null,
    video: null,
    voice: null,
  })

  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [uploadProgress, setUploadProgress] = useState({})

  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const streamRef = useRef(null)

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle file uploads
  const handleFileUpload = async (e, fileType) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type and size
    const maxSize = fileType === 'image' ? 5 : 50 // MB
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File too large. Max ${maxSize}MB allowed.`)
      return
    }

    // Create preview
    const preview = URL.createObjectURL(file)
    setUploads(prev => ({
      ...prev,
      [fileType]: {
        file,
        preview,
        name: file.name,
        size: file.size,
        type: file.type,
      }
    }))
  }

  // Start voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const preview = URL.createObjectURL(audioBlob)
        
        setUploads(prev => ({
          ...prev,
          voice: {
            file: audioBlob,
            preview,
            name: `recording-${Date.now()}.webm`,
            size: audioBlob.size,
            type: 'audio/webm',
          }
        }))
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      // Track recording time
      const interval = setInterval(() => {
        setRecordingTime(t => {
          if (t >= 300) { // Max 5 minutes
            stopRecording()
            return t
          }
          return t + 1
        })
      }, 1000)

      return () => clearInterval(interval)
    } catch (error) {
      alert('Cannot access microphone. Please check permissions.')
    }
  }

  // Stop voice recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      streamRef.current?.getTracks().forEach(track => track.stop())
      setIsRecording(false)
      setRecordingTime(0)
    }
  }

  // Remove upload
  const removeUpload = (type) => {
    if (uploads[type]?.preview) {
      URL.revokeObjectURL(uploads[type].preview)
    }
    setUploads(prev => ({ ...prev, [type]: null }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in title and content.')
      return
    }

    const newPost = {
      id: Date.now(),
      title: formData.title,
      excerpt: formData.excerpt || formData.content.substring(0, 100),
      content: formData.content,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      createdAt: new Date(),
      image: uploads.image?.preview || null,
      video: uploads.video?.preview || null,
      voice: uploads.voice?.preview || null,
      likes: 0,
    }

    onPostCreate(newPost)

    // Cleanup
    Object.values(uploads).forEach(upload => {
      if (upload?.preview) {
        URL.revokeObjectURL(upload.preview)
      }
    })
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <motion.form
      className="post-form-container"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="form-wrapper">
        {/* Header */}
        <div className="form-header">
          <h3>Create New Post</h3>
          <button type="button" className="btn-close" onClick={onCancel}>
            <FiX />
          </button>
        </div>

        {/* Main Content */}
        <div className="form-body">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Post Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter a compelling title..."
              maxLength={100}
            />
            <span className="char-count">{formData.title.length}/100</span>
          </div>

          {/* Excerpt */}
          <div className="form-group">
            <label htmlFor="excerpt">Excerpt (optional)</label>
            <input
              type="text"
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Brief summary for preview..."
              maxLength={150}
            />
            <span className="char-count">{formData.excerpt.length}/150</span>
          </div>

          {/* Content */}
          <div className="form-group">
            <label htmlFor="content">Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your post content here..."
              rows={6}
              maxLength={2000}
            />
            <span className="char-count">{formData.content.length}/2000</span>
          </div>

          {/* Tags */}
          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="e.g. backend, api, database"
            />
          </div>

          {/* Media Upload Section */}
          <div className="media-section">
            <h4 className="media-title">Media (Optional)</h4>

            <div className="media-grid">
              {/* Image Upload */}
              <div className="media-upload">
                <label className="upload-label">
                  {uploads.image ? (
                    <motion.div className="upload-preview image-preview">
                      <img src={uploads.image.preview} alt="preview" />
                      <button
                        type="button"
                        className="btn-remove"
                        onClick={() => removeUpload('image')}
                      >
                        <FiX />
                      </button>
                      <motion.div 
                        className="check-badge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <MdCheckCircle />
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="upload-placeholder"
                      whileHover={{ scale: 1.05 }}
                    >
                      <FiImage />
                      <span>Upload Image</span>
                      <small>Max 5MB</small>
                    </motion.div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'image')}
                    hidden
                  />
                </label>
              </div>

              {/* Video Upload */}
              <div className="media-upload">
                <label className="upload-label">
                  {uploads.video ? (
                    <motion.div className="upload-preview video-preview">
                      <video src={uploads.video.preview} controls />
                      <button
                        type="button"
                        className="btn-remove"
                        onClick={() => removeUpload('video')}
                      >
                        <FiX />
                      </button>
                      <motion.div 
                        className="check-badge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <MdCheckCircle />
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="upload-placeholder"
                      whileHover={{ scale: 1.05 }}
                    >
                      <FiVideo />
                      <span>Upload Video</span>
                      <small>Max 50MB</small>
                    </motion.div>
                  )}
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e, 'video')}
                    hidden
                  />
                </label>
              </div>

              {/* Voice Recording */}
              <div className="media-upload">
                {uploads.voice ? (
                  <motion.div 
                    className="upload-preview voice-preview"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <audio src={uploads.voice.preview} controls />
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => removeUpload('voice')}
                    >
                      <FiX />
                    </button>
                    <motion.div 
                      className="check-badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <MdCheckCircle />
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.button
                    type="button"
                    className={`upload-placeholder recording ${isRecording ? 'active' : ''}`}
                    onClick={isRecording ? stopRecording : startRecording}
                    whileHover={!isRecording ? { scale: 1.05 } : {}}
                  >
                    <motion.div
                      animate={isRecording ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <FiMic />
                    </motion.div>
                    <span>{isRecording ? 'Stop Recording' : 'Record Voice'}</span>
                    {isRecording && (
                      <motion.small
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {formatTime(recordingTime)}
                      </motion.small>
                    )}
                    <small>{isRecording ? '' : 'Max 5 min'}</small>
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="form-footer">
          <motion.button
            type="button"
            className="btn btn-outline"
            onClick={onCancel}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            className="btn btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiUpload />
            Publish Post
          </motion.button>
        </div>
      </div>
    </motion.form>
  )
}
