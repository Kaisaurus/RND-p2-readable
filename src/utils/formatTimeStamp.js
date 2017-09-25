export function formatTimeStamp(timestamp){
  const date = new Date(timestamp).toISOString();
  const formattedDate = date.split('T')[0];
  const formattedTime = date.split('T')[1].split('.')[0];
  return { date: formattedDate, time: formattedTime };
}