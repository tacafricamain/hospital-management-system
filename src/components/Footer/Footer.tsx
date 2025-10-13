import { ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-600">
          <p className="flex items-center gap-1">
            Built by{' '}
            <a 
              href="https://jahswill.online" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-[#0066CC] hover:text-[#0052A3] inline-flex items-center gap-1 transition-colors"
            >
              Jahswill
              <ExternalLink size={12} />
            </a>
          </p>
          <p className="flex items-center gap-1">
            Powered by{' '}
            <a 
              href="https://spex.com.ng" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-[#0066CC] hover:text-[#0052A3] inline-flex items-center gap-1 transition-colors"
            >
              Spex Studios
              <ExternalLink size={12} />
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
