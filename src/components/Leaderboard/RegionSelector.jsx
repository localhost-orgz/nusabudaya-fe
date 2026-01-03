import { MapPinned } from "lucide-react";
import IslandTabs from "./IslandTabs";

function RegionSelector({ activeTab, onActiveTab }) {
  return (
    <div className="mt-8 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <MapPinned className="w-5 h-5 text-(--color-secondary)" />
        <h3 className="font-medium text-lg">Pilih Wilayah</h3>
      </div>

      <IslandTabs activeTab={activeTab} onActiveTab={onActiveTab} />
    </div>
  );
}

export default RegionSelector;
