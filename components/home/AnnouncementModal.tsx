'use client'

import { useState } from 'react'
import { Heart, MessageCircle, Send, Clock, User } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Announcement } from '@/types'

interface Comment {
  id: string
  text: string
  author: string
  authorDepartment: string
  timestamp: Date
  loveCount: number
  isLovedByUser: boolean
  replies?: Reply[]
}

interface Reply {
  id: string
  text: string
  author: string
  authorDepartment: string
  timestamp: Date
  loveCount: number
  isLovedByUser: boolean
}

interface AnnouncementModalProps {
  isOpen: boolean
  announcement: Announcement | null
  onClose: () => void
}

export function AnnouncementModal({ isOpen, announcement, onClose }: AnnouncementModalProps) {
  const [newComment, setNewComment] = useState('')
  const [newReply, setNewReply] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [isLoved, setIsLoved] = useState(announcement?.isLovedByUser || false)
  const [loveCount, setLoveCount] = useState(announcement?.loveCount || 0)
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      text: 'This is very helpful information. Thank you for sharing!',
      author: 'Dr. Maria Santos Cruz',
      authorDepartment: 'Internal Medicine',
      timestamp: new Date('2024-01-15T10:00:00'),
      loveCount: 3,
      isLovedByUser: false,
      replies: [
        {
          id: 'r1',
          text: 'I agree! This will definitely improve our workflow.',
          author: 'Nurse Maria Clara Santos',
          authorDepartment: 'Nursing Department',
          timestamp: new Date('2024-01-15T10:15:00'),
          loveCount: 2,
          isLovedByUser: false
        },
        {
          id: 'r2',
          text: 'Looking forward to implementing these changes.',
          author: 'Dr. Jose Rizal',
          authorDepartment: 'Cardiology',
          timestamp: new Date('2024-01-15T10:20:00'),
          loveCount: 1,
          isLovedByUser: true
        }
      ]
    },
    {
      id: '2',
      text: 'I have a question about the implementation timeline.',
      author: 'Dr. Luzviminda Garcia',
      authorDepartment: 'Pediatrics',
      timestamp: new Date('2024-01-15T11:30:00'),
      loveCount: 1,
      isLovedByUser: true,
      replies: [
        {
          id: 'r3',
          text: 'Great question! Let me check with the admin team.',
          author: 'Admin Ana Santos',
          authorDepartment: 'Administration',
          timestamp: new Date('2024-01-15T11:45:00'),
          loveCount: 0,
          isLovedByUser: false
        }
      ]
    }
  ])

  if (!announcement) return null

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

  const handleReplySubmit = (e: React.FormEvent, commentId: string) => {
    e.preventDefault()
    if (newReply.trim()) {
      // In real app, submit reply to backend
      alert('Reply submitted: ' + newReply)
      setNewReply('')
      setReplyingTo(null)
    }
  }

  const handleReplyClick = (commentId: string) => {
    setReplyingTo(replyingTo === commentId ? null : commentId)
    setNewReply('')
  }

  const handleCommentLike = (commentId: string) => {
    setComments(prevComments => 
      prevComments.map(comment => 
        comment.id === commentId 
          ? { ...comment, isLovedByUser: !comment.isLovedByUser, loveCount: comment.isLovedByUser ? comment.loveCount - 1 : comment.loveCount + 1 }
          : comment
      )
    )
  }

  const handleReplyLike = (commentId: string, replyId: string) => {
    setComments(prevComments => 
      prevComments.map(comment => 
        comment.id === commentId 
          ? {
              ...comment,
              replies: comment.replies?.map(reply =>
                reply.id === replyId
                  ? { ...reply, isLovedByUser: !reply.isLovedByUser, loveCount: reply.isLovedByUser ? reply.loveCount - 1 : reply.loveCount + 1 }
                  : reply
              )
            }
          : comment
      )
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex-1">
            {announcement.title}
          </h2>
        </div>

        {/* Timestamps */}
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <User size={14} />
            <span>Added by {announcement.addedBy} from {announcement.addedByDepartment}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{formatTimestamp(announcement.addedTimestamp)}</span>
          </div>
          {announcement.editedBy && (
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>Edited by {announcement.editedBy} from {announcement.editedByDepartment}</span>
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
                        from {comment.authorDepartment}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {formatTimestamp(comment.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">
                      {comment.text}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <button 
                        onClick={() => handleCommentLike(comment.id)}
                        className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                      >
                        <Heart size={14} className={comment.isLovedByUser ? 'text-red-500 fill-current' : ''} />
                        <span>{comment.loveCount}</span>
                      </button>
                      <button 
                        onClick={() => handleReplyClick(comment.id)}
                        className="hover:text-primary transition-colors"
                      >
                        {replyingTo === comment.id ? 'Cancel' : 'Reply'}
                      </button>
                    </div>

                                         {/* Reply Form */}
                     {replyingTo === comment.id && (
                       <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="mt-3 space-y-3">
                         <div className="flex items-start space-x-2">
                           <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                             <span className="text-white text-xs font-medium">M</span>
                           </div>
                           <div className="flex-1">
                             <textarea
                               value={newReply}
                               onChange={(e) => setNewReply(e.target.value)}
                               placeholder="Write a reply..."
                               className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent text-xs"
                               rows={2}
                             />
                             <div className="flex justify-end mt-2 space-x-2">
                               <button
                                 type="button"
                                 onClick={() => handleReplyClick(comment.id)}
                                 className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                               >
                                 Cancel
                               </button>
                               <button
                                 type="submit"
                                 disabled={!newReply.trim()}
                                 className="flex items-center space-x-1 bg-primary text-white px-3 py-1 rounded text-xs hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                               >
                                 <Send size={12} />
                                 <span>Reply</span>
                               </button>
                             </div>
                           </div>
                         </div>
                       </form>
                     )}

                     {/* Replies Section */}
                     {comment.replies && comment.replies.length > 0 && (
                       <div className="mt-3 space-y-2">
                         {comment.replies.map((reply) => (
                           <div key={reply.id} className="bg-white rounded-lg p-2 border-l-2 border-primary">
                             <div className="flex items-start space-x-2">
                               <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                                 <span className="text-white text-xs font-medium">
                                   {reply.author.charAt(0)}
                                 </span>
                               </div>
                               <div className="flex-1 min-w-0">
                                 <div className="flex items-center space-x-2 mb-1">
                                   <span className="font-medium text-gray-900 text-xs">
                                     {reply.author}
                                   </span>
                                   <span className="text-gray-500 text-xs">
                                     from {reply.authorDepartment}
                                   </span>
                                   <span className="text-gray-500 text-xs">
                                     {formatTimestamp(reply.timestamp)}
                                   </span>
                                 </div>
                                 <p className="text-gray-700 text-xs mb-1">
                                   {reply.text}
                                 </p>
                                 <div className="flex items-center space-x-3 text-xs text-gray-500">
                                   <button 
                                     onClick={() => handleReplyLike(comment.id, reply.id)}
                                     className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                                   >
                                     <Heart size={12} className={reply.isLovedByUser ? 'text-red-500 fill-current' : ''} />
                                     <span>{reply.loveCount}</span>
                                   </button>
                                 </div>
                               </div>
                             </div>
                           </div>
                         ))}
                       </div>
                     )}
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
