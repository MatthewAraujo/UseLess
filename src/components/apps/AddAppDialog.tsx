import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { NewAppData } from "../../types/app";
import { appCategories } from "../../data/mockData";

interface AddAppDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddApp: (appData: NewAppData) => void;
}

export const AddAppDialog = ({ isOpen, onOpenChange, onAddApp }: AddAppDialogProps) => {
  const [newApp, setNewApp] = useState<NewAppData>({
    name: "",
    icon: "💻",
    category: "Productivity",
    maxHours: 4
  });

  const handleAddApp = () => {
    onAddApp(newApp);
    setNewApp({ name: "", icon: "💻", category: "Productivity", maxHours: 4 });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
          <DialogDescription>
            Add a new application to track and manage its usage.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Application Name</label>
            <Input
              placeholder="Enter application name..."
              value={newApp.name}
              onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Icon</label>
            <Input
              placeholder="🎮"
              value={newApp.icon}
              onChange={(e) => setNewApp({ ...newApp, icon: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={newApp.category} onValueChange={(value) => setNewApp({ ...newApp, category: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {appCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Daily Limit (hours)</label>
            <Slider
              value={[newApp.maxHours]}
              onValueChange={(value) => setNewApp({ ...newApp, maxHours: value[0] })}
              max={12}
              min={0.5}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0.5h</span>
              <span>{newApp.maxHours}h</span>
              <span>12h</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddApp} disabled={!newApp.name}>
            Add Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 