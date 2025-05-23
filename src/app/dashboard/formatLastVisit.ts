export function formatLastVisit(dateString: string): string {
  const now = new Date();
  const lastVisit = new Date(dateString);
  const diffInMs = now.getTime() - lastVisit.getTime();
  
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Hoje';
  if (diffInDays === 1) return '1 dia atrás';
  if (diffInDays < 7) return `${diffInDays} dias atrás`;
  if (diffInDays < 30) return `${Math.floor(diffInDays/7)} semanas atrás`;
  return `${Math.floor(diffInDays/30)} meses atrás`;
}