import { Link, useParams } from 'react-router-dom';
import { COMPONENTS, CATEGORIES } from '../../data/components';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

export function Sidebar({ isOpen = true, onClose, isMobile = false }: SidebarProps) {
  const { componentId } = useParams();

  const handleLinkClick = () => {
    // Auto-close sidebar on mobile when a component is selected
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <aside
      className={`
        w-64 border-r bg-gray-50 overflow-y-auto
        md:relative md:translate-x-0
        fixed inset-y-0 left-0 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Components
          </h3>
          {/* Close button - mobile only */}
          {isMobile && (
            <button
              onClick={onClose}
              className="md:hidden p-1 hover:bg-gray-200 rounded"
              aria-label="Close sidebar"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        <nav className="space-y-6">
          {CATEGORIES.map((category) => {
            const components = COMPONENTS.filter((c) => c.category === category.id);
            return (
              <div key={category.id}>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  {category.name} ({components.length})
                </h4>
                <ul className="space-y-1">
                  {components.map((component) => (
                    <li key={component.id}>
                      <Link
                        to={`/playground/${component.id}`}
                        onClick={handleLinkClick}
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                          componentId === component.id
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        {component.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
