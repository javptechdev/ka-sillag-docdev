'use client'

import { ArrowRight, MessageCircle, Heart, Clock, User } from 'lucide-react'

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

interface LatestAnnouncementsProps {
  announcements: Announcement[]
  onAnnouncementClick: (announcementId: string) => void
  onSeeAllClick: () => void
}

export function LatestAnnouncements({ announcements, onAnnouncementClick, onSeeAllClick }: LatestAnnouncementsProps) {
  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    
    return date.toLocaleDateString()
  }

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  return (
    <section className="space-y-4">
      {/* Component Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">
          Latest Announcements
        </h3>
        <button
          onClick={onSeeAllClick}
          className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
        >
          <span>See All</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Announcements List - One per line */}
      <div className="space-y-3">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            onClick={() => onAnnouncementClick(announcement.id)}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer p-4"
          >
            <div className="space-y-3">
              {/* Title */}
              <h4 className="font-semibold text-gray-900 text-lg">
                {announcement.title}
              </h4>

              {/* Timestamps */}
              <div className="flex items-center space-x-4 text-sm text-gray-500">
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

              {/* Content Preview */}
              <p className="text-gray-700 text-sm leading-relaxed">
                {truncateContent(announcement.content)}
              </p>

              {/* Engagement Stats and See More */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  {/* Comments */}
                  <div className="flex items-center space-x-1">
                    <MessageCircle size={16} />
                    <span>{announcement.commentCount}</span>
                  </div>
                  
                  {/* Loves */}
                  <div className="flex items-center space-x-1">
                    <Heart 
                      size={16} 
                      className={announcement.isLovedByUser ? 'text-red-500 fill-current' : ''}
                    />
                    <span>{announcement.loveCount}</span>
                  </div>
                </div>

                {/* See More Icon */}
                <div className="text-primary">
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
