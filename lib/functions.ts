export const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const then = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} yrs ago`;
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} mons ago`;
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} days ago`;
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hrs ago`;
  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} mins ago`;
  return `${seconds} seconds ago`;
};
