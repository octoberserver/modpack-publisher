import { useState } from 'react';
import { Modpack, Distribution, Subversion } from '../types';
import { Plus, Minus } from 'lucide-react';

interface ModpackFormProps {
  initialData?: Modpack;
  onSubmit: (data: Modpack) => void;
  onCancel: () => void;
}

export const ModpackForm = ({ initialData, onSubmit, onCancel }: ModpackFormProps) => {
  const [formData, setFormData] = useState<Modpack>(
    initialData || {
      id: '',
      name: '',
      fullName: '',
      minecraftVersion: '',
      modpackLink: '',
      subversions: [
        {
          subversionId: '00',
          distributions: [{ name: '', link: '' }],
        },
      ],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addSubversion = () => {
    const newId = formData.subversions.length.toString().padStart(2, '0');
    setFormData({
      ...formData,
      subversions: [
        ...formData.subversions,
        {
          subversionId: newId,
          distributions: [{ name: '', link: '' }],
        },
      ],
    });
  };

  const addDistribution = (subversionIndex: number) => {
    const newSubversions = [...formData.subversions];
    newSubversions[subversionIndex].distributions.push({ name: '', link: '' });
    setFormData({ ...formData, subversions: newSubversions });
  };

  const updateDistribution = (
    subversionIndex: number,
    distributionIndex: number,
    field: keyof Distribution,
    value: string
  ) => {
    const newSubversions = [...formData.subversions];
    newSubversions[subversionIndex].distributions[distributionIndex][field] = value;
    setFormData({ ...formData, subversions: newSubversions });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">ID</label>
          <input
            type="text"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Minecraft Version
          </label>
          <input
            type="text"
            value={formData.minecraftVersion}
            onChange={(e) =>
              setFormData({ ...formData, minecraftVersion: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Modpack Link
          </label>
          <input
            type="url"
            value={formData.modpackLink}
            onChange={(e) =>
              setFormData({ ...formData, modpackLink: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Subversions</h3>
            <button
              type="button"
              onClick={addSubversion}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus size={16} className="mr-1" /> Add Subversion
            </button>
          </div>

          {formData.subversions.map((subversion, subversionIndex) => (
            <div
              key={subversion.subversionId}
              className="border rounded-lg p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium">
                  Subversion {subversion.subversionId}
                </h4>
                <button
                  type="button"
                  onClick={() => addDistribution(subversionIndex)}
                  className="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <Plus size={16} className="mr-1" /> Add Distribution
                </button>
              </div>

              {subversion.distributions.map((dist, distIndex) => (
                <div key={distIndex} className="flex gap-4">
                  <input
                    type="text"
                    value={dist.name}
                    onChange={(e) =>
                      updateDistribution(
                        subversionIndex,
                        distIndex,
                        'name',
                        e.target.value
                      )
                    }
                    placeholder="Distribution Name"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                  <input
                    type="url"
                    value={dist.link}
                    onChange={(e) =>
                      updateDistribution(
                        subversionIndex,
                        distIndex,
                        'link',
                        e.target.value
                      )
                    }
                    placeholder="Distribution Link"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
    </form>
  );
};
