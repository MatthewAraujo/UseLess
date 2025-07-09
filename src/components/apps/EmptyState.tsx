import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Monitor, Plus } from "lucide-react";

interface EmptyStateProps {
  searchQuery: string;
  onAddApp: () => void;
}

export const EmptyState = ({ searchQuery, onAddApp }: EmptyStateProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Monitor className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No applications found</h3>
        <p className="text-muted-foreground text-center mb-4">
          {searchQuery ? "Try adjusting your search terms" : "Add your first application to get started"}
        </p>
        {!searchQuery && (
          <Button onClick={onAddApp}>
            <Plus className="w-4 h-4 mr-2" />
            Add Application
          </Button>
        )}
      </CardContent>
    </Card>
  );
}; 