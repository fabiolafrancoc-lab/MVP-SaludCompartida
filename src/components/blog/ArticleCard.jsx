// ArticleCard Component
export default function ArticleCard({ article, onClick }) {
  const categoryColors = {
    'Familia': 'from-pink-500 to-rose-500',
    'Bienestar': 'from-cyan-500 to-blue-500',
    'Salud': 'from-green-500 to-emerald-500',
    'Finanzas': 'from-orange-500 to-amber-500',
    'Relaciones': 'from-purple-500 to-pink-500',
  };

  const gradientClass = categoryColors[article.category] || 'from-gray-500 to-gray-600';

  return (
    <div
      onClick={() => onClick(article)}
      className="group bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-gray-100"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={article.image}
          alt={article.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        <div className={`absolute top-6 left-6 bg-gradient-to-r ${gradientClass} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm`}>
          {article.category}
        </div>
        
        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-gray-800 flex items-center gap-2 shadow-lg">
          <svg className="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {article.readingTime} min
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2 drop-shadow-lg">
            {article.title}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 text-base leading-relaxed mb-5 line-clamp-3">
          {article.preview}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="text-xs font-semibold bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-cyan-300 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        <button className={`w-full bg-gradient-to-r ${gradientClass} text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3`}>
          Leer artículo completo
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
