export type WorkspacePlatformState = {
  selectedIds: string[];
  addMany: (ids: string[]) => void;
  removeMany: (ids: string[]) => void;
  toggleOne: (id: string, checked: boolean) => void;
};

export function useWorkspacePlatforms(
  value: string[] | undefined,
  onChange: (value: string[]) => void
): WorkspacePlatformState {
  const selectedIds = value ?? [];

  const addMany = (ids: string[]) => {
    onChange(Array.from(new Set([...selectedIds, ...ids])));
  };

  const removeMany = (ids: string[]) => {
    onChange(selectedIds.filter((id) => !ids.includes(id)));
  };

  const toggleOne = (id: string, checked: boolean) => {
    onChange(
      checked ? [...selectedIds, id] : selectedIds.filter((v) => v !== id)
    );
  };

  return {
    selectedIds,
    addMany,
    removeMany,
    toggleOne,
  };
}
