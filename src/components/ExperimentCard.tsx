import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExperimentCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
}

const ExperimentCard = ({ title, description, icon: Icon, onClick }: ExperimentCardProps) => {
  return (
    <div className="experiment-card group">
      <div className="flex flex-col h-full">
        <div className="mb-4 p-3 rounded-lg bg-accent/10 w-fit group-hover:bg-accent/20 transition-colors">
          <Icon className="w-8 h-8 text-accent" />
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-card-foreground">{title}</h3>
        
        <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
          {description}
        </p>
        
        <Button 
          onClick={onClick}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          Start Experiment
        </Button>
      </div>
    </div>
  );
};

export default ExperimentCard;
