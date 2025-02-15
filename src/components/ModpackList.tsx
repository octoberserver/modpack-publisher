import { Modpack } from '../types';
import { Trash2, Pencil } from 'lucide-react';

interface ModpackListProps {
  modpacks: Modpack[];
  onEdit: (modpack: Modpack) => void;
  onDelete: (id: string) => void;
}

export const ModpackList = ({ modpacks, onEdit, onDelete }: ModpackListProps) => {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Minecraft Version
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subversions
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {modpacks.map((modpack) => (
            <tr key={modpack.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {modpack.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {modpack.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {modpack.minecraftVersion}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {modpack.subversions.length}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(modpack)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(modpack.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
