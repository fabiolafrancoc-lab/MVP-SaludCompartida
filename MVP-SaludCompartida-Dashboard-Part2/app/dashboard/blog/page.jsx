'use client';
import Blog from '../../../components/Blog';
export default function BlogPage() {
  return <Blog userType="mexico" onBack={() => window.history.back()} />;
}
