import PostgresInterval from 'postgres-interval';

export function parseDuration(duration: PostgresInterval.IPostgresInterval) {
  if (duration) return `${duration.hours}h` + (duration.minutes ? ` ${duration.minutes}m` : '');
  return duration.toISOStringShort();
}
