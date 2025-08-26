'use client'

import { useState } from 'react'
import { X, Heart, MessageCircle, Send, Clock, User } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface Comment {
  id: string
  text: string
  author: string
  timestamp: Date
  loveCount: number
  isLovedByUser: boolean
}

interface Announcement {
  id: string
  title: string
  content: string
  addedBy: string
  addedTimestamp: Date
  editedBy?: string
  editedTimestamp?: Date
  commentCount: number
  loveCount: number
  isLovedByUser?: boolean
}

interface AnnouncementModalProps {
  isOpen: boolean
  announcement: Announcement | null
  onClose: () => void
}

export function AnnouncementModal({ isOpen, announcement, onClose }: AnnouncementModalProps) {
  const [newComment, setNewComment] = useState('')
  const [isLoved, setIsLoved] = useState(announcement?.isLovedByUser || false)
  const [loveCount, setLoveCount] = useState(announcement?.loveCount || 0)

  if (!announcement) return null

  // Mock comments data
  const [comments] = useState<Comment[]>([
    {
      id: '1',
      text: 'This is very helpful information. Thank you for sharing!',
      author: 'Dr. Santos',
      timestamp: new Date('2024-01-15T10:00:00'),
      loveCount: 3,
      isLovedByUser: false
    },
    {
      id: '2',
      text: 'I have a question about the implementation timeline.',
      author: 'Nurse Garcia',
      timestamp: new Date('2024-01-15T11:30:00'),
      loveCount: 1,
      isLovedByUser: true
    }
  ])

  const formatTimestamp = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleLoveClick = () => {
    setIsLoved(!isLoved)
    setLoveCount(isLoved ? loveCount - 1 : loveCount + 1)
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      // In real app, submit comment to backend
      alert('Comment submitted: ' + newComment)
      setNewComment('')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex-1">
            {announcement.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Timestamps */}
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <User size={14} />
            <span>Added by {announcement.addedBy}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{formatTimestamp(announcement.addedTimestamp)}</span>
          </div>
          {announcement.editedBy && (
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>Edited by {announcement.editedBy}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {announcement.content}
          </p>
        </div>

        {/* Engagement Stats */}
        <div className="flex items-center space-x-6 mb-6 pb-4 border-b border-gray-200">
          {/* Love Button */}
          <button
            onClick={handleLoveClick}
            className={`flex items-center space-x-2 transition-colors ${
              isLoved ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart size={20} className={isLoved ? 'fill-current' : ''} />
            <span>{loveCount}</span>
          </button>

          {/* Comments Count */}
          <div className="flex items-center space-x-2 text-gray-600">
            <MessageCircle size={20} />
            <span>{announcement.commentCount}</span>
          </div>
        </div>

        {/* Comments Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Comments</h3>
          
          {/* Comments List */}
          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-medium">
                      {comment.author.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900 text-sm">
                        {comment.author}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {formatTimestamp(comment.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">
                      {comment.text}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                        <Heart size={14} className={comment.isLovedByUser ? 'text-red-500 fill-current' : ''} />
                        <span>{comment.loveCount}</span>
                      </button>
                      <button className="hover:text-primary transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">M</span>
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={16} />
                    <span>Comment</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
