CREATE TABLE IF NOT EXISTS creators (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  genre VARCHAR(100),
  city VARCHAR(100),
  avatar_color VARCHAR(20) DEFAULT 'red',
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS videos (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  creator_id VARCHAR(36) NOT NULL,
  duration VARCHAR(10),
  mood VARCHAR(100),
  tone VARCHAR(20) DEFAULT 'magenta',
  plays BIGINT DEFAULT 0,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (creator_id) REFERENCES creators(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS playlists (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  user_id VARCHAR(36) NOT NULL,
  icon VARCHAR(10) DEFAULT '≡',
  cover_style VARCHAR(20) DEFAULT 'slate',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS playlist_videos (
  playlist_id VARCHAR(36) NOT NULL,
  video_id VARCHAR(36) NOT NULL,
  position INT DEFAULT 0,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (playlist_id, video_id),
  FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE,
  FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS saved_items (
  user_id VARCHAR(36) NOT NULL,
  video_id VARCHAR(36) NOT NULL,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, video_id),
  FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS follows (
  user_id VARCHAR(36) NOT NULL,
  target_type ENUM('creator', 'channel') NOT NULL,
  target_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, target_type, target_id)
);

CREATE INDEX idx_videos_creator ON videos(creator_id);
CREATE INDEX idx_videos_mood ON videos(mood);
CREATE INDEX idx_videos_published ON videos(published_at DESC);
CREATE INDEX idx_saved_user ON saved_items(user_id);
CREATE INDEX idx_follows_user ON follows(user_id);
