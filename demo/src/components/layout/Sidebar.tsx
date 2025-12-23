import { Link, useParams } from 'react-router-dom';
import { COMPONENTS, CATEGORIES } from '../../data/components';

export function Sidebar() {
  const { componentId } = useParams();

  return (
    <aside className="w-64 border-r bg-gray-50 overflow-y-auto">
      <div className="p-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Components
        </h3>
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
