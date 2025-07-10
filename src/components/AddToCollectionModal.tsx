import { saveToCollection } from '@/db/collection';
import { YoutubeAPIVideo } from '@/types/youtube-api';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddToCollectionModal = ({ video, onClose }: { video: YoutubeAPIVideo; onClose: (saved: boolean) => void }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: video.snippet.title,
      description: video.snippet.description,
      notes: '',
    }
  });

  const addTag = () => {
    if (tagInput.trim() && tags.length < 10) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: any) => {
    try {
      await saveToCollection({
        id: 0,
        title: data.title,
        description: data.description,
        notes: data.notes,
        tags: tags.join(','),
        author: video.snippet.channelTitle,
        thumbnail: video.snippet.thumbnails.standard?.url || video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default?.url || '',
        youtube_id: video.id,
        date_added: new Date()
      });
      onClose(true);
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add to Collection</h2>
        
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={handleKeyDown}
        >
          <div className="mb-4">
            <label className="block mb-1">Title</label>
            <input
              {...register('title')}
              className="w-full p-2 border rounded dark:bg-gray-700"
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full p-2 border rounded dark:bg-gray-700"
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-1">Notes</label>
            <textarea
              {...register('notes')}
              placeholder="Add your notes..."
              rows={3}
              className="w-full p-2 border rounded dark:bg-gray-700"
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-1">
              Tags {tags.length > 0 && `(${tags.length}/10)`}
            </label>
            <div className="flex gap-2 mb-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1 p-2 border rounded dark:bg-gray-700"
                placeholder="Add tag..."
              />
              <button
                type="button"
                onClick={addTag}
                disabled={tags.length >= 10}
                className="bg-gray-200 dark:bg-gray-700 px-3 rounded disabled:opacity-50"
              >
                Add
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded flex items-center"
                >
                  {tag}
                  <button 
                    type="button"
                    onClick={() => removeTag(index)}
                    className="ml-2 text-sm"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToCollectionModal;